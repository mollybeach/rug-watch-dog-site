import { Card as UICard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { BarChart, Network, LineChart } from "lucide-react";

type CardProps = {
  title: string;
  type: 'treatment' | 'features' | 'visualizations';
  content: {
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
};

const vizIcons = {
  volcano: BarChart,
  pathway: Network,
  deg: LineChart,
};

export function CardComponent({ title, type, content }: CardProps) {
  return (
    <UICard className="p-2">
      <h2 className="text-xs font-semibold mb-2">{title}</h2>
      
      {type === 'treatment' && (
        <Tabs defaultValue="csa">
          <TabsList className="mb-2 h-7">
            <TabsTrigger value="csa" className="text-[10px]">CsA</TabsTrigger>
            <TabsTrigger value="voc" className="text-[10px]">VOC</TabsTrigger>
          </TabsList>
          <TabsContent value="csa">
            <dl className="space-y-0.5 text-[10px]">
              <dt className="font-medium">DEGs</dt>
              <dd className="text-muted-foreground">{content.csaData?.degs}</dd>
              <dt className="font-medium mt-0.5">Top Pathway</dt>
              <dd className="text-muted-foreground">{content.csaData?.pathway}</dd>
            </dl>
          </TabsContent>
          <TabsContent value="voc">
            <dl className="space-y-0.5 text-[10px]">
              <dt className="font-medium">DEGs</dt>
              <dd className="text-muted-foreground">{content.vocData?.degs}</dd>
              <dt className="font-medium mt-0.5">Top Pathway</dt>
              <dd className="text-muted-foreground">{content.vocData?.pathway}</dd>
            </dl>
          </TabsContent>
        </Tabs>
      )}

      {type === 'features' && (
        <>
          <ul className="space-y-0.5 text-[10px]">
            {content.features?.map((feature, index) => (
              <li key={index} className="flex items-center gap-1">
                <span className="h-0.5 w-0.5 rounded-full bg-blue-500" />
                {feature}
              </li>
            ))}
          </ul>
          <Button className="w-full mt-2 text-[10px] h-6" variant="outline">
            View Analysis
          </Button>
        </>
      )}

      {type === 'visualizations' && (
        <div className="space-y-1">
          {content.buttons?.map((button, index) => {
            const vizType = button.toLowerCase().split(' ')[0];
            const Icon = vizIcons[vizType as keyof typeof vizIcons];
            return (
              <Link 
                key={index}
                href={`/visualizations?view=${vizType}`} 
                className="w-full"
              >
                <Button 
                  className="w-full text-[10px] h-6 group"
                  variant="outline"
                >
                  <Icon className="mr-1 h-2.5 w-2.5 group-hover:text-blue-500 transition-colors" />
                  {button}
                </Button>
              </Link>
            );
          })}
        </div>
      )}
    </UICard>
  );
}
