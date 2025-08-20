import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-heading font-bold text-lg">
                MN
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg">Madhur N Patel</h3>
                <p className="text-sm text-muted-foreground">Full-Stack & AI/ML Developer</p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-md">
              Building efficient software and data-driven solutions across web, mobile, and IoT platforms. 
              Always excited to work on innovative projects and collaborate with amazing teams.
            </p>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open('https://github.com/pmadhurn', '_blank')}
              >
                <Github size={18} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open('https://linkedin.com/in/madhur-n', '_blank')}
              >
                <Linkedin size={18} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open('mailto:pmadhurn@gmail.com', '_blank')}
              >
                <Mail size={18} />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>📧 pmadhurn@gmail.com</p>
              <p>📱 +91 9016273812</p>
              <p>📍 Ahmedabad, India</p>
              <p className="text-accent">🚀 Open for opportunities</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <p>© {currentYear} Madhur N Patel. All rights reserved.</p>
            <button
              onClick={scrollToTop}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Back to top ↑
            </button>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart size={14} className="text-red-500 fill-current" />
            <span>using</span>
            <a
              href="https://lovable.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Lovable AI
            </a>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()} • 
            Canonical URL: <span className="text-primary">https://madhur-n.vercel.app</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;