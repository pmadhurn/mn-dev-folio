import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { profile } from '@/data/profile';
import Media from './Media';
import { FadeIn, LineReveal } from './motion';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const EMPTY: FormState = { name: '', email: '', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DETAILS = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, copy: profile.email },
  { label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}`, copy: profile.phone.replace(/\s/g, '') },
  { label: 'Location', value: 'Ahmedabad, India', href: null, copy: null },
];

const validate = (f: FormState): string | null => {
  if (!f.name.trim()) return 'Please enter your name.';
  if (!f.email.trim()) return 'Please enter your email.';
  if (!EMAIL_RE.test(f.email.trim())) return 'Please enter a valid email address.';
  if (f.message.trim().length < 10) return 'The message needs at least 10 characters.';
  return null;
};

/**
 * Final call to action plus the contact form. Messages go to POST /api/contact,
 * which logs them server-side and raises a Telegram alert.
 */
const CTASection = () => {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState('');
  const copiedTimer = useRef<ReturnType<typeof setTimeout>>();
  const { toast } = useToast();
  const bannerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: bannerRef, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  useEffect(() => () => clearTimeout(copiedTimer.current), []);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = validate(form);
    if (error) {
      toast({ title: 'Check the form', description: error, variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });
      if (!res.ok) throw new Error(`contact API responded ${res.status}`);
      toast({
        title: 'Message sent',
        description: `Thanks — I'll reply soon. If you don't hear back, email ${profile.email}.`,
      });
      setForm(EMPTY);
    } catch (err) {
      console.error('Contact form failed:', err);
      toast({
        title: 'Message not sent',
        description: `Please try again, or email ${profile.email} directly.`,
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(''), 2000);
    } catch {
      toast({ title: 'Copy failed', description: 'Select and copy it manually.', variant: 'destructive' });
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-ink">
      {/* Banner */}
      <div ref={bannerRef} className="relative isolate flex min-h-[80svh] items-end overflow-hidden">
        <motion.div className="absolute inset-[-10%_0] -z-10" style={reduce ? undefined : { y: imageY }} aria-hidden="true">
          <Media name="tunnel" sizes="100vw" alt="" className="grade-strong h-full w-full" />
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-ink/70" aria-hidden="true" />
        <div className="shell pb-16 pt-32 lg:pb-24">
          <FadeIn y={8}>
            <p className="t-label mb-6 flex items-center gap-3 text-bone">
              <span aria-hidden="true" className="inline-block h-px w-8 bg-current" />
              07 — Contact
            </p>
          </FadeIn>
          <h2 id="contact-heading" className="t-display max-w-[16ch] text-white">
            <LineReveal lines={['Build something', 'that ships.']} inView />
          </h2>
          <FadeIn delay={0.2} className="mt-8 max-w-xl">
            <p className="t-lede text-bone/85">{profile.currentFocus}</p>
          </FadeIn>
        </div>
      </div>

      {/* Details + form */}
      <div className="shell grid gap-16 py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-5">
          <dl>
            {DETAILS.map((d) => (
              <div key={d.label} className="group spec-row items-center sm:grid-cols-[7rem_1fr_auto]">
                <dt className="t-label text-steel">{d.label}</dt>
                <dd className="min-w-0 break-words text-lg text-white">
                  {d.href ? (
                    <a href={d.href} className="inline-flex min-h-[2.75rem] items-center hover:text-bone">
                      {d.value}
                    </a>
                  ) : (
                    <span className="inline-flex min-h-[2.75rem] items-center">{d.value}</span>
                  )}
                </dd>
                {d.copy ? (
                  <button
                    type="button"
                    onClick={() => copy(d.copy!, d.label)}
                    className="flex h-11 w-11 items-center justify-center text-steel transition-colors hover:text-white"
                    aria-label={`Copy ${d.label.toLowerCase()}`}
                  >
                    {copied === d.label ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                  </button>
                ) : (
                  <span className="hidden sm:block" />
                )}
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              GitHub <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="lg:col-span-6 lg:col-start-7" noValidate aria-label="Send a message">
          <p className="t-label mb-8 text-steel">Send a message</p>
          <div className="grid gap-8 md:grid-cols-2">
            <label className="block">
              <span className="t-label text-steel">Name</span>
              <input name="name" value={form.name} onChange={onChange} className="field" autoComplete="name" maxLength={100} required disabled={submitting} />
            </label>
            <label className="block">
              <span className="t-label text-steel">Email</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                className="field"
                autoComplete="email"
                maxLength={254}
                required
                disabled={submitting}
              />
            </label>
          </div>
          <label className="mt-8 block">
            <span className="t-label flex justify-between text-steel">
              <span>Message</span>
              <span aria-live="polite">{form.message.length}/5000</span>
            </span>
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              rows={5}
              className="field resize-y"
              maxLength={5000}
              required
              disabled={submitting}
              placeholder="A role, a project, a system that needs running…"
            />
          </label>
          <button type="submit" className="btn btn-solid mt-10 w-full sm:w-auto" disabled={submitting}>
            {submitting ? 'Sending…' : 'Send message'}
            {!submitting && <ArrowRight size={16} aria-hidden="true" />}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CTASection;
