import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: GraduationCap, label: 'B.Tech CSE', value: '2022-2026' },
    { icon: Award, label: 'GPA', value: '8.5/10' },
    { icon: MapPin, label: 'Location', value: 'Ahmedabad, India' },
    { icon: Calendar, label: 'Experience', value: '3+ Years Coding' },
  ];

  return (
    <section id="about" className="py-16 lg:py-24" aria-label="About Madhur N Patel">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              About Me
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" aria-hidden="true"></div>
          </header>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Bio */}
            <article className="lg:col-span-2 space-y-6">
              <div className="text-lg leading-relaxed text-muted-foreground">
                <p className="mb-4">
                  I am a dedicated professional who loves finding better ways to work. 
                  I have a strong record of improving processes, meeting goals, and working 
                  well in teams. I enjoy solving problems and making a positive impact 
                  wherever I go.
                </p>
                <p>
                  Currently pursuing <strong>B.Tech in Computer Science and Engineering</strong> at 
                  Indus University, I specialize in <strong>full-stack development</strong>, <strong>AI/ML 
                  solutions</strong>, and <strong>IoT systems</strong>. My passion lies in creating efficient, 
                  scalable solutions that bridge the gap between complex technology 
                  and user-friendly experiences.
                </p>
              </div>

              <aside className="border-l-4 border-primary pl-6 bg-primary/5 py-4 rounded-r-lg" role="complementary">
                <h3 className="text-primary font-medium mb-2">Current Focus</h3>
                <p className="text-muted-foreground">
                  I'm looking forward to connecting with others and growing together 
                  through internships and collaborative projects in software development, 
                  full-stack engineering, and machine learning.
                </p>
              </aside>
            </article>

            {/* Quick Stats */}
            <aside className="space-y-4" aria-label="Quick statistics about Madhur">
              <h3 className="sr-only">Personal Statistics</h3>
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 rounded-lg bg-card border" role="group" aria-label={`${stat.label}: ${stat.value}`}>
                  <div className="p-2 bg-primary/10 rounded-lg" aria-hidden="true">
                    <stat.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;