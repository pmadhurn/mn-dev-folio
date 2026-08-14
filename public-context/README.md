# public-context

**Everything in this directory is world-readable.**

The public chatbot on madhur.dev loads these files into its system prompt. Any visitor can
ask a question phrased to make the model quote them back verbatim. Treat every byte here
as if it were published on the homepage, because effectively it is.

## Do not put here

- Credentials, API keys, tokens, `.env` values
- Server hostnames, internal IPs, tunnel IDs, container names not already public
- Personal notes, journal entries, health or family information
- Draft job applications, salary figures, or correspondence
- Anything about a third party who has not agreed to be written about publicly

## Rules

1. **The Hermes agent must never target this directory.** Its write target is the private
   notes vault in the home directory. This directory is edited by hand, deliberately.
2. **Only allowlisted files are loaded.** `PUBLIC_CONTEXT_ALLOWLIST` in `server.py` names
   them explicitly. Dropping a file in here does nothing until it is added to that list —
   that is intentional. Adding a name to the list is the moment the content goes public.
3. **This README is not in the allowlist** and is not served to the model.
4. Content should mirror what is already on the site (`src/data/*.ts`). If the two
   disagree, the site wins.

## Why the allowlist exists

The chatbot used to read every markdown file in the owner's private notes vault — a
directory an automated agent writes task notes into. A glob over a directory with an
automated writer is an open-ended disclosure channel: whatever lands there tomorrow is
public tomorrow. The allowlist replaces "everything in a directory" with "these five
files", so publishing is always an explicit act.

Run `npm run check:context` to verify the boundary still holds.
