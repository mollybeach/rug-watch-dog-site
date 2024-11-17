import { GitHubLogoIcon, HomeIcon, BarChartIcon, FileTextIcon, ReaderIcon } from "@radix-ui/react-icons"
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className=" border-4 border-[#e30b5d] rounded-full">
              <Image
                src="/logo.png"
                alt="RNA Analysis Logo"
                width={45}
                height={44}
                className="rounded-lg"
            />
            </div>
            <span className="text-xl font-bold">CsA-VOC-RNASeq</span>
          </Link>
        </div>

        <Tabs defaultValue="analysis" className="flex-1 max-w-xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analysis" className="flex items-center gap-2">
              <BarChartIcon className="h-4 w-4" />
              Analysis
            </TabsTrigger>
            <TabsTrigger value="visualizations" className="flex items-center gap-2">
              <HomeIcon className="h-4 w-4" />
              Visualizations
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-2">
              <FileTextIcon className="h-4 w-4" />
              Data
            </TabsTrigger>
            <TabsTrigger value="documentation" className="flex items-center gap-2">
              <ReaderIcon className="h-4 w-4" />
              Documentation
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-4">
          <Link 
            href="https://github.com/aryehky/CsA-VOC-RNASeq-Anaylsis"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <GitHubLogoIcon className="h-5 w-5" />
            GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}