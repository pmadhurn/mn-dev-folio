#!/usr/bin/env node
/**
 * Fails if resume.tex has changed but the PDF wasn't rebuilt.
 *
 * The PDF is a committed build artifact (Vercel has no TeX toolchain, so it
 * cannot be produced at deploy time). That trade buys fast, simple deploys at
 * the cost of the two files being able to drift — which is exactly the failure
 * this repo just finished cleaning up. This check is what closes that gap.
 *
 * Run: npm run check:resume
 *
 * In CI, mtimes are not preserved by git checkout, so we compare the commits
 * that last touched each file instead. Locally we fall back to mtime.
 */
import { existsSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const TEX = 'resume/resume.tex';
const PDF = 'public/Madhur_N_Patel_Resume.pdf';

const texPath = resolve(repoRoot, TEX);
const pdfPath = resolve(repoRoot, PDF);

const fail = (msg) => {
  console.error(`\nFAIL: ${msg}`);
  console.error(`\n  resume.tex has changed but the PDF wasn't rebuilt; run npm run resume\n`);
  process.exit(1);
};

if (!existsSync(texPath)) {
  console.error(`FAIL: ${TEX} is missing.`);
  process.exit(1);
}
if (!existsSync(pdfPath)) {
  fail(`${PDF} is missing.`);
}

const git = (args) => {
  try {
    return execFileSync('git', args, { cwd: repoRoot, encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
};

const inGitRepo = git(['rev-parse', '--is-inside-work-tree']) === 'true';

// If either file has uncommitted changes, mtime is the only meaningful signal.
const dirty = inGitRepo ? git(['status', '--porcelain', '--', TEX, PDF]) : '';

if (inGitRepo && !dirty) {
  const texCommit = git(['log', '-1', '--format=%ct', '--', TEX]);
  const pdfCommit = git(['log', '-1', '--format=%ct', '--', PDF]);

  if (!texCommit || !pdfCommit) {
    console.log(`ok  ${TEX} / ${PDF}: no commit history yet, skipping staleness check`);
    process.exit(0);
  }
  if (Number(pdfCommit) < Number(texCommit)) {
    fail(`${PDF} was last committed before ${TEX}.`);
  }
  console.log(`ok  ${PDF} is not older than ${TEX} (by commit date)`);
  process.exit(0);
}

// Working-tree comparison.
const texMtime = statSync(texPath).mtimeMs;
const pdfMtime = statSync(pdfPath).mtimeMs;

if (pdfMtime < texMtime) {
  const drift = Math.round((texMtime - pdfMtime) / 1000);
  fail(`${PDF} is ${drift}s older than ${TEX}.`);
}

console.log(`ok  ${PDF} is not older than ${TEX} (by mtime)`);
