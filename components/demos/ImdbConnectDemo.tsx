"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Menu, Search, ArrowRight } from "lucide-react";

export default function ImdbConnectDemo() {
  const [phase, setPhase] = useState<"app_before" | "config" | "app_after">("app_before");
  const [apiKey, setApiKey] = useState("");
  const [isActivatePressed, setIsActivatePressed] = useState(false);
  const [showRatings, setShowRatings] = useState(false);

  // --- MOCK MOVIES ---
  const movies = [
    { title: "Geetha Govindam", image: "/images/demo/geetha.webp", rating: "7.7" },
    { title: "Iron Man", image: "/images/demo/iron.webp", rating: "7.1" }, 
    { title: "Doctor Strange", image: "/images/demo/ds.webp", rating: "7.5" }, 
    { title: "Loki", image: "/images/demo/loki.webp", rating: "6.1" }, 
    { title: "Guardians of the Galaxy", image: "/images/demo/gotg.webp", rating: "8.0" },
  ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const runStory = async () => {
      setPhase("app_before");
      setApiKey("");
      setIsActivatePressed(false);
      setShowRatings(false);

      await wait(2000);

      setPhase("config");
      await wait(800);
      await typeText("419b1799", setApiKey);
      await wait(500);
      setIsActivatePressed(true);
      await wait(200);
      setIsActivatePressed(false);
      await wait(1000);

      setPhase("app_after");
      await wait(800);
      setShowRatings(true);
      
      await wait(5000);
      runStory();
    };

    const typeText = (text: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
      return new Promise<void>((resolve) => {
        let i = 0;
        const loop = () => {
          if (i < text.length) {
            setter(text.slice(0, i + 1));
            i++;
            timeout = setTimeout(loop, 80 + Math.random() * 50);
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

  // --- STYLES ---
  const badgeStyle = {
    position: "absolute",
    top: "6px",
    right: "6px",
    background: "#00000090",
    borderRadius: "4px",
    padding: "3px 5px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "3px",
    zIndex: 1000,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
    border: "none",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    lineHeight: "1",
    whiteSpace: "nowrap",
  } as React.CSSProperties;

  return (
    <div className="w-full max-w-xl mx-auto h-[480px] md:h-[500px] relative font-sans text-sm antialiased perspective-[1000px] bg-black rounded-xl overflow-hidden border border-[#222] shadow-2xl">
      
      {/* === SCENE: HOTSTAR INTERFACE === */}
      <div 
        className={`absolute inset-0 bg-[#0f1014] flex flex-col transition-all duration-700 ease-in-out transform
          ${phase === 'config' 
            ? 'scale-95 opacity-30 blur-sm brightness-50' 
            : 'scale-100 opacity-100 blur-0 brightness-100'}
        `}
      >
        {/* Navbar */}
        <div className="h-14 md:h-16 flex items-center justify-between px-4 md:px-8 bg-gradient-to-b from-black/90 to-transparent z-20 absolute top-0 left-0 right-0">
           <div className="flex gap-4 md:gap-8 items-center">
             <Menu className="w-5 h-5 text-gray-300" />
             <div className="hidden md:flex gap-6 text-xs font-bold text-gray-300">
                <span>TV</span>
                <span>Movies</span>
                <span>Sports</span>
             </div>
           </div>
           <div className="flex items-center gap-4 text-gray-300">
              <Search className="w-5 h-5" />
              <div className="relative w-7 h-7 rounded-full overflow-hidden">
                <Image 
                  src="/images/demo/hotstarprofile.png" 
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
           </div>
        </div>

        {/* Hero Section */}
        <div className="relative h-[60%] md:h-[65%] w-full bg-[#1a1c24] overflow-hidden group">
           {/* Hero Image */}
           <div className="absolute inset-0">
              <Image 
                src={movies[0].image} 
                alt={movies[0].title} 
                fill
                className="object-cover object-top opacity-80" 
              />
           </div>
           <div className="absolute inset-0 bg-gradient-to-t from-[#0f1014] via-[#0f1014]/40 to-transparent z-[2]" />
           <div className="absolute inset-0 bg-gradient-to-r from-[#0f1014]/80 via-transparent to-transparent z-[2]" />
           
           {/* Hero Content */}
           <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-[3] max-w-[90%] md:max-w-[500px]">
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 md:mb-3 tracking-tight">{movies[0].title.toUpperCase()}</h1>
              
              <div className="flex flex-wrap items-center gap-2 md:gap-3 text-[10px] md:text-xs text-gray-300 mb-4 font-medium">
                 <span>2018</span>
                 <span>U/A 13+</span>
                 <span className="hidden md:inline">2h 20m</span>
                 <span>Romance, Drama</span>
                 
                 <div 
                    className={`flex items-center bg-black/50 rounded px-1.5 py-0.5 gap-1 transition-all duration-500 transform
                      ${showRatings ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
                    `}
                 >
                    <Star className="w-3 h-3 text-[#FFD700] fill-[#FFD700]" />
                    <span className="text-white font-bold">{movies[0].rating}</span>
                 </div>
              </div>

              <div className="flex gap-2 md:gap-3">
                 <button className="bg-white text-black px-4 py-2 md:px-6 md:py-3 rounded flex items-center gap-2 font-bold hover:bg-gray-200 transition-colors text-xs md:text-sm">
                    <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-black border-b-[5px] border-b-transparent ml-0.5"></div>
                    Watch
                 </button>
                 <button className="bg-white/10 text-white px-3 py-2 md:px-4 md:py-3 rounded flex items-center gap-2 font-bold hover:bg-white/20 transition-colors text-xs md:text-sm">
                    + <span className="hidden md:inline">My List</span>
                 </button>
              </div>
           </div>
        </div>

        {/* Rows */}
        <div className="px-4 md:px-8 relative z-10 flex-1 mt-1 md:mt-2">
           <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
              {movies.slice(1).map((movie, i) => (
                 <div 
                   key={i} 
                   className={`aspect-[2.2/3] rounded-lg relative overflow-hidden bg-[#222] group cursor-pointer ring-0 hover:ring-2 ring-white/50 transition-all ${
                     i >= 3 ? 'hidden md:block' : ''
                   }`}
                 >
                    <Image 
                      src={movie.image} 
                      alt={movie.title} 
                      fill
                      className="object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                    <div 
                       style={badgeStyle}
                       className={`transition-all duration-500 transform origin-top-right
                          ${showRatings ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
                       `}
                    >
                       <Star className="w-2.5 h-2.5 text-[#FFD700] fill-[#FFD700]" />
                       <span className="text-white font-bold text-[10px] md:text-xs">{movie.rating}</span>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>


      {/* === SCENE: EXTENSION POPUP (MATCHING SCREENSHOT) === */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[320px] bg-[#0c0e14] border border-[#2e323e] rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-500 transform font-sans
          ${phase === 'config' 
            ? 'opacity-100 scale-100 translate-y-[-50%]' 
            : 'opacity-0 scale-95 translate-y-[-40%] pointer-events-none'}
        `}
      >
        <div className="p-6 space-y-6">
           {/* Header Text */}
           <div>
              <h2 className="text-white text-xl font-bold tracking-tight mb-1">IMDb Connect</h2>
              <p className="text-[#888] text-[11px] leading-relaxed">
                 Instant IMDb ratings, seamlessly integrated. Stop guessing, start watching.
              </p>
           </div>

           {/* API Input */}
           <div className="space-y-2">
              <label className="text-[#888] font-bold text-[10px]">OMDb API key</label>
              <div className="bg-[#0d0e12] border border-[#2e323e] rounded-lg h-12 flex items-center px-4 relative">
                 <span className="text-white font-mono text-sm tracking-wide">{apiKey}</span>
                 {phase === 'config' && apiKey.length < 8 && <span className="animate-pulse w-1.5 h-5 bg-white ml-0.5" />}
                 
                 {/* Inner Badge */}
                 <div className="absolute right-3 bg-[#1e2029] text-[#888] text-[9px] font-bold px-2 py-1 rounded">
                    API KEY
                 </div>
              </div>
              
              {/* Link */}
              <div className="flex items-center text-blue-500 text-[11px] font-medium cursor-pointer hover:underline gap-1">
                 <span>Get free API key</span>
                 <ArrowRight className="w-3 h-3" />
              </div>
           </div>

           {/* Button */}
           <button 
              className={`w-full h-11 rounded-full font-bold text-xs tracking-wider transition-all duration-200 shadow-lg
                 ${isActivatePressed ? 'bg-gray-200 scale-95' : 'bg-white hover:bg-gray-100'}
                 text-black flex items-center justify-center
              `}
           >
              ACTIVATE RATINGS
           </button>
           
           {/* Divider */}
           <div className="h-px bg-[#2e323e] w-full my-2"></div>

           {/* Footer */}
           <div className="flex justify-between items-center pt-1">
              <span className="text-[#666] text-[10px]">© N3XT</span>
              <button className="border border-[#2e323e] text-[#888] text-[10px] px-3 py-1 rounded-full hover:bg-[#1e2029] transition-colors">
                 Clear Cache
              </button>
           </div>
        </div>
      </div>

    </div>
  );
}