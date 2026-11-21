import { ArrowRight } from 'lucide-react';
import EditorialHeading from './EditorialHeading';
import Media from './Media';
import { FadeIn } from './motion';
import { DISCIPLINES } from './disciplines';
import { scrollToId, useSite } from './SiteContext';

/** "Main divisions": three large image cards, one per discipline. */
const Divisions = () => {
  const { setCategory } = useSite();

  return (
    <section id="disciplines" className="section-pad bg-charcoal" aria-labelledby="disciplines-heading">
      <div className="shell">
        <EditorialHeading
          id="disciplines-heading"
          label="02 — Disciplines"
          lines={['Three disciplines,', 'one stack.']}
          layout="split"
          lede="Each layer is built to be run, not just demonstrated: the infrastructure hosts the applications, the applications talk to the hardware."
        />

        <div className="mt-16 grid gap-px bg-white/10 lg:mt-24 lg:grid-cols-3">
          {DISCIPLINES.map((d, i) => (
            <FadeIn key={d.id} delay={i * 0.1} className="bg-charcoal">
              <article className="group flex h-full flex-col">
                <div className="relative">
                  <Media
                    name={d.media}
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="grade aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-[4/5]"
                  />
                  <div className="absolute inset-0 scrim-bottom" aria-hidden="true" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <p className="t-label mb-3 text-steel">{d.index}</p>
                    <h3 className="t-title text-white">{d.title}</h3>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <p className="t-body text-steel">{d.description}</p>
                  <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2" aria-label={`${d.title} capabilities`}>
                    {d.capabilities.map((c) => (
                      <li key={c} className="t-label text-bone/80">
                        {c}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="link-arrow mt-auto self-start pt-8"
                    onClick={() => {
                      setCategory(d.category);
                      scrollToId('index');
                    }}
                  >
                    <span className="link-arrow-text">View {d.title.toLowerCase()} work</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Divisions;
