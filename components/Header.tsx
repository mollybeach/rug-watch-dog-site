"use client";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { BarChart, Home, FileText, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Poppins } from 'next/font/google';
import { ModeToggle } from "./ModeToggle";

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['600', '700']  // You can adjust weights as needed
});

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { value: "analysis", icon: BarChart, label: "Analysis" },
    { value: "visualizations", icon: Home, label: "Visualizations" },
    { value: "data", icon: FileText, label: "Data" },
    { value: "documentation", icon: BookOpen, label: "Documentation" },
  ];

  const getCurrentTab = () => {
    const path = pathname.split("/")[1];
    return path || "analysis";
  };

  return (
    <header className="border-b bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group mr-16">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-1 rounded-full 
                            group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
              <div className="bg-white dark:bg-slate-950 rounded-full p-0.5">
                <Image
                  src="/logo.png"
                  alt="RNA Analysis Logo"
                  width={45}
                  height={44}
                  className="rounded-full transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <span className={`text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
                             text-transparent bg-clip-text group-hover:from-blue-500 
                             group-hover:to-purple-500 transition-all duration-300
                             ${poppins.className}`}>
              RNAlytics
            </span>
          </Link>

          <nav className="flex-1 max-w-xl mx-auto">
            <ul className="flex justify-center gap-2">
              {navItems.map((item) => {
                const isActive = getCurrentTab() === item.value;
                return (
                  <li key={item.value}>
                    <Link
                      href={`/${item.value}`}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                        transition-all duration-300 transform hover:scale-105
                        ${isActive 
                          ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 shadow-sm"
                          : "hover:bg-slate-50 dark:hover:bg-slate-900"
                        }
                        hover:shadow-md hover:shadow-blue-500/5
                      `}
                    >
                      <item.icon className={`h-4 w-4 transition-colors duration-300
                        ${isActive 
                          ? "text-blue-600 dark:text-blue-400" 
                          : "text-slate-500 dark:text-slate-400"
                        }`} 
                      />
                      <span className={`${isActive 
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
                        : "bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text"
                      }`}>
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link
              href="https://github.com/aryehky/CsA-VOC-RNASeq-Anaylsis"
              className="flex items-center gap-2 text-sm text-muted-foreground
                         px-4 py-2 rounded-lg transition-all duration-300
                         hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10
                         hover:text-foreground hover:shadow-md hover:shadow-purple-500/5
                         transform hover:scale-105"
            >
              <GitHubLogoIcon className="h-5 w-5" />
              <span className="font-medium">GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}