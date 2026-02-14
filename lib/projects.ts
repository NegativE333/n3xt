// Central data source for N3XT extensions
// Edit this array to add or update projects shown on the site.

export type Project = {
  name: string;
  description: string;
  status: string;
  href: string;
  icon?: string;
  tags?: string[];
  features?: string[];
  links?: {
    chrome?: string;
    github?: string;
  };
  category?: string;
};

export const projects: Project[] = [
  {
    name: "Alias",
    description: "Privacy-first text expander with keyboard shortcuts.",
    status: "v1.0",
    href: "https://chrome.google.com/webstore/detail/your-id",
    features: [
      "Global shortcuts: Works on most sites and apps (Gmail, Notion, GitHub, etc.).",
      "Trigger keys: Type a shortcut (e.g. /email) then press Space or Enter to expand.",
      "Rich editor support: Uses document.execCommand('insertText') and proper InputEvents so React/Vue apps and undo history still work.",
      "Dynamic macros: {{date}} → current date in YYYY-MM-DD, {{clipboard}} → current text from your clipboard, {{tab}} → jumps to the next input and continues typing (form filler).",
      "Local-only storage: Snippets are saved in chrome.storage.local only.",
      "Lean UI: Minimal, keyboard-friendly popup to add, inspect, and reset shortcuts.",
    ],
    links: {
      chrome: "https://chrome.google.com/webstore/detail/your-id",
      github: "https://github.com/your-repo/alias",
    },
    category: "Productivity",
  },
  {
    name: "Hotstar IMDb Connect",
    description: "IMDb ratings overlay for Hotstar.",
    status: "v1.0",
    href: "https://chrome.google.com/webstore/detail/your-id",
    icon: "/images/hic-3.png",
    tags: ["Streaming", "Data", "Hotstar"],
    features: [
      "Instant Overlays: Automatically injects IMDb ratings directly onto movie and TV show posters in real-time.",
      "Context Aware: Works seamlessly across the Home feed, Search results, and Detail pages.",
      "Smart Filtering: Algorithmic detection skips sports, news, and clips to keep the interface clean.",
      "Zero-Lag Performance: Implements 7-day local caching to minimize API calls and latency.",
      'Free Activation: Built on a "Bring Your Own Key" architecture—simply paste your free OMDb API key to start.',
    ],
    links: {
      chrome: "https://chrome.google.com/webstore/detail/your-id",
      github: "https://github.com/your-repo/signal",
    },
    category: "Entertainment",
  },
];

