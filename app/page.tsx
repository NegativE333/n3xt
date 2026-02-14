'use client'

import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ExtensionsSection } from "@/components/ExtensionsSection";
import { SiteFooter } from "@/components/SiteFooter";
import { projects } from "@/lib/projects";

export default function Home() {

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      <Nav />

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <Hero />
        <ExtensionsSection projects={projects} />
        <SiteFooter />

      </main>
    </div>
  );
}