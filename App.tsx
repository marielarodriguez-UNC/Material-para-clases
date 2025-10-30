
import React, { useState, useEffect, useCallback } from 'react';
import { Project, ProjectSection } from './types';
import { getProjects, saveProject, deleteProject, getProjectById } from './services/projectService';
import Sidebar from './components/Sidebar';
import ProjectEditor from './components/ProjectEditor';
import WelcomeScreen from './components/WelcomeScreen';
import SavedProjectsScreen from './components/SavedProjectsScreen';
import {
  PlusIcon,
  HomeIcon,
  BookmarkSquareIcon
} from '@heroicons/react/24/solid';
import { GoogleGenAI } from '@google/genai';
import { sections } from './constants';

const API_KEY = process.env.API_KEY;

const App: React.FC = () => {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeSection, setActiveSection] = useState<ProjectSection | 'summary'>(sections[0].id);
  const [view, setView] = useState<'welcome' | 'editor' | 'saved'>('welcome');
  const [isSaving, setIsSaving] = useState(false);
  const [ai, setAi] = useState<GoogleGenAI | null>(null);

  useEffect(() => {
    if (API_KEY) {
      setAi(new GoogleGenAI({ apiKey: API_KEY }));
    }
    const allProjects = getProjects();
    setProjects(allProjects);
  }, []);

  const handleCreateNewProject = () => {
    const newProject: Project = {
      id: `proj_${Date.now()}`,
      name: 'Proyecto sin Título',
      nature: {
        description: '',
        justification: '',
        framework: '',
        purpose: '',
        objectives: '',
        goals: '',
        beneficiaries: '',
        products: '',
        location: '',
      },
      activities: [],
      methods: '',
      resources: {
        human: '',
        materials: '',
        technical: '',
      },
      budget: [],
      management: '',
      evaluation: '',
      externalFactors: '',
      createdAt: new Date().toISOString(),
    };
    setCurrentProject(newProject);
    setActiveSection(sections[0].id);
    setView('editor');
  };

  const handleUpdateProject = useCallback((updatedProject: Project) => {
    setCurrentProject(updatedProject);
  }, []);

  const handleSaveProject = () => {
    if (currentProject) {
      setIsSaving(true);
      saveProject(currentProject);
      const allProjects = getProjects();
      setProjects(allProjects);
      setTimeout(() => setIsSaving(false), 1500);
    }
  };
  
  const handleLoadProject = (projectId: string) => {
    const projectToLoad = getProjectById(projectId);
    if (projectToLoad) {
      setCurrentProject(projectToLoad);
      setActiveSection(sections[0].id);
      setView('editor');
    }
  };

  const handleDeleteProject = (projectId: string) => {
    deleteProject(projectId);
    const allProjects = getProjects();
    setProjects(allProjects);
  };

  const renderContent = () => {
    switch (view) {
      case 'saved':
        return <SavedProjectsScreen projects={projects} onLoad={handleLoadProject} onDelete={handleDeleteProject} />;
      case 'editor':
        if (!currentProject) return null;
        return (
          <div className="flex flex-col md:flex-row h-full overflow-hidden">
            <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
            <ProjectEditor 
              project={currentProject} 
              onUpdate={handleUpdateProject} 
              activeSection={activeSection}
              ai={ai}
            />
          </div>
        );
      case 'welcome':
      default:
        return <WelcomeScreen onCreate={handleCreateNewProject} onViewSaved={() => setView('saved')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <header className="bg-white shadow-md z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-700 tracking-tight">Asistente de Generación de Proyectos</h1>
            <div className="flex items-center space-x-2 sm:space-x-4">
               {view !== 'welcome' && (
                <button
                  onClick={() => {
                    setCurrentProject(null);
                    setView('welcome');
                  }}
                  className="p-2 text-slate-600 hover:text-sky-600 hover:bg-slate-100 rounded-full transition-colors"
                  title="Inicio"
                >
                  <HomeIcon className="h-6 w-6" />
                </button>
              )}
               {view === 'editor' && (
                <button
                  onClick={() => setView('saved')}
                  className="p-2 text-slate-600 hover:text-sky-600 hover:bg-slate-100 rounded-full transition-colors"
                  title="Proyectos Guardados"
                >
                  <BookmarkSquareIcon className="h-6 w-6" />
                </button>
              )}
              {view === 'editor' && currentProject && (
                <>
                  <button
                    onClick={handleSaveProject}
                    className="hidden sm:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
                  >
                    {isSaving ? '¡Guardado!' : 'Guardar Proyecto'}
                  </button>
                </>
              )}
              {view !== 'editor' && (
                 <button
                    onClick={handleCreateNewProject}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
                  >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Nuevo Proyecto
                  </button>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
