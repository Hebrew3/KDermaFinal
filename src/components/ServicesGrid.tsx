import React from 'react';
import { ServiceCard } from './ServiceCard';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { CURRENCY_SYMBOL } from './utils/currency';

const MAIN_FALLBACK = 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80';

// Sample services data with our new images
const services = [
  {
    id: 1,
    name: "Deep Cleansing Facial",
    description: "A thorough cleansing treatment that removes impurities, unclogs pores and refreshes your skin. Includes steam, extraction and soothing mask.",
    duration: 60,
    price: 85,
    category: "Facials",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    popular: true
  },
  {
    id: 2,
    name: "Anti-Aging Consultation",
    description: "Personalized anti-aging consultation with our dermatologist to create a tailored skincare regimen for your unique needs.",
    duration: 45,
    price: 120,
    category: "Consultation",
    image: MAIN_FALLBACK, // Using our main fallback image
    popular: false
  },
  {
    id: 3,
    name: "Acne Treatment",
    description: "Specialized treatment for acne-prone skin, focusing on deep cleansing, inflammation reduction, and preventing future breakouts.",
    duration: 75,
    price: 95,
    category: "Treatments",
    image: MAIN_FALLBACK, // Using our main fallback image
    popular: false
  },
  {
    id: 4,
    name: "Hydrating Skin Therapy",
    description: "Intense moisture treatment designed to restore hydration to dry, dehydrated skin using advanced hyaluronic acid formulations.",
    duration: 60,
    price: 110,
    category: "Therapy",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    popular: true
  },
  {
    id: 5,
    name: "Advanced Medical Dermatology",
    description: "Complete dermatological examination addressing medical skin concerns including skin cancer screening, rashes, and specialized conditions.",
    duration: 60,
    price: 175,
    category: "Medical",
    image: MAIN_FALLBACK, // Using our main fallback image
    popular: false
  },
  {
    id: 6,
    name: "LED Light Therapy",
    description: "Non-invasive treatment using different wavelengths of light to target various skin concerns from anti-aging to acne.",
    duration: 30,
    price: 65,
    category: "Therapy",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    popular: false,
    available: false
  },

];

export const ServicesGrid: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleBookService = (serviceId: number) => {
    console.log(`Booking service with ID: ${serviceId}`);
    // Implement booking logic or navigation
  };
  
  const handleViewDetails = (serviceId: number) => {
    console.log(`View details for service with ID: ${serviceId}`);
    // Implement details view logic or navigation
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Our Services</h2>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <ServiceCard 
              key={service.id} 
              service={service}
              onBook={handleBookService}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="font-medium">No services found</h3>
          <p className="text-muted-foreground mt-1">
            Please try another search term
          </p>
        </div>
      )}
    </div>
  );
};