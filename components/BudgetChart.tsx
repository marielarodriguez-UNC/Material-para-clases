
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BudgetItem } from '../types';

interface BudgetChartProps {
  budgetItems: BudgetItem[];
}

const COLORS = ['#0ea5e9', '#6366f1', '#ec4899', '#f97316', '#10b981', '#f59e0b', '#8b5cf6'];

const BudgetChart: React.FC<BudgetChartProps> = ({ budgetItems }) => {
  if (budgetItems.length === 0 || budgetItems.every(i => i.cost === 0)) {
    return <div className="text-center p-8 bg-slate-100 rounded-lg text-slate-500">Agregue partidas al presupuesto para ver el gráfico.</div>;
  }

  const total = budgetItems.reduce((sum, item) => sum + (item.cost || 0), 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const percent = ((payload[0].value / total) * 100).toFixed(2);
      return (
        <div className="bg-white p-2 border border-slate-200 rounded shadow-md">
          <p className="font-bold">{`${payload[0].name}`}</p>
          <p className="text-sm">{`Costo: $${payload[0].value.toLocaleString()}`}</p>
          <p className="text-sm">{`Porcentaje: ${percent}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80 bg-white p-4 rounded-lg shadow-inner mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={budgetItems}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="cost"
            nameKey="name"
          >
            {budgetItems.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetChart;
