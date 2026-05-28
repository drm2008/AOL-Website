export interface Module {
  id: string;
  title: string;
  description: string;
  subject: string;
  content: string;
  duration: number; // in minutes
  simulators?: { title: string; desc: string; url: string; }[]; // List of interactive HTML simulators
  dashboards?: { title: string; desc: string; url: string; }[]; // List of interactive HTML dashboards
}

export interface Progress {
  completedModules: string[];
  totalScore: number;
}
