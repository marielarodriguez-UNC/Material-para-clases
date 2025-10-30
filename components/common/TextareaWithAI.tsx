
import React, { useState } from 'react';
import { Project } from '../../types';
import { GoogleGenAI } from '@google/genai';
import { generateContent } from '../../services/geminiService';
import AIButton from './AIButton';

interface TextareaWithAIProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  project: Project;
  sectionTitle: string;
  ai: GoogleGenAI | null;
  rows?: number;
}

const TextareaWithAI: React.FC<TextareaWithAIProps> = ({ id, label, value, onChange, project, sectionTitle, ai, rows = 6 }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!ai) return;
    setIsLoading(true);
    const content = await generateContent(ai, project, sectionTitle, id, value);
    onChange(content);
    setIsLoading(false);
  };

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        rows={rows}
        className="block w-full shadow-sm sm:text-sm border-slate-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
        value={isLoading ? 'Generando...' : value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isLoading}
      />
      {ai && <AIButton onClick={handleGenerate} isLoading={isLoading} isDisabled={!ai} />}
    </div>
  );
};

export default TextareaWithAI;
