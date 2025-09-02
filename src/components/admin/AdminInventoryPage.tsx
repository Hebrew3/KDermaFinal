import React, { useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  SearchIcon, 
  PlusCircle, 
  Filter, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle2, 
  Pencil, 
  Trash2, 
  BarChart4, 
  Package,
  Download,
  Upload,
  Archive 
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "../ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

// Mock inventory data
const inventoryProducts = [
  {
    id: 1,
    name: "Hyaluronic Acid Serum",
    category: "Serums",
    sku: "SER-HA-001",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    stockLevel: 42,
    minStockLevel: 10,
    price: 29.99,
    cost: 12.50,
    supplier: "DermaPro Supplies",
    lastRestock: "2025-04-29",
    expiryDate: "2026-04-30",
    status: "active",
    location: "Main Storage"
  },
  {
    id: 8,
    name: "Peptide Firming Serum",
    category: "Serums",
    sku: "SER-PF-008",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", // Empty image URL to test fallback
    stockLevel: 18,
    minStockLevel: 8,
    price: 54.99,
    cost: 24.75,
    supplier: "SkinCare Essentials",
    lastRestock: "2025-05-05",
    expiryDate: "2026-05-05",
    status: "active",
    location: "Main Storage"
  },
  {
    id: 2,
    name: "Vitamin C Face Cream",
    category: "Moisturizers",
    sku: "MOI-VC-002",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    stockLevel: 38,
    minStockLevel: 15,
    price: 39.99,
    cost: 18.75,
    supplier: "BeautyWell Inc.",
    lastRestock: "2025-05-01",
    expiryDate: "2026-05-01",
    status: "active",
    location: "Main Storage"
  },
  {
    id: 3,
    name: "Retinol Night Treatment",
    category: "Treatments",
    sku: "TRT-RT-003",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    stockLevel: 8,
    minStockLevel: 12,
    price: 59.99,
    cost: 28.50,
    supplier: "SkinCare Essentials",
    lastRestock: "2025-04-10",
    expiryDate: "2026-04-10",
    status: "low",
    location: "Treatment Room Storage"
  },
  {
    id: 4,
    name: "Gentle Cleansing Gel",
    category: "Cleansers",
    sku: "CLN-GC-004",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    stockLevel: 27,
    minStockLevel: 10,
    price: 24.99,
    cost: 9.75,
    supplier: "DermaPro Supplies",
    lastRestock: "2025-04-25",
    expiryDate: "2027-04-25",
    status: "active",
    location: "Main Storage"
  },
  {
    id: 5,
    name: "SPF 50 Daily Protection",
    category: "Sun Protection",
    sku: "SUN-50-005",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    stockLevel: 5,
    minStockLevel: 20,
    price: 34.99,
    cost: 15.25,
    supplier: "BeautyWell Inc.",
    lastRestock: "2025-04-15",
    expiryDate: "2025-10-15",
    status: "low",
    location: "Reception Display"
  },
  {
    id: 6,
    name: "Glycolic Acid Peel",
    category: "Treatments",
    sku: "TRT-GA-006",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    stockLevel: 0,
    minStockLevel: 5,
    price: 79.99,
    cost: 34.50,
    supplier: "SkinCare Essentials",
    lastRestock: "2025-03-01",
    expiryDate: "2026-03-01",
    status: "outOfStock",
    location: "Treatment Room Storage"
  },
  {
    id: 9,
    name: "Mandelic Acid Exfoliant",
    category: "Treatments",
    sku: "TRT-MA-009",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", // Broken image URL to test fallback
    stockLevel: 11,
    minStockLevel: 7,
    price: 62.99,
    cost: 29.50,
    supplier: "DermaPro Supplies",
    lastRestock: "2025-05-01",
    expiryDate: "2026-04-30",
    status: "active",
    location: "Treatment Room Storage"
  },
  {
    id: 7,
    name: "Niacinamide Serum",
    category: "Serums",
    sku: "SER-NA-007",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    stockLevel: 31,
    minStockLevel: 10,
    price: 44.99,
    cost: 21.25,
    supplier: "DermaPro Supplies",
    lastRestock: "2025-05-03",
    expiryDate: "2026-05-03",
    status: "active",
    location: "Main Storage"
  }
];

// Categories for filtering
const categories = [
  "All Categories",
  "Serums", 
  "Moisturizers", 
  "Treatments", 
  "Cleansers", 
  "Sun Protection"
];

// Product status options
const statusOptions = [
  "All Status",
  "active", 
  "low", 
  "outOfStock"
];

// Locations for products
const locationOptions = [
  "All Locations",
  "Main Storage", 
  "Treatment Room Storage", 
  "Reception Display"
];

// Suppliers list
const supplierOptions = [
  "DermaPro Supplies",
  "BeautyWell Inc.",
  "SkinCare Essentials"
];

export const AdminInventoryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isViewProductDialogOpen, setIsViewProductDialogOpen] = useState(false);

  // Filter products based on search, category, status, and location
  const filteredProducts = inventoryProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory;
    const matchesStatus = selectedStatus === "All Status" || product.status === selectedStatus;
    const matchesLocation = selectedLocation === "All Locations" || product.location === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesLocation;
  });

  // Count products by status
  const activeCount = inventoryProducts.filter(p => p.status === "active").length;
  const lowStockCount = inventoryProducts.filter(p => p.status === "low").length;
  const outOfStockCount = inventoryProducts.filter(p => p.status === "outOfStock").length;

  // Open product details dialog
  const handleViewProduct = (product: any) => {
    setSelectedProduct(product);
    setIsViewProductDialogOpen(true);
  };

  // Open edit product dialog with product data pre-filled
  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setIsAddProductDialogOpen(true);
  };

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-semibold">Inventory</h1>
          <p className="text-muted-foreground">
            Manage your clinic's products and stock levels
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setIsAddProductDialogOpen(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>
      
      {/* Inventory Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{inventoryProducts.length}</div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">In Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{activeCount}</div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Low Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{lowStockCount}</div>
              <AlertCircle className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{outOfStockCount}</div>
              <Trash2 className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select
            value={selectedStatus}
            onValueChange={setSelectedStatus}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  {status === "active" ? "In Stock" : 
                   status === "low" ? "Low Stock" : 
                   status === "outOfStock" ? "Out of Stock" : status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select
            value={selectedLocation}
            onValueChange={setSelectedLocation}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              {locationOptions.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="text-right text-sm text-muted-foreground">
          Showing {filteredProducts.length} of {inventoryProducts.length} products
        </div>
      </div>
      
      {/* Products Display */}
      <Tabs defaultValue="grid">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
        </div>
        
        {/* Grid View */}
        <TabsContent value="grid">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full"
                      category={product.category}
                      type="product"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge 
                        variant={
                          product.status === "active" ? "default" :
                          product.status === "low" ? "outline" : "destructive"
                        }
                      >
                        {product.status === "active" ? "In Stock" :
                         product.status === "low" ? "Low Stock" :
                         "Out of Stock"}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-base truncate">{product.name}</CardTitle>
                    <CardDescription className="text-xs">{product.category} • SKU: {product.sku}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">${product.price}</span>
                      <span className={
                        `text-sm ${
                          product.status === "active" ? "text-green-600" :
                          product.status === "low" ? "text-amber-600" : "text-red-600"
                        }`
                      }>
                        {product.stockLevel} in stock
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleViewProduct(product)}
                    >
                      View
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleEditProduct(product)}
                    >
                      <Pencil className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
                <Package className="h-12 w-12 text-muted-foreground mb-2" />
                <h3 className="font-medium">No products found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* List View */}
        <TabsContent value="list">
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Product</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">SKU</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Stock</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Location</th>
                  <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0">
                            <ImageWithFallback
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover"
                              category={product.category}
                              type="product"
                            />
                          </div>
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{product.sku}</td>
                      <td className="px-4 py-3 text-sm">{product.category}</td>
                      <td className="px-4 py-3 text-sm">${product.price.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className={
                            product.status === "active" ? "text-green-600" :
                            product.status === "low" ? "text-amber-600" : "text-red-600"
                          }>{product.stockLevel}</span>
                          <Badge 
                            variant={
                              product.status === "active" ? "default" :
                              product.status === "low" ? "outline" : "destructive"
                            }
                            className="text-xs"
                          >
                            {product.status === "active" ? "In Stock" :
                            product.status === "low" ? "Low Stock" :
                            "Out of Stock"}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{product.location}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewProduct(product)}
                          >
                            View
                          </Button>
                          <Button 
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Pencil className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center">
                      <Package className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <h3 className="font-medium">No products found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your search or filter criteria
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Add/Edit Product Dialog */}
      <Dialog open={isAddProductDialogOpen} onOpenChange={setIsAddProductDialogOpen}>
        <DialogContent className="sm:max-w-[425px] md:max-w-[625px] ld:max-w-[825px] max-h-screen overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            <DialogDescription>
              {selectedProduct 
                ? "Update the product details below." 
                : "Fill in the product information to add it to your inventory."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-2">
            <div className="space-y-1">
              <Label htmlFor="product-name">Product Name</Label>
              <Input 
                id="product-name" 
                placeholder="Enter product name" 
                defaultValue={selectedProduct?.name || ""} 
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="product-sku">SKU</Label>
              <Input 
                id="product-sku" 
                placeholder="Enter SKU" 
                defaultValue={selectedProduct?.sku || ""} 
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="product-category">Category</Label>
              <Select defaultValue={selectedProduct?.category || ""}>
                <SelectTrigger id="product-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.filter(c => c !== "All Categories").map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="product-supplier">Supplier</Label>
              <Select defaultValue={selectedProduct?.supplier || ""}>
                <SelectTrigger id="product-supplier">
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  {supplierOptions.map((supplier) => (
                    <SelectItem key={supplier} value={supplier}>
                      {supplier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="product-price">Retail Price ($)</Label>
              <Input 
                id="product-price" 
                type="number" 
                min="0" 
                step="0.01" 
                placeholder="0.00" 
                defaultValue={selectedProduct?.price || ""} 
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="product-cost">Cost Price ($)</Label>
              <Input 
                id="product-cost" 
                type="number" 
                min="0" 
                step="0.01" 
                placeholder="0.00" 
                defaultValue={selectedProduct?.cost || ""} 
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="product-stock">Current Stock</Label>
              <Input 
                id="product-stock" 
                type="number" 
                min="0" 
                placeholder="0" 
                defaultValue={selectedProduct?.stockLevel || ""} 
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="product-min-stock">Minimum Stock Level</Label>
              <Input 
                id="product-min-stock" 
                type="number" 
                min="0" 
                placeholder="0" 
                defaultValue={selectedProduct?.minStockLevel || ""} 
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="product-location">Storage Location</Label>
              <Select defaultValue={selectedProduct?.location || ""}>
                <SelectTrigger id="product-location">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locationOptions.filter(l => l !== "All Locations").map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="product-expiry">Expiry Date</Label>
              <Input 
                id="product-expiry" 
                type="date" 
                defaultValue={selectedProduct?.expiryDate || ""} 
              />
            </div>
            
            <div className="col-span-full space-y-1">
              <Label htmlFor="product-image">Product Image URL</Label>
              <Input 
                id="product-image" 
                placeholder="Enter image URL" 
                defaultValue={selectedProduct?.image || ""} 
              />
            </div>
            
            <div className="col-span-full space-y-1">
              <Label htmlFor="product-description">Description</Label>
              <Textarea 
                id="product-description" 
                placeholder="Enter product description" 
                className="min-h-24" 
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddProductDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddProductDialogOpen(false)}>
              {selectedProduct ? "Update Product" : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Product Dialog */}
      <Dialog open={isViewProductDialogOpen} onOpenChange={setIsViewProductDialogOpen}>
        {selectedProduct && (
          <DialogContent className="sm:max-w-[425px] md:max-w-[640px] ld:max-w-[840px] max-h-screen overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Product Details</DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
              <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="object-cover w-full h-full"
                  category={selectedProduct.category}
                  type="product"
                />
                <div className="absolute top-2 right-2">
                  <Badge 
                    variant={
                      selectedProduct.status === "active" ? "default" :
                      selectedProduct.status === "low" ? "outline" : "destructive"
                    }
                  >
                    {selectedProduct.status === "active" ? "In Stock" :
                    selectedProduct.status === "low" ? "Low Stock" :
                    "Out of Stock"}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold">{selectedProduct.name}</h2>
                  <p className="text-muted-foreground">{selectedProduct.category} • SKU: {selectedProduct.sku}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                  <div>
                    <p className="text-muted-foreground text-sm">Price</p>
                    <p className="font-semibold">${selectedProduct.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Cost</p>
                    <p className="font-semibold">${selectedProduct.cost.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Current Stock</p>
                    <p className="font-semibold">{selectedProduct.stockLevel}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Min. Stock Level</p>
                    <p className="font-semibold">{selectedProduct.minStockLevel}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Location</p>
                    <p className="font-semibold">{selectedProduct.location}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Supplier</p>
                    <p className="font-semibold">{selectedProduct.supplier}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Last Restock</p>
                    <p className="font-semibold">{new Date(selectedProduct.lastRestock).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Expiry Date</p>
                    <p className="font-semibold">{new Date(selectedProduct.expiryDate).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Adjust Stock
                  </Button>
                  <Button variant="outline" size="sm">
                    <Archive className="h-4 w-4 mr-2" />
                    Move Location
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => {
                      setIsViewProductDialogOpen(false);
                      handleEditProduct(selectedProduct);
                    }}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit Product
                  </Button>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewProductDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};