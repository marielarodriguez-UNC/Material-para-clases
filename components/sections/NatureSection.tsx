
import React from 'react';
import { Project } from '../../types';
import { GoogleGenAI } from '@google/genai';
import TextareaWithAI from '../common/TextareaWithAI';

interface NatureSectionProps {
  project: Project;
  onUpdate: (field: keyof Project['nature'], value: string) => void;
  ai: GoogleGenAI | null;
}

const NatureSection: React.FC<NatureSectionProps> = ({ project, onUpdate, ai }) => {
  const fields: {id: keyof Project['nature'], label: string}[] = [
    { id: 'description', label: 'Descripción' },
    { id: 'justification', label: 'Fundamentación o Justificación' },
    { id: 'framework', label: 'Marco Institucional' },
    { id: 'purpose', label: 'Finalidad del Proyecto' },
    { id: 'objectives', label: 'Objetivos' },
    { id: 'goals', label: 'Metas' },
    { id: 'beneficiaries', label: 'Beneficiarios' },
    { id: 'products', label: 'Productos' },
    { id: 'location', label: 'Localización Física y Cobertura' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        {fields.map(field => (
          <TextareaWithAI
            key={field.id}
            id={field.id}
            label={field.label}
            value={project.nature[field.id]}
            onChange={(value) => onUpdate(field.id, value)}
            project={project}
            sectionTitle="Naturaleza del Proyecto"
            ai={ai}
          />
        ))}
      </div>
    </div>
  );
};

export default NatureSection;
