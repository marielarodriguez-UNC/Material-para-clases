
import React from 'react';
import { Project, ProjectSection } from '../types';
import NameSection from './sections/NameSection';
import NatureSection from './sections/NatureSection';
import ActivitiesSection from './sections/ActivitiesSection';
import MethodsSection from './sections/MethodsSection';
import ResourcesSection from './sections/ResourcesSection';
import BudgetSection from './sections/BudgetSection';
import ManagementSection from './sections/ManagementSection';
import EvaluationSection from './sections/EvaluationSection';
import ExternalFactorsSection from './sections/ExternalFactorsSection';
import SummarySection from './sections/SummarySection';
import { sections } from '../constants';
import { GoogleGenAI } from '@google/genai';

interface ProjectEditorProps {
  project: Project;
  onUpdate: (project: Project) => void;
  activeSection: ProjectSection | 'summary';
  ai: GoogleGenAI | null;
}

const ProjectEditor: React.FC<ProjectEditorProps> = ({ project, onUpdate, activeSection, ai }) => {

  const handleUpdate = <T extends keyof Project>(field: T, value: Project[T]) => {
    onUpdate({ ...project, [field]: value });
  };
  
  const handleNatureUpdate = (field: keyof Project['nature'], value: string) => {
    onUpdate({
      ...project,
      nature: {
        ...project.nature,
        [field]: value
      }
    })
  }

  const handleResourceUpdate = (field: keyof Project['resources'], value: string) => {
    onUpdate({
      ...project,
      resources: {
        ...project.resources,
        [field]: value
      }
    })
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'name':
        return <NameSection project={project} onUpdate={handleUpdate} />;
      case 'nature':
        return <NatureSection project={project} onUpdate={handleNatureUpdate} ai={ai} />;
      case 'activities':
        return <ActivitiesSection project={project} onUpdate={handleUpdate} />;
      case 'methods':
        return <MethodsSection project={project} onUpdate={handleUpdate} ai={ai}/>;
      case 'resources':
        return <ResourcesSection project={project} onUpdate={handleResourceUpdate} ai={ai} />;
      case 'budget':
        return <BudgetSection project={project} onUpdate={handleUpdate} />;
      case 'management':
        return <ManagementSection project={project} onUpdate={handleUpdate} ai={ai}/>;
      case 'evaluation':
        return <EvaluationSection project={project} onUpdate={handleUpdate} ai={ai}/>;
      case 'externalFactors':
        return <ExternalFactorsSection project={project} onUpdate={handleUpdate} ai={ai}/>;
      case 'summary':
        return <SummarySection project={project} />;
      default:
        return <div>Seleccione una sección</div>;
    }
  };
  
  const activeSectionDetails = sections.find(s => s.id === activeSection) || {title: 'Resumen', description: 'Revise los detalles de su proyecto.'};

  return (
    <div className="flex-1 bg-slate-50 p-4 md:p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{activeSectionDetails.title}</h2>
        <p className="text-slate-500 mb-8">{activeSectionDetails.description}</p>
        {renderActiveSection()}
      </div>
    </div>
  );
};

export default ProjectEditor;
