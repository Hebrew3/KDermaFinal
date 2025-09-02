import React from 'react';

type ImageDebugProps = {
  src: string | undefined;
  width?: number;
  height?: number;
};

export const ImageDebug: React.FC<ImageDebugProps> = ({ src, width = 300, height = 200 }) => {
  const [status, setStatus] = React.useState<'loading' | 'loaded' | 'error'>('loading');
  const [loadTime, setLoadTime] = React.useState<number | null>(null);
  const startTime = React.useRef(Date.now());
  
  React.useEffect(() => {
    if (!src) {
      setStatus('error');
      return;
    }
    
    const img = new Image();
    startTime.current = Date.now();
    
    img.onload = () => {
      setStatus('loaded');
      setLoadTime(Date.now() - startTime.current);
    };
    
    img.onerror = () => {
      setStatus('error');
      setLoadTime(Date.now() - startTime.current);
    };
    
    img.src = src;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);
  
  return (
    <div className="border border-border p-4 rounded-md">
      <h3 className="mb-4">Image Debug</h3>
      <div className="space-y-2 mb-4">
        <p><strong>Source:</strong> {src || 'No source provided'}</p>
        <p><strong>Status:</strong> {status}</p>
        {loadTime !== null && <p><strong>Load Time:</strong> {loadTime}ms</p>}
      </div>
      
      <div className="aspect-video bg-muted/30 rounded-md overflow-hidden relative">
        {src && (
          <img 
            src={src} 
            alt="Debug image" 
            className="h-full w-full object-contain"
            style={{ opacity: status === 'loaded' ? 1 : 0.5 }}
          />
        )}
        
        {status === 'error' && (
          <div className="absolute inset-0 flex items-center justify-center text-destructive">
            Failed to load image
          </div>
        )}
        
        {status === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center text-primary">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};