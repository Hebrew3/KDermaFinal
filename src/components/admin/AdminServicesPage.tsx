import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Badge } from '../ui/badge';
import { CURRENCY_SYMBOL, formatCurrency } from '../utils/currency';
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  Tag,
  Clock,
  PenSquare,
  DollarSign,
  Settings,
  Star
} from 'lucide-react';

// Sample services data
const servicesData = [
  {
    id: '1',
    name: 'Advanced Facial Treatment',
    description: 'Rejuvenate your skin with our signature facial treatments customized for your specific skin type and concerns.',
    price: 85,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Facial',
    features: ['Deep cleansing', 'Exfoliation', 'Customized masks', 'LED therapy'],
    popularity: 'High',
    status: 'Active'
  },
  {
    id: '2',
    name: 'Medical Dermatology',
    description: 'Professional medical treatments for various skin conditions including acne, rosacea, eczema, and psoriasis.',
    price: 120,
    duration: 45,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Medical',
    features: ['Skin condition diagnosis', 'Prescription treatments', 'Follow-up care', 'Medical-grade products'],
    popularity: 'Medium',
    status: 'Active'
  },
  {
    id: '3',
    name: 'Anti-Aging Treatments',
    description: 'Turn back the clock with our advanced anti-aging therapies that reduce fine lines and restore youthful glow.',
    price: 150,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Anti-Aging',
    features: ['Collagen stimulation', 'Fine line reduction', 'Skin tightening', 'Age spot treatment'],
    popularity: 'High',
    status: 'Active'
  },
  {
    id: '4',
    name: 'Hydrating Skin Therapy',
    description: 'Deep hydration treatments to restore moisture balance and revitalize dehydrated skin for a plump, dewy complexion.',
    price: 95,
    duration: 90,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Hydration',
    features: ['Hyaluronic infusion', 'Moisture barrier repair', 'Hydrating masks', 'Long-lasting hydration'],
    popularity: 'Medium',
    status: 'Active'
  },
  {
    id: '5',
    name: 'Skin Analysis & Consultation',
    description: 'Comprehensive skin analysis using advanced technology to develop a personalized skincare regimen.',
    price: 65,
    duration: 30,
    image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Consultation',
    features: ['Digital skin scanning', 'Personalized assessment', 'Custom treatment plan', 'Product recommendations'],
    popularity: 'Low',
    status: 'Active'
  },
  {
    id: '6',
    name: 'Premium Microdermabrasion',
    description: 'Advanced exfoliation treatment that removes dead skin cells and promotes collagen production for smoother, younger-looking skin.',
    price: 110,
    duration: 45,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Exfoliation',
    features: ['Diamond-tip exfoliation', 'Vacuum suction', 'Skin brightening', 'Improved texture'],
    popularity: 'Medium',
    status: 'Inactive'
  }
];

// Service categories for filtering
const categories = ['All', 'Facial', 'Medical', 'Anti-Aging', 'Hydration', 'Consultation', 'Exfoliation'];

