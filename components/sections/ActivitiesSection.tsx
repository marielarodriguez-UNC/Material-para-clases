
import React from 'react';
import { Project, Task } from '../../types';
import GanttChart from '../GanttChart';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';

interface ActivitiesSectionProps {
  project: Project;
  onUpdate: (field: 'activities', value: Task[]) => void;
}

const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({ project, onUpdate }) => {
  const { activities } = project;

  const handleAddTask = () => {
    const newTask: Task = {
      id: `task_${Date.now()}`,
      name: `Nueva Tarea ${activities.length + 1}`,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0],
    };
    onUpdate('activities', [...activities, newTask]);
  };

  const handleUpdateTask = (taskId: string, field: keyof Task, value: string) => {
    const updatedTasks = activities.map(task => 
      task.id === taskId ? { ...task, [field]: value } : task
    );
    onUpdate('activities', updatedTasks);
  };

  const handleRemoveTask = (taskId: string) => {
    onUpdate('activities', activities.filter(task => task.id !== taskId));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium leading-6 text-slate-900 mb-4">Tareas y Cronograma</h3>
        <div className="space-y-4">
          {activities.map((task, index) => (
            <div key={task.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-3 bg-slate-50 rounded-md">
              <div className="md:col-span-4">
                 <label htmlFor={`task-name-${index}`} className="text-sm font-medium text-slate-700 sr-only">Nombre de la Tarea</label>
                <input
                  type="text"
                  id={`task-name-${index}`}
                  value={task.name}
                  onChange={(e) => handleUpdateTask(task.id, 'name', e.target.value)}
                  className="block w-full shadow-sm sm:text-sm border-slate-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Nombre de la Tarea"
                />
              </div>
              <div className="md:col-span-3">
                 <label htmlFor={`task-start-${index}`} className="text-sm font-medium text-slate-700 sr-only">Fecha de Inicio</label>
                <input
                  type="date"
                   id={`task-start-${index}`}
                  value={task.startDate}
                  onChange={(e) => handleUpdateTask(task.id, 'startDate', e.target.value)}
                  className="block w-full shadow-sm sm:text-sm border-slate-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                />
              </div>
              <div className="md:col-span-3">
                 <label htmlFor={`task-end-${index}`} className="text-sm font-medium text-slate-700 sr-only">Fecha de Fin</label>
                <input
                  type="date"
                  id={`task-end-${index}`}
                  value={task.endDate}
                  onChange={(e) => handleUpdateTask(task.id, 'endDate', e.target.value)}
                  className="block w-full shadow-sm sm:text-sm border-slate-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button
                  onClick={() => handleRemoveTask(task.id)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  title="Eliminar Tarea"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleAddTask}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Agregar Tarea
        </button>
        <GanttChart tasks={activities.filter(t => t.startDate && t.endDate)} />
      </div>
    </div>
  );
};

export default ActivitiesSection;
