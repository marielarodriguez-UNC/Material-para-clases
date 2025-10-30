
import React from 'react';
import { Project } from '../../types';
import SimpleTextareaSection from './SimpleTextareaSection';
import { GoogleGenAI } from '@google/genai';

interface EvaluationSectionProps {
  project: Project;
  onUpdate: (field: 'evaluation', value: string) => void;
  ai: GoogleGenAI | null;
}

const EvaluationSection: React.FC<EvaluationSectionProps> = ({ project, onUpdate, ai }) => (
  <SimpleTextareaSection
    project={project}
    onUpdate={onUpdate}
    field="evaluation"
    label="Indicadores de Evaluación"
    sectionTitleForAI="Indicadores de Evaluación"
    ai={ai}
  />
);

export default EvaluationSection;
