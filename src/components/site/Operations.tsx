import { experiences } from '@/data/experience';
import EditorialHeading from './EditorialHeading';
import SplitSection from './SplitSection';

const DETAIL = [
  { media: 'drive' as const, tone: 'light' as const },
  { media: 'patch' as const, tone: 'dark' as const },
];

/** Experience told as operations: alternating light/dark wide splits. */
const Operations = () => (
  <section id="operations" aria-labelledby="operations-heading">
    <div className="section-pad bg-charcoal pb-16 lg:pb-24">
      <div className="shell">
        <EditorialHeading
          id="operations-heading"
          label="05 — Operations"
          lines={['Run it yourself.', 'Then run it again.']}
          layout="split"
          lede="Deploys, outages, migrations and backups — handled first-hand on systems people actually use, not in a sandbox."
        />
      </div>
    </div>

    {experiences.map((exp, i) => (
      <SplitSection
        key={exp.role}
        media={DETAIL[i % DETAIL.length].media}
        tone={DETAIL[i % DETAIL.length].tone}
        reverse={i % 2 === 1}
        label={`${exp.duration.replace(' - ', ' — ')}${exp.company ? ` · ${exp.company}` : ''}`}
        title={[exp.role]}
      >
        <ul className="space-y-4">
          {exp.description.map((d) => (
            <li key={d} className="t-body flex gap-4 text-muted-foreground">
              <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-current" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
        <p className="t-label mt-8 leading-relaxed text-foreground/80">{exp.technologies.join('  ·  ')}</p>
      </SplitSection>
    ))}
  </section>
);

export default Operations;
