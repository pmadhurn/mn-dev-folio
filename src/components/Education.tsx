import { GraduationCap, Calendar, MapPin, Trophy } from 'lucide-react';

const Education = () => {
  return (
    <section id="education" className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Education
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
            
            {/* Education Entry */}
            <div className="relative flex items-start">
              {/* Timeline dot */}
              <div className="absolute left-6 w-4 h-4 bg-primary border-4 border-background rounded-full z-10"></div>
              
              {/* Content */}
              <div className="ml-16 w-full">
                <div className="bg-card border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <GraduationCap size={20} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-heading font-bold text-xl">
                            Bachelor of Technology (B.Tech)
                          </h3>
                          <p className="text-primary font-medium">
                            Computer Science and Engineering
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin size={16} />
                          <span>Indus University, Ahmedabad</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar size={16} />
                          <span>2022 — 2026</span>
                        </div>
                      </div>

                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Trophy size={16} className="text-primary" />
                          <span className="font-medium text-primary">Academic Performance</span>
                        </div>
                        <p className="text-2xl font-heading font-bold text-foreground">
                          8.5/10 GPA
                          <span className="text-sm font-normal text-muted-foreground ml-2">
                            (Average for completed semesters)
                          </span>
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium text-foreground">Key Focus Areas:</h4>
                        <div className="flex flex-wrap gap-2">
                          {[
                            'Full-Stack Development',
                            'Machine Learning & AI',
                            'Data Structures & Algorithms',
                            'Database Management',
                            'Software Engineering',
                            'Mobile Development',
                            'IoT Systems'
                          ].map((area, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Status indicator */}
                    <div className="lg:text-right">
                      <span className="inline-flex px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                        Currently Enrolled
                      </span>
                      <p className="text-sm text-muted-foreground mt-1">
                        Expected Graduation: 2026
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="bg-card border rounded-lg p-6">
              <h4 className="font-heading font-semibold mb-3 flex items-center gap-2">
                <Trophy size={18} className="text-primary" />
                Achievements
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Consistent academic performance with 8.5/10 GPA</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Multiple certifications in ML and cloud computing</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Active participation in coding projects and hackathons</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h4 className="font-heading font-semibold mb-3 flex items-center gap-2">
                <GraduationCap size={18} className="text-primary" />
                Academic Journey
              </h4>
              <div className="text-muted-foreground space-y-2">
                <p className="text-sm">
                  Currently in my final years of Computer Science Engineering at Indus University, 
                  one of Ahmedabad's premier technical institutions.
                </p>
                <p className="text-sm">
                  My academic journey has been focused on building a strong foundation in both 
                  theoretical concepts and practical applications across software development, 
                  AI/ML, and emerging technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;