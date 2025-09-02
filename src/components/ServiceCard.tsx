import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Clock, Calendar } from 'lucide-react';
import { CURRENCY_SYMBOL, formatCurrency } from './utils/currency';

interface ServiceCardProps {
  service: {
    id: number;
    name: string;
    image?: string;
    description: string;
    duration: number;
    price: number;
    category: string;
    popular?: boolean;
    available?: boolean;
  }
  onBook?: (serviceId: number) => void;
  onViewDetails?: (serviceId: number) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  onBook, 
  onViewDetails 
}) => {
  const {
    id,
    name,
    image,
    description,
    duration,
    price,
    category,
    popular = false,
    available = true
  } = service;
  
  const handleBook = () => {
    if (onBook) onBook(id);
  };
  
  const handleViewDetails = () => {
    if (onViewDetails) onViewDetails(id);
  };
  
  return (
    <Card className="h-full overflow-hidden flex flex-col transition-shadow hover:shadow-md">
      <div className="aspect-video relative overflow-hidden">
        <ImageWithFallback 
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
          category={category}
          type="service"
        />
        {popular && (
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
            Popular
          </Badge>
        )}
        {!available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="destructive" className="text-md py-1.5">
              Currently Unavailable
            </Badge>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription>{category}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-4 flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-3">
          {description}
        </p>
        
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center text-muted-foreground text-sm">
            <Clock className="h-4 w-4 mr-1" />
            {duration} min
          </div>
          <div className="font-medium">{formatCurrency(price)}</div>
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2 pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={handleViewDetails}
        >
          View Details
        </Button>
        <Button
          size="sm"
          className="flex-1"
          onClick={handleBook}
          disabled={!available}
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};