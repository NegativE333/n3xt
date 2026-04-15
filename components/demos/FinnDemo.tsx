"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Send, ChevronLeft, MoreVertical, Paperclip,
  Smile, CheckCheck, Undo2,
} from "lucide-react";

type Message = {
  id: number;
  type: "bot" | "user";
  text: string;
  time: string;
  hasUndo?: boolean;
};

const INITIAL_MESSAGE: Message = {
  id: 1,
  type: "bot",
  text: "Hey Om! I'm Finn — your finance buddy.\nJust tell me what you spent, earned, or owe. I'll handle the rest.",
  time: "7:40 PM",
};

export default function FinnBotDemo() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chatRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const wait = (ms: number) =>
      new Promise<void>((res) => {
        timeout = setTimeout(res, ms);
      });

    const typeMessage = (text: string, speed: number) =>
      new Promise<void>((resolve) => {
        let i = 0;
        const loop = () => {
          if (cancelled) return;
          if (i < text.length) {
            setInputValue(text.slice(0, i + 1));
            i++;
            timeout = setTimeout(loop, speed);
          } else {
            resolve();
          }
        };
        loop();
      });

    const sendUserMessage = (text: string) => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), type: "user", text, time: "7:41 PM" },
      ]);
      setInputValue("");
    };

    const sendBotMessage = (text: string, hasUndo = false) => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), type: "bot", text, time: "7:41 PM", hasUndo },
      ]);
    };

    const runStory = async () => {
      if (cancelled) return;
      await wait(1500);

      await typeMessage("Spent 500 on petrol", 70);
      await wait(400);
      sendUserMessage("Spent 500 on petrol");

      setIsTyping(true);
      await wait(1400);
      setIsTyping(false);
      sendBotMessage(
        "Logged ✓\n\n₹500 · Transport · petrol\n\nMonthly total: ₹4,860 spent",
        true
      );

      await wait(2200);

      await typeMessage("How much on petrol this month?", 55);
      await wait(400);
      sendUserMessage("How much on petrol this month?");

      setIsTyping(true);
      await wait(1600);
      setIsTyping(false);
      sendBotMessage(
        "Petrol · April\n\n3 transactions → ₹1,420\n\nApr 15  ₹500\nApr 09  ₹480\nApr 02  ₹440"
      );

      await wait(1600);
      setShowOverlay(true);
      await wait(5600);
      setShowOverlay(false);
      await wait(1200);
      if (!cancelled) {
        setShowOverlay(false);
        setMessages([INITIAL_MESSAGE]);
        runStory();
      }
    };

    runStory();
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="w-full max-w-[340px] mx-auto relative font-sans">
      <div className="bg-[#0e1621] rounded-2xl overflow-hidden border border-neutral-800 shadow-[0_8px_40px_rgba(0,0,0,0.5)] flex flex-col h-[520px] relative">

        {/* Header */}
        <div className="bg-[#17212b] px-3 py-2.5 flex items-center justify-between border-b border-white/5 shrink-0">
          <div className="flex items-center gap-2.5">
            <ChevronLeft className="w-5 h-5 text-[#6c7883]" />
            <div className="relative w-9 h-9 rounded-full overflow-hidden ring-1 ring-white/10">
              <Image
                src="/images/demo/finn-logo.png"
                alt="Finn bot profile"
                fill
                className="object-cover"
                sizes="36px"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-semibold text-[13px] leading-tight">
                Finn
              </span>
              <span className="text-[#4ea4f6] text-[10px] leading-tight">
                bot
              </span>
            </div>
          </div>
          <MoreVertical className="w-4 h-4 text-[#6c7883]" />
        </div>

        {/* Chat */}
        <div ref={chatRef} className="finn-chat-scroll flex-1 overflow-y-auto px-3 py-3 space-y-2.5 scrollbar-hide">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[82%] px-3 py-2 text-[12.5px] leading-[1.55] relative
                  ${
                    msg.type === "user"
                      ? "bg-[#2b5278] text-white rounded-2xl rounded-tr-sm"
                      : "bg-[#182533] text-[#e1e5e8] rounded-2xl rounded-tl-sm"
                  }`}
              >
                <pre className="whitespace-pre-wrap font-sans m-0">
                  {msg.text}
                </pre>

                {msg.hasUndo && (
                  <div className="mt-2 pt-2 border-t border-white/[0.06] flex items-center justify-center gap-1.5 text-[#4ea4f6] text-[11px] font-medium">
                    <Undo2 className="w-3 h-3" />
                    <span>Undo</span>
                  </div>
                )}

                <div className="flex justify-end items-center gap-1 mt-0.5">
                  <span className="text-[9px] text-white/25">{msg.time}</span>
                  {msg.type === "user" && (
                    <CheckCheck className="w-3 h-3 text-[#4ea4f6]" />
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[#182533] text-[#8b9baa] px-3 py-2 rounded-2xl rounded-tl-sm text-[12px] flex items-center gap-1">
                <span>typing</span>
                <span className="inline-flex gap-[2px] ml-0.5">
                  <span className="w-[3px] h-[3px] rounded-full bg-[#8b9baa] animate-[bounce_1s_ease-in-out_infinite]" />
                  <span className="w-[3px] h-[3px] rounded-full bg-[#8b9baa] animate-[bounce_1s_ease-in-out_0.15s_infinite]" />
                  <span className="w-[3px] h-[3px] rounded-full bg-[#8b9baa] animate-[bounce_1s_ease-in-out_0.3s_infinite]" />
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Input */}
        <div className="bg-[#17212b] px-3 py-2 flex items-center gap-2.5 border-t border-white/5 shrink-0">
          <Smile className="w-5 h-5 text-[#6c7883] shrink-0" />
          <div className="flex-1 min-h-[36px] flex items-center text-[13px]">
            {inputValue ? (
              <span className="text-[#e1e5e8]">
                {inputValue}
                <span className="inline-block w-[2px] h-[14px] bg-[#4ea4f6] align-middle ml-px animate-pulse" />
              </span>
            ) : (
              <span className="text-[#6c7883]">Message</span>
            )}
          </div>
          <Paperclip className="w-5 h-5 text-[#6c7883] -rotate-45 shrink-0" />
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
              inputValue ? "bg-[#4ea4f6]" : "bg-transparent"
            }`}
          >
            <Send
              className={`w-4 h-4 transition-colors ${
                inputValue
                  ? "text-white fill-white"
                  : "text-[#6c7883]"
              }`}
            />
          </div>
        </div>

        <div
          className={`absolute inset-0 z-20 flex items-center justify-center transition-all duration-700 ${
            showOverlay ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className={`relative flex flex-col items-center gap-3 transition-all duration-700 ${
              showOverlay ? "scale-100 translate-y-0" : "scale-90 translate-y-4"
            }`}
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#4ea4f6]/35 shadow-[0_0_30px_rgba(78,164,246,0.3)]">
              <Image
                src="/images/demo/finn-logo.png"
                alt="Finn logo"
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="text-center">
              <p className="text-[22px] font-semibold text-white leading-tight">
                Do a lot more
              </p>
              <p className="text-[22px] font-semibold text-white leading-tight">
                with <span className="text-[#4ea4f6]">Finn</span>
              </p>
            </div>
            <p className="text-[11px] text-white/40 tracking-widest uppercase mt-1">
              Budgets · Debts · Income · Exports
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .finn-chat-scroll {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE/Edge legacy */
        }

        .finn-chat-scroll::-webkit-scrollbar {
          display: none; /* Chrome/Safari/Opera */
        }
      `}</style>
    </div>
  );
}

