"use client";

import { useState } from 'react';
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Wallet, ShoppingBasket, ReceiptText, Code, BarChart3, FileText, BookOpen, LineChart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Poppins } from 'next/font/google';
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { HeaderNavItemsType } from "@/types/types";

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['600', '700']
});

// Regular nav items
const mainNavItems: HeaderNavItemsType[] = [
  {
    label: "Analytics",
    value: "analysis",
    icon: BarChart3
  },
  {
    label: "Visualizations",
    value: "visualizations/market-risk-radar",
    icon: LineChart
  },
  {
    label: "Data",
    value: "data",
    icon: FileText
  },
  {
    label: "Documentation",
    value: "documentation",
    icon: BookOpen
  }
];

// External links with emojis
const externalLinks = [
  {
    label: ShoppingBasket,
    title: "OpenSea",
    href: "https://opensea.io"
  },
  {
    label: ReceiptText,
    title: "Smart Contract",
    href: "https://etherscan.io"
  }
];

export function Header() {
  const pathname = usePathname();
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleConnectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsWalletConnected(true);
      } catch (error) {
        console.error('User rejected connection');
      }
    } else {
      window.open('https://metamask.io', '_blank');
    }
  };

  return (
    <header className="border-b bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group mr-8">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-0.5 rounded-full 
                            group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
              <div className="bg-white dark:bg-slate-950 rounded-full p-0.5">
                <Image
                  src="/rug-watch-dog-circle.png"
                  alt="RugWatchDog Logo"
                  width={32}
                  height={32}
                  className="rounded-full transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <span className={`text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 
                             text-transparent bg-clip-text group-hover:from-blue-500 
                             group-hover:to-purple-500 transition-all duration-300
                             ${poppins.className}`}>
              RugWatchDog
            </span>
          </Link>

          {/* Main Navigation */}
          <nav className="flex-1 max-w-lg mx-auto">
            <ul className="flex justify-center gap-1">
              {mainNavItems.map((item) => {
                const isActive = pathname.includes(item.value);
                return (
                  <li key={item.value}>
                    <Link
                      href={`/${item.value}`}
                      className={`
                        flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium
                        transition-all duration-300 transform hover:scale-105
                        ${isActive 
                          ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 shadow-sm"
                          : "hover:bg-slate-50 dark:hover:bg-slate-900"
                        }
                        hover:shadow-md hover:shadow-blue-500/5
                      `}
                    >
                      <item.icon className={`h-3 w-3 transition-colors duration-300
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

          {/* Right section with external links and buttons */}
          <div className="flex items-center gap-2">
            {/* External Links */}
            {externalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                title={link.title}
                className="flex items-center px-2 py-1 rounded-lg text-[11px] font-medium
                          hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-300
                          transform hover:scale-105"
              >
                <link.label className="h-4 w-4" />
              </Link>
            ))}

            {/* Wallet and other buttons */}
            <Button
              onClick={handleConnectWallet}
              variant={isWalletConnected ? "outline" : "default"}
              className="flex items-center gap-1 text-[11px] py-1 px-2"
            >
              <Wallet className="h-3 w-3" />
              <span>{isWalletConnected ? "Connected" : "Connect Wallet"}</span>
            </Button>
            <ModeToggle />
            <Link
              href="https://github.com/mollybeach/rug-watch-dog"
              className="flex items-center gap-1 text-[11px] text-muted-foreground
                        px-2 py-1 rounded-lg transition-all duration-300
                        hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10
                        hover:text-foreground hover:shadow-md hover:shadow-purple-500/5
                        transform hover:scale-105"
            >
              <GitHubLogoIcon className="h-3 w-3" />
              <span className="font-medium">GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}