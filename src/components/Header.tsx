import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Github, Linkedin, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Certifications', id: 'certifications' },
    { label: 'Education', id: 'education' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-heading font-bold text-lg">
              MN
            </div>
            <span className="font-heading font-semibold text-lg hidden sm:block">
              Madhur N Patel
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="nav-link font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center space-x-2"
              onClick={() => window.open('/Madhur_N_Patel_Resume.pdf', '_blank')}
            >
              <FileText size={16} />
              <span>Resume</span>
            </Button>

            <div className="hidden sm:flex items-center space-x-2">
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
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex items-center space-x-4 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 justify-center"
                  onClick={() => window.open('/Madhur_N_Patel_Resume.pdf', '_blank')}
                >
                  <FileText size={16} className="mr-2" />
                  Resume
                </Button>
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
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;