# Marcin Jankiewicz Portfolio

Premium bilingual personal portfolio built with Next.js App Router, Tailwind CSS, and Framer Motion.

## Requirements

- Node.js 20+
- npm 10+

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

If port `3000` is busy:

```bash
npm run dev -- -p 3001
```

## Production build

```bash
npm run build
npm run start
```

## Environment variables

Create a local `.env.local` file if you want to override the public site URL:

```bash
cp .env.example .env.local
```

Available variable:

- `NEXT_PUBLIC_SITE_URL`
  Use your final production domain, for example `https://marcinjankiewicz.com`.
  This is used for canonical metadata and social sharing URLs.

On Vercel, metadata will also fall back to Vercel deployment URLs automatically if this variable is not set.

## Deploy to Vercel

### Option 1: Vercel dashboard

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import the project into [Vercel](https://vercel.com/new).
3. Set the framework preset to `Next.js` if Vercel does not detect it automatically.
4. Add `NEXT_PUBLIC_SITE_URL` in Project Settings once your production domain is known.
5. Deploy.

### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel
vercel --prod
```

## Project notes

- The site is fully bilingual (`EN / PL`) with instant client-side switching.
- Static assets are referenced with production-safe root-relative paths from `public/`.
- Open Graph metadata is generated at build/runtime through `app/opengraph-image.tsx`.
- The site is ready for Vercel without additional code changes.

## Scripts

- `npm run dev` - start local development server
- `npm run build` - create production build
- `npm run start` - start production server
- `npm run lint` - run lint script if configured
