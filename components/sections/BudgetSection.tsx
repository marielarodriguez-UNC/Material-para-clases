
import React from 'react';
import { Project, BudgetItem } from '../../types';
import BudgetChart from '../BudgetChart';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';

interface BudgetSectionProps {
  project: Project;
  onUpdate: (field: 'budget', value: BudgetItem[]) => void;
}

const BudgetSection: React.FC<BudgetSectionProps> = ({ project, onUpdate }) => {
  const { budget } = project;
  
  const totalCost = budget.reduce((sum, item) => sum + (item.cost || 0), 0);

  const handleAddItem = () => {
    const newItem: BudgetItem = {
      id: `budget_${Date.now()}`,
      name: `Nueva Partida ${budget.length + 1}`,
      cost: 0,
    };
    onUpdate('budget', [...budget, newItem]);
  };

  const handleUpdateItem = (itemId: string, field: keyof BudgetItem, value: string | number) => {
    const updatedItems = budget.map(item =>
      item.id === itemId ? { ...item, [field]: value } : item
    );
    onUpdate('budget', updatedItems);
  };

  const handleRemoveItem = (itemId: string) => {
    onUpdate('budget', budget.filter(item => item.id !== itemId));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium leading-6 text-slate-900 mb-4">Partidas del Presupuesto</h3>
        <div className="space-y-3">
          {budget.map((item, index) => (
            <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-3 bg-slate-50 rounded-md">
              <div className="md:col-span-7">
                <label htmlFor={`item-name-${index}`} className="sr-only">Nombre de la Partida</label>
                <input
                  type="text"
                  id={`item-name-${index}`}
                  value={item.name}
                  onChange={(e) => handleUpdateItem(item.id, 'name', e.target.value)}
                  className="block w-full shadow-sm sm:text-sm border-slate-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Nombre de la Partida"
                />
              </div>
              <div className="md:col-span-3">
                 <label htmlFor={`item-cost-${index}`} className="sr-only">Costo</label>
                 <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      id={`item-cost-${index}`}
                      value={item.cost}
                      onChange={(e) => handleUpdateItem(item.id, 'cost', parseFloat(e.target.value) || 0)}
                      className="block w-full shadow-sm sm:text-sm border-slate-300 rounded-md pl-7 focus:ring-sky-500 focus:border-sky-500"
                      placeholder="0.00"
                    />
                </div>
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  title="Eliminar Partida"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleAddItem}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Agregar Partida
        </button>

         <div className="mt-6 pt-4 border-t border-slate-200 text-right">
            <span className="text-sm text-slate-500">Costo Total Estimado: </span>
            <span className="text-xl font-bold text-slate-800">${totalCost.toLocaleString()}</span>
        </div>

        <BudgetChart budgetItems={budget} />
      </div>
    </div>
  );
};

export default BudgetSection;
