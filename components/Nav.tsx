"use client";

import Image from "next/image";

export function Nav() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-neutral-900">
      <div className="flex items-center justify-center h-16">
        <div className="relative h-4 w-20">
          <Image
            src="/images/logo/n3xt-logo.png"
            alt="N3xt"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </nav>
  );
}

