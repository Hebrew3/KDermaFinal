import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

export const FeaturedServices = () => {
  return (
    <div className="my-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Featured Services</h2>
        <Button variant="link" className="text-primary flex items-center">
          View all <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <div className="aspect-video relative">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Hydrating Skin Therapy"
              className="w-full h-full object-cover"
              type="therapy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="font-medium text-lg">Hydrating Skin Therapy</h3>
              <p className="text-sm text-white/80">Restore moisture balance to your skin</p>
            </div>
          </div>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm mb-4">
              Our advanced hydrating therapy uses hyaluronic acid and marine extracts to deeply moisturize and rejuvenate dehydrated skin.
            </p>
            <Button size="sm">Book Appointment</Button>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <div className="aspect-video relative">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Skin Analysis & Consultation"
              className="w-full h-full object-cover"
              type="analysis"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="font-medium text-lg">Skin Analysis & Consultation</h3>
              <p className="text-sm text-white/80">Personalized skin assessment</p>
            </div>
          </div>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm mb-4">
              Get a comprehensive skin analysis using advanced diagnostic tools to identify your unique skin concerns and receive a personalized treatment plan.
            </p>
            <Button size="sm">Book Appointment</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};