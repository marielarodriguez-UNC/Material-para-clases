
import React from 'react';
import { Project } from '../../types';
import SimpleTextareaSection from './SimpleTextareaSection';
import { GoogleGenAI } from '@google/genai';

interface MethodsSectionProps {
  project: Project;
  onUpdate: (field: 'methods', value: string) => void;
  ai: GoogleGenAI | null;
}

const MethodsSection: React.FC<MethodsSectionProps> = ({ project, onUpdate, ai }) => (
  <SimpleTextareaSection
    project={project}
    onUpdate={onUpdate}
    field="methods"
    label="Métodos y Técnicas"
    sectionTitleForAI="Métodos y Técnicas"
    ai={ai}
  />
);

export default MethodsSection;
