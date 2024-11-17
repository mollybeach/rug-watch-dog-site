import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Code2,
  Database,
  FileCode2,
  FlaskConical,
  GitFork,
  Library,
  Terminal,
  Clock,
  Users,
} from "lucide-react";

export default function DocumentationPage() {
  return (
    <div className="container mx-auto p-8">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-2">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <div className="h-8 w-[2px] rounded-full bg-gradient-to-b from-blue-500 to-purple-500" />
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Documentation
          </h1>
        </div>
        
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Comprehensive guide to the{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            CsA-VOC RNA-Seq Analysis
          </span>{" "}
          project, providing detailed insights into our bioinformatics pipeline and analysis workflows.
        </p>
        
        <div className="flex gap-4 mt-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Last updated: March 2024</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>For researchers & developers</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="getting-started" className="space-y-4">
        <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full">
          <TabsTrigger value="getting-started" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Getting Started
          </TabsTrigger>
          <TabsTrigger value="tech-stack" className="flex items-center gap-2">
            <Code2 className="h-4 w-4" />
            Tech Stack
          </TabsTrigger>
          <TabsTrigger value="data-analysis" className="flex items-center gap-2">
            <FlaskConical className="h-4 w-4" />
            Analysis Guide
          </TabsTrigger>
          <TabsTrigger value="api-reference" className="flex items-center gap-2">
            <FileCode2 className="h-4 w-4" />
            API Reference
          </TabsTrigger>
        </TabsList>

        <TabsContent value="getting-started">
          <div className="grid gap-4">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Project Setup</h2>
              <div className="prose max-w-none dark:prose-invert">
                <h3>Prerequisites</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-md">
                      🐍
                    </div>
                    <span className="font-medium">Python 3.8+</span>
                  </li>
                  <li className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-md">
                      💻
                    </div>
                    <span className="font-medium">Node.js 18+</span>
                  </li>
                  <li className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                    <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-md">
                      🔄
                    </div>
                    <span className="font-medium">Git</span>
                  </li>
                </ul>

                <h3>Installation</h3>
                <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                  <code>{`# Clone the repository
git clone https://github.com/aryehky/CsA-VOC-RNASeq-Analysis.git

# Install Python dependencies
python -m venv venv
source venv/bin/activate  # or 'venv\\Scripts\\activate' on Windows
pip install -r requirements.txt

# Install Node.js dependencies
npm install`}</code>
                </pre>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Project Structure</h2>
              <div className="prose max-w-none dark:prose-invert">
                <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                  <code>{`project-root/
├── app/                 # Next.js pages
├── components/          # React components
├── data/               # Data files
│   ├── raw/            # Raw datasets
│   └── processed/      # Processed data
├── notebooks/          # Jupyter notebooks
├── src/                # Source code
│   ├── api/            # Backend API
│   └── utils/          # Utility functions
└── tests/              # Test files`}</code>
                </pre>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tech-stack">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Frontend Stack */}
            <Card className="p-6 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Library className="h-6 w-6 text-blue-500" />
                <span className="bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">Frontend Stack</span>
              </h2>
              <ul className="space-y-4">
                {[
                  { name: "Next.js", desc: "React framework for production", icon: "⚡" },
                  { name: "Tailwind CSS", desc: "Utility-first CSS framework", icon: "🎨" },
                  { name: "shadcn/ui", desc: "Reusable component library", icon: "🧩" },
                  { name: "Chart.js", desc: "Data visualization", icon: "📊" },
                  { name: "Plotly.js", desc: "Interactive scientific charts", icon: "📈" },
                ].map((item) => (
                  <li key={item.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <strong className="text-blue-600 dark:text-blue-400">{item.name}:</strong>
                      <span className="ml-1 text-slate-600 dark:text-slate-300">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Backend Stack */}
            <Card className="p-6 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Database className="h-6 w-6 text-green-500" />
                <span className="bg-gradient-to-r from-green-500 to-green-700 text-transparent bg-clip-text">Backend Stack</span>
              </h2>
              <ul className="space-y-4">
                {[
                  { name: "FastAPI", desc: "Modern Python web framework", icon: "🚀" },
                  { name: "Pandas", desc: "Data manipulation and analysis", icon: "🐼" },
                  { name: "NumPy", desc: "Scientific computing", icon: "🔢" },
                  { name: "SciPy", desc: "Statistical analysis", icon: "📐" },
                  { name: "Matplotlib", desc: "Static visualizations", icon: "📉" },
                ].map((item) => (
                  <li key={item.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <strong className="text-green-600 dark:text-green-400">{item.name}:</strong>
                      <span className="ml-1 text-slate-600 dark:text-slate-300">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Development Tools */}
            <Card className="p-6 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Terminal className="h-6 w-6 text-purple-500" />
                <span className="bg-gradient-to-r from-purple-500 to-purple-700 text-transparent bg-clip-text">Development Tools</span>
              </h2>
              <ul className="space-y-4">
                {[
                  { name: "ESLint", desc: "JavaScript linting", icon: "🔍" },
                  { name: "Pytest", desc: "Python testing", icon: "🧪" },
                  { name: "Jest", desc: "JavaScript testing", icon: "✅" },
                  { name: "TypeScript", desc: "Type safety", icon: "📝" },
                ].map((item) => (
                  <li key={item.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <strong className="text-purple-600 dark:text-purple-400">{item.name}:</strong>
                      <span className="ml-1 text-slate-600 dark:text-slate-300">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Deployment */}
            <Card className="p-6 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <GitFork className="h-6 w-6 text-orange-500" />
                <span className="bg-gradient-to-r from-orange-500 to-orange-700 text-transparent bg-clip-text">Deployment</span>
              </h2>
              <ul className="space-y-4">
                {[
                  { name: "Vercel", desc: "Frontend hosting", icon: "▲" },
                  { name: "Docker", desc: "Containerization", icon: "🐳" },
                  { name: "GitHub Actions", desc: "CI/CD", icon: "🔄" },
                ].map((item) => (
                  <li key={item.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <strong className="text-orange-600 dark:text-orange-400">{item.name}:</strong>
                      <span className="ml-1 text-slate-600 dark:text-slate-300">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="data-analysis">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <FlaskConical className="h-6 w-6 text-blue-500" />
              Analysis Workflow
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Data Preprocessing */}
              <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-lg border border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <div className="bg-blue-100 dark:bg-blue-900 w-8 h-8 rounded-full flex items-center justify-center text-blue-700 dark:text-blue-300">1</div>
                  Data Preprocessing
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span>Quality control of raw RNA-seq data</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span>Read alignment and quantification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span>Normalization procedures</span>
                  </li>
                </ul>
              </div>

              {/* Differential Expression Analysis */}
              <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-lg border border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <div className="bg-green-100 dark:bg-green-900 w-8 h-8 rounded-full flex items-center justify-center text-green-700 dark:text-green-300">2</div>
                  Differential Expression Analysis
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span>Statistical methods for DEG identification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span>Fold change calculation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span>Multiple testing correction</span>
                  </li>
                </ul>
              </div>

              {/* Pathway Analysis */}
              <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-lg border border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <div className="bg-purple-100 dark:bg-purple-900 w-8 h-8 rounded-full flex items-center justify-center text-purple-700 dark:text-purple-300">3</div>
                  Pathway Analysis
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    <span>KEGG pathway mapping</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    <span>Gene Ontology enrichment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    <span>Network analysis</span>
                  </li>
                </ul>
              </div>

              {/* Visualization */}
              <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-lg border border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <div className="bg-orange-100 dark:bg-orange-900 w-8 h-8 rounded-full flex items-center justify-center text-orange-700 dark:text-orange-300">4</div>
                  Visualization
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span>Volcano plots</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span>Heatmaps</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span>Pathway diagrams</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="api-reference">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <FileCode2 className="h-6 w-6 text-blue-500" />
              API Documentation
            </h2>
            <div className="space-y-6">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Endpoints</h3>
              </div>

              {/* GET /api/analysis/degs */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">GET</span>
                  <h4 className="text-lg font-medium">/api/analysis/degs</h4>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="border-b border-slate-200 dark:border-slate-800 p-4">
                    <p className="text-slate-600 dark:text-slate-300">Retrieve differential expression analysis results</p>
                  </div>
                  <pre className="p-4 overflow-x-auto">
                    <code className="text-sm">{`{
  "parameters": {
    "comparison": "string (csa_vs_control | voc_vs_control)",
    "threshold": "number (default: 0.05)"
  }
}`}</code>
                  </pre>
                </div>
              </div>

              {/* GET /api/analysis/pathways */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">GET</span>
                  <h4 className="text-lg font-medium">/api/analysis/pathways</h4>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="border-b border-slate-200 dark:border-slate-800 p-4">
                    <p className="text-slate-600 dark:text-slate-300">Retrieve pathway analysis results</p>
                  </div>
                  <pre className="p-4 overflow-x-auto">
                    <code className="text-sm">{`{
  "parameters": {
    "comparison": "string",
    "pathwayId": "string (optional)"
  }
}`}</code>
                  </pre>
                </div>
              </div>

              {/* POST /api/analysis/custom */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">POST</span>
                  <h4 className="text-lg font-medium">/api/analysis/custom</h4>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="border-b border-slate-200 dark:border-slate-800 p-4">
                    <p className="text-slate-600 dark:text-slate-300">Run custom analysis</p>
                  </div>
                  <pre className="p-4 overflow-x-auto">
                    <code className="text-sm">{`{
  "body": {
    "genes": "string[]",
    "analysisType": "string",
    "parameters": "object"
  }
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
