# figma-make-app

React + Vite + Tailwind CSS project running inside Figma Make.

## Development Server

A Vite development server is **already running** on `$PORT` (default 8443). You don't need to start it manually.

- Preview URL: The user can access the running app through the preview panel
- Hot reload: Changes to source files are reflected immediately

## Project Structure

The source lives under `src/`, organised **feature-first** with co-location. Navigate by feature, not by file type. Use the `@/` alias (mapped in `tsconfig.json`) to import from `src/`. Prefer barrel `index.ts` exports where folders group several modules.

- `src/main.tsx` - React entrypoint; imports `src/styles/index.css` and mounts `src/app/App.tsx` into the `#root` element
- `src/app/App.tsx` - Application shell: routing `ind:…`/`carte`/stub/portail, layout (Header, Sidebar, Footer), and session wiring. Usual starting point for top-level structure.
- `src/app/hooks/useSession.ts` - session state (selected captages, session indicators) + handlers
- `src/config/views.ts` - navigation model (`VIEWS`, `GROUPS`, `VIEW_ICONS`, `buildIndicatorGroup`)
- `src/types/domain.ts` - shared domain types (`View`, `Capteur`, `Indicateur`, `IAMode`)
- `src/data/hydroscope.ts` - mock/session data (`CAPTAGES`, `CAPTAGE_POINTS`, `CATALOGUE`, `catalogueById`)
- `src/components/` - reusable UI (`ui/`), `charts/`, and `layout/` (Header, Sidebar, Footer)
- `src/features/` - feature slices: `carte/`, `indicateurs/`, `portail/`, `stubs/`
- `src/styles/` - CSS entrypoints (`index.css` wiring `fonts.css`, `tailwind.css`, `theme.css`)
- `index.html` - Vite HTML shell containing the `#root` element and loading `src/main.tsx`
- `package.json` - Project dependencies and the Vite build, development, preview, and formatting scripts
- `vite.config.ts` - Vite configuration with React, Tailwind CSS v4, and Figma Make plugins plus the `@` alias for `src`
- `.mise.toml` - Toolchain versions for Node.js and pnpm

## Dependencies

- Runtime: React 19 and React DOM 19
- Styling: Tailwind CSS v4 with the `@tailwindcss/vite` plugin
- Build tooling: Vite 8, TypeScript 5.7, and `@vitejs/plugin-react`
- Formatting: oxfmt

## Styling

This project uses **Tailwind CSS v4** through the `@tailwindcss/vite` plugin configured in `vite.config.ts`. `src/styles/tailwind.css` imports Tailwind with `@import 'tailwindcss' source(none);` and `@source '../**/*.{js,ts,jsx,tsx}'`. Use Tailwind utility classes directly in JSX. Global CSS, theme customization and font wiring belong in `src/styles/` (`index.css` aggregates `fonts.css`, `tailwind.css`, `theme.css`). This scaffold does not need a Tailwind config file or PostCSS config.

## Code quality

- Use double quotes for strings containing apostrophes (`"We're here to help"`), or escape them in single-quoted strings. An unescaped apostrophe in a single-quoted string breaks the build.
- Ensure JSX tags are closed and braces are balanced.
- Export components as **named** exports (barrel `index.ts` re-exports them). Prefer typed `interface` Props and custom hooks (`use`-prefixed) for logic over heavy `.tsx` files.