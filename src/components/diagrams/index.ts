import type { ComponentType } from 'react';
import InfraArchitectureDiagram from './InfraArchitectureDiagram';
import SpeakInsightsArchitectureDiagram from './SpeakInsightsArchitectureDiagram';
import NavDashboardArchitectureDiagram from './NavDashboardArchitectureDiagram';

// Looked up by project id so src/data/projects.ts stays pure data — the
// prerender script imports that file and must not pull in React components.
export const projectDiagrams: Record<string, ComponentType> = {
  'self-hosted-infrastructure': InfraArchitectureDiagram,
  'speakinsights': SpeakInsightsArchitectureDiagram,
  'navdashboard': NavDashboardArchitectureDiagram,
};
