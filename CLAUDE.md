# ELISA PATTI Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-04-14

## Active Technologies

- TypeScript 5.4+ / Node.js 20 LTS + Next.js 15 (App Router), Tailwind CSS v4, Framer Motion 11, Radix UI Primitives (001-design-system)

## Project Structure

```text
src/
├── app/
│   ├── globals.css        ← @theme Tailwind v4 design tokens
│   └── layout.tsx         ← next/font/google + lang="it"
├── components/
│   ├── ui/                ← Button, Card, Input, Textarea, Badge, Avatar, Divider, Skeleton
│   └── shapes/            ← BlobHero, BlobFrame, BlobSection (SVG inline)
└── lib/
    └── fonts.ts
specs/
├── 001-design-system/     ← spec, plan, contracts, data-model, quickstart
└── ...
```

## Commands

npm run dev && npm run build && npm run lint

## Code Style

TypeScript 5.4+ / Node.js 20 LTS: Follow standard conventions

## Recent Changes

- 001-design-system: Added TypeScript 5.4+ / Node.js 20 LTS + Next.js 15 (App Router), Tailwind CSS v4, Framer Motion 11, Radix UI Primitives

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
