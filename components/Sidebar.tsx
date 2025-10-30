
import React from 'react';
import { ProjectSection } from '../types';
import { sections } from '../constants';
import { DocumentTextIcon, ChartBarIcon, CurrencyDollarIcon, UsersIcon, LightBulbIcon, ScaleIcon, CogIcon, BeakerIcon, GlobeAltIcon, HashtagIcon } from '@heroicons/react/24/outline';


interface SidebarProps {
  activeSection: ProjectSection | 'summary';
  setActiveSection: (section: ProjectSection | 'summary') => void;
}

const iconMap: { [key in ProjectSection]: React.ElementType } = {
    name: HashtagIcon,
    nature: LightBulbIcon,
    activities: ChartBarIcon,
    methods: BeakerIcon,
    resources: GlobeAltIcon,
    budget: CurrencyDollarIcon,
    management: UsersIcon,
    evaluation: ScaleIcon,
    externalFactors: CogIcon,
};


const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  return (
    <nav className="w-full md:w-64 lg:w-72 bg-white md:border-r border-slate-200 p-4 md:p-6 flex-shrink-0">
      <ul className="space-y-1">
        {sections.map((section) => {
            const Icon = iconMap[section.id];
            const isActive = activeSection === section.id;
            return (
              <li key={section.id}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection(section.id);
                  }}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-sky-100 text-sky-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`mr-3 h-6 w-6 flex-shrink-0 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                  <span className="truncate">{section.title}</span>
                </a>
              </li>
            );
        })}
         <li>
            <a
                href="#"
                onClick={(e) => {
                e.preventDefault();
                setActiveSection('summary');
                }}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors mt-4 ${
                activeSection === 'summary'
                    ? 'bg-sky-100 text-sky-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
            >
                <DocumentTextIcon className={`mr-3 h-6 w-6 flex-shrink-0 ${activeSection === 'summary' ? 'text-sky-600' : 'text-slate-400'}`} />
                <span className="truncate">Resumen y Descarga</span>
            </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
