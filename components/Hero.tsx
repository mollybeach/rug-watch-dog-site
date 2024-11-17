import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export function Hero() {
  return (
    <div className="relative py-6">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-3xl -z-10" />
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-20 scale-[200%]" />
          <div className="relative borde bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full">
            <div className="bg-white dark:bg-slate-950 rounded-full p-1">
              <Image
                src="/logo.png"
                alt="RNA Sequencing Analysis"
                width={100}
                height={100}
                className="rounded-full"
                priority
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className={`text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 
                          text-transparent bg-clip-text ${poppins.className}`}>
            RNAlytics
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Analysis of RNA-seq data comparing the effects of{" "}
            <span className="font-medium text-blue-600 dark:text-blue-400">Cyclosporin A (CsA)</span>
            {" "}and{" "}
            <span className="font-medium text-purple-600 dark:text-purple-400">Voclosporin (VOC)</span>
            {" "}treatments against control groups
          </p>
        </div>
      </div>
    </div>
  );
}
