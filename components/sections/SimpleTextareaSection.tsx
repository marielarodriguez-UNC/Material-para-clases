
import React from 'react';
import { Project } from '../../types';
import { GoogleGenAI } from '@google/genai';
import TextareaWithAI from '../common/TextareaWithAI';

interface SimpleTextareaSectionProps {
  project: Project;
  onUpdate: (field: keyof Project, value: string) => void;
  field: keyof Project;
  label: string;
  sectionTitleForAI: string;
  ai: GoogleGenAI | null;
}

const SimpleTextareaSection: React.FC<SimpleTextareaSectionProps> = ({ project, onUpdate, field, label, sectionTitleForAI, ai }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <TextareaWithAI
            id={field}
            label={label}
            value={project[field] as string}
            onChange={(value) => onUpdate(field, value)}
            project={project}
            sectionTitle={sectionTitleForAI}
            ai={ai}
            rows={10}
        />
      </div>
    </div>
  );
};

export default SimpleTextareaSection;
