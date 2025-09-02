import { Card, CardContent } from "../ui/card";
import { ServiceImage } from "./ServiceImages";

export const FeaturedServices = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="overflow-hidden">
        <div className="aspect-video relative">
          <ServiceImage 
            service="hydratingTherapy" 
            className="object-cover w-full h-full" 
          />
        </div>
        <CardContent className="p-4">
          <h3>Hydrating Skin Therapy</h3>
          <p className="text-muted-foreground">
            Restore your skin's natural moisture balance with our advanced hydrating therapy treatment.
          </p>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden">
        <div className="aspect-video relative">
          <ServiceImage 
            service="skinAnalysis" 
            className="object-cover w-full h-full" 
          />
        </div>
        <CardContent className="p-4">
          <h3>Skin Analysis & Consultation</h3>
          <p className="text-muted-foreground">
            Our expert dermatologists provide comprehensive skin analysis and personalized treatment plans.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};