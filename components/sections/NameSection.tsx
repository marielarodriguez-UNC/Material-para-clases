
import React from 'react';
import { Project } from '../../types';

interface NameSectionProps {
  project: Project;
  onUpdate: (field: 'name', value: string) => void;
}

const NameSection: React.FC<NameSectionProps> = ({ project, onUpdate }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Nombre del Proyecto
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="mt-1 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
            value={project.name}
            onChange={(e) => onUpdate('name', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default NameSection;
