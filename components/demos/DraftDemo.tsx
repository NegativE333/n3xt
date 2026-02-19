"use client";

import React, { useState, useEffect } from "react";
import { Command } from "lucide-react";

export default function DraftStoryDemo() {
  const [phase, setPhase] = useState<"idle" | "opening" | "typing" | "formatted">("idle");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("Synced");
  
  const [isShortcutPressed, setIsShortcutPressed] = useState(false);
  const [isFormatHovered, setIsFormatHovered] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  
  const charCount = content.length;
  const wordCount = content.trim() === "" ? 0 : content.trim().split(/\s+/).length;

  useEffect(() => {
    let isActive = true;
    const cursorInterval = setInterval(() => setShowCursor(prev => !prev), 500);

    const runStory = async () => {
      setPhase("idle");
      setContent("");
      setStatus("Synced");
      setIsFormatHovered(false);
      setIsShortcutPressed(false);
      
      await wait(1500);
      if (!isActive) return;

      // 1. Hook
      setIsShortcutPressed(true);
      await wait(150); 
      setPhase("opening");
      setIsShortcutPressed(false);
      
      await wait(800);
      setPhase("typing");
      
      // 2. Typing & Commands
      setStatus("Saving...");
      await typeText("Generating test payload on ", 30, 80);
      
      await typeText("/date", 40, 60);
      await wait(300); 
      setContent(prev => prev.replace("/date", "2026-02-19"));
      await wait(500);

      await typeText("\nID: ", 30, 80);
      
      await typeText("/uuid", 40, 60);
      await wait(300);
      setContent(prev => prev.replace("/uuid", "f8a9d2b1-4c73-492a-8b1e-3f9c2d4a1e5b"));
      
      setStatus("Synced");
      await wait(800);

      // 3. Paste Long JSON
      setStatus("Saving...");
      await typeText("\n\n// Raw API Response\n", 20, 50);
      await wait(300);
      const messyJson = `{"user":{"id":892,"role":"admin"},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ","active":true}`;
      setContent(prev => prev + messyJson);
      setStatus("Synced");
      
      await wait(1000);

      // 4. Formatting
      setIsFormatHovered(true);
      await wait(400); 
      
      const cleanContent = `Generating test payload on 2026-02-19
ID: f8a9d2b1-4c73-492a-8b1e-3f9c2d4a1e5b

// Raw API Response
{
  "user": {
    "id": 892,
    "role": "admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI...",
  "active": true
}`;
      setContent(cleanContent);
      setIsFormatHovered(false);
      setStatus("Formatted");
      setPhase("formatted");
      
      await wait(1500);
      setStatus("Synced");
      
      await wait(4000);
      if (isActive) runStory();
    };

    const typeText = async (text: string, minSpeed: number, maxSpeed: number) => {
      for (let i = 0; i < text.length; i++) {
        if (!isActive) break;
        setContent(prev => prev + text[i]);
        const delayMultiplier = (text[i] === " " || text[i] === "\n") ? 2.5 : 1;
        await wait((Math.random() * (maxSpeed - minSpeed) + minSpeed) * delayMultiplier);
      }
    };

    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    runStory();

    return () => {
      isActive = false;
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className="w-full max-w-[800px] mx-auto h-[500px] sm:h-[600px] relative font-sans antialiased flex items-center justify-center bg-[#050509] sm:rounded-2xl overflow-hidden shadow-2xl">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[#050509]">
        <div className="absolute inset-0 bg-[radial-gradient(#1e2030_1px,transparent_1px)] [background-size:24px_24px] opacity-60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050509_100%)] opacity-80"></div>
      </div>
      
      {/* THE HOOK */}
      <div className={`absolute z-20 transition-all duration-500 flex items-center justify-center
        ${phase === 'idle' ? 'opacity-100' : 'opacity-0 scale-110 pointer-events-none'}
      `}>
         <div className={`flex items-center gap-4 px-6 py-3 rounded-full backdrop-blur-md transition-all duration-200
            ${isShortcutPressed 
               ? 'bg-white/10 scale-95 border border-[#f4f4ff]/30 shadow-[0_0_30px_rgba(244,244,255,0.15)]' 
               : 'bg-[#0f1015]/80 scale-100 border border-[#1e2030] shadow-2xl'}
         `}>
            <div className="flex items-center gap-1.5 text-[#e4e4ef]">
               <kbd className="flex items-center justify-center min-w-[24px] h-[24px] px-1.5 bg-[#13141c] border border-[#1e2030] rounded text-[11px] font-mono shadow-sm">
                  <Command className="w-3 h-3" />
               </kbd>
               <kbd className="flex items-center justify-center min-w-[24px] h-[24px] px-1.5 bg-[#13141c] border border-[#1e2030] rounded text-[11px] font-mono font-bold shadow-sm">
                  E
               </kbd>
            </div>
            <div className="w-px h-4 bg-[#1e2030]"></div>
            <span className={`text-[13px] font-medium tracking-wide transition-colors duration-200 ${isShortcutPressed ? 'text-[#f4f4ff]' : 'text-[#8082a0]'}`}>
               Launch Draft
            </span>
         </div>
      </div>

      {/* EXTENSION POPUP (Now Mobile Responsive) */}
      <div 
        className={`relative z-10 w-[92%] sm:w-[500px] max-w-[500px] h-[88%] sm:h-[550px] max-h-[550px] bg-[#050509] text-[#e4e4ef] border border-[#1e2030] shadow-[0_20px_80px_rgba(0,0,0,0.9)] rounded-xl overflow-hidden flex transition-all duration-700
          ${phase === 'idle' 
            ? 'opacity-0 translate-y-8 scale-95 pointer-events-none' 
            : 'opacity-100 translate-y-0 scale-100 pointer-events-auto'}
        `}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", sans-serif' }}
      >
        
        {/* SIDEBAR */}
        <aside className="w-[60px] sm:w-[72px] bg-[#0b0b10] border-r border-[#1e2030] flex flex-col items-center py-4 gap-4 flex-shrink-0">
           <div className="text-[#8082a0] text-[16px] sm:text-[18px] opacity-70">
              <span className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#1e2030] font-mono text-[10px] sm:text-[12px] font-semibold text-[#e4e4ef]">
                 N3
              </span>
           </div>
           
           <div id="tabList" className="flex-1 flex flex-col gap-2 w-full px-2 sm:px-3 overflow-hidden items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 min-h-[30px] rounded-xl bg-[#13141c] border border-[#1e2030] text-[#e4e4ef] font-mono text-[11px] sm:text-[12px] tracking-[0.02em] font-semibold flex items-center justify-center relative flex-shrink-0 shadow-[0_0_0_1px_#1e2030]">
                 <span className="text-center leading-none overflow-hidden text-ellipsis whitespace-nowrap max-w-full px-0.5">D1</span>
                 <div className="absolute bottom-1 right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 flex items-center justify-center text-[#f4f4ff] opacity-90 z-10">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                 </div>
              </div>
           </div>

           <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-[1.5px] border-dashed border-[#1e2030] bg-transparent text-[#8082a0] flex items-center justify-center flex-shrink-0 mb-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                 <line x1="12" y1="5" x2="12" y2="19"></line>
                 <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
           </button>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col bg-[#0f1015] min-w-0">
           
           {/* HEADER */}
           <header className="h-[48px] sm:h-[52px] border-b border-[#1e2030] flex items-center justify-between px-3 sm:px-5 bg-[#0f1015] shrink-0 min-w-0">
              {/* Flex-1 and min-w-0 ensures the left side shrinks and truncates instead of pushing */}
              <div className="flex items-baseline gap-2 sm:gap-3 flex-1 min-w-0 mr-2 sm:mr-4">
                 <div className="text-[13px] sm:text-[14px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis leading-[1.3] flex-shrink">
                    Draft 1
                 </div>
                 {/* Hides 'just now' on very small screens to save space */}
                 <div className="hidden sm:block text-[10px] text-[#8082a0] font-mono opacity-60 whitespace-nowrap font-normal flex-shrink-0">
                    just now
                 </div>
              </div>
              
              {/* Shrink-0 prevents the right side from getting squeezed */}
              <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                 <div className={`text-[10px] sm:text-[11px] font-mono transition-colors duration-300
                    ${status === 'Saving...' ? 'text-[#eab308]' : status === 'Formatted' ? 'text-[#10b981]' : 'text-[#8082a0]'}
                 `}>
                    {status}
                 </div>
                 
                 <div className="flex items-center gap-0.5 sm:gap-1">
                    <button className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-transparent bg-transparent text-[#8082a0] flex items-center justify-center text-[14px] sm:text-[16px]">
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                       </svg>
                    </button>
                    {/* Hide middle icon on small screens to prevent crowding */}
                    <button className="hidden sm:flex w-8 h-8 rounded-full border border-transparent bg-transparent text-[#8082a0] items-center justify-center text-[16px]">
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 12h18M3 6h18M3 18h9"/>
                       </svg>
                    </button>
                    <button className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-transparent bg-transparent text-[#8082a0] flex items-center justify-center text-[14px] sm:text-[16px]">
                       <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                          <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.6"/>
                          <line x1="12" y1="3" x2="12" y2="1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                          <line x1="12" y1="22.5" x2="12" y2="21" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                          <line x1="4.22" y1="4.22" x2="3.17" y2="3.17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                          <line x1="20.83" y1="20.83" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                          <line x1="3" y1="12" x2="1.5" y2="12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                          <line x1="22.5" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                          <line x1="4.22" y1="19.78" x2="3.17" y2="20.83" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                          <line x1="20.83" y1="3.17" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                       </svg>
                    </button>
                 </div>
              </div>
           </header>

           {/* EDITOR */}
           <div className="flex-1 bg-[#0f1015] p-3 sm:p-4 relative min-w-0 min-h-0">
              {content.length === 0 && (
                 <div className="absolute top-[26px] sm:top-[34px] left-[28px] sm:left-[36px] text-[#8082a0] font-mono text-[11px] sm:text-[13px] pointer-events-none z-10">
                    Drop thoughts, JSON, snippets...
                 </div>
              )}
              
              <div 
                 className="w-full h-full rounded-xl bg-[#13141c] text-[#e4e4ef] p-[14px_16px] sm:p-[18px_20px] font-mono text-[12px] sm:text-[13px] leading-[1.7] whitespace-pre-wrap outline-none break-all overflow-y-auto overflow-x-hidden"
                 style={{ 
                    fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                    scrollbarWidth: 'none'
                 }}
              >
                 {content}
                 <span className={`inline-block w-0.5 h-3.5 sm:h-4 bg-[#e4e4ef] ml-[1px] align-middle transition-opacity duration-100 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
              </div>
           </div>

           {/* FOOTER */}
           <footer className="h-[44px] sm:h-[48px] border-t border-[#1e2030] flex items-center justify-between px-3 sm:px-5 bg-[#0f1015] gap-2 sm:gap-3 shrink-0 min-w-0 overflow-hidden">
              <div className="text-[10px] sm:text-[11px] text-[#8082a0] font-mono whitespace-nowrap flex-[0_1_auto] min-w-0 overflow-hidden text-ellipsis">
                 {charCount} chars <span className="hidden sm:inline">• {wordCount} words</span>
              </div>
              
              <div className="flex items-center gap-1 sm:gap-[6px] flex-shrink-0">
                 <button 
                    className={`rounded-full border border-transparent px-2 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-[12px] font-medium flex items-center gap-1 sm:gap-[5px] transition-all duration-150
                       ${isFormatHovered ? 'bg-[rgba(244,244,255,0.06)] text-[#f4f4ff] border-[#1e2030]' : 'bg-transparent text-[#8082a0]'}
                    `}
                 >
                    <span className="text-[10px] sm:text-[11px]">{`{ }`}</span> <span className="hidden sm:inline">Format</span>
                 </button>
                 <div className="w-px h-4 sm:h-5 bg-[#1e2030] opacity-60"></div>
                 <button className="rounded-full border border-transparent bg-transparent px-2 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-[12px] font-medium text-[#8082a0]">
                    Copy
                 </button>
                 <button className="rounded-full border border-transparent bg-transparent px-2 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-[12px] font-medium text-[#8082a0]">
                    Clear
                 </button>
              </div>
           </footer>
           
        </main>
      </div>

    </div>
  );
}