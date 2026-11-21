import type { Project } from '@/data/projects';

export const STATUS_LABEL: Record<Project['status'], string> = {
  public: 'Open source',
  private: 'Available on request',
  'coming-soon': 'In development',
};

export const CATEGORY_LABEL: Record<Project['category'], string> = {
  infrastructure: 'Infrastructure',
  iot: 'Embedded & IoT',
  'ai-ml': 'AI / ML',
  web: 'Web platform',
  mobile: 'Mobile',
  desktop: 'Desktop',
};

export const shortTitle = (p: Project) => p.title.split('—')[0].trim();
export const subTitle = (p: Project) => p.title.split('—')[1]?.trim();
