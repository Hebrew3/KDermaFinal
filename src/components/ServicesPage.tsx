import React from 'react';
import { ServicesGrid } from './ServicesGrid';
import { FeaturedServices } from './FeaturedServices';
import { Calendar, Clock, CreditCard, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export const ServicesPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Skincare Services</h1>
        <p className="text-muted-foreground mt-2">
          Discover our range of premium dermatology treatments and services
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              Easy Booking
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Book online 24/7 at your convenience
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <User className="h-4 w-4 mr-2 text-primary" />
              Expert Providers
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            All services performed by certified dermatologists
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Clock className="h-4 w-4 mr-2 text-primary" />
              Flexible Scheduling
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Early morning and evening appointments available
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <CreditCard className="h-4 w-4 mr-2 text-primary" />
              Insurance Accepted
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            We work with most major insurance providers
          </CardContent>
        </Card>
      </div>
      
      <FeaturedServices />
      
      <ServicesGrid />
    </div>
  );
};