
import React, { useState } from 'react';
import { Project } from '../../types';
import { sections } from '../../constants';
import GanttChart from '../GanttChart';
import BudgetChart from '../BudgetChart';
import { downloadProjectAsPDF } from '../../services/pdfService';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';

interface SummarySectionProps {
  project: Project;
}

const SummarySection: React.FC<SummarySectionProps> = ({ project }) => {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        if (isDownloading) return;
        setIsDownloading(true);
        try {
            await downloadProjectAsPDF('project-summary-content', project.name);
        } catch (error) {
            console.error("PDF download failed", error);
            // The pdfService now shows an alert to the user.
        } finally {
            setIsDownloading(false);
        }
    };

    const totalCost = project.budget.reduce((sum, item) => sum + (item.cost || 0), 0);

    const renderText = (text: string) => {
        return text.split('\n').map((line, index) => (
            <p key={index} className="mb-2">{line || <span>&nbsp;</span>}</p>
        ));
    };

    return (
        <div>
             <div className="flex justify-end mb-4">
                <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-slate-400 transition-colors"
                >
                    <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                    {isDownloading ? 'Generando PDF...' : 'Descargar como PDF'}
                </button>
            </div>
            <div id="project-summary-content" className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-center mb-2 text-slate-800">{project.name}</h1>
                <p className="text-center text-slate-500 mb-10">Plan de Proyecto Generado</p>

                {/* Nature Section */}
                <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 border-sky-500 pb-2 text-sky-700">2. Naturaleza del Proyecto</h2>
                <div className="prose max-w-none prose-slate">
                    <h3 className="font-semibold">Descripción:</h3>
                    {renderText(project.nature.description)}
                    <h3 className="font-semibold mt-4">Justificación:</h3>
                    {renderText(project.nature.justification)}
                    <h3 className="font-semibold mt-4">Marco Institucional:</h3>
                    {renderText(project.nature.framework)}
                    <h3 className="font-semibold mt-4">Finalidad:</h3>
                    {renderText(project.nature.purpose)}
                    <h3 className="font-semibold mt-4">Objetivos:</h3>
                    {renderText(project.nature.objectives)}
                    <h3 className="font-semibold mt-4">Metas:</h3>
                    {renderText(project.nature.goals)}
                    <h3 className="font-semibold mt-4">Beneficiarios:</h3>
                    {renderText(project.nature.beneficiaries)}
                    <h3 className="font-semibold mt-4">Productos:</h3>
                    {renderText(project.nature.products)}
                    <h3 className="font-semibold mt-4">Localización:</h3>
                    {renderText(project.nature.location)}
                </div>

                {/* Other Text Sections */}
                {[
                    { s: sections[2], d: project.activities, isChart: true, chartComp: <GanttChart tasks={project.activities.filter(t => t.startDate && t.endDate)} /> },
                    { s: sections[3], d: project.methods },
                    { s: sections[4], d: project.resources, isResource: true },
                    { s: sections[5], d: project.budget, isChart: true, chartComp: <BudgetChart budgetItems={project.budget} /> },
                    { s: sections[6], d: project.management },
                    { s: sections[7], d: project.evaluation },
                    { s: sections[8], d: project.externalFactors },
                ].map(({s, d, isChart, chartComp, isResource}) => (
                    <div key={s.id}>
                        <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 border-sky-500 pb-2 text-sky-700">{s.title}</h2>
                        {isChart ? (
                            <div className="break-inside-avoid">
                                {s.id === 'activities' && (
                                    <ul className="list-disc pl-5 mb-4">
                                        {project.activities.map(a => <li key={a.id}>{a.name} ({new Date(a.startDate).toLocaleDateString('es-ES')} - {new Date(a.endDate).toLocaleDateString('es-ES')})</li>)}
                                    </ul>
                                )}
                                {s.id === 'budget' && (
                                    <>
                                    <ul className="list-disc pl-5 mb-4">
                                        {project.budget.map(b => <li key={b.id}>{b.name}: ${b.cost.toLocaleString()}</li>)}
                                    </ul>
                                    <p className="text-right font-bold">Total: ${totalCost.toLocaleString()}</p>
                                    </>
                                )}
                                {chartComp}
                            </div>
                        ) : isResource ? (
                            <div className="prose max-w-none prose-slate">
                                <h3 className="font-semibold">Humanos:</h3>
                                {renderText(project.resources.human)}
                                <h3 className="font-semibold mt-4">Materiales:</h3>
                                {renderText(project.resources.materials)}
                                <h3 className="font-semibold mt-4">Técnicos:</h3>
                                {renderText(project.resources.technical)}
                            </div>
                        ) : (
                            <div className="prose max-w-none prose-slate">{renderText(d as string)}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SummarySection;
