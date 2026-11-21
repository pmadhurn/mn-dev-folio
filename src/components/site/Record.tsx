import { ArrowUpRight, Download } from 'lucide-react';
import { RESUME_URL } from '@/lib/resume';
import { certifications } from '@/data/certifications';
import { profile } from '@/data/profile';
import EditorialHeading from './EditorialHeading';
import { FadeIn } from './motion';

/** Certificate scans, re-encoded to 800px WebP: id → intrinsic height. */
const CERT_IMAGES: Record<string, number> = {
  'aws-ml-foundations': 626,
  'aws-cloud-foundations': 602,
  'mern-stack-developer': 566,
  'advanced-python': 536,
  'machine-learning-indus': 574,
};

const FOCUS = ['Full-stack development', 'Machine learning & AI', 'Data structures & algorithms', 'Database management', 'Software engineering', 'Mobile development', 'IoT systems'];

/** News-and-insights analogue: a dated record of education and credentials. */
const Record = () => (
  <section id="record" className="surface-light section-pad" aria-labelledby="record-heading">
    <div className="shell">
      <EditorialHeading
        id="record-heading"
        label="06 — Record"
        lines={['The paper trail.']}
        layout="split"
        lede="Degree, credentials and coursework, dated. The work above is the better evidence; this is the formal part."
      />

      <div className="mt-16 grid gap-px bg-border lg:mt-24 lg:grid-cols-3">
        {/* Featured: the degree */}
        <FadeIn className="bg-background lg:col-span-2 lg:row-span-2">
          <article className="flex h-full flex-col justify-between gap-12 p-6 md:p-10">
            <div>
              <p className="t-label flex gap-4 text-muted-foreground">
                <span>Education</span>
                <time>{profile.education.duration.replace(' — ', '–')}</time>
              </p>
              <h3 className="t-title mt-6 max-w-2xl">{profile.education.degree}</h3>
              <p className="t-subtitle mt-3 text-muted-foreground">{profile.education.institution}</p>
            </div>
            <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-end">
              <div>
                <p className="font-heading text-[clamp(4.5rem,10vw,8.5rem)] font-semibold leading-none tracking-[-0.05em]">8.4</p>
                <p className="t-label mt-3 text-muted-foreground">CGPA out of 10 · Class of 2026</p>
              </div>
              <ul className="flex flex-wrap gap-2 md:justify-end" aria-label="Focus areas">
                {FOCUS.map((f) => (
                  <li key={f} className="t-label border border-border px-3 py-2 text-muted-foreground">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </FadeIn>

        {certifications.map((c, i) => {
          const h = CERT_IMAGES[c.id];
          return (
            <FadeIn key={c.id} delay={(i % 3) * 0.06} className="bg-background">
              <article className="group flex h-full flex-col">
                {h ? (
                  <div className="media-frame aspect-[16/10] bg-secondary">
                    <img
                      src={`/media/cert-${c.id}.webp`}
                      alt={`Certificate: ${c.title}`}
                      width={800}
                      height={h}
                      loading="lazy"
                      decoding="async"
                      className="object-top grayscale"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[16/10] items-end bg-secondary p-6">
                    <span className="t-label text-muted-foreground">No scan on file</span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <p className="t-label flex flex-wrap gap-x-4 gap-y-1 text-muted-foreground">
                    <span>Certification</span>
                    <time>{c.date}</time>
                  </p>
                  <h3 className="t-subtitle mt-4">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.issuer}</p>
                  {c.credentialId && (
                    <p className="t-label mt-auto break-all pt-6 text-muted-foreground/80">ID {c.credentialId}</p>
                  )}
                  {c.credentialUrl && (
                    <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer" className="link-arrow mt-4">
                      <span className="link-arrow-text">Verify</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
            </FadeIn>
          );
        })}

        {/* Closes the grid's last row; the résumé carries the full detail. */}
        <FadeIn className="bg-foreground text-background lg:col-span-2">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full min-h-[14rem] flex-col justify-between gap-8 p-6 md:p-10"
          >
            <p className="t-label opacity-70">Résumé · PDF</p>
            <span className="flex items-end justify-between gap-6">
              <span className="t-title max-w-md">Everything above, on one page.</span>
              <Download size={28} strokeWidth={1.25} className="shrink-0 transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true" />
            </span>
          </a>
        </FadeIn>
      </div>
    </div>
  </section>
);

export default Record;
