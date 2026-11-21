import { profile } from '@/data/profile';
import EditorialHeading from './EditorialHeading';
import Media from './Media';
import { FadeIn } from './motion';
import portrait from '@/assets/hero-portrait.webp';

const FACTS = [
  { label: 'Discipline', value: 'Infrastructure & embedded systems' },
  { label: 'Base', value: profile.location },
  { label: 'Education', value: 'B.Tech CSE, Indus University · 2026' },
  { label: 'CGPA', value: profile.education.gpa },
];

/** Company-overview analogue: who this is, in editorial form. */
const Overview = () => (
  <section id="overview" className="section-pad bg-ink" aria-labelledby="overview-heading">
    <div className="shell">
      <EditorialHeading
        id="overview-heading"
        label="01 — Overview"
        lines={['One engineer.', 'A production estate.', 'Real hardware.']}
      />

      <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12">
        <FadeIn className="lg:col-span-5">
          <figure className="media-frame mb-10 aspect-[3/2] max-w-md">
            <img
              src={portrait}
              alt="Portrait of Madhur N Patel"
              width={600}
              height={399}
              loading="lazy"
              decoding="async"
              className="grayscale contrast-[1.05]"
            />
          </figure>
          <dl>
            {FACTS.map((f) => (
              <div key={f.label} className="spec-row">
                <dt className="t-label pt-1 text-steel">{f.label}</dt>
                <dd className="text-bone">{f.value}</dd>
              </div>
            ))}
          </dl>
        </FadeIn>
        <div className="space-y-6 lg:col-span-6 lg:col-start-7">
          {profile.bio.map((p, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <p className={i === 0 ? 't-subtitle text-white' : 't-lede text-steel'}>{p}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>

    <FadeIn className="mt-20 lg:mt-28" y={40}>
      <figure className="shell">
        <Media name="board" sizes="(min-width: 1600px) 1600px, 100vw" className="grade aspect-[21/9] w-full" />
        <figcaption className="t-label mt-4 flex justify-between text-steel">
          <span>Hardware is where the assumptions get tested.</span>
          <span aria-hidden="true">Fig. 01</span>
        </figcaption>
      </figure>
    </FadeIn>
  </section>
);

export default Overview;
