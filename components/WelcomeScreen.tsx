
import React from 'react';
import { PlusIcon, FolderOpenIcon } from '@heroicons/react/24/solid';

interface WelcomeScreenProps {
  onCreate: () => void;
  onViewSaved: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onCreate, onViewSaved }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">
          Bienvenido al Asistente de Proyectos
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          Basada en la metodología de Ezequiel Ander-Egg, esta herramienta le guiará en la creación de un plan integral de proyecto social o cultural. Hagamos realidad sus ideas.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={onCreate}
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-transform hover:scale-105"
          >
            <PlusIcon className="h-6 w-6 mr-3" />
            Crear un Nuevo Proyecto
          </button>
          <button
            onClick={onViewSaved}
            className="inline-flex items-center justify-center px-8 py-3 border border-slate-300 text-base font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-transform hover:scale-105"
          >
            <FolderOpenIcon className="h-6 w-6 mr-3" />
            Ver Proyectos Guardados
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
