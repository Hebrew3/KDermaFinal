
import { ImageWithFallback } from "../figma/ImageWithFallback";

// Define service types for better type checking
export type ServiceCategory = 
  | 'facial' 
  | 'treatment' 
  | 'consultation' 
  | 'skincare'
  | 'therapy'
  | 'analysis';

// Service image information
export interface ServiceImageInfo {
  src: string;
  alt: string;
  category: ServiceCategory;
}

// Collection of service images with their metadata
export const SERVICE_IMAGES: Record<string, ServiceImageInfo> = {
  hydratingTherapy: {
    src: "/public/services/hydrating-skin-therapy.jpg",
    alt: "Hydrating Skin Therapy",
    category: "therapy"
  },
  skinAnalysis: {
    src: "/public/services/skin-analysis-consultation.jpg",
    alt: "Skin Analysis & Consultation",
    category: "analysis"
  }
};

// Reusable service image component
export const ServiceImage = ({
  service,
  className,
  ...props
}: {
  service: keyof typeof SERVICE_IMAGES;
  className?: string;
  [key: string]: any;
}) => {
  const { src, alt, category } = SERVICE_IMAGES[service];
  
  return (
    <ImageWithFallback
      src={src}
      alt={alt}
      className={className}
      type={category}
      {...props}
    />
  );
};

// Export image paths directly for cases where just the path is needed
export const SERVICE_IMAGE_PATHS = Object.entries(SERVICE_IMAGES).reduce(
  (paths, [key, { src }]) => {
    paths[key as keyof typeof SERVICE_IMAGES] = src;
    return paths;
  },
  {} as Record<keyof typeof SERVICE_IMAGES, string>
);
