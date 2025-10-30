
import React from 'react';
import { Project } from '../../types';
import SimpleTextareaSection from './SimpleTextareaSection';
import { GoogleGenAI } from '@google/genai';

interface ManagementSectionProps {
  project: Project;
  onUpdate: (field: 'management', value: string) => void;
  ai: GoogleGenAI | null;
}

const ManagementSection: React.FC<ManagementSectionProps> = ({ project, onUpdate, ai }) => (
  <SimpleTextareaSection
    project={project}
    onUpdate={onUpdate}
    field="management"
    label="Estructura Organizativa y de Gestión"
    sectionTitleForAI="Gestión y Organización"
    ai={ai}
  />
);

export default ManagementSection;
