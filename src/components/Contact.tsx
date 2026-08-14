import { useState, useRef, useEffect, ChangeEvent, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, Copy, Check, Github, Linkedin } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Reveal from '@/components/Reveal';

// Type definitions
interface FormData {
  name: string;
  email: string;
  message: string;
}

interface ContactInfo {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string | null;
  copyValue: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<string>('');
  const copiedTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const { toast } = useToast();

  useEffect(() => () => clearTimeout(copiedTimeoutRef.current), []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // REPLACE THIS WITH YOUR GOOGLE SCRIPT URL from the setup guide
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwk8SpivFAYSHPqtEG3b0MPS3poIllk_TYzl_vHAI6A0CYKnApJf6faxylYB4L5uUU/exec";

  // Email validation helper
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Form validation
  const validateForm = (): string | null => {
    if (!formData.name.trim()) {
      return "Please enter your name";
    }
    if (!formData.email.trim()) {
      return "Please enter your email";
    }
    if (!isValidEmail(formData.email)) {
      return "Please enter a valid email address";
    }
    if (!formData.message.trim()) {
      return "Please enter a message";
    }
    if (formData.message.trim().length < 10) {
      return "Message must be at least 10 characters long";
    }
    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      toast({
        title: "Validation Error",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    if (!GOOGLE_SCRIPT_URL || (GOOGLE_SCRIPT_URL as string).startsWith("YOUR_")) {
      console.warn("Please configure the Google Script URL in src/components/Contact.tsx");
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Configuration Required",
        description: "Please set up the Google Sheet integration as described in GOOGLE_SHEETS_SETUP.md",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const name = formData.name.trim();
      const email = formData.email.trim();
      const message = formData.message.trim();

      // Create URLSearchParams to send to Google Apps Script
      const params = new URLSearchParams();
      params.append('name', name);
      params.append('email', email);
      params.append('message', message);

      // Two deliveries in parallel:
      //  1. /api/contact — the backend logs the message and pushes a Telegram
      //     alert. Its response is readable, so this is the delivery we can
      //     actually verify and the one the toast reports on.
      //  2. The original Google Apps Script (kept as-is). no-cors makes its
      //     response opaque — best-effort only, never trusted for the toast.
      const [apiResult] = await Promise.allSettled([
        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message }),
        }),
        fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          body: params,
          mode: 'no-cors'
        }),
      ]);

      const delivered = apiResult.status === 'fulfilled' && apiResult.value.ok;
      if (!delivered) {
        throw new Error(
          apiResult.status === 'fulfilled'
            ? `contact API responded ${apiResult.value.status}`
            : String(apiResult.reason)
        );
      }

      toast({
        title: "Message sent!",
        description: "Thank you! I'll get back to you as soon as possible. If you don't hear back, email me directly at pmadhurn@gmail.com.",
      });

      setFormData({ name: '', email: '', message: '' });

    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error sending message",
        description: "Please try again or contact me directly via email at pmadhurn@gmail.com.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast({
        title: "Copied to clipboard!",
        description: `${field} has been copied to your clipboard.`,
      });
      clearTimeout(copiedTimeoutRef.current);
      copiedTimeoutRef.current = setTimeout(() => setCopiedField(''), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please select and copy manually.",
        variant: "destructive",
      });
    }
  };

  const contactInfo: ContactInfo[] = [
    {
      icon: Mail,
      label: 'Email',
      value: 'pmadhurn@gmail.com',
      href: 'mailto:pmadhurn@gmail.com',
      copyValue: 'pmadhurn@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9016273812',
      href: 'tel:+919016273812',
      copyValue: '+919016273812'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Ahmedabad, India',
      href: null,
      copyValue: 'Ahmedabad, India'
    }
  ];

  return (
    <section id="contact" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <span className="section-eyebrow mb-4">Get In Touch</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Let's Work Together
              </h2>
              <div className="h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-primary via-primary-glow to-accent mb-6"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                I'm always open to discussing new opportunities, innovative projects, and exciting collaborations.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-heading font-semibold mb-6">Get in Touch</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  I'm currently seeking internship opportunities in software development, 
                  full-stack engineering, and machine learning. Whether you have a project 
                  in mind or just want to chat about technology, I'd love to hear from you!
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div 
                      key={index} 
                      className="flex items-center gap-4 p-4 bg-card border rounded-lg group hover:border-primary/50 transition-colors"
                    >
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <IconComponent size={20} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{info.label}</p>
                        {info.href ? (
                          <a 
                            href={info.href}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{info.value}</p>
                        )}
                      </div>
                      {info.copyValue && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(info.copyValue, info.label)}
                          className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 transition-opacity"
                          aria-label={`Copy ${info.label}`}
                        >
                          {copiedField === info.label ? (
                            <Check size={16} className="text-green-500" />
                          ) : (
                            <Copy size={16} />
                          )}
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-medium mb-4">Connect with me</h4>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => window.open('https://github.com/pmadhurn', '_blank', 'noopener,noreferrer')}
                    className="flex items-center gap-2"
                  >
                    <Github size={18} />
                    GitHub
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open('https://linkedin.com/in/madhur-n', '_blank', 'noopener,noreferrer')}
                    className="flex items-center gap-2"
                  >
                    <Linkedin size={18} />
                    LinkedIn
                  </Button>
                </div>
              </div>

              {/* CTA Box */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <h4 className="font-heading font-semibold text-primary mb-2">
                  Ready to collaborate?
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Open to SDE, Full-Stack, and ML/AI internships and projects.
                </p>
                <Button
                  onClick={() => window.open('mailto:pmadhurn@gmail.com?subject=Collaboration Opportunity', '_blank')}
                  className="w-full"
                >
                  Start a Conversation
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border rounded-lg p-8">
              <h3 className="text-2xl font-heading font-semibold mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                      disabled={isSubmitting}
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                      disabled={isSubmitting}
                      maxLength={254}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project or opportunity..."
                    rows={5}
                    required
                    disabled={isSubmitting}
                    maxLength={5000}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.message.length}/5000 characters
                  </p>
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
