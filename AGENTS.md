# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js (App Router) + TypeScript site styled with Tailwind CSS v4 and shadcn/ui components.

- `app/`: Route entrypoints (`layout.tsx`, `page.tsx`) and global styles (`app/globals.css`).
- `components/`: Page sections and shared React components.
- `components/ui/`: shadcn/ui primitives (Radix UI + Tailwind utilities).
- `hooks/`: Reusable React hooks (prefer importing via `@/hooks/...`).
- `lib/`: Utilities and shared helpers (e.g. `@/lib/utils`).
- `public/`: Static assets served at `/` (images, icons).
- `styles/`: Additional/legacy CSS (use `app/globals.css` unless you have a clear reason).

TypeScript path aliasing is configured as `@/*` → repository root (`tsconfig.json`).

## Build, Test, and Development Commands

Use `pnpm` (a `pnpm-lock.yaml` is present), but `npm` works too.

- `pnpm install`: Install dependencies.
- `pnpm dev`: Run the local dev server (hot reload).
- `pnpm build`: Production build to `.next/`.
- `pnpm start`: Serve the production build.
- `pnpm lint`: Run ESLint (`eslint .`).

Example: `pnpm dev` then open `http://localhost:3000`.

## Coding Style & Naming Conventions

- Indentation: 2 spaces; avoid semicolons (match existing files).
- Quotes: prefer single quotes in TS/TSX where practical.
- File naming: prefer `kebab-case.tsx` for components in `components/` and `components/ui/`.
- React components: `PascalCase` exports; colocate small helpers near the component.
- Use `@/` imports instead of long relative paths.

## Testing Guidelines

No automated test framework is currently configured. For bug fixes and new features, consider adding:
- unit tests (React Testing Library + Vitest/Jest), and/or
- UI checks (Playwright) for critical flows.

If you introduce tests, document how to run them in `package.json` scripts.

## Commit & Pull Request Guidelines

This workspace does not include Git history, so no existing convention can be inferred. Recommended:
- Commits: Conventional Commits (e.g. `feat: add hero CTA`, `fix: handle empty form submit`).
- PRs: include a clear description, link issues/tickets, and add screenshots/GIFs for UI changes.

## Security & Configuration Tips

- Store secrets in `.env.local` (do not commit). Prefix client-exposed vars with `NEXT_PUBLIC_`.
- Treat `public/` assets as world-readable; don’t place sensitive files there.
