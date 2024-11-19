"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VisualizationType } from "@/types/types";
import { useRouter } from "next/navigation";

interface SideBarProps {
  visualizations: VisualizationType[];
  activeViz: string; // This should be the full path of the active visualization
  onNavigate: (vizId: string) => void; // Function to handle navigation
}

const SideBar: React.FC<SideBarProps> = ({ visualizations, activeViz, onNavigate }) => {
  const router = useRouter();

  return (
    <aside className="lg:w-72 xl:w-80">
      <div className="sticky top-6 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-2">
            Visualizations
          </h2>
          <p className="text-sm text-muted-foreground">
            Select a visualization type to explore the data
          </p>
        </div>

        <nav className="space-y-2">
          {visualizations.map((viz) => {
            // Check if the current tab matches the active visualization type
            const isActive = activeViz === viz.path; // Use activeViz here
            return (
              <Button
                key={viz.id}
                onClick={() => {
                  onNavigate(viz.id);
                  router.push(`/visualizations/${viz.path}`);
                }}
                variant="ghost"
                className={cn(
                  "w-full flex items-start gap-4 p-4 h-auto rounded-xl transition-all duration-200",
                  "hover:shadow-md hover:shadow-blue-500/5 hover:scale-[1.02]",
                  isActive
                    ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 shadow-sm"
                    : "hover:bg-slate-50 dark:hover:bg-slate-900"
                )}
              >
                <div className={cn(
                  "p-2 rounded-lg transition-colors",
                  isActive 
                    ? "bg-blue-500 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                )}>
                  <viz.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 text-left">
                  <div className={cn(
                    "font-medium mb-1",
                    isActive && "text-blue-600 dark:text-blue-400"
                  )}>
                    {viz.label}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {viz.description}
                  </p>
                </div>
              </Button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;