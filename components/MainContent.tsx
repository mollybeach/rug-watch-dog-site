"use client";
import { BarChart3, LineChart } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface FeatureCard {
  title: string;
  description: string;
  icon: typeof BarChart3;
  href: string;
}

const features: FeatureCard[] = [
  {
    title: "NFT Analytics",
    description: "Track and analyze NFT market trends",
    icon: BarChart3,
    href: "/analytics"
  },
  {
    title: "Price History",
    description: "View historical price data",
    icon: LineChart,
    href: "/prices"
  }
];

export function MainContent() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {features.map((feature) => (
        <Card key={feature.title} className="p-6 hover:shadow-lg transition-shadow">
          <Link href={feature.href} className="space-y-3">
            <div className="flex items-center space-x-3">
              <feature.icon className="h-6 w-6" />
              <h3 className="font-semibold">{feature.title}</h3>
            </div>
            <p className="text-sm text-gray-500">{feature.description}</p>
          </Link>
        </Card>
      ))}
    </div>
  );
}