import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Copy, Check, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState('');
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // REPLACE THIS WITH YOUR GOOGLE SCRIPT URL from the setup guide
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/library/d/1qewvDwbNMAN_HBFuer6yXElEyPa-OeePP9D_-9TMRaB-yOsLtxGGVqMl/1";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (GOOGLE_SCRIPT_URL === "YOUR_GOOGLE_SCRIPT_URL_HERE") {
        console.warn("Please configure the Google Script URL in src/components/Contact.tsx");
        // Fallback for demo if not configured
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
      // Create FormData to send to Google Apps Script
      const formBody = new FormData();
      formBody.append('name', formData.name);
      formBody.append('email', formData.email);
      formBody.append('message', formData.message);

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formBody,
        // mode: 'no-cors' is often needed for Google Apps Script simple triggers to avoid CORS errors on the client side,
        // though it means we can't read the response status directly.
        // However, if the script is deployed correctly as 'Anyone', it usually accepts the request.
        mode: 'no-cors'
      });

      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you as soon as possible.",
      });
      
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error sending message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast({
        title: "Copied to clipboard!",
        description: `${field} has been copied to your clipboard.`,
      });
      setTimeout(() => setCopiedField(''), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please select and copy manually.",
        variant: "destructive",
      });
    }
  };

  const contactInfo = [
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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Let's Work Together
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, innovative projects, and exciting collaborations.
            </p>
          </div>

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
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-card border rounded-lg group hover:border-primary/50 transition-colors">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <info.icon size={20} className="text-primary" />
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
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {copiedField === info.label ? (
                          <Check size={16} className="text-green-500" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-medium mb-4">Connect with me</h4>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => window.open('https://github.com/pmadhurn', '_blank')}
                    className="flex items-center gap-2"
                  >
                    <Github size={18} />
                    GitHub
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open('https://linkedin.com/in/madhur-n', '_blank')}
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
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project or opportunity..."
                    rows={5}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
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
