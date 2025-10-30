
import React from 'react';
import { SparklesIcon } from '@heroicons/react/24/solid';

interface AIButtonProps {
  onClick: () => void;
  isLoading: boolean;
  isDisabled: boolean;
  className?: string;
}

const AIButton: React.FC<AIButtonProps> = ({ onClick, isLoading, isDisabled, className = '' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className={`absolute bottom-2 right-2 inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors ${className}`}
      title="Generar con IA"
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <SparklesIcon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
};

export default AIButton;
