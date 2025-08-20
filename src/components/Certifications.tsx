import { ExternalLink, Calendar, Award, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { certifications } from '@/data/certifications';

const Certifications = () => {
  return (
    <section id="certifications" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Certifications
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional certifications and achievements that validate my expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={cert.id}
                className="group bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/50"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Award size={24} className="text-primary" />
                  </div>
                  {cert.credentialUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(cert.credentialUrl, '_blank')}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ExternalLink size={16} />
                    </Button>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="font-heading font-semibold text-lg leading-tight">
                    {cert.title}
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building size={14} />
                      <span>{cert.issuer}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar size={14} />
                      <span>{cert.date}</span>
                    </div>
                  </div>

                  {cert.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {cert.description}
                    </p>
                  )}

                  {cert.credentialId && (
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Credential ID:</span> {cert.credentialId}
                      </p>
                    </div>
                  )}
                </div>

                {/* Image placeholder if available */}
                {cert.image && (
                  <div className="mt-4 p-2 border rounded-lg bg-muted/30">
                    <div className="aspect-video bg-muted rounded flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">
                        Certificate Preview
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Timeline View Alternative */}
          <div className="mt-16">
            <h3 className="text-2xl font-heading font-bold text-center mb-8">
              Certification Timeline
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-border"></div>
              
              <div className="space-y-8">
                {certifications.map((cert, index) => (
                  <div key={`timeline-${cert.id}`} className="relative flex items-center">
                    {/* Timeline dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary border-4 border-background rounded-full z-10"></div>
                    
                    {/* Content */}
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 ml-auto'}`}>
                      <div className="bg-card border rounded-lg p-4 shadow-sm">
                        <h4 className="font-heading font-semibold mb-1">{cert.title}</h4>
                        <p className="text-sm text-primary font-medium mb-1">{cert.issuer}</p>
                        <p className="text-xs text-muted-foreground">{cert.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;