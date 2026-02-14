import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'obsidian': {
          'dark': '#050608',
          'medium': '#1c1e29',
        },
        'electric-blue': '#3E92FF',
        'violet': '#A364FF',
      },
      fontFamily: {
        'sans': ['var(--font-inter)', 'sans-serif'],
        'mono': ['var(--font-jetbrains-mono)', 'monospace'],
      },
      letterSpacing: {
        'tight': '-0.02em',
      },
    },
  },
  plugins: [],
}
export default config
