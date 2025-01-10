import { Shield } from "lucide-react";
//import dynamic from "next/dynamic";

{/*
const NFTMarketAnalytics = dynamic(
  () => import("@/components/NFTMarketAnalytics"),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse">
        <div className="h-[300px] bg-slate-100 dark:bg-slate-800/50 rounded-lg mb-4" />
      </div>
    )
  }
);
*/}
export default function AnalysisPage() {
  return (
    <div className="container mx-auto p-8">
      <div className="mb-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl blur-3xl -z-10" />
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-3 rounded-xl">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
              Security Analysis
            </h1>
            <p className="text-muted-foreground">
              Real-time analysis of NFT market trends and risks
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}