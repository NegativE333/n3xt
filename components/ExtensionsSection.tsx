"use client";

import { useState } from "react";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import type { Project } from "../lib/projects";
import AliasDemo from "./demos/AliasDemo";
import ImdbConnectDemo from "./demos/ImdbConnectDemo";
import DraftDemo from "./demos/DraftDemo";

type Props = {
  projects: Project[];
};

const demoByName: Record<string, JSX.Element> = {
  Alias: <AliasDemo />,
  Draft: <DraftDemo />,
  "Hotstar IMDb Connect": <ImdbConnectDemo />,
};

export function ExtensionsSection({ projects }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  // Group projects by category
  const groupedProjects = projects.reduce((acc, project) => {
    const category = project.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(project);
    return acc;
  }, {} as Record<string, Project[]>);

  // Define category order
  const categoryOrder = ["Productivity", "Entertainment", "Other"];
  const orderedCategories = categoryOrder.filter(
    (cat) => groupedProjects[cat]?.length > 0
  );

  return (
    <section className="max-w-xl mx-auto space-y-16">
      {orderedCategories.map((category, categoryIndex) => {
        const categoryProjects = groupedProjects[category];
        const categoryNumber = String(categoryIndex + 1).padStart(2, "0");

        return (
          <div key={category} className="space-y-0.5">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-600 uppercase tracking-wider">
              <span>{categoryNumber}</span>
              <span className="h-px w-8 bg-neutral-800" />
              <span>{category}</span>
            </div>

            <div className="flex flex-col">
              {categoryProjects.map((project) => {
                const isExpanded = expanded === project.name;

          return (
            <div
              key={project.name}
              className="border-b border-neutral-900 hover:border-neutral-700 transition-colors duration-300"
            >
              {/* Main Row - Clickable */}
              <button
                onClick={() => setExpanded(isExpanded ? null : project.name)}
                className="group w-full flex items-baseline justify-between pb-3 pt-6 text-left"
              >
                <div className="flex flex-col items-start gap-1 flex-1">
                  <span className="text-xl font-medium group-hover:text-white transition-colors">
                    {project.name}
                  </span>
                  <span className="text-sm text-neutral-500 group-hover:text-neutral-400 transition-colors">
                    {project.description}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-neutral-700 border border-neutral-900 px-2 py-1 rounded">
                    {project.status}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className={`text-neutral-600 group-hover:text-white transition-all duration-300 ${
                      isExpanded
                        ? "rotate-90 text-white"
                        : "group-hover:translate-x-1 group-hover:-translate-y-1"
                    }`}
                  />
                </div>
              </button>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="overflow-hidden border-t border-neutral-900 pt-6 pb-6 space-y-6">
                  {demoByName[project.name] && (
                    <div className="space-y-3">
                      {demoByName[project.name]}
                    </div>
                  )}

                  {/* Features */}
                  {project.features && project.features.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono text-neutral-600 uppercase tracking-wider mb-2">
                        Features
                      </h4>
                      <ul className="space-y-2 max-w-xl text-sm leading-relaxed text-neutral-400 list-disc list-outside pl-5">
                        {project.features.map((feature: string, idx: number) => {
                          const parts = feature.split(":");
                          const text =
                            parts.length > 1
                              ? parts.slice(1).join(":").trim()
                              : feature;
                          return <li key={idx}>{text}</li>;
                        })}
                      </ul>
                    </div>
                  )}

                  {/* Links */}
                  {project.links && (
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      {project.links.chrome && (
                        <a
                          href={project.links.chrome}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 text-xs font-mono text-neutral-600 hover:text-white transition-colors border border-neutral-900 px-3 py-1.5 rounded hover:border-neutral-700"
                        >
                          <ExternalLink size={14} />
                          Chrome Web Store
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 text-xs font-mono text-neutral-600 hover:text-white transition-colors border border-neutral-900 px-3 py-1.5 rounded hover:border-neutral-700"
                        >
                          <Github size={14} />
                          GitHub
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}

