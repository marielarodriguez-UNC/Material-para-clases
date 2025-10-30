
export interface Project {
  id: string;
  name: string;
  nature: {
    description: string;
    justification: string;
    framework: string;
    purpose: string;
    objectives: string;
    goals: string;
    beneficiaries: string;
    products: string;
    location: string;
  };
  activities: Task[];
  methods: string;
  resources: {
    human: string;
    materials: string;
    technical: string;
  };
  budget: BudgetItem[];
  management: string;
  evaluation: string;
  externalFactors: string;
  createdAt: string;
}

export interface Task {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
}

export interface BudgetItem {
  id: string;
  name: string;
  cost: number;
}

export interface Section {
  id: ProjectSection;
  title: string;
  description: string;
}

export type ProjectSection =
  | 'name'
  | 'nature'
  | 'activities'
  | 'methods'
  | 'resources'
  | 'budget'
  | 'management'
  | 'evaluation'
  | 'externalFactors';
