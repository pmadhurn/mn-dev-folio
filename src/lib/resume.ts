// Single source for the resume link. The query string is stamped per build
// (see `define.__BUILD_ID__` in vite.config.ts) so the Cloudflare edge cache
// can never serve a visitor a stale PDF after a deploy. The bare URL still
// works for crawlers and the sitemap — it just may lag a few hours.
export const RESUME_URL = `/Madhur_N_Patel_Resume.pdf?v=${__BUILD_ID__}`;
