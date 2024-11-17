import Image from "next/image";

export function Hero() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="border-8 border-[#e30b5d] rounded-full">
        <Image
          src="/logo.png"
          alt="RNA Sequencing Analysis"
          width={175}
          height={173}
          className="rounded-lg"
          priority
        />
      </div>
      <h1 className="text-3xl font-bold">CsA-VOC-RNASeq-Analysis</h1>
      <p className="text-base text-muted-foreground max-w-2xl">
        Analysis of RNA-seq data comparing the effects of Cyclosporin A (CsA) and
        Voclosporin (VOC) treatments against control groups
      </p>
    </div>
  );
}
