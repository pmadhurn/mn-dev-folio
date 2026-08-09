/**
 * Build-time content snapshot.
 *
 * This site is a client-rendered SPA, so the HTML shipped to the network was
 * nothing but `<div id="root"></div>`. Search crawlers that execute JavaScript
 * cope with that, but most AI crawlers and link unfurlers (ClaudeBot, GPTBot,
 * PerplexityBot, Slack/WhatsApp previews, plain `curl`) do not — they saw an
 * empty page and had only the <meta> tags to go on.
 *
 * `renderStaticContent()` builds a plain-HTML summary of the portfolio from the
 * same data modules the React components use, and the Vite plugin below injects
 * it inside `#root`. React's `createRoot` clears that container on mount, so
 * browsers get the full app while non-JS clients get real, readable content.
 * The same data also produces /llms.txt.
 */
import type { Plugin } from 'vite';

import { profile } from '../src/data/profile';
import { projects } from '../src/data/projects';
import { experiences } from '../src/data/experience';
import { certifications } from '../src/data/certifications';
import { skillCategories } from '../src/data/skills';

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const list = (items: readonly string[]): string =>
  `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;

const projectLink = (project: (typeof projects)[number]): string => {
  const href = project.links.demo ?? project.links.github ?? project.links.code;
  return href ? ` <a href="${escapeHtml(href)}">${escapeHtml(href)}</a>` : '';
};

export function renderStaticContent(): string {
  const sections: string[] = [];

  sections.push(`
    <header>
      <h1>${escapeHtml(profile.name)}</h1>
      <p><strong>${escapeHtml(profile.headline)}</strong> — ${escapeHtml(profile.location)}</p>
      <p>${escapeHtml(profile.summary)}</p>
      <ul>
        <li>Email: <a href="mailto:${profile.email}">${profile.email}</a></li>
        <li>Phone: <a href="tel:${profile.phone.replace(/\s/g, '')}">${escapeHtml(profile.phone)}</a></li>
        <li>GitHub: <a href="${profile.links.github}" rel="me">${profile.links.github}</a></li>
        <li>LinkedIn: <a href="${profile.links.linkedin}" rel="me">${profile.links.linkedin}</a></li>
        <li>Résumé: <a href="${profile.links.resume}">${profile.links.resume}</a></li>
      </ul>
    </header>`);

  sections.push(`
    <section>
      <h2>About</h2>
      ${profile.bio.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
      <p>${escapeHtml(profile.currentFocus)}</p>
    </section>`);

  sections.push(`
    <section>
      <h2>Skills</h2>
      ${skillCategories
        .map(
          (category) => `<h3>${escapeHtml(category.title)}</h3>${list(
            category.skills.map((skill) =>
              skill.level ? `${skill.name} (${skill.level})` : skill.name
            )
          )}`
        )
        .join('')}
    </section>`);

  sections.push(`
    <section>
      <h2>Projects</h2>
      ${projects
        .map(
          (project) => `
        <article>
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(project.description)}</p>
          <p><strong>Tech:</strong> ${escapeHtml(project.tech.join(', '))}</p>
          ${project.highlights.length ? `<p><strong>Highlights:</strong></p>${list(project.highlights)}` : ''}
          <p><strong>Category:</strong> ${escapeHtml(project.category)}${projectLink(project)}</p>
        </article>`
        )
        .join('')}
    </section>`);

  sections.push(`
    <section>
      <h2>Experience</h2>
      ${experiences
        .map(
          (job) => `
        <article>
          <h3>${escapeHtml(job.role)}${job.company ? ` — ${escapeHtml(job.company)}` : ''}</h3>
          <p>${escapeHtml(job.duration)}</p>
          ${list(job.description)}
          <p><strong>Technologies:</strong> ${escapeHtml(job.technologies.join(', '))}</p>
        </article>`
        )
        .join('')}
    </section>`);

  sections.push(`
    <section>
      <h2>Certifications</h2>
      <ul>
        ${certifications
          .map(
            (cert) =>
              `<li>${escapeHtml(cert.title)} — ${escapeHtml(cert.issuer)}, ${escapeHtml(cert.date)}${
                cert.description ? `. ${escapeHtml(cert.description)}` : ''
              }</li>`
          )
          .join('')}
      </ul>
    </section>`);

  sections.push(`
    <section>
      <h2>Education</h2>
      <p>${escapeHtml(profile.education.degree)}</p>
      <p>${escapeHtml(profile.education.institution)}, ${escapeHtml(profile.education.duration)} — GPA ${escapeHtml(
        profile.education.gpa
      )}</p>
    </section>`);

  sections.push(`
    <section>
      <h2>Contact</h2>
      <p>
        Email <a href="mailto:${profile.email}">${profile.email}</a> or call
        <a href="tel:${profile.phone.replace(/\s/g, '')}">${escapeHtml(profile.phone)}</a>.
      </p>
    </section>`);

  // Visible to every client. It is replaced by the React app on mount rather
  // than hidden, so this is a genuine no-JavaScript fallback and not cloaking.
  return `<div id="static-content" style="max-width:48rem;margin:0 auto;padding:2rem 1rem;line-height:1.6;font-family:system-ui,sans-serif">
${sections.join('\n')}
    </div>`;
}

export function renderLlmsTxt(): string {
  const lines: string[] = [];

  lines.push(`# ${profile.name}`);
  lines.push('');
  lines.push(`> ${profile.summary}`);
  lines.push('');
  lines.push(
    `${profile.name} (also known as ${profile.alternateNames.join(', ')}) is a ${profile.headline} based in ${profile.location}. Personal site: ${profile.siteUrl}`
  );
  lines.push('');

  lines.push('## Contact');
  lines.push(`- Email: ${profile.email}`);
  lines.push(`- Phone: ${profile.phone}`);
  lines.push(`- GitHub: ${profile.links.github}`);
  lines.push(`- LinkedIn: ${profile.links.linkedin}`);
  lines.push(`- X: ${profile.links.x}`);
  lines.push(`- Résumé (PDF): ${profile.siteUrl}${profile.links.resume}`);
  lines.push('');

  lines.push('## About');
  profile.bio.forEach((paragraph) => {
    lines.push(paragraph);
    lines.push('');
  });
  lines.push(profile.currentFocus);
  lines.push('');

  lines.push('## Education');
  lines.push(
    `- ${profile.education.degree}, ${profile.education.institution} (${profile.education.duration}), GPA ${profile.education.gpa}`
  );
  lines.push('');

  lines.push('## Skills');
  skillCategories.forEach((category) => {
    lines.push(`- **${category.title}**: ${category.skills.map((skill) => skill.name).join(', ')}`);
  });
  lines.push('');

  lines.push('## Projects');
  projects.forEach((project) => {
    const href = project.links.demo ?? project.links.github ?? project.links.code;
    lines.push(`### ${project.title}${href ? ` (${href})` : ''}`);
    lines.push(project.description);
    lines.push(`Tech: ${project.tech.join(', ')}`);
    lines.push('');
  });

  lines.push('## Experience');
  experiences.forEach((job) => {
    lines.push(`### ${job.role} — ${job.company} (${job.duration})`);
    job.description.forEach((item) => lines.push(`- ${item}`));
    lines.push(`Technologies: ${job.technologies.join(', ')}`);
    lines.push('');
  });

  lines.push('## Certifications');
  certifications.forEach((cert) => {
    lines.push(`- ${cert.title} — ${cert.issuer}, ${cert.date}`);
  });
  lines.push('');

  return lines.join('\n');
}

/**
 * Injects the snapshot into index.html and emits /llms.txt at build time.
 */
export function prerenderPlugin(): Plugin {
  return {
    name: 'madhur-prerender-content',
    apply: 'build',
    transformIndexHtml(html) {
      const rootDiv = '<div id="root"></div>';
      if (!html.includes(rootDiv)) {
        this.warn('Could not find <div id="root"></div>; skipping prerendered content.');
        return html;
      }
      return html.replace(rootDiv, `<div id="root">${renderStaticContent()}</div>`);
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'llms.txt',
        source: renderLlmsTxt(),
      });
    },
  };
}
