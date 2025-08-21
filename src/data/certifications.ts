export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
  description?: string;
}

export const certifications: Certification[] = [
  {
    id: 'aws-ml-foundations',
    title: 'AWS Academy Graduate — Machine Learning Foundations',
    issuer: 'AWS Academy',
    date: 'August 2025',
    image: '/certifications/ML.png',
    credentialId:'6b602f1f-9637-4602-992e-db26b21abfb8',
    description: 'Comprehensive foundation in machine learning concepts and AWS ML services.'
  },
  {
    id: 'aws-cloud-foundations',
    title: 'AWS Academy Graduate — Cloud Foundations',
    issuer: 'AWS Academy',
    date: 'July 2025',
    image: '/certifications/CF.png',
    credentialId: '792da9d1-37e9-466b-8c39-8a228d3920ee',
    description: 'Fundamental understanding of AWS cloud computing services and architecture.'
  },
  {
    id: 'mern-stack-developer',
    title: 'MERN Stack Developer',
    issuer: 'Coding Cloud',
    date: 'March 2025',
    description: 'Full-stack web development using MongoDB, Express.js, React.js, and Node.js.'
  },
  {
    id: 'machine-learning-indus',
    title: 'Machine Learning',
    issuer: 'Indus University Ahmedabad',
    date: 'December 2023',
    image: '/certifications/indus-ml-certificate.jpg',
    description: 'Advanced machine learning algorithms and practical implementation.'
  },
  {
    id: 'advanced-python',
    title: 'Advanced Python',
    issuer: 'C-TAG Coding',
    date: 'Completed',
    image: '/certifications/advanced-python.jpg',
    description: 'Advanced Python programming concepts and frameworks.'
  }
];