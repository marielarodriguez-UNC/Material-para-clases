
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Task } from '../types';

interface GanttChartProps {
  tasks: Task[];
}

const GanttChart: React.FC<GanttChartProps> = ({ tasks }) => {
  if (tasks.length === 0) {
    return <div className="text-center p-8 bg-slate-100 rounded-lg text-slate-500">Agregue tareas para ver el diagrama de Gantt.</div>;
  }

  const data = tasks.map(task => {
    const start = new Date(task.startDate).getTime();
    const end = new Date(task.endDate).getTime();
    const duration = (end - start) / (1000 * 60 * 60 * 24); // Duration in days
    return {
      name: task.name,
      range: [start, end],
      duration: duration > 0 ? duration : 1, // min duration 1 day
    };
  });

  const allDates = tasks.flatMap(t => [new Date(t.startDate).getTime(), new Date(t.endDate).getTime()]);
  const minTime = Math.min(...allDates);
  const maxTime = Math.max(...allDates);

  const chartData = tasks.map(task => {
    const taskStart = new Date(task.startDate).getTime();
    const taskEnd = new Date(task.endDate).getTime();
    const startOffset = (taskStart - minTime) / (1000 * 60 * 60 * 24); // Start day from project start
    const duration = (taskEnd - taskStart) / (1000 * 60 * 60 * 24);
    return {
        name: task.name,
        start: startOffset,
        duration: duration >= 0 ? duration + 1 : 1, // always show at least 1 day bar
    }
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const task = tasks.find(t => t.name === label);
      if(!task) return null;

      return (
        <div className="bg-white p-2 border border-slate-200 rounded shadow-md">
          <p className="font-bold">{label}</p>
          <p className="text-sm">Inicio: {new Date(task.startDate).toLocaleDateString('es-ES')}</p>
          <p className="text-sm">Fin: {new Date(task.endDate).toLocaleDateString('es-ES')}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="w-full h-80 bg-white p-4 rounded-lg shadow-inner mt-4">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={['dataMin', 'dataMax + 2']} label={{ value: 'Días desde el inicio del proyecto', position: 'insideBottom', offset: -5 }}/>
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="duration" stackId="a" fill="#38bdf8" name="Duración (días)" barSize={20} />
            </BarChart>
        </ResponsiveContainer>
    </div>
  );
};

export default GanttChart;
