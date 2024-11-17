import { BarChart, Network, LineChart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

type CardContent = {
  csaData?: {
    degs: string;
    pathway: string;
  };
  vocData?: {
    degs: string;
    pathway: string;
  };
  features?: string[];
  buttons?: string[];
};

type Card = {
  title: string;
  icon: LucideIcon;
  color: string;
  type: "treatment" | "features" | "visualizations";
  content: CardContent;
};

const cardsData: Card[] = [
  {
    title: "Treatment Analysis",
    icon: BarChart,
    color: "blue",
    type: "treatment",
    content: {
      csaData: {
        degs: "1,492 identified at FDR 0.05",
        pathway: "Cell Cycle (FDR = 2.788e-17)",
      },
      vocData: {
        degs: "489 identified at FDR 0.05",
        pathway: "Protein Processing in ER (FDR = 2.604e-16)",
      },
    },
  },
  {
    title: "Key Features",
    icon: Network,
    color: "purple",
    type: "features",
    content: {
      features: [
        "Differential gene expression analysis",
        "Pathway impact analysis",
        "GO term enrichment",
        "Disease association studies",
      ],
    },
  },
  {
    title: "Visualizations",
    icon: LineChart,
    color: "green",
    type: "visualizations",
    content: {
      buttons: ["Volcano Plots", "Pathway Diagrams", "DEG Rankings"],
    },
  },
];

export function MainContent() {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cardsData.map((card) => (
          <Card
            key={card.title}
            className={`p-6 hover:shadow-lg transition-shadow border-t-4 border-t-${card.color}-500`}
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <card.icon className={`h-5 w-5 text-${card.color}-500`} />
              {card.title}
            </h3>

            {card.type === "treatment" && card.content.csaData && card.content.vocData && (
              <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-600 dark:text-blue-400">CsA Analysis</h4>
                  <p className="text-sm text-muted-foreground mt-1">{card.content.csaData.degs}</p>
                  <p className="text-sm text-muted-foreground">{card.content.csaData.pathway}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-600 dark:text-purple-400">VOC Analysis</h4>
                  <p className="text-sm text-muted-foreground mt-1">{card.content.vocData.degs}</p>
                  <p className="text-sm text-muted-foreground">{card.content.vocData.pathway}</p>
                </div>
              </div>
            )}

            {card.type === "features" && card.content.features && (
              <ul className="space-y-3">
                {card.content.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 p-3 rounded-lg">
                    <div className={`w-1.5 h-1.5 rounded-full bg-${card.color}-500`} />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            {card.type === "visualizations" && card.content.buttons && (
              <div className="grid gap-3">
                {card.content.buttons.map((button) => {
                  const vizType = button.toLowerCase().split(' ')[0];
                  return (
                    <Link
                      key={button}
                      href={{
                        pathname: "/visualizations",
                        query: { view: vizType },
                      }}
                      className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 p-3 rounded-lg 
                                 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      {button}
                    </Link>
                  );
                })}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
