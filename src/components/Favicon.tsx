import { useEffect } from 'react';

interface FaviconProps {
  title?: string;
}

export const Favicon = ({ title = "DERMA" }: FaviconProps) => {
  useEffect(() => {
    // Update favicon
    const existingLink = document.querySelector<HTMLLinkElement>("link[rel*='icon']");
    const link = existingLink ?? (document.createElement('link') as HTMLLinkElement);
    link.type = 'image/jpg';
    link.rel = 'shortcut icon';
    link.href = '/imports/derma-logo.jpg';
    if (!existingLink) {
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    
    // Update page title if provided
    if (title) {
      document.title = title;
    }
  }, [title]);

  return null; // This component doesn't render anything
};