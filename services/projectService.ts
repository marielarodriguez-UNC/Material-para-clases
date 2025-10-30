
import { Project } from '../types';

const PROJECTS_KEY = 'library_projects';

export const getProjects = (): Project[] => {
  try {
    const projectsJson = localStorage.getItem(PROJECTS_KEY);
    if (projectsJson === null) {
      return [];
    }
    const projects = JSON.parse(projectsJson) as Project[];
    return projects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error("Error retrieving projects from localStorage", error);
    return [];
  }
};

export const getProjectById = (id: string): Project | null => {
    const projects = getProjects();
    return projects.find(p => p.id === id) || null;
}

export const saveProject = (project: Project): void => {
  try {
    const projects = getProjects();
    const existingIndex = projects.findIndex((p) => p.id === project.id);
    if (existingIndex > -1) {
      projects[existingIndex] = project;
    } else {
      projects.push(project);
    }
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error("Error saving project to localStorage", error);
  }
};

export const deleteProject = (projectId: string): void => {
    try {
        let projects = getProjects();
        projects = projects.filter(p => p.id !== projectId);
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    } catch (error) {
        console.error("Error deleting project from localStorage", error);
    }
}
