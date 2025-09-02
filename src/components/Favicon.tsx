import { useEffect } from 'react';

interface FaviconProps {
  title?: string;
}

export const Favicon = ({ title = "DERMA" }: FaviconProps) => {
  useEffect(() => {
    // Update favicon
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/jpg';
    link.rel = 'shortcut icon';
    link.href = '/imports/derma-logo.jpg';
    document.getElementsByTagName('head')[0].appendChild(link);
    
    // Update page title if provided
    if (title) {
      document.title = title;
    }
  }, [title]);

  return null; // This component doesn't render anything
};