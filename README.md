# Bavio Desktop

Production-quality foundation for the Bavio Windows desktop dashboard app.

## Stack

- Electron
- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui-compatible setup
- React Router
- TanStack Query
- Zustand
- Recharts
- TanStack Table
- date-fns
- lucide-react

## Scripts

```bash
npm run dev
npm run build
npm run electron:dev
npm run electron:build
npm run lint
```

## Structure

Renderer code lives in `src/`. Electron main and preload entry points live in `electron/`.

The current app intentionally includes only the clean foundation: routing, placeholder pages, stores, API utilities, design tokens, Tailwind configuration, and the Electron desktop window.
