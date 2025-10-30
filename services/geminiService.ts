
import { GoogleGenAI } from '@google/genai';
import { Project } from '../types';

export const generateContent = async (
  ai: GoogleGenAI,
  project: Project,
  sectionTitle: string,
  fieldName: string,
  existingContent: string
): Promise<string> => {
  if (!ai) {
    return 'IA Gemini no inicializada. Por favor, verifique su API Key.';
  }

  const prompt = `
    Basado en los siguientes detalles del proyecto, genera un párrafo conciso y relevante para el campo "${fieldName}" dentro de la sección "${sectionTitle}".

    Título del Proyecto: "${project.name}"
    Descripción del Proyecto: "${project.nature.description}"
    Objetivos del Proyecto: "${project.nature.objectives}"
    
    El campo "${fieldName}" es para: ${getFieldContext(fieldName)}
    
    ${existingContent ? `El contenido actual es: "${existingContent}". Por favor, mejóralo o amplíalo.` : 'El campo está actualmente vacío. Por favor, genera contenido desde cero.'}

    El proyecto es de tipo biblioteca o cultural. Genera una respuesta profesional y bien redactada en español.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    return response.text.trim();
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return 'Ocurrió un error al generar contenido. Por favor, revise la consola.';
  }
};

function getFieldContext(fieldName: string): string {
    const contextMap: { [key: string]: string } = {
        'description': 'Una descripción general del proyecto.',
        'justification': 'La fundamentación y justificación de por qué este proyecto es necesario.',
        'framework': 'El marco institucional o contexto en el que opera el proyecto.',
        'purpose': 'El propósito de alto nivel y el impacto esperado a largo plazo del proyecto.',
        'objectives': 'Los objetivos específicos y medibles que el proyecto pretende alcanzar.',
        'goals': 'Las metas o hitos concretos que se deben cumplir.',
        'beneficiaries': 'Los beneficiarios directos e indirectos del proyecto.',
        'products': 'Los productos o entregables tangibles del proyecto.',
        'location': 'La ubicación física y la cobertura espacial del proyecto.',
        'methods': 'Las metodologías y técnicas que se utilizarán.',
        'human': 'Los recursos humanos necesarios.',
        'materials': 'Los recursos materiales necesarios.',
        'technical': 'Los recursos técnicos y equipamiento necesarios.',
        'management': 'La estructura organizativa y de gestión.',
        'evaluation': 'Los indicadores que se utilizarán para evaluar el éxito.',
        'externalFactors': 'Factores externos, riesgos o prerrequisitos para el éxito.'
    };
    return contextMap[fieldName] || 'Este campo.';
}
