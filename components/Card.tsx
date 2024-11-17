import { Card as UICard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

export function CardComponent({ title, type, content }: CardProps) {
  return (
    <UICard className="p-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      
      {type === 'treatment' && (
        <Tabs defaultValue="csa">
          <TabsList className="mb-4">
            <TabsTrigger value="csa">CsA</TabsTrigger>
            <TabsTrigger value="voc">VOC</TabsTrigger>
          </TabsList>
          <TabsContent value="csa">
            <dl className="space-y-2">
              <dt className="font-medium">DEGs</dt>
              <dd>{content.csaData?.degs}</dd>
              <dt className="font-medium mt-2">Top Pathway</dt>
              <dd>{content.csaData?.pathway}</dd>
            </dl>
          </TabsContent>
          <TabsContent value="voc">
            <dl className="space-y-2">
              <dt className="font-medium">DEGs</dt>
              <dd>{content.vocData?.degs}</dd>
              <dt className="font-medium mt-2">Top Pathway</dt>
              <dd>{content.vocData?.pathway}</dd>
            </dl>
          </TabsContent>
        </Tabs>
      )}

      {type === 'features' && (
        <>
          <ul className="space-y-2">
            {content.features?.map((feature, index) => (
              <li key={index}>• {feature}</li>
            ))}
          </ul>
          <Button className="w-full mt-4" variant="outline">
            View Analysis
          </Button>
        </>
      )}

      {type === 'visualizations' && (
        <div className="space-y-4">
          {content.buttons?.map((button, index) => (
            <Button key={index} className="w-full" variant="outline">
              {button}
            </Button>
          ))}
        </div>
      )}
    </UICard>
  );
}
