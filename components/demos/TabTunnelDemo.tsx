"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Smartphone, Link as LinkIcon, Type, Copy, Check, Lock, CornerDownLeft } from "lucide-react";

type Phase =
    | "label_01"
    | "website_01"
    | "command_01"
    | "popup_01"
    | "label_02"
    | "website_02"
    | "command_02"
    | "popup_02";

export default function TabTunnelDemo() {
    const [phase, setPhase] = useState<Phase>("label_01");
    const [activeMode, setActiveMode] = useState("url");
    const [selectedText, setSelectedText] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [isQrVisible, setIsQrVisible] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const runStory = async () => {
            // === FEATURE 01: SHARE TAB ===
            // 1. Show label
            setPhase("label_01");
            setActiveMode("url");
            setSelectedText("");
            setIsCopied(false);
            setIsQrVisible(false);
            await wait(2500);

            // 2. Show website
            setPhase("website_01");
            await wait(1000);

            // 3. Show command
            setPhase("command_01");
            await wait(2000);

            // 4. Open popup
            setPhase("popup_01");
            await wait(800);
            setIsQrVisible(true);
            await wait(3200);

            // === FEATURE 02: SHARE TEXT ===
            // 1. Show label
            setIsQrVisible(false);
            setPhase("label_02");
            setActiveMode("text");
            await wait(2500);

            // 2. Show website with text already present (no typing)
            setPhase("website_02");
            setSelectedText("1234 Elm Street, San Francisco, CA 94102");
            await wait(1000);

            // 3. Show command
            setPhase("command_02");
            await wait(2000);

            // 4. Open popup
            setPhase("popup_02");
            await wait(800);
            setIsQrVisible(true);
            await wait(1400);
            setIsCopied(true);
            await wait(3200);

            await wait(2500);
            runStory();
        };

        const wait = (ms: number) => new Promise((resolve) => {
            timeout = setTimeout(resolve, ms);
        });

        runStory();
        return () => clearTimeout(timeout);
    }, []);

    const showWebsite = phase.includes("website") || phase.includes("command") || phase.includes("popup");
    const showCommand = phase.includes("command");
    const isFeature01 = phase.includes("01");
    const isFeature02 = phase.includes("02");
    const showPopup = phase.includes("popup");

    return (
        <div className="w-full max-w-xl mx-auto h-[480px] md:h-[500px] relative font-sans antialiased bg-black rounded-xl overflow-hidden border border-[#222] shadow-2xl">

            {/* === FEATURE LABEL OVERLAY === */}
            <div className={`pointer-events-none absolute left-1/2 top-[40%] -translate-x-1/2 z-40 transition-all duration-500 w-full max-w-[80%] md:max-w-xs ${phase.includes("label") ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}>
                <div className="flex flex-col items-center text-center gap-1 rounded-xl bg-black/40 border border-white/10 px-4 py-3 backdrop-blur-sm">
                    <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400">
                        {isFeature01 ? "Feature 01" : "Feature 02"}
                    </p>
                    <p className="text-[11px] md:text-[12px] text-neutral-100 font-medium leading-relaxed">
                        {isFeature01
                            ? "Share this tab to your phone with a scannable QR."
                            : "Share selected text (like an address) directly to your phone."}
                    </p>
                </div>
            </div>

            {/* === BROWSER VIEW (FULL-WIDTH BACKGROUND) === */}
            <div className={`absolute inset-0 flex flex-col bg-[#050505] transition-all duration-500 ${showPopup ? 'scale-[0.97] blur-[1px] opacity-40 brightness-[0.75]' :
                showWebsite ? 'scale-100 opacity-100 blur-0 brightness-100' :
                    'opacity-0 scale-95'
                }`}>
                {/* Browser Top Bar */}
                <div className="bg-[#141416] border-b border-[#222] px-4 py-3 flex items-center gap-3">
                    <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#333]" />
                        <div className="w-2 h-2 rounded-full bg-[#333]" />
                        <div className="w-2 h-2 rounded-full bg-[#333]" />
                    </div>
                    <div className="flex-1 bg-black rounded border border-[#222] h-6 flex items-center px-2 gap-2">
                        <Lock className="w-2.5 h-2.5 text-[#444]" />
                        <span className="text-[9px] text-[#666]">
                            {isFeature01 ? "techblog.io/article/extensions" : "payments.app/send"}
                        </span>
                    </div>
                </div>

                {/* Browser Content – Feature 01: Blog Article */}
                {isFeature01 && (
                    <div className="p-6 flex-1 overflow-y-auto">
                        <div className="max-w-2xl mx-auto space-y-4">
                            <div className="space-y-2">
                                <p className="text-[9px] text-[#555] uppercase tracking-wider font-mono">Tech Blog</p>
                                <h1 className="text-xl font-bold text-white leading-tight">
                                    Building Better Browser Extensions
                                </h1>
                                <p className="text-[10px] text-[#666]">Published 2 days ago • 5 min read</p>
                            </div>
                            <div className="space-y-3 text-[11px] text-[#888] leading-relaxed">
                                <p>
                                    Modern browser extensions have transformed how we interact with the web.
                                    From productivity tools to privacy enhancers, extensions bridge the gap
                                    between what browsers offer and what users need.
                                </p>
                                <p>
                                    In this article, we explore the architecture behind premium extensions
                                    that feel native, perform flawlessly, and respect user privacy. We&apos;ll
                                    dive into Manifest V3, content script patterns, and storage strategies...
                                </p>
                                <p className="text-[#555] italic">
                                    Continue reading on your phone to finish this article...
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Browser Content – Feature 02: Address Transfer Form */}
                {isFeature02 && (
                    <div className="p-6 flex-1 flex flex-col items-center justify-center">
                        <div className="max-w-sm w-full space-y-4">
                            <div className="text-center space-y-2 mb-6">
                                <h1 className="text-lg font-bold text-white">Send Payment</h1>
                                <p className="text-[10px] text-[#666]">Enter recipient details</p>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <label className="text-[9px] text-[#555] uppercase tracking-wider font-mono block mb-1">
                                        Recipient Name
                                    </label>
                                    <div className="bg-[#141416] border border-[#222] rounded px-3 py-2 text-[11px] text-white">
                                        John Doe
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[9px] text-[#555] uppercase tracking-wider font-mono block mb-1">
                                        Delivery Address
                                    </label>
                                    <div className="bg-[#141416] border border-[#222] rounded px-3 py-2 text-[11px] text-white relative font-mono">
                                        <span
                                            className={`transition-colors ${phase === "website_02" || phase === "command_02" || phase === "popup_02"
                                                ? "bg-white/90 text-black"
                                                : "bg-transparent text-white"
                                                }`}
                                        >
                                            {selectedText || "1234 Elm Street, San Francisco, CA 94102"}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[9px] text-[#555] uppercase tracking-wider font-mono block mb-1">
                                        Amount
                                    </label>
                                    <div className="bg-[#141416] border border-[#222] rounded px-3 py-2 text-[11px] text-white">
                                        $250.00
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Global command overlay (like Vanish demo) */}
            {showCommand && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-40 mx-2">
                    <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 rounded-full border border-white/20 bg-black/95 px-16 md:px-6 py-3 text-[12px] text-neutral-100 shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
                        <div className="flex gap-1.5">
                            <kbd className="min-w-[26px] px-2 py-1 bg-[#141416] border border-[#555] rounded-md text-[10px] text-white text-center">
                                ⌘
                            </kbd>
                            <kbd className="min-w-[26px] px-2 py-1 bg-[#141416] border border-[#555] rounded-md text-[10px] text-white text-center">
                                ⇧
                            </kbd>
                            <kbd className="min-w-[26px] px-2 py-1 bg-[#141416] border border-[#555] rounded-md text-[10px] text-white text-center">
                                P
                            </kbd>
                        </div>
                        <span className="uppercase font-mono tracking-[0.2em] text-[9px] md:text-[10px] text-neutral-50 text-center">
                            {isFeature01 ? "Send tab to phone" : "Send selected text to phone"}
                        </span>
                    </div>
                </div>
            )}

            {/* === TABTUNNEL POPUP (FLOATING OVER SITE) === */}
            <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[300px] bg-[#0c0c0e] border border-[#222] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-all duration-500
          ${showPopup ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}
        `}
            >
                {/* Header */}
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white tracking-tight">TabTunnel</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#3ddc84] animate-pulse" />
                    </div>
                    {/* Mode toggle – matches real extension */}
                    <div className="flex items-center bg-[#141416] rounded-full border border-white/10 p-0.5 gap-0.5">
                        <button
                            type="button"
                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-medium tracking-wide transition-all ${activeMode === 'url'
                                    ? 'bg-neutral-100/10 text-white'
                                    : 'text-[#666]'
                                }`}
                            onClick={() => setActiveMode('url')}
                        >
                            <LinkIcon
                                className={`w-3 h-3 ${activeMode === 'url' ? 'text-white' : 'text-[#666]'
                                    }`}
                            />
                            <span>URL</span>
                        </button>

                        <button
                            type="button"
                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-medium tracking-wide transition-all ${activeMode === 'text'
                                    ? 'bg-neutral-100/10 text-white'
                                    : 'text-[#666]'
                                }`}
                            onClick={() => setActiveMode('text')}
                        >
                            <Type
                                className={`w-3 h-3 ${activeMode === 'text' ? 'text-white' : 'text-[#666]'
                                    }`}
                            />
                            <span>Text</span>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col items-center gap-4">
                    {/* QR Tile */}
                    <div className="w-40 h-40 bg-[#141416] rounded-xl border border-white/5 flex items-center justify-center overflow-hidden relative shadow-inner">
                        {!isQrVisible ? (
                            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                        ) : (
                            <div className="p-2 relative w-32 h-32 animate-[qr-fade_0.28s_ease-out]">
                                <Image
                                    src={activeMode === 'url' ? '/images/demo/qr1.png' : '/images/demo/qr2.png'}
                                    alt="QR Code"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-[#555]">
                        <Smartphone className="w-3 h-3" />
                        <span>Point your phone camera at the code</span>
                    </div>

                    {/* Bottom Bar */}
                    <div className="w-full bg-[#141416] border border-white/5 rounded-lg p-2.5 flex items-center gap-3">
                        <span className="flex-1 font-mono text-[9px] text-[#666] truncate uppercase tracking-tighter">
                            {activeMode === 'url' ? 'techblog.io/article/extensions' : selectedText}
                        </span>
                        <div className={`transition-colors ${isCopied ? 'text-[#3ddc84]' : 'text-[#444]'}`}>
                            {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t border-white/5 flex justify-between items-center">
                    <span className="text-[9px] text-[#333] font-bold">© N3xt</span>
                    <div className="flex gap-1 items-center opacity-40">
                        <kbd className="px-1 py-0.5 bg-[#141416] border border-[#222] rounded text-[8px] text-white">⌘</kbd>
                        <kbd className="px-1 py-0.5 bg-[#141416] border border-[#222] rounded text-[8px] text-white">⇧</kbd>
                        <kbd className="px-1 py-0.5 bg-[#141416] border border-[#222] rounded text-[8px] text-white">P</kbd>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes qr-fade {
          0% {
            opacity: 0;
            transform: scale(0.99);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
        </div>
    );
}