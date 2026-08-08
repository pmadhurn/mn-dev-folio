import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Menu, X, Github, Linkedin, FileText, MessageCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
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

  const toggleTheme = (event: React.MouseEvent) => {
    const newTheme = !isDark;

    // Dispatch start event
    window.dispatchEvent(new CustomEvent('theme-transition-start'));

    if (!document.startViewTransition) {
      setIsDark(newTheme);
      document.documentElement.classList.toggle('dark', newTheme);
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      // Dispatch end event after a short delay
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('theme-transition-end'));
      }, 100);
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      setIsDark(newTheme);
      document.documentElement.classList.toggle('dark', newTheme);
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    transition.ready.then(() => {
      // Reduced motion: skip the circular wipe and let the view transition's
      // default short opacity cross-fade play instead.
      if (prefersReducedMotion) return;

      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 1000,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });

    // Dispatch end event when the transition is finished
    transition.finished.then(() => {
      window.dispatchEvent(new CustomEvent('theme-transition-end'));
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  type NavItem = {
    label: string;
    id: string;
    /** When set, the item is a route link instead of an in-page scroll target. */
    href?: string;
    icon?: LucideIcon;
  };

  const navItems: NavItem[] = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Certifications', id: 'certifications' },
    { label: 'Education', id: 'education' },
    { label: 'Chat', id: 'chat', href: '/chat', icon: MessageCircle },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b" role="banner">
      <nav className="container mx-auto px-4 py-4" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => scrollToSection('hero')}
              className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-heading font-bold text-lg"
              aria-label="Madhur N Patel - Go to top"
            >
              MN
            </button>
            <button 
              onClick={() => scrollToSection('hero')}
              className="font-heading font-semibold text-lg hidden sm:block hover:text-primary transition-colors"
              aria-label="Madhur N Patel - Go to top"
            >
              Madhur N Patel
            </button>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8" role="menubar">
            {navItems.map((item) => (
              <li key={item.id} role="none">
                {item.href ? (
                  <Link
                    to={item.href}
                    className="nav-link font-medium flex items-center gap-1.5"
                    role="menuitem"
                    aria-label={`Go to ${item.label} page`}
                  >
                    {item.icon && <item.icon size={16} aria-hidden="true" />}
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="nav-link font-medium"
                    role="menuitem"
                    aria-label={`Navigate to ${item.label} section`}
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center space-x-2"
              onClick={() => window.open('/Madhur_N_Patel_Resume.pdf', '_blank', 'noopener,noreferrer')}
              aria-label="Download Madhur N Patel's resume"
            >
              <FileText size={16} aria-hidden="true" />
              <span>Resume</span>
            </Button>

            <div className="hidden sm:flex items-center space-x-2" role="group" aria-label="Social media links">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open('https://github.com/pmadhurn', '_blank', 'noopener,noreferrer')}
                aria-label="Visit Madhur's GitHub profile"
              >
                <Github size={18} aria-hidden="true" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open('https://linkedin.com/in/madhur-n', '_blank', 'noopener,noreferrer')}
                aria-label="Visit Madhur's LinkedIn profile"
              >
                <Linkedin size={18} aria-hidden="true" />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => toggleTheme(e)}
              className="p-2 theme-toggle-button"
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            >
              <div className="relative h-5 w-5">
                <Sun size={18} className="absolute transition-transform duration-300 transform dark:rotate-90 dark:scale-0" />
                <Moon size={18} className="absolute transition-transform duration-300 transform rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
              </div>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
              aria-label={`${isMobileMenuOpen ? 'Close' : 'Open'} mobile menu`}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t" role="menu" aria-label="Mobile navigation menu">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) =>
                item.href ? (
                  <Link
                    key={item.id}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 py-2 text-muted-foreground hover:text-foreground transition-colors"
                    role="menuitem"
                    aria-label={`Go to ${item.label} page`}
                  >
                    {item.icon && <item.icon size={16} aria-hidden="true" />}
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left py-2 text-muted-foreground hover:text-foreground transition-colors"
                    role="menuitem"
                    aria-label={`Navigate to ${item.label} section`}
                  >
                    {item.label}
                  </button>
                )
              )}
              <div className="flex items-center space-x-4 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 justify-center"
                  onClick={() => window.open('/Madhur_N_Patel_Resume.pdf', '_blank', 'noopener,noreferrer')}
                  aria-label="Download Madhur N Patel's resume"
                >
                  <FileText size={16} className="mr-2" aria-hidden="true" />
                  Resume
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open('https://github.com/pmadhurn', '_blank', 'noopener,noreferrer')}
                  aria-label="Visit Madhur's GitHub profile"
                >
                  <Github size={18} aria-hidden="true" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open('https://linkedin.com/in/madhur-n', '_blank', 'noopener,noreferrer')}
                  aria-label="Visit Madhur's LinkedIn profile"
                >
                  <Linkedin size={18} aria-hidden="true" />
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