import { CardComponent } from "@/components/Card";

const cardsData = [
  {
    title: "Treatment Analysis",
    type: "treatment" as const,
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
    type: "features" as const,
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
    type: "visualizations" as const,
    content: {
      buttons: ["Volcano Plots", "Pathway Diagrams", "DEG Rankings"],
    },
  },
];

export function MainContent() {
  return (
    <main className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {cardsData.map((card, index) => (
        <CardComponent
          key={index}
          title={card.title}
          type={card.type}
          content={card.content}
        />
      ))}
    </main>
  );
}
