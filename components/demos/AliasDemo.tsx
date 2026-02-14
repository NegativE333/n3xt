"use client";

import React, { useState, useEffect } from "react";
import { User, Lock, ArrowRight, Command, CornerDownLeft, Check, Globe, X } from "lucide-react";

export default function AliasDemo() {
  const [phase, setPhase] = useState<"config" | "website">("config");

  // --- CONFIG STATE ---
  const [configShortcut, setConfigShortcut] = useState("");
  const [configExpansion, setConfigExpansion] = useState("");
  const [isBindPressed, setIsBindPressed] = useState(false);
  const [keyCount, setKeyCount] = useState(0);

  // --- WEBSITE STATE ---
  const [formEmail, setFormEmail] = useState("");
  const [isEnterHintVisible, setIsEnterHintVisible] = useState(false);
  const [isFormSuccess, setIsFormSuccess] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const runStory = async () => {
      // RESET
      setPhase("config");
      setConfigShortcut("");
      setConfigExpansion("");
      setIsBindPressed(false);
      setKeyCount(0);
      setFormEmail("");
      setIsEnterHintVisible(false);
      setIsFormSuccess(false);

      // === SCENE 1: CONFIGURE EXTENSION ===
      await wait(800);
      
      // 1. Type Shortcut
      await typeText("/email", setConfigShortcut);
      await wait(300);

      // 2. Type Expansion
      await typeText("jane@n3xt.dev", setConfigExpansion);
      await wait(500);

      // 3. Bind Key
      setIsBindPressed(true);
      await wait(200);
      setIsBindPressed(false);
      
      // 4. Update UI to "Registry State"
      setKeyCount(1);
      setConfigShortcut(""); // Clear inputs like real app
      setConfigExpansion("");
      await wait(2000); // Let user see the new registry item

      // === SCENE 2: SWITCH TO WEBSITE ===
      setPhase("website");
      await wait(1000);

      // 5. Type Shortcut in Browser
      await typeText("/email", setFormEmail);
      await wait(400);

      // 6. SHOW "PRESS ENTER" TOOLTIP
      setIsEnterHintVisible(true);
      await wait(1500);

      // 7. EXECUTE
      setIsEnterHintVisible(false);
      setFormEmail("jane@n3xt.dev");
      setIsFormSuccess(true);
      
      await wait(4000);
      runStory();
    };

    const typeText = (text: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
      return new Promise<void>((resolve) => {
        let i = 0;
        const loop = () => {
          if (i < text.length) {
            setter(text.slice(0, i + 1));
            i++;
            timeout = setTimeout(loop, 50 + Math.random() * 40);
          } else {
            resolve();
          }
        };
        loop();
      });
    };

    const wait = (ms: number) => new Promise((resolve) => {
      timeout = setTimeout(resolve, ms);
    });

    runStory();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-full max-w-[360px] mx-auto h-[500px] relative font-mono text-sm antialiased perspective-[1000px]">
      
      {/* === SCENE 1: THE EXTENSION POPUP === */}
      <div 
        className={`absolute inset-0 bg-black border border-[#333] rounded-xl shadow-2xl overflow-hidden flex flex-col transition-all duration-700 ease-in-out transform
          ${phase === 'config' 
            ? 'opacity-100 translate-x-0 rotate-y-0 z-20' 
            : 'opacity-0 -translate-x-full rotate-y-12 z-0 pointer-events-none'}
        `}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#222] flex justify-between items-center bg-black">
          <div className="flex items-center gap-2 text-white font-bold tracking-tight text-base">
            <ArrowRight className="w-4 h-4 text-white" />
            <span>ALIAS</span>
          </div>
          <div className="flex items-center gap-2 text-[#666] text-[10px]">
            <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${keyCount > 0 ? 'bg-white' : 'bg-[#333]'}`} />
            <span>{keyCount} KEYS</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col h-full">
          
          {/* Inputs */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#666] uppercase tracking-wider block">Shortcut</label>
              <div className="bg-[#050505] border border-[#333] rounded px-3 h-[42px] flex items-center text-white">
                {configShortcut}
                {phase === 'config' && configShortcut.length > 0 && configShortcut.length < 6 && (
                   <span className="animate-pulse w-1.5 h-4 bg-white ml-1" />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                 <label className="text-[10px] font-bold text-[#666] uppercase tracking-wider block">Expansion</label>
                 <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 border border-[#444] rounded bg-black"></div>
                    <span className="text-[9px] font-bold text-[#444] uppercase">Record</span>
                 </div>
              </div>
              <div className="bg-[#050505] border border-[#333] rounded px-3 h-[42px] flex items-center text-[#999]">
                {configExpansion}
                {phase === 'config' && configExpansion.length > 0 && configExpansion.length < 13 && (
                   <span className="animate-pulse w-1.5 h-4 bg-white ml-1" />
                )}
              </div>
            </div>

            {/* Bind Button */}
            <div 
              className={`w-full h-[42px] flex items-center justify-between px-4 rounded font-bold transition-all duration-150 mt-2 border cursor-default
                ${isBindPressed 
                  ? 'bg-[#ccc] border-[#ccc] text-black scale-[0.98]' 
                  : 'bg-white border-white text-black'}
              `}
            >
              <span>BIND KEY</span>
              <CornerDownLeft className="w-3 h-3" />
            </div>
          </div>

          {/* Registry Section */}
          <div className="mt-8 flex-1 flex flex-col">
             <label className="text-[10px] font-bold text-[#333] uppercase tracking-wider block mb-2">Registry</label>
             <div className="w-full h-px bg-[#222] mb-4"></div>

             {keyCount === 0 ? (
                <div className="text-center mt-4">
                   <p className="text-[#333] text-sm italic">No keys bound yet.</p>
                   <p className="text-[#222] text-xs mt-1">Create your first alias above.</p>
                </div>
             ) : (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex justify-between items-start group">
                        <div className="flex flex-col gap-1">
                           <span className="text-white font-bold text-sm">/email</span>
                           <span className="text-[#666] text-xs">jane@n3xt.dev</span>
                        </div>
                        <X className="w-3 h-3 text-[#333]" />
                    </div>
                    <div className="w-full border-t border-dashed border-[#222] mt-3"></div>
                </div>
             )}
          </div>

          {/* Footer */}
          <div className="flex justify-between text-[9px] text-[#333] font-bold mt-auto pt-4">
            <div className="flex gap-3">
             <span>EXPORT</span>
             <span>IMPORT</span>
            </div>
             <span>RESET_DATA</span>
          </div>

        </div>
      </div>


      {/* === SCENE 2: THE BROWSER WINDOW === */}
      <div 
        className={`absolute inset-0 bg-[#0c0c0e] border border-[#333] rounded-xl shadow-2xl overflow-hidden flex flex-col transition-all duration-700 ease-in-out transform font-sans
          ${phase === 'website' 
            ? 'opacity-100 translate-x-0 rotate-y-0 z-20' 
            : 'opacity-0 translate-x-full -rotate-y-12 z-0 pointer-events-none'}
        `}
      >
        {/* Browser Chrome */}
        <div className="bg-[#18181b] border-b border-[#27272a] px-4 py-3 flex items-center gap-3">
           <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
           </div>
           <div className="flex-1 bg-[#09090b] rounded-md border border-[#27272a] h-7 flex items-center justify-center relative">
              <div className="flex items-center gap-1.5 text-[10px] text-[#888]">
                 <Lock className="w-3 h-3 text-[#666]" />
                 <span className="text-white font-medium">n3xt.dev</span>
                 <span className="text-[#444]">/login</span>
              </div>
           </div>
        </div>

        {/* Website Content */}
        <div className="p-8 flex-1 flex flex-col justify-center space-y-6 bg-[#0c0c0e]">
           <div className="text-center">
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3 border border-white/10">
                 <Globe className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-white text-lg font-semibold">Welcome back</h2>
           </div>

           <div className="space-y-4">
              <div className="space-y-1.5 relative">
                 <label className="text-xs font-medium text-[#666] uppercase tracking-wider ml-1">Email</label>
                 
                 <div className={`relative flex items-center bg-[#18181b] border transition-all duration-300 rounded-lg px-3 py-3
                     ${isFormSuccess ? 'border-green-500/50 bg-green-500/10' : 'border-[#333] focus-within:border-blue-500'}
                 `}>
                    <User className={`w-4 h-4 mr-3 ${isFormSuccess ? 'text-green-500' : 'text-[#444]'}`} />
                    <div className="flex-1 text-sm text-white font-mono">
                       {formEmail}
                       {phase === 'website' && !isFormSuccess && <span className="animate-pulse inline-block w-1.5 h-4 bg-blue-500 align-middle ml-0.5" />}
                    </div>
                 </div>

                 {/* "PRESS ENTER" TOOLTIP */}
                 <div 
                    className={`absolute right-0 -top-9 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-md shadow-[0_4px_12px_rgba(37,99,235,0.4)] flex items-center gap-1.5 transition-all duration-300 transform origin-bottom-right font-sans
                       ${isEnterHintVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}
                    `}
                 >
                    <span>PRESS ENTER</span>
                    <div className="bg-white/20 rounded px-1 py-0.5">
                       <CornerDownLeft className="w-3 h-3" />
                    </div>
                    <div className="absolute -bottom-1 right-4 w-2 h-2 bg-blue-600 rotate-45"></div>
                 </div>
              </div>

              <button 
                 className={`w-full mt-2 flex items-center justify-center py-2.5 rounded-lg text-sm font-semibold transition-all duration-500
                    ${isFormSuccess ? 'bg-green-500 text-black shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-white text-black'}
                 `}
              >
                 {isFormSuccess ? (
                    <span className="flex items-center gap-2"><Check className="w-4 h-4" /> Success</span>
                 ) : (
                    <span className="flex items-center gap-2">Sign In <ArrowRight className="w-4 h-4" /></span>
                 )}
              </button>
           </div>
        </div>
      </div>

    </div>
  );
}