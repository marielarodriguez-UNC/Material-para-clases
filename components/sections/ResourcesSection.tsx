
import React from 'react';
import { Project } from '../../types';
import { GoogleGenAI } from '@google/genai';
import TextareaWithAI from '../common/TextareaWithAI';

interface ResourcesSectionProps {
  project: Project;
  onUpdate: (field: keyof Project['resources'], value: string) => void;
  ai: GoogleGenAI | null;
}

const ResourcesSection: React.FC<ResourcesSectionProps> = ({ project, onUpdate, ai }) => {
   const fields: {id: keyof Project['resources'], label: string}[] = [
    { id: 'human', label: 'Recursos Humanos' },
    { id: 'materials', label: 'Recursos Materiales' },
    { id: 'technical', label: 'Recursos Técnicos' },
   ]
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        {fields.map(field => (
           <TextareaWithAI
            key={field.id}
            id={field.id}
            label={field.label}
            value={project.resources[field.id]}
            onChange={(value) => onUpdate(field.id, value)}
            project={project}
            sectionTitle="Recursos Necesarios"
            ai={ai}
            rows={5}
          />
        ))}
      </div>
    </div>
  );
};

export default ResourcesSection;
