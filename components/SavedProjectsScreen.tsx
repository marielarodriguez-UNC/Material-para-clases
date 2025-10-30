
import React from 'react';
import { Project } from '../types';
import { PencilIcon, TrashIcon, FolderOpenIcon } from '@heroicons/react/24/solid';

interface SavedProjectsScreenProps {
  projects: Project[];
  onLoad: (projectId: string) => void;
  onDelete: (projectId: string) => void;
}

const SavedProjectsScreen: React.FC<SavedProjectsScreenProps> = ({ projects, onLoad, onDelete }) => {
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Proyectos Guardados</h2>
      {projects.length === 0 ? (
        <div className="text-center p-10 bg-white rounded-lg shadow">
          <FolderOpenIcon className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-2 text-sm font-medium text-slate-900">No se encontraron proyectos</h3>
          <p className="mt-1 text-sm text-slate-500">Comience creando un nuevo proyecto.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between transition-shadow hover:shadow-md">
              <div>
                <h3 className="text-lg font-semibold text-sky-700">{project.name}</h3>
                <p className="text-sm text-slate-500">Creado el: {formatDate(project.createdAt)}</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onLoad(project.id)}
                  className="p-2 text-slate-500 hover:text-sky-600 hover:bg-slate-100 rounded-full transition-colors"
                  title="Editar Proyecto"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`¿Está seguro de que desea eliminar "${project.name}"?`)) {
                      onDelete(project.id);
                    }
                  }}
                  className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  title="Eliminar Proyecto"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedProjectsScreen;
