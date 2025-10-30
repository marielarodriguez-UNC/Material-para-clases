
import React from 'react';
import { Project } from '../../types';
import SimpleTextareaSection from './SimpleTextareaSection';
import { GoogleGenAI } from '@google/genai';

interface ExternalFactorsSectionProps {
  project: Project;
  onUpdate: (field: 'externalFactors', value: string) => void;
  ai: GoogleGenAI | null;
}

const ExternalFactorsSection: React.FC<ExternalFactorsSectionProps> = ({ project, onUpdate, ai }) => (
  <SimpleTextareaSection
    project={project}
    onUpdate={onUpdate}
    field="externalFactors"
    label="Factores Externos y Prerrequisitos"
    sectionTitleForAI="Factores Externos"
    ai={ai}
  />
);

export default ExternalFactorsSection;