export const AdminServicesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  
  // Define our main fallback image
  const MAIN_FALLBACK = 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';
  
  // Preload images when component mounts
  React.useEffect(() => {
    const preloadImages = async () => {
      try {
        const imagePromises = servicesData.map(service => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              console.log(`Image loaded successfully: ${service.image}`);
              resolve(true);
            };
            img.onerror = () => {
              console.error(`Failed to load image: ${service.image}`);
              // Use fallback if needed but continue the promise
              resolve(false);
            };
            img.src = service.image;
          });
        });
        
        await Promise.all(imagePromises);
        setImagesPreloaded(true);
        console.log('Images preloaded');
      } catch (error) {
        console.error('Error preloading images:', error);
        // Still set images as preloaded so the component can render
        setImagesPreloaded(true);
      }
    };
    
    preloadImages();
  }, []);
  
  // Filter services based on search query, category, and status
  const filteredServices = servicesData.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || service.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Services</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="service-name">Service Name</Label>
                <Input id="service-name" placeholder="Enter service name" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="service-description">Description</Label>
                <Input id="service-description" placeholder="Enter service description" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ({CURRENCY_SYMBOL})</Label>
                  <Input id="price" type="number" min="0" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input id="duration" type="number" min="0" placeholder="60" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select id="category" className="w-full p-2 border border-border rounded-md">
                  {categories.filter(cat => cat !== 'All').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input id="image" placeholder="Enter image URL" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="features">Features (comma separated)</Label>
                <Input id="features" placeholder="Enter service features" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select id="status" className="w-full p-2 border border-border rounded-md">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Add Service</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Services Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="flex gap-2 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search services..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <Filter className="text-muted-foreground h-4 w-4" />
                <select 
                  className="p-2 border border-border rounded-md min-w-[150px]"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <select 
                className="p-2 border border-border rounded-md min-w-[150px]"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          
          <Tabs defaultValue="grid">
            <TabsList className="mb-6">
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="grid">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map(service => (
                  <Card key={service.id} className={`overflow-hidden ${service.status === 'Inactive' ? 'opacity-70' : ''}`}>
                    <div className="relative h-48">
                      <ImageWithFallback
                        src={service.image}
                        alt={service.name}
                        className="h-full w-full object-cover"
                        category={service.category.toLowerCase()}
                        type={service.category.toLowerCase() === 'consultation' ? 'analysis' : 'service'}
                        onError={() => console.log(`Error loading image for ${service.name}`)}
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant={service.status === 'Active' ? 'default' : 'secondary'}>
                          {service.status}
                        </Badge>
                      </div>
                      <div className="absolute bottom-0 w-full bg-black/60 text-white p-3">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium truncate">{service.name}</h3>
                          <span className="whitespace-nowrap">{formatCurrency(service.price)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{service.category}</Badge>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="text-sm">{service.duration} min</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground h-12 overflow-hidden">{service.description}</p>
                      
                      {service.popularity === 'High' && (
                        <div className="flex items-center mt-2">
                          <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                          <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                          <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                          <span className="text-xs text-muted-foreground ml-1">Popular</span>
                        </div>
                      )}
                      {service.popularity === 'Medium' && (
                        <div className="flex items-center mt-2">
                          <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                          <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                          <Star className="h-4 w-4 text-amber-400" />
                          <span className="text-xs text-muted-foreground ml-1">Trending</span>
                        </div>
                      )}
                      
                      <div className="border-t border-border/30 mt-4 pt-4 flex justify-between">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-lg">
                            <DialogHeader>
                              <DialogTitle>Edit Service: {service.name}</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor={`edit-name-${service.id}`}>Service Name</Label>
                                <Input id={`edit-name-${service.id}`} defaultValue={service.name} />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor={`edit-desc-${service.id}`}>Description</Label>
                                <Input id={`edit-desc-${service.id}`} defaultValue={service.description} />
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor={`edit-price-${service.id}`}>Price ({CURRENCY_SYMBOL})</Label>
                                  <Input id={`edit-price-${service.id}`} type="number" defaultValue={service.price} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`edit-duration-${service.id}`}>Duration (minutes)</Label>
                                  <Input id={`edit-duration-${service.id}`} type="number" defaultValue={service.duration} />
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor={`edit-status-${service.id}`}>Status</Label>
                                <select 
                                  id={`edit-status-${service.id}`} 
                                  className="w-full p-2 border border-border rounded-md"
                                  defaultValue={service.status}
                                >
                                  <option value="Active">Active</option>
                                  <option value="Inactive">Inactive</option>
                                </select>
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor={`edit-features-${service.id}`}>Features</Label>
                                <Input id={`edit-features-${service.id}`} defaultValue={service.features.join(', ')} />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Cancel</Button>
                              <Button>Save Changes</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-destructive text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delete Service</DialogTitle>
                            </DialogHeader>
                            <p>Are you sure you want to delete "{service.name}"? This action cannot be undone.</p>
                            <DialogFooter>
                              <Button variant="outline">Cancel</Button>
                              <Button variant="destructive">Delete</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="list">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/30">
                    <tr className="border-b border-border/30">
                      <th className="text-left font-medium p-3">Service</th>
                      <th className="text-left font-medium p-3">Category</th>
                      <th className="text-left font-medium p-3">Price</th>
                      <th className="text-left font-medium p-3">Duration</th>
                      <th className="text-left font-medium p-3">Status</th>
                      <th className="text-left font-medium p-3">Popularity</th>
                      <th className="text-left font-medium p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredServices.map(service => (
                      <tr key={service.id} className="border-b border-border/30 last:border-0 hover:bg-muted/20">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded overflow-hidden">
                              <ImageWithFallback
                                src={service.image}
                                alt={service.name}
                                className="h-full w-full object-cover"
                                category={service.category.toLowerCase()}
                                type={service.category.toLowerCase() === 'consultation' ? 'analysis' : 'service'}
                                onError={() => console.log(`Error loading thumbnail for ${service.name}`)}
                              />
                            </div>
                            <div>
                              <p className="font-medium">{service.name}</p>
                              <p className="text-xs text-muted-foreground truncate max-w-[200px]">{service.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline">{service.category}</Badge>
                        </td>
                        <td className="p-3">{formatCurrency(service.price)}</td>
                        <td className="p-3">{service.duration} min</td>
                        <td className="p-3">
                          <Badge variant={service.status === 'Active' ? 'default' : 'secondary'}>
                            {service.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center">
                            {service.popularity === 'High' && (
                              <>
                                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                              </>
                            )}
                            {service.popularity === 'Medium' && (
                              <>
                                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                                <Star className="h-4 w-4 text-amber-400" />
                              </>
                            )}
                            {service.popularity === 'Low' && (
                              <>
                                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                                <Star className="h-4 w-4 text-amber-400" />
                                <Star className="h-4 w-4 text-amber-400" />
                              </>
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                              <PenSquare className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-destructive text-destructive hover:bg-destructive/10">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="border-t border-border/30 mt-6 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Showing {filteredServices.length} out of {servicesData.length} services
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline">
                <div className="flex items-center justify-center h-4 w-4 mr-2 font-semibold">₱</div>
                Pricing Settings
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Category Management
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};