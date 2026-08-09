import { GraduationCap, MapPin, Server, Award } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { profile } from '@/data/profile';

const About = () => {
  const stats = [
    { icon: GraduationCap, label: 'B.Tech CSE', value: 'Graduate' },
    { icon: Award, label: 'GPA', value: '8.5/10' },
    { icon: MapPin, label: 'Location', value: 'Ahmedabad, India' },
    { icon: Server, label: 'Focus', value: 'Infrastructure & Embedded' },
  ];

  return (
    <section id="about" className="py-16 lg:py-24" aria-label="About Madhur N Patel">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <header className="text-center mb-12">
              <span className="section-eyebrow mb-4">Who I Am</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                About Me
              </h2>
              <div className="h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-primary via-primary-glow to-accent" aria-hidden="true"></div>
            </header>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Bio */}
            <article className="lg:col-span-2 space-y-6">
              {/* Prose lives in src/data/profile.ts so this section, the static
                  prerender snapshot and llms.txt cannot drift apart. */}
              <div className="text-lg leading-relaxed text-muted-foreground space-y-4">
                {profile.bio.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <aside className="border-l-4 border-primary pl-6 bg-primary/5 py-4 rounded-r-lg" role="complementary">
                <h3 className="text-primary font-medium mb-2">Current Focus</h3>
                <p className="text-muted-foreground">
                  {profile.currentFocus}
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