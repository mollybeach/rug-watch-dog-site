import { Code2, BookOpen, Cpu, Network, BookOpenCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

const sections = [
  {
    title: "Smart Contract Analysis",
    icon: Code2,
    steps: [
      "Automated contract code scanning",
      "Vulnerability detection",
      "Ownership pattern analysis",
      "Permission verification"
    ]
  },
  {
    title: "Token Analysis",
    icon: Cpu,
    steps: [
      "Liquidity pool monitoring",
      "Trading volume patterns",
      "Holder distribution analysis",
      "Price manipulation detection"
    ]
  },
  {
    title: "Network Analysis",
    icon: Network,
    steps: [
      "Wallet clustering",
      "Transaction graph analysis",
      "Suspicious pattern detection",
      "Cross-chain tracking"
    ]
  }
];

const techStack = {
  "Frontend Stack": {
    "Next.js": "React framework for production",
    "Tailwind CSS": "Utility-first CSS framework",
    "shadcn/ui": "Reusable component library",
    "Web3.js": "Ethereum JavaScript API",
    "Ethers.js": "Ethereum library and wallet"
  },
  "Blockchain Stack": {
    "Solidity": "Smart contract development",
    "Hardhat": "Development environment",
    "OpenZeppelin": "Security standards",
    "The Graph": "Blockchain indexing"
  },
  "AI & Analysis": {
    "TensorFlow": "Machine learning models",
    "Python": "Data analysis",
    "GraphQL": "API queries",
    "MongoDB": "Data storage"
  }
};

const installSteps = [
  {
    command: "git clone https://github.com/mollybeach/rug-watch-dog.git",
    description: "Clone the repository"
  },
  {
    command: "pnpm install",
    description: "Install dependencies"
  },
  {
    command: "npx hardhat compile",
    description: "Compile smart contracts"
  }
];

export default function DocumentationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with gradient */}
      <div className="mb-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl blur-3xl -z-10" />
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-3 rounded-xl">
            <BookOpenCheck className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
              Documentation
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Comprehensive guide to the{" "}
              <span className="font-medium text-pink-600 dark:text-pink-400">RugWatchDog platform</span>
              {" "}and{" "}
              <span className="font-medium text-purple-600 dark:text-purple-400">security features</span>
            </p>
          </div>
        </div>
      </div>

      {/* Analysis Workflow */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
          Analysis Workflow
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {sections.map((section) => (
            <Card key={section.title} className="p-6 border-t-4 border-t-pink-500 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <section.icon className="h-6 w-6 text-pink-500" />
                <h3 className="text-xl font-semibold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                  {section.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {section.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="flex items-center gap-2">
                    <span className="text-sm text-pink-400">•</span>
                    <span className="text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
          Tech Stack
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {Object.entries(techStack).map(([category, tools]) => (
            <Card key={category} className="p-6 border-t-4 border-t-pink-500 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                {category}
              </h3>
              <ul className="space-y-3">
                {Object.entries(tools).map(([tool, description]) => (
                  <li key={tool} className="text-sm">
                    <span className="font-medium text-pink-500">{tool}</span>
                    <span className="text-muted-foreground block">{description}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* Installation */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
          Installation
        </h2>
        <Card className="bg-slate-950 p-6 space-y-4 border-t-4 border-t-pink-500">
          {installSteps.map((step, index) => (
            <div key={index} className="space-y-2">
              <p className="text-sm text-pink-300">{step.description}</p>
              <pre className="bg-slate-900 p-3 rounded">
                <code className="text-pink-400">{step.command}</code>
              </pre>
            </div>
          ))}
        </Card>
      </section>
    </div>
  );
}