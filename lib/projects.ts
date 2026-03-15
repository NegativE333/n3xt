// Central data source for N3xt extensions
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
      "Universal Expansion: Works instantly across the web—from standard inputs to rich text editors like Gmail, Notion, and GitHub.",
      "100% Local & Private: Built on a zero-tracking architecture. Your shortcuts are stored in chrome.storage.local and never leave your browser.",
      "Dynamic Macros: Supercharge your snippets with variables like {{date}}, {{clipboard}}, and {{tab}} for multi-field form filling.",
      "JSON Registry: Full control over your data. Easily export, import, and backup your shortcut configuration via raw JSON.",
      "React/Vue Compatible: Engineered with execCommand events to ensure compatibility with modern web frameworks and undo history.",
      "Zero-Latency UI: A minimal, keyboard-centric interface designed for instant configuration without breaking your flow.",
    ],
    links: {
      github: "https://github.com/NegativE333/alias",
    },
    category: "Productivity",
  },
  {
    name: "TabTunnel",
    description: "Send any browser tab to your phone instantly — no account, no cloud, just a keypress.",
    status: "v1.1",
    href: "https://chrome.google.com/webstore/detail/your-id",
    features: [
      "Instant QR Transfer: Press Cmd+Shift+P on any tab and a scannable QR code appears instantly — point your phone camera and the page opens in seconds.",
      "100% Local & Private: Built on a zero-tracking architecture. No servers, no accounts, no cloud. Your data never leaves your browser.",
      "Selection Mode: Highlight any text on a page — an address, password, or phone number — and TabTunnel generates a QR for that instead of the URL.",
      "Lens-Snap Interface: A precision-engineered popup with a cinematic QR entrance animation — fast, focused, and completely out of your way.",
      "Zero-Friction Shortcut: Fully keyboard-driven. One shortcut opens the popup, your phone camera does the rest — no clicks, no menus, no friction.",
      "Universal Compatibility: Works on any real webpage — Gmail, GitHub, Notion, YouTube, anything with a valid URL. Browser-internal pages are gracefully handled.",
    ],
    links: {
      github: "https://github.com/NegativE333/tabtunnel",
    },
    category: "Productivity",
  },
  {
    name: "Vanish",
    description: "A keyboard-driven tool to instantly remove web distractions, save domain-specific blocklists, and seamlessly extract clean text.",
    status: "v1.0",
    href: "#",
    features: [
      "Instant Element Removal: Press Cmd+Shift+X to instantly target and delete popups, cookie banners, and sticky headers from any webpage.",
      "Persistent Domain Blocking: Elements you remove stay gone. Automatically saves CSS paths to block targets on all future visits to that specific domain.",
      "Data Extraction Mode: Hold Shift to transform the reticle into a scanner, bypassing native browser highlighting to copy clean text directly to your clipboard.",
      "Session History & Undo: Fully forgiving architecture. Use Cmd+Z to restore accidentally removed elements, or press 'C' to instantly clear a domain's entire blocklist.",
      "100% Local & Private: Built on a zero-tracking architecture. Your custom blocklists are stored securely in chrome.storage.local and never leave your browser.",
      "Zero-Friction UI: A lightweight, keyboard-centric overlay that tracks your active mode and blocked elements without disrupting your workflow.",
    ],
    links: {
      github: "https://github.com/NegativE333/vanish",
    },
    category: "Productivity",
  },
  {
    name: "Draft",
    description: "Multi-draft browser scratchpad for fast context juggling.",
    status: "v1.0",
    href: "#",
    features: [
      "Manage multiple contexts instantly with a multi-draft sidebar, inline renaming, and pinned tabs that stay exactly where you left them.",
      "Built on a zero-tracking architecture. Every keystroke auto-saves to chrome.storage.local and never leaves your browser.",
      "Supercharge your scratchpad with inline slash commands. Type /uuid, /date, or /todo to inject data without breaking your flow.",
      "Engineered for developers with an instant JSON pretty-printer, live character stats, and an isolated inline search (Cmd+F) for the active draft.",
      "A minimal, distraction-free editor featuring persistent dark/light modes and word-wrap toggles for complete visual control.",
      "A lightning-fast, keyboard-centric interface designed for speed, with dedicated shortcuts for creating drafts and seamless workspace navigation.",
    ],
    links: {
      github: "https://github.com/NegativE333/draft",
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
      github: "https://github.com/NegativE333/hotstar-imdb-extension",
    },
    category: "Entertainment",
  },
];

