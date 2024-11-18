/**
 * @title Data Page
 * @fileoverview Data page component
 * @path /lib/data/page.tsx
 */

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Database,
  Table2,
  FileSpreadsheet,
  BarChart3,
  Network,
  GitGraph,
} from "lucide-react";

const DataPage: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      <div className="mb-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-xl blur-3xl -z-10" />
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gradient-to-r from-green-500 to-teal-500 p-3 rounded-xl">
            <Database className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-teal-600 text-transparent bg-clip-text">
              RNA-Seq Data
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Experimental data from{" "}
              <span className="font-medium text-green-600 dark:text-green-400">CsA</span>
              {" "}and{" "}
              <span className="font-medium text-teal-600 dark:text-teal-400">VOC</span>
              {" "}treatments
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="summary" className="space-y-6">
        <TabsList className="bg-slate-100 dark:bg-slate-800/50 p-1 gap-2">
          {[
            { id: "summary", icon: Table2, label: "Summary" },
            { id: "raw", icon: FileSpreadsheet, label: "Raw Data" },
            { id: "processed", icon: BarChart3, label: "Processed Data" },
            { id: "metadata", icon: GitGraph, label: "Metadata" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 
                         data-[state=active]:text-green-600 dark:data-[state=active]:text-green-400
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

        <TabsContent value="summary" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow border-t-4 border-t-green-500">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Database className="h-5 w-5 text-green-500" />
                CsA vs Control
              </h3>
              <dl className="space-y-4">
                {[
                  { label: "DEGs", value: "1,492" },
                  { label: "FDR Threshold", value: "0.05" },
                  { label: "Top Pathway", value: "Cell Cycle" },
                  { label: "Pathway FDR", value: "2.788e-17" },
                ].map((metric) => (
                  <div key={metric.label} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                    <dt className="text-sm text-muted-foreground mb-1">{metric.label}</dt>
                    <dd className="text-lg font-semibold">{metric.value}</dd>
                  </div>
                ))}
              </dl>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-t-4 border-t-teal-500">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Database className="h-5 w-5 text-teal-500" />
                VOC vs Control
              </h3>
              <dl className="space-y-4">
                {[
                  { label: "DEGs", value: "489" },
                  { label: "FDR Threshold", value: "0.05" },
                  { label: "Top Pathway", value: "Protein Processing in ER" },
                  { label: "Pathway FDR", value: "2.604e-16" },
                ].map((metric) => (
                  <div key={metric.label} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                    <dt className="text-sm text-muted-foreground mb-1">{metric.label}</dt>
                    <dd className="text-lg font-semibold">{metric.value}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </div>

          <Card className="p-6 border-t-4 border-t-blue-500">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Network className="h-5 w-5 text-blue-500" />
              Dataset Overview
            </h2>
            <div className="prose max-w-none dark:prose-invert">
              <p>
                This dataset contains RNA sequencing data from experiments comparing 
                Cyclosporin A (CsA) and Voclosporin (VOC) treatments against control groups.
                Key features include:
              </p>
              <ul>
                <li>Total genes measured: 15,359</li>
                <li>Multiple biological replicates per condition</li>
                <li>Comprehensive pathway analysis</li>
                <li>Quality-controlled and normalized data</li>
              </ul>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="raw">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Raw Data Files</h2>
            <p>Raw data content will go here...</p>
          </Card>
        </TabsContent>

        <TabsContent value="processed">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Processed Data</h2>
            <p>Processed data content will go here...</p>
          </Card>
        </TabsContent>

        <TabsContent value="metadata">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Experiment Metadata</h2>
            <p>Metadata content will go here...</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default DataPage;
