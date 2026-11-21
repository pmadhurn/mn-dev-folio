import { skillCategories } from '@/data/skills';
import InfraArchitectureDiagram from '@/components/diagrams/InfraArchitectureDiagram';
import EditorialHeading from './EditorialHeading';
import { FadeIn } from './motion';

const PRINCIPLES = [
  {
    n: 'T-01',
    title: 'Zero-trust ingress',
    body: 'cloudflared dials out to the edge; ordered ingress rules map each hostname to one local port. Nothing listens on the public interface.',
  },
  {
    n: 'T-02',
    title: 'Containers by default',
    body: 'Docker Compose per stack with health checks and named volumes. Host networking only where a shim genuinely needs it.',
  },
  {
    n: 'T-03',
    title: 'Observed and alerted',
    body: 'A 30-second sampler, 24-hour history and two-strike anti-flap alerts to Telegram for load, memory, disk and every service.',
  },
  {
    n: 'T-04',
    title: 'Inference stays local',
    body: 'Ollama on ARM64 for summarisation, embeddings and chat — with routed fallbacks when a model stalls on its first token.',
  },
];

/** Dark technical storytelling: architecture, principles, capability matrix. */
const TechnologySection = () => (
  <section id="technology" className="section-pad relative overflow-hidden bg-ink" aria-labelledby="technology-heading">
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(hsl(var(--white))_1px,transparent_1px)] [background-size:24px_24px]"
      aria-hidden="true"
    />
    <div className="shell relative">
      <EditorialHeading
        id="technology-heading"
        label="04 — Technology"
        lines={['No open ports.', 'One tunnel out.']}
        layout="split"
        lede="The estate behind every live link on this page: one ARM64 instance, Cloudflare at the edge, and no port open to the internet."
      />

      <FadeIn className="mt-16 lg:mt-24" y={40}>
        <figure className="border border-white/10 bg-charcoal p-4 md:p-8">
          <div className="t-label mb-6 flex justify-between text-steel">
            <span>System architecture</span>
            <span>Fig. 02</span>
          </div>
          <div className="[&>div]:border-0 [&>div]:bg-transparent [&>div]:p-0">
            <InfraArchitectureDiagram />
          </div>
        </figure>
      </FadeIn>

      <div className="mt-px grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {PRINCIPLES.map((p, i) => (
          <FadeIn key={p.n} delay={i * 0.08} className="bg-ink p-6 md:p-8">
            <p className="t-label text-steel">{p.n}</p>
            <h3 className="t-subtitle mt-8 text-white">{p.title}</h3>
            <p className="t-body mt-3 text-sm text-steel">{p.body}</p>
          </FadeIn>
        ))}
      </div>

      <div className="mt-24 lg:mt-32">
        <FadeIn>
          <div className="flex items-end justify-between gap-6 border-b border-white/10 pb-6">
            <h3 className="t-title text-white">Capability matrix</h3>
            <p className="t-label hidden text-steel sm:block">
              <span className="text-white">■</span> Core &nbsp; <span className="text-steel">■</span> Working
            </p>
          </div>
        </FadeIn>
        <div className="grid grid-cols-2 gap-x-6 sm:gap-x-10 lg:grid-cols-5">
          {skillCategories.map((cat, i) => (
            <FadeIn key={cat.id} delay={(i % 5) * 0.05} className="border-b border-white/10 py-6">
              <h4 className="t-label mb-4 text-steel">{cat.title}</h4>
              <ul className="space-y-1.5 text-[0.95rem]">
                {cat.skills.map((s) => (
                  <li
                    key={s.name}
                    className={s.highlighted || s.level === 'expert' ? 'text-white' : 'text-steel'}
                  >
                    {s.name}
                  </li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TechnologySection;
