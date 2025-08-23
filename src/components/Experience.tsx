import { Briefcase, CheckCircle } from 'lucide-react';
import { experiences } from '@/data/experience';

const Experience = () => {
  return (
    <section id="experience" className="py-16 lg:py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Professional Experience
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-8 p-6 rounded-lg border bg-card">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg">
                    <Briefcase size={32} className="text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-heading font-semibold">{exp.role}</h3>
                      <p className="text-md text-primary font-medium">{exp.company}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 sm:mt-0">{exp.duration}</p>
                  </div>
                  <ul className="space-y-2 mt-4">
                    {exp.description.map((point, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle size={16} className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
