import type { MediaKey } from '@/data/media';
import type { Project } from '@/data/projects';

export interface Discipline {
  id: string;
  index: string;
  title: string;
  short: string;
  description: string;
  media: MediaKey;
  /** Project-index filter the "View work" link applies. */
  category: Project['category'];
  capabilities: string[];
}

export const DISCIPLINES: Discipline[] = [
  {
    id: 'infrastructure',
    index: '01',
    title: 'Infrastructure',
    short: 'Self-managed Linux, containers, zero-trust ingress',
    description:
      'A production estate run end to end: 40+ containers behind one outbound-only tunnel, monitored, alerted and backed up nightly.',
    media: 'switch',
    category: 'infrastructure',
    capabilities: ['Docker / Compose', 'Cloudflare Tunnel', 'Nginx', 'systemd', 'Oracle Cloud ARM64', 'Backups & alerting'],
  },
  {
    id: 'embedded',
    index: '02',
    title: 'Embedded Systems',
    short: 'Raspberry Pi, ESP32, sensor fusion, computer vision',
    description:
      'Software that has to agree with physics: GPS bearing, IMU and magnetometer fusion, PID-driven gimbals and camera tracking.',
    media: 'workbench',
    category: 'iot',
    capabilities: ['Raspberry Pi', 'ESP32 / Arduino', 'Serial · I²C', 'OpenCV', 'PID control', 'Sensor fusion'],
  },
  {
    id: 'applications',
    index: '03',
    title: 'Applications',
    short: 'FastAPI, React, PostgreSQL, local AI inference',
    description:
      'The services that run on the estate — meeting intelligence, an AI tutor, an operations platform — built, deployed and kept alive.',
    media: 'laptop',
    category: 'web',
    capabilities: ['Python / FastAPI', 'React / TypeScript', 'PostgreSQL · pgvector', 'Redis', 'Ollama', 'SSE / WebRTC'],
  },
];
