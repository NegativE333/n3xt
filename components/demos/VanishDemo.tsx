"use client";

import React, { useState, useEffect, useRef } from "react";
import { Command, X } from "lucide-react";

// Precise reticle boxes — exactly 6px padding around each target.
const RETICLE = {
  cookie: { top: 432, left: -6, width: 472, height: 72  },
  popup:  { top: 84,  left: 94, width: 272, height: 232 },
  text:   { top: 216, left: 14, width: 428, height: 50  },
} as const;

type ReticleKey = keyof typeof RETICLE;

type Phase =
  | "idle"
  | "hover_cookie"
  | "destroy_cookie"
  | "hover_popup"
  | "destroy_popup"
  | "extract_hover"
  | "extract_copy"
  | "undo"
  | "done";

export default function VanishDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const [phase, setPhase] = useState<Phase>("idle");
  const [isVanishMode, setIsVanishMode]       = useState(false);
  const [isExtractMode, setIsExtractMode]     = useState(false);
  const [cookieDestroyed, setCookieDestroyed] = useState(false);
  const [popupDestroyed, setPopupDestroyed]   = useState(false);
  const [blockedCount, setBlockedCount]       = useState(0);
  const [reticleKey, setReticleKey]           = useState<ReticleKey>("cookie");
  const [showReticle, setShowReticle]         = useState(false);
  const [showCopiedBadge, setShowCopiedBadge] = useState(false);
  const [textFlash, setTextFlash]             = useState(false);
  
  // HUD / Shortcut UI States
  const [shortcutVisible, setShortcutVisible] = useState(false);
  const [shortcutKeys, setShortcutKeys]       = useState<React.ReactNode[]>([]);
  const [shortcutLabel, setShortcutLabel]     = useState("");
  const [shockwaveAt, setShockwaveAt]         = useState<{ x: number; y: number } | null>(null);

  // --- MOBILE RESPONSIVE SCALING ENGINE ---
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      // 460 is our native design width
      const currentWidth = entries[0].contentRect.width;
      setScale(currentWidth / 460);
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // --- STORY CHOREOGRAPHY ---
  useEffect(() => {
    let isActive = true;
    const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    const showHint = async (keys: React.ReactNode[], label: string, duration: number) => {
      setShortcutKeys(keys);
      setShortcutLabel(label);
      setShortcutVisible(true);
      await wait(duration);
      setShortcutVisible(false);
    };

    const runStory = async () => {
      if (!isActive) return;

      // ── 0. RESET ───────────────────────────────────────────────────────────
      setPhase("idle");
      setIsVanishMode(false);
      setIsExtractMode(false);
      setCookieDestroyed(false);
      setPopupDestroyed(false);
      setBlockedCount(0);
      setShowReticle(false);
      setShowCopiedBadge(false);
      setTextFlash(false);
      setShortcutVisible(false);
      setShockwaveAt(null);
      await wait(1500);
      if (!isActive) return;

      // ── 1. ACTIVATE VANISH ─────────────────────────────────────────────────
      await showHint([<Command key="cmd" className="w-[11px] h-[11px]" />, "⇧", "X"], "Launch Vanish", 1000);
      setIsVanishMode(true);
      await wait(700);

      // ── 2. DESTROY COOKIE ──────────────────────────────────────────────────
      setPhase("hover_cookie");
      setReticleKey("cookie");
      setShowReticle(true);
      await wait(1000);

      setPhase("destroy_cookie");
      setShowReticle(false);
      setShockwaveAt({ x: 230, y: 465 });
      await wait(100);
      setCookieDestroyed(true);
      setBlockedCount(1);
      await wait(450);
      setShockwaveAt(null);
      await wait(800);

      // ── 3. DESTROY POPUP ───────────────────────────────────────────────────
      setPhase("hover_popup");
      setReticleKey("popup");
      setShowReticle(true);
      await wait(1000);

      setPhase("destroy_popup");
      setShowReticle(false);
      setShockwaveAt({ x: 230, y: 180 });
      await wait(100);
      setPopupDestroyed(true);
      setBlockedCount(2);
      await wait(450);
      setShockwaveAt(null);
      await wait(600);

      // ── 4. EXTRACT MODE ────────────────────────────────────────────────────
      await showHint(["⇧ Shift"], "Hold to Siphon", 800);
      setPhase("extract_hover");
      setIsExtractMode(true);
      setReticleKey("text");
      setShowReticle(true);
      await wait(1000);

      setPhase("extract_copy");
      setTextFlash(true);
      await wait(130);
      setTextFlash(false);
      setShowCopiedBadge(true);
      
      // Slight reticle bounce on click
      setShowReticle(false);
      await wait(50);
      setShowReticle(true);
      
      await wait(1200);
      setShowCopiedBadge(false);
      setShowReticle(false);
      setIsExtractMode(false);
      await wait(600);

      // ── 5. UNDO (⌘Z) ───────────────────────────────────────────────────────
      await showHint([<Command key="cmd" className="w-[11px] h-[11px]" />, "Z"], "Rewind Target", 800);
      setPhase("undo");
      setPopupDestroyed(false);
      setBlockedCount(1);
      await wait(1500);

      // ── 6. DEACTIVATE ──────────────────────────────────────────────────────
      setPhase("done");
      setIsVanishMode(false);
      await wait(2500);

      if (isActive) runStory();
    };

    runStory();
    return () => { isActive = false; };
  }, []);

  const isIdle = phase === "idle" || phase === "done";
  const rp = RETICLE[reticleKey];

  return (
    // OUTER FLUID CONTAINER - Defines responsive boundaries and forces aspect ratio
    <div 
      ref={containerRef} 
      className="w-full max-w-[460px] mx-auto relative overflow-hidden rounded-xl border border-neutral-800 bg-[#0f1014] shadow-2xl"
      style={{ aspectRatio: "460 / 500" }}
    >
      {/* INNER NATIVE CONTAINER - Exact 460x500 pixels, scaled dynamically via inline transform */}
      <div 
        className="absolute top-0 left-0 w-[460px] h-[500px] origin-top-left font-sans antialiased"
        style={{ transform: `scale(${scale})` }}
      >
        
        {/* ── MOCK WEBSITE ────────────────────────────────────────────────────── */}
        <div className={`absolute inset-0 bg-[#0f1014] select-none transition-all duration-700 ${isVanishMode ? "opacity-70 grayscale-[20%]" : "opacity-100"}`}>
          
          {/* Browser Chrome */}
          <div className="absolute top-0 left-0 right-0 h-10 bg-[#18181b] border-b border-[#27272a] flex items-center px-3 gap-2 z-20">
            <div className="flex gap-1.5 flex-shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <div className="flex-1 bg-[#09090b] rounded border border-[#27272a] h-6 flex items-center justify-center">
              <span className="text-[10px] text-[#444] font-medium">techblog.io/article/modern-web</span>
            </div>
          </div>

          {/* Website Sticky Nav */}
          <div className="absolute top-10 left-0 right-0 h-11 bg-[#0f1014]/95 border-b border-[#1a1a1a] flex items-center justify-between px-5 z-10 backdrop-blur-md">
            <span className="text-white font-bold text-sm tracking-tight">techblog</span>
            <div className="flex gap-4 text-[11px] font-medium text-neutral-500">
              <span className="text-white">Latest</span>
              <span>Topics</span>
              <span>About</span>
            </div>
          </div>

          {/* Article Content */}
          <div className="absolute top-[88px] left-0 right-0 px-5">
            <p className="text-[9px] font-mono text-indigo-500 font-semibold tracking-widest mb-2 uppercase">
              Featured Article
            </p>
            <h2 className="text-white font-bold text-[20px] leading-tight mb-2 tracking-tight">
              The Modern Web is Cluttered
            </h2>
            <p className="text-neutral-400 text-[12px] leading-relaxed mb-4">
              Every site you open buries the actual content under cookie banners, newsletter modals, and sticky overlays. Vanish gives you a single keystroke to take back control.
            </p>

            {/* TARGET 2: Premium Data Block (Beta Invite Code) */}
            <div 
              className={`p-3 bg-black border border-[#27272a] rounded-lg flex items-center justify-between shadow-inner transition-all duration-150 ${
                textFlash ? "brightness-200 border-indigo-500/50 scale-[0.98]" : ""
              }`}
            >
              <span className="text-[10px] text-neutral-500 font-semibold uppercase tracking-widest">Beta Invite Code</span>
              <span className="font-mono text-emerald-400 text-sm tracking-wider font-bold">VNSH-2026-BETA</span>
            </div>
          </div>

          {/* Faded Content Grid Below Fold */}
          <div className="absolute top-[300px] left-0 right-0 px-5 opacity-[0.2]">
            <div className="grid grid-cols-3 gap-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 rounded-lg bg-neutral-800 border border-neutral-700/50" />
              ))}
            </div>
          </div>
            
          {/* TARGET 1: Newsletter Popup */}
          <div
            className={`absolute top-[90px] left-[100px] w-[260px] h-[220px] bg-gradient-to-b from-[#18181b] to-[#121214] border border-[#282828] rounded-2xl overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.8)] origin-center transition-all duration-[450ms] ${
              popupDestroyed
                ? "scale-0 rotate-[8deg] opacity-0 blur-[10px] brightness-200"
                : "scale-100 rotate-0 opacity-100 blur-0 brightness-100"
            }`}
            style={{ transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-semibold text-sm">Stay in the loop</span>
                <X className="w-4 h-4 text-[#555] flex-shrink-0" />
              </div>
              <p className="text-[#666] text-[11px] leading-relaxed mb-4">
                Get our weekly digest of the best tech content, curated exclusively for developers.
              </p>
              <div className="bg-black border border-[#2a2a2a] rounded-lg px-3 py-2 mb-3 text-[11px] text-[#555]">
                your@email.com
              </div>
              <button className="w-full bg-white text-black border-none rounded-lg py-2 text-xs font-bold cursor-default">
                Subscribe Free
              </button>
            </div>
          </div>

          {/* TARGET 3: Cookie Banner */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-[#18181b]/95 backdrop-blur-md border-t border-[#282828] origin-bottom transition-all duration-[450ms] ${
              cookieDestroyed
                ? "scale-y-0 translate-y-4 opacity-0 blur-[8px] brightness-200"
                : "scale-y-100 translate-y-0 opacity-100 blur-0 brightness-100"
            }`}
            style={{ transitionTimingFunction: "cubic-bezier(0.5, 0, 0, 1)" }}
          >
            <div className="flex items-center justify-between px-5 py-4">
              <p className="text-[#888] text-[11px] flex-1 mr-4 leading-relaxed font-medium">
                We use cookies to improve your experience, analyze traffic, and show relevant ads.
              </p>
              <div className="flex gap-2 flex-shrink-0">
                <button className="border border-[#3a3a3a] text-[#777] bg-transparent px-3 py-1.5 rounded-lg text-[10px] font-medium cursor-default">
                  Decline
                </button>
                <button className="bg-white text-black border-none px-3 py-1.5 rounded-lg text-[10px] font-bold cursor-default">
                  Accept All
                </button>
              </div>
            </div>
          </div>

          {/* Shockwave Ring */}
          {shockwaveAt && (
            <div
              className="absolute rounded-full pointer-events-none z-30 border-[1.5px] border-white/60 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1),0_0_30px_rgba(255,255,255,0.2)] animate-[v-ripple_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards]"
              style={{
                left: `${shockwaveAt.x}px`, top: `${shockwaveAt.y}px`,
                width: "250px", height: "250px",
                transform: "translate(-50%, -50%) scale(0)",
              }}
            />
          )}
        </div>

        {/* ── HUD (Dynamic Island) ─────────────────────────────────────────────── */}
        <div
          className={`absolute top-0 left-0 w-full flex justify-center z-50 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVanishMode ? "translate-y-4 opacity-100 scale-100" : "-translate-y-10 opacity-0 scale-95"
          }`}
        >
          <div
            className={`flex items-center gap-3 px-[18px] py-2.5 rounded-full backdrop-blur-[24px] backdrop-saturate-[200%] shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] transition-colors duration-300 ${
              isExtractMode
                ? "bg-[rgba(0,0,0,0.9)] border border-white/30"
                : "bg-[rgba(10,10,12,0.88)] border border-white/12"
            }`}
          >
            {/* Ping Dot */}
            <div className="relative w-2.5 h-2.5 flex-shrink-0">
              <div className={`absolute inset-0 rounded-full animate-ping ${isExtractMode ? "bg-white" : "bg-[#ff453a]"}`} />
              <div className={`relative w-2.5 h-2.5 rounded-full z-[2] transition-colors duration-300 ${isExtractMode ? "bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" : "bg-[#ff453a] shadow-[0_0_10px_rgba(255,69,58,0.6)]"}`} />
            </div>
            
            <span className={`text-[12px] tracking-tight whitespace-nowrap transition-colors duration-300 ${isExtractMode ? "text-white font-semibold" : "text-[#f4f4f5] font-medium"}`}>
              {isExtractMode ? "Data Siphon" : "Vanish Armed"}
            </span>

            {/* Blocked Count */}
            {blockedCount > 0 && !isExtractMode && (
              <div className="flex items-center gap-1.5 bg-white/10 px-2 py-0.5 rounded-md text-[10px] text-white/70 font-medium">
                {blockedCount} blocked
                <kbd className="bg-transparent border border-white/20 rounded px-1 text-[8px] text-white font-bold font-mono">C</kbd>
              </div>
            )}

            <div className="w-px h-3 bg-white/20 mx-1"></div>
            <kbd className="bg-white/10 border border-white/5 border-b-2 border-b-white/15 rounded px-1.5 py-0.5 text-[10px] text-[#a1a1aa] font-mono font-semibold">ESC</kbd>
          </div>
        </div>

        {/* ── RETICLE ──────────────────────────────────────────────────────────── */}
        <div
          className={`absolute z-40 pointer-events-none rounded-[10px] transition-all ${showReticle ? "opacity-100" : "opacity-0"} ${
            isExtractMode
              ? "bg-white/5 border-2 border-white shadow-[0_12px_32px_rgba(0,0,0,0.25)] backdrop-blur-0"
              : "bg-white/[0.02] border-[1.5px] border-white/90 shadow-xl backdrop-blur-[2px] backdrop-contrast-[0.95]"
          }`}
          style={{
            top: `${rp.top}px`, left: `${rp.left}px`,
            width: `${rp.width}px`, height: `${rp.height}px`,
            boxShadow: isExtractMode
              ? "inset 0 0 0 2px rgba(255,255,255,1)"
              : "inset 0 0 0 1.5px rgba(255,255,255,0.9), 0 0 0 1px rgba(0,0,0,0.15)",
            transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.1)",
            transitionDuration: "280ms",
          }}
        />

        {/* ── COPIED BADGE ─────────────────────────────────────────────────────── */}
        {showCopiedBadge && (
          <div className="absolute left-[230px] top-[248px] z-50 pointer-events-none">
            <div className="bg-white text-black font-semibold tracking-wide text-[11px] px-3.5 py-1.5 rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.3)] animate-[v-badge-up_1.2s_cubic-bezier(0.16,1,0.3,1)_forwards] translate-x-[-50%]">
              Copied
            </div>
          </div>
        )}

        {/* ── SHORTCUT HINTS (Central Overlays) ────────────────────────────────── */}
        <div className={`absolute inset-0 flex items-center justify-center z-60 pointer-events-none transition-all duration-300 ${shortcutVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          {shortcutVisible && (
            <div className="flex items-center gap-3 px-5 py-2.5 rounded-full backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] bg-[rgba(15,16,21,0.92)] border border-[#1e2030]">
              <div className="flex items-center gap-1.5">
                {shortcutKeys.map((key, i) => (
                  <kbd key={i} className="flex items-center justify-center min-w-[24px] h-6 px-1.5 bg-[#13141c] border border-[#27272a] rounded text-[11px] font-mono font-bold text-white shadow-sm">
                    {key}
                  </kbd>
                ))}
              </div>
              <div className="w-px h-4 bg-[#27272a]" />
              <span className="text-[12px] font-medium tracking-tight text-[#e4e4ef]">
                {shortcutLabel}
              </span>
            </div>
          )}
        </div>

        {/* ── KEYFRAMES ────────────────────────────────────────────────────────── */}
        <style>{`
          @keyframes v-badge-up {
            0%   { transform: translate(-50%, -10px) scale(0.8); opacity: 0; }
            15%  { transform: translate(-50%, -28px) scale(1.1); opacity: 1; }
            30%  { transform: translate(-50%, -34px) scale(1);   opacity: 1; }
            80%  { transform: translate(-50%, -46px) scale(1);   opacity: 1; }
            100% { transform: translate(-50%, -52px) scale(0.9); opacity: 0; }
          }
          @keyframes v-ripple {
            0%   { transform: translate(-50%, -50%) scale(0.1); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
          }
        `}</style>
      </div>
    </div>
  );
}