import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ImageDebug } from '../figma/ImageDebug';
import { Badge } from '../ui/badge';
import { 
  Info, 
  RotateCw,
  Check, 
  X 
} from 'lucide-react';

const imagesToTest = [
  { 
    url: '/services/hydrating-skin-therapy.jpg',
    name: 'Hydrating Skin Therapy (local)',
    category: 'hydration',
    type: 'service'
  },
  { 
    url: '/services/skin-analysis-consultation.jpg',
    name: 'Skin Analysis & Consultation (local)',
    category: 'consultation',
    type: 'analysis' 
  },
  { 
    url: 'https://images.unsplash.com/photo-1573461200585-4e65ab7ec50d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    name: 'Hydrating Skin Therapy (Unsplash)',
    category: 'hydration',
    type: 'service' 
  },
  { 
    url: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    name: 'Skin Analysis (Unsplash)',
    category: 'consultation',
    type: 'analysis' 
  },
  { 
    url: '/imports/derma-logo.jpg',
    name: 'DERMA Logo',
    category: '',
    type: 'product' 
  }
];

export const ImageDiagnosticPage = () => {
  const [customUrl, setCustomUrl] = useState('');
  const [customName, setCustomName] = useState('Custom Image');
  const [customCategory, setCustomCategory] = useState('');
  const [customType, setCustomType] = useState('service');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Image Diagnostic Tool</h1>
        <Button onClick={handleRefresh}>
          <RotateCw className="mr-2 h-4 w-4" />
          Refresh All
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Custom Image Test</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image-url">Image URL</Label>
                  <Input 
                    id="image-url" 
                    placeholder="Enter image URL to test" 
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image-name">Image Name</Label>
                  <Input 
                    id="image-name" 
                    placeholder="Enter image name" 
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input 
                      id="category" 
                      placeholder="E.g. hydration" 
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <select 
                      id="type"
                      className="w-full p-2 border border-border rounded-md"
                      value={customType}
                      onChange={(e) => setCustomType(e.target.value)}
                    >
                      <option value="service">Service</option>
                      <option value="product">Product</option>
                      <option value="person">Person</option>
                      <option value="profile">Profile</option>
                      <option value="avatar">Avatar</option>
                      <option value="staff">Staff</option>
                      <option value="therapy">Therapy</option>
                      <option value="analysis">Analysis</option>
                    </select>
                  </div>
                </div>
                <Button onClick={handleRefresh}>
                  Test Image
                </Button>
              </div>
            </div>
            <div>
              {customUrl && (
                <div className="space-y-4 h-full">
                  <div className="border border-border p-4 rounded-md h-48 mb-4">
                    <h3 className="mb-2 text-lg">ImageWithFallback Component</h3>
                    <div className="relative h-32">
                      <ImageWithFallback 
                        key={`custom-${refreshKey}`}
                        src={customUrl} 
                        alt={customName}
                        className="h-full w-full object-cover"
                        category={customCategory}
                        type={customType as any}
                      />
                    </div>
                  </div>
                  <ImageDebug 
                    key={`custom-debug-${refreshKey}`}
                    src={customUrl} 
                  />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Image Tests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {imagesToTest.map((image, index) => (
              <Card key={`${index}-${refreshKey}`} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{image.name}</h3>
                    <div className="flex items-center">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full"
                        onClick={() => {
                          setCustomUrl(image.url);
                          setCustomName(image.name);
                          setCustomCategory(image.category);
                          setCustomType(image.type);
                          window.scrollTo(0, 0);
                        }}
                      >
                        <Info className="h-4 w-4" />
                        <span className="sr-only">Details</span>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2 mb-4">
                    <p className="text-xs text-muted-foreground truncate">{image.url}</p>
                    <div className="flex gap-2 flex-wrap">
                      {image.category && (
                        <Badge variant="outline">{image.category}</Badge>
                      )}
                      {image.type && (
                        <Badge>{image.type}</Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="border border-border p-4 rounded-md">
                    <h4 className="text-sm font-medium mb-2">ImageWithFallback:</h4>
                    <div className="relative h-32 bg-muted/30 rounded">
                      <ImageWithFallback 
                        src={image.url} 
                        alt={image.name}
                        className="h-full w-full object-cover"
                        category={image.category}
                        type={image.type as any}
                      />
                    </div>
                  </div>
                  
                  <div className="border border-border p-4 rounded-md mt-4">
                    <h4 className="text-sm font-medium mb-2">Regular Image:</h4>
                    <div className="relative h-32 bg-muted/30 rounded overflow-hidden">
                      <img 
                        src={image.url} 
                        alt={image.name} 
                        className="h-full w-full object-cover"
                        onLoad={() => console.log(`Image loaded: ${image.url}`)}
                        onError={() => console.log(`Image error: ${image.url}`)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};