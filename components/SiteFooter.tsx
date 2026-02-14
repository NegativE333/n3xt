"use client";

export function SiteFooter() {
  return (
    <footer className="mt-32 pt-8 border-t border-neutral-900 flex justify-between text-xs text-neutral-600 font-mono max-w-3xl mx-auto px-6">
      <p>© 2026 NEGATIVE3</p>
      <div className="flex gap-6">
        <a href="#" className="hover:text-white transition-colors">
          GITHUB
        </a>
        <a href="#" className="hover:text-white transition-colors">
          TWITTER
        </a>
      </div>
    </footer>
  );
}

