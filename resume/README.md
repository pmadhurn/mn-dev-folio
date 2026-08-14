# Résumé

`resume.tex` is the single source of truth for `public/Madhur_N_Patel_Resume.pdf`.
Edit the `.tex`, rebuild, commit both.

## Rebuild

```bash
npm run resume
```

That runs `resume/build.sh`, which compiles with `latexmk` and copies the result to
`public/Madhur_N_Patel_Resume.pdf`. It refuses to produce a PDF longer than one page.

### Installing a TeX toolchain

The site build does **not** need TeX. Only rebuilding the résumé does.

```bash
# Debian / Ubuntu
sudo apt-get install texlive-latex-recommended texlive-fonts-recommended latexmk

# macOS
brew install --cask basictex && sudo tlmgr install latexmk
```

## Why the PDF is committed

Vercel's build image has no TeX distribution, and installing one at deploy time is slow
and fragile. So the PDF is a committed build artifact: deploys stay fast and need no
toolchain, and `npm run check:resume` fails the build if the PDF is older than the source.
That gives the sync guarantee without coupling the site deploy to LaTeX.

```bash
npm run check:resume   # fails if resume.tex is newer than the PDF
```

The check compares commit dates in a clean git tree (checkout does not preserve mtimes)
and falls back to file mtimes when either file has uncommitted changes.

## Editing rules

Content mirrors the site's data files. **Where the résumé and the site disagree, the site
wins** — it is the version that was deliberately cleaned of unverifiable claims.

| Section | Source |
|---|---|
| Header, summary | `src/data/profile.ts` |
| Projects | `src/data/projects.ts` (flagship tier) |
| Experience | `src/data/experience.ts` (bullets verbatim) |
| Skills | `src/data/skills.ts` |
| Certifications | `src/data/certifications.ts` |

**Never reintroduce these strings** — they were removed from the site for cause and a
résumé that contradicts the site is worse than either alone:

`3+ years` · `95%` · `100+ concurrent users` · `zero-downtime` · `Kubernetes` ·
`Freelance` · `Expert`

## One page

Hard requirement; `build.sh` enforces it. If it overflows, cut in this order:

1. The 4th bullet of any project (each carries 2 substance bullets + 1 tech line)
2. The oldest certification
3. The `Systems` skills line

Never shrink below 10pt or margins below 0.5in.

## Links are claims

Only verified URLs belong on the résumé — a recruiter will click them. Before adding
any link, confirm it resolves AND its contents match what the résumé says (2026-08-15:
a 404'd repo and an unrelated repo both had to be pulled from a shipped PDF).
