# N3XT - Premium Browser Extensions

A single-page portfolio website for N3XT, a digital studio building premium browser extensions.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **Fonts**: Inter (sans-serif) & JetBrains Mono (monospace)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Design System

**Cinematic Obsidian**:
- Background: Deep black (#050608) with radial gradients (#1c1e29)
- Accents: Electric Blue (#3E92FF) and Violet (#A364FF)
- Glassmorphism: Translucent cards with backdrop blur
- Typography: High-contrast white text with tight letter-spacing

## Adding New Extensions

Edit the `extensions` array in `app/page.tsx` to add new products:

```typescript
{
  id: 'your-extension',
  name: 'Your Extension',
  description: 'Description here',
  tags: ['Tag1', 'Tag2'],
  featured: false, // Set to true for large featured card
  status: 'available' | 'coming-soon',
  logo: '🎨', // Emoji or icon
}
```

## Build

```bash
npm run build
npm start
```
