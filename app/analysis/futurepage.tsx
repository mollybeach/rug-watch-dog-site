/*import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart,
  GitGraph,
  Network,
  ScrollText,
  FlaskConical,
} from "lucide-react";

const AnalysisPage: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      <div className="mb-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-3xl -z-10" />
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl">
            <FlaskConical className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              RNA-Seq Analysis
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Comparative analysis of{" "}
              <span className="font-medium text-blue-600 dark:text-blue-400">Cyclosporin A (CsA)</span>
              {" "}and{" "}
              <span className="font-medium text-purple-600 dark:text-purple-400">Voclosporin (VOC)</span>
              {" "}treatments
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-slate-100 dark:bg-slate-800/50 p-1 gap-2">
          {[
            { id: "overview", icon: ScrollText, label: "Overview" },
            { id: "degs", icon: BarChart, label: "DEG Analysis" },
            { id: "pathways", icon: Network, label: "Pathway Analysis" },
            { id: "comparison", icon: GitGraph, label: "Treatment Comparison" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 
                         data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400
                         data-[state=active]:shadow-md transition-all duration-200
                         px-4 py-2"
            >
              <div className="flex items-center gap-2">
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="p-6 border-t-4 border-t-blue-500">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <ScrollText className="h-5 w-5 text-blue-500" />
              Project Overview
            </h2>
            <div className="prose max-w-none dark:prose-invert">
              <p>
                This analysis explores the effects of Cyclosporin A (CsA) and Voclosporin (VOC) 
                treatments through RNA sequencing data. The study focuses on:
              </p>
              <ul>
                <li>Differential gene expression analysis</li>
                <li>Pathway impact analysis</li>
                <li>Biological process enrichment</li>
                <li>Comparative treatment effects</li>
              </ul>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow border-t-4 border-t-purple-500">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <BarChart className="h-5 w-5 text-purple-500" />
                Key Metrics
              </h3>
              <dl className="grid grid-cols-2 gap-6">
                {[
                  { label: "Total Genes", value: "15,359" },
                  { label: "FDR Threshold", value: "0.05" },
                  { label: "CsA DEGs", value: "1,492" },
                  { label: "VOC DEGs", value: "489" },
                ].map((metric) => (
                  <div key={metric.label} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                    <dt className="text-sm text-muted-foreground mb-1">{metric.label}</dt>
                    <dd className="text-2xl font-bold text-slate-900 dark:text-slate-100">{metric.value}</dd>
                  </div>
                ))}
              </dl>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-t-4 border-t-green-500">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Network className="h-5 w-5 text-green-500" />
                Top Pathways
              </h3>
              <div className="space-y-6">
                {[
                  { name: "CsA vs Control", value: "Cell Cycle", fdr: "2.788e-17" },
                  { name: "VOC vs Control", value: "Protein Processing in ER", fdr: "2.604e-16" },
                ].map((pathway) => (
                  <div key={pathway.name} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                    <h4 className="font-medium text-slate-900 dark:text-slate-100">{pathway.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {pathway.value} (FDR = {pathway.fdr})
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="degs">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Differential Expression Analysis</h2>
            <p>DEG analysis content will go here...</p>
          </Card>
        </TabsContent>

        <TabsContent value="pathways">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Pathway Analysis</h2>
            <p>Pathway analysis content will go here...</p>
          </Card>
        </TabsContent>

        <TabsContent value="comparison">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Treatment Comparison</h2>
            <p>Treatment comparison content will go here...</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AnalysisPage;*/