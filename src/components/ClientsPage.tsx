import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  Clock, 
  Heart,
  FileText,
  Trash2,
  Edit,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { ClientStats } from './ClientStats';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Textarea } from './ui/textarea';
import { toast } from "sonner";

// Mock data for clients
const mockClients = [
  {
    id: 1,
    firstName: 'Emma',
    lastName: 'Johnson',
    email: 'emma.johnson@example.com',
    phone: '(555) 123-4567',
    dateOfBirth: '1985-06-12',
    address: '123 Main St, New York, NY 10001',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    skinType: 'Combination',
    allergies: 'None',
    preferredTreatments: ['Chemical Peel', 'Facial'],
    memberSince: '2022-03-15',
    totalSpent: 1250.00,
    lastVisit: '2023-04-28',
    notes: 'Prefers afternoon appointments. Interested in anti-aging treatments.',
    status: 'active',
    tags: ['VIP', 'Regular'],
    history: [
      {
        id: 101,
        date: '2023-04-28',
        type: 'appointment',
        service: 'Chemical Peel',
        practitioner: 'Dr. Sarah Williams',
        notes: 'Skin responded well to treatment. Recommended follow-up in 4 weeks.',
        amount: 150.00,
        status: 'completed'
      },
      {
        id: 102,
        date: '2023-03-15',
        type: 'purchase',
        items: ['Daily Moisturizer', 'Vitamin C Serum'],
        amount: 85.00,
        status: 'completed'
      },
      {
        id: 103,
        date: '2023-02-02',
        type: 'appointment',
        service: 'Facial',
        practitioner: 'Dr. Sarah Williams',
        notes: 'Addressed concerns about fine lines. Recommended to use sunscreen daily.',
        amount: 120.00,
        status: 'completed'
      }
    ]
  },
  {
    id: 2,
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@example.com',
    phone: '(555) 987-6543',
    dateOfBirth: '1978-11-23',
    address: '456 Park Ave, Brooklyn, NY 11215',
    profileImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    skinType: 'Oily',
    allergies: 'Benzoyl peroxide',
    preferredTreatments: ['Acne Treatment', 'Dermabrasion'],
    memberSince: '2021-10-08',
    totalSpent: 950.75,
    lastVisit: '2023-05-03',
    notes: 'Concerned about acne scarring. Prefers morning appointments.',
    status: 'active',
    tags: ['New client'],
    history: [
      {
        id: 201,
        date: '2023-05-03',
        type: 'appointment',
        service: 'Acne Treatment',
        practitioner: 'Dr. Robert Chen',
        notes: 'Significant improvement in acne. Continuing current treatment plan.',
        amount: 135.00,
        status: 'completed'
      },
      {
        id: 202,
        date: '2023-03-22',
        type: 'appointment',
        service: 'Skin Analysis',
        practitioner: 'Dr. Sarah Williams',
        notes: 'Identified specific acne triggers. Created customized treatment plan.',
        amount: 95.00,
        status: 'completed'
      }
    ]
  },
  {
    id: 3,
    firstName: 'Olivia',
    lastName: 'Davis',
    email: 'olivia.davis@example.com',
    phone: '(555) 456-7890',
    dateOfBirth: '1992-04-17',
    address: '789 Broadway, Manhattan, NY 10003',
    profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    skinType: 'Sensitive',
    allergies: 'Fragrances',
    preferredTreatments: ['Gentle Facial', 'LED Light Therapy'],
    memberSince: '2022-08-30',
    totalSpent: 675.50,
    lastVisit: '2023-06-12',
    notes: 'Has rosacea. Avoid harsh treatments.',
    status: 'active',
    tags: ['Sensitive skin'],
    history: [
      {
        id: 301,
        date: '2023-06-12',
        type: 'appointment',
        service: 'LED Light Therapy',
        practitioner: 'Dr. Anna Lopez',
        notes: 'Redness reduced after treatment. Recommended weekly sessions for one month.',
        amount: 110.00,
        status: 'completed'
      },
      {
        id: 302,
        date: '2023-05-15',
        type: 'purchase',
        items: ['Calming Serum', 'Gentle Cleanser'],
        amount: 72.50,
        status: 'completed'
      },
      {
        id: 303,
        date: '2023-04-03',
        type: 'appointment',
        service: 'Gentle Facial',
        practitioner: 'Dr. Anna Lopez',
        notes: 'Used calming products. Skin responded well.',
        amount: 125.00,
        status: 'completed'
      }
    ]
  },
  {
    id: 4,
    firstName: 'James',
    lastName: 'Wilson',
    email: 'james.wilson@example.com',
    phone: '(555) 234-5678',
    dateOfBirth: '1983-09-05',
    address: '321 5th Ave, New York, NY 10016',
    profileImage: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    skinType: 'Dry',
    allergies: 'Sulfates',
    preferredTreatments: ['Hydrating Facial', 'Dermal Fillers'],
    memberSince: '2023-01-20',
    totalSpent: 520.25,
    lastVisit: '2023-05-25',
    notes: 'Looking to address fine lines and dryness.',
    status: 'inactive',
    tags: [],
    history: [
      {
        id: 401,
        date: '2023-05-25',
        type: 'appointment',
        service: 'Hydrating Facial',
        practitioner: 'Dr. Sarah Williams',
        notes: 'Skin hydration improved. Recommended daily use of hyaluronic acid serum.',
        amount: 130.00,
        status: 'completed'
      },
      {
        id: 402,
        date: '2023-02-14',
        type: 'appointment',
        service: 'Skin Analysis',
        practitioner: 'Dr. Robert Chen',
        notes: 'Identified extremely dry skin. Created hydration-focused skincare routine.',
        amount: 95.00,
        status: 'completed'
      }
    ]
  },
  {
    id: 5,
    firstName: 'Sophia',
    lastName: 'Martinez',
    email: 'sophia.martinez@example.com',
    phone: '(555) 876-5432',
    dateOfBirth: '1990-12-03',
    address: '567 West St, New York, NY 10014',
    profileImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    skinType: 'Normal',
    allergies: 'None',
    preferredTreatments: ['Botox', 'Laser Treatment'],
    memberSince: '2022-05-17',
    totalSpent: 1875.00,
    lastVisit: '2023-06-05',
    notes: 'Regular botox treatments every 3 months.',
    status: 'active',
    tags: ['VIP'],
    history: [
      {
        id: 501,
        date: '2023-06-05',
        type: 'appointment',
        service: 'Botox',
        practitioner: 'Dr. David Kim',
        notes: 'Treated forehead and crow\'s feet. Follow-up in 3 months.',
        amount: 350.00,
        status: 'completed'
      },
      {
        id: 502,
        date: '2023-03-10',
        type: 'appointment',
        service: 'Botox',
        practitioner: 'Dr. David Kim',
        notes: 'Treated forehead and crow\'s feet. Client satisfied with results.',
        amount: 350.00,
        status: 'completed'
      },
      {
        id: 503,
        date: '2023-01-15',
        type: 'purchase',
        items: ['Anti-aging Moisturizer', 'Eye Cream', 'Retinol Serum'],
        amount: 165.50,
        status: 'completed'
      }
    ]
  }
];

// Available skin types, treatments, and tags for filtering
const skinTypes = ['Normal', 'Dry', 'Oily', 'Combination', 'Sensitive'];
const treatments = [
  'Chemical Peel', 'Facial', 'Acne Treatment', 'Dermabrasion', 'Gentle Facial', 
  'LED Light Therapy', 'Hydrating Facial', 'Dermal Fillers', 'Botox', 'Laser Treatment'
];
const tagOptions = ['VIP', 'Regular', 'New client', 'Sensitive skin'];
const statuses = ['active', 'inactive'];

export const ClientsPage = () => {
  const [clients, setClients] = useState(mockClients);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    skinType: '',
    status: '',
    tag: '',
    treatment: ''
  });
  const [sortBy, setSortBy] = useState('lastName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Filter and sort clients based on search query and filter options
  const filteredClients = clients.filter((client) => {
    const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
    const matchesSearch = searchQuery === '' || 
                           fullName.includes(searchQuery.toLowerCase()) ||
                           client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           client.phone.includes(searchQuery);
    
    const matchesSkinType = filterOptions.skinType === '' || client.skinType === filterOptions.skinType;
    const matchesStatus = filterOptions.status === '' || client.status === filterOptions.status;
    const matchesTag = filterOptions.tag === '' || (client.tags && client.tags.includes(filterOptions.tag));
    const matchesTreatment = filterOptions.treatment === '' || 
                            (client.preferredTreatments && client.preferredTreatments.includes(filterOptions.treatment));
    
    return matchesSearch && matchesSkinType && matchesStatus && matchesTag && matchesTreatment;
  }).sort((a, b) => {
    if (sortBy === 'lastName') {
      return sortDirection === 'asc' 
        ? a.lastName.localeCompare(b.lastName) 
        : b.lastName.localeCompare(a.lastName);
    }
    if (sortBy === 'totalSpent') {
      return sortDirection === 'asc' 
        ? a.totalSpent - b.totalSpent
        : b.totalSpent - a.totalSpent;
    }
    if (sortBy === 'lastVisit') {
      return sortDirection === 'asc' 
        ? new Date(a.lastVisit).getTime() - new Date(b.lastVisit).getTime()
        : new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime();
    }
    if (sortBy === 'memberSince') {
      return sortDirection === 'asc' 
        ? new Date(a.memberSince).getTime() - new Date(b.memberSince).getTime()
        : new Date(b.memberSince).getTime() - new Date(a.memberSince).getTime();
    }
    return 0;
  });

  // Reset filters
  const resetFilters = () => {
    setFilterOptions({
      skinType: '',
      status: '',
      tag: '',
      treatment: ''
    });
    setIsFilterOpen(false);
  };

  // Toggle sort direction
  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  // Format a date to a readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  // Format phone number
  const formatPhoneNumber = (phone: string) => {
    return phone;
  };

  // Calculate time since last visit
  const getTimeSinceLastVisit = (dateString: string) => {
    const lastVisit = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastVisit.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 60) return '1 month ago';
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  // Handle creating a new client
  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Client created successfully!");
    setIsCreateDialogOpen(false);
  };

  // Handle deleting a client
  const handleDeleteClient = (clientId: number) => {
    const updatedClients = clients.filter(client => client.id !== clientId);
    setClients(updatedClients);
    setIsDetailsOpen(false);
    toast.success("Client deleted successfully!");
  };
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>;
      case 'cancelled':
        return <Badge className="bg-destructive hover:bg-destructive/90">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Show client details
  const showClientDetails = (client: any) => {
    setSelectedClient(client);
    setIsDetailsOpen(true);
  };

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1>Clients</h1>
        <Button className="gap-1" onClick={() => setIsCreateDialogOpen(true)}>
          <Plus size={16} />
          <span>New Client</span>
        </Button>
      </div>
      
      <ClientStats />

      <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <div className="flex items-center gap-2 flex-grow max-w-md">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search clients by name, email, phone..." 
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            className="gap-1" 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter size={16} />
            <span className="hidden sm:inline">Filter</span>
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lastName">Name</SelectItem>
              <SelectItem value="lastVisit">Last Visit</SelectItem>
              <SelectItem value="totalSpent">Total Spent</SelectItem>
              <SelectItem value="memberSince">Member Since</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
          >
            {sortDirection === 'asc' ? (
              <ChevronRight className="rotate-90" size={20} />
            ) : (
              <ChevronRight className="-rotate-90" size={20} />
            )}
          </Button>
        </div>
      </div>

      {isFilterOpen && (
        <Card className="mt-2">
          <CardHeader className="pb-3">
            <CardTitle>Filter Clients</CardTitle>
            <CardDescription>
              Refine the client list based on specific criteria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Skin Type</Label>
                <Select 
                  value={filterOptions.skinType} 
                  onValueChange={(value) => setFilterOptions({...filterOptions, skinType: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Skin Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Skin Types</SelectItem>
                    {skinTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Status</Label>
                <Select 
                  value={filterOptions.status} 
                  onValueChange={(value) => setFilterOptions({...filterOptions, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Tag</Label>
                <Select 
                  value={filterOptions.tag} 
                  onValueChange={(value) => setFilterOptions({...filterOptions, tag: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Tags" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Tags</SelectItem>
                    {tagOptions.map((tag) => (
                      <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Preferred Treatment</Label>
                <Select 
                  value={filterOptions.treatment} 
                  onValueChange={(value) => setFilterOptions({...filterOptions, treatment: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Treatments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Treatments</SelectItem>
                    {treatments.map((treatment) => (
                      <SelectItem key={treatment} value={treatment}>{treatment}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
            <Button variant="default" onClick={() => setIsFilterOpen(false)}>Apply Filters</Button>
          </CardFooter>
        </Card>
      )}

      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[200px]">
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="table">Table View</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="mt-6">
          {filteredClients.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredClients.map((client) => (
                <Card 
                  key={client.id} 
                  className="cursor-pointer hover:border-primary transition-colors"
                  onClick={() => showClientDetails(client)}
                >
                  <CardHeader className="pb-2 pt-4 px-4">
                    <div className="flex items-start justify-between">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={client.profileImage} alt={`${client.firstName} ${client.lastName}`} />
                        <AvatarFallback className="bg-primary text-white">
                          {client.firstName[0]}{client.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-end">
                        {client.tags && client.tags.includes('VIP') && (
                          <Badge className="bg-amber-500 hover:bg-amber-600">VIP</Badge>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {client.status === 'active' ? (
                            <span className="flex items-center gap-1">
                              <CheckCircle size={12} className="text-green-500" />
                              Active
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <XCircle size={12} className="text-muted-foreground" />
                              Inactive
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <CardTitle className="mt-2">{client.firstName} {client.lastName}</CardTitle>
                    <CardDescription className="flex flex-col">
                      <span className="flex items-center gap-1">
                        <Mail size={12} />
                        {client.email}
                      </span>
                      <span className="flex items-center gap-1 mt-1">
                        <Phone size={12} />
                        {formatPhoneNumber(client.phone)}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 px-4">
                    <div className="flex flex-col space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Last Visit</span>
                        <span className="text-sm">{formatDate(client.lastVisit)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total Spent</span>
                        <span className="text-sm">${client.totalSpent.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Member Since</span>
                        <span className="text-sm">{formatDate(client.memberSince)}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-2">
                        {client.preferredTreatments && client.preferredTreatments.slice(0, 2).map((treatment, index) => (
                          <Badge key={index} variant="outline" className="bg-accent">
                            {treatment}
                          </Badge>
                        ))}
                        {client.preferredTreatments && client.preferredTreatments.length > 2 && (
                          <Badge variant="outline" className="bg-accent">
                            +{client.preferredTreatments.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-1 pb-4 px-4">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        showClientDetails(client);
                      }}
                    >
                      View Profile
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="flex justify-center">
                <AlertCircle size={48} className="text-muted-foreground" />
              </div>
              <h3 className="mt-4">No clients found</h3>
              <p className="text-muted-foreground max-w-md mx-auto mt-2">
                No clients match your current search or filter criteria. Try adjusting your filters or add a new client.
              </p>
              <Button className="mt-6" onClick={() => setIsCreateDialogOpen(true)}>
                Add New Client
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="table" className="mt-6">
          <Card>
            <CardHeader className="pb-1">
              <CardTitle>Client List</CardTitle>
              <CardDescription>
                {filteredClients.length} clients found
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredClients.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Last Visit</TableHead>
                        <TableHead>Total Spent</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClients.map((client) => (
                        <TableRow key={client.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={client.profileImage} alt={`${client.firstName} ${client.lastName}`} />
                                <AvatarFallback className="bg-primary text-white">
                                  {client.firstName[0]}{client.lastName[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div>{client.firstName} {client.lastName}</div>
                                <div className="text-xs text-muted-foreground">
                                  Member since {formatDate(client.memberSince)}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">{client.email}</div>
                            <div className="text-sm">{client.phone}</div>
                          </TableCell>
                          <TableCell>
                            <div>{formatDate(client.lastVisit)}</div>
                            <div className="text-xs text-muted-foreground">
                              {getTimeSinceLastVisit(client.lastVisit)}
                            </div>
                          </TableCell>
                          <TableCell>${client.totalSpent.toFixed(2)}</TableCell>
                          <TableCell>
                            {client.status === 'active' ? (
                              <Badge variant="default" className="bg-green-500 hover:bg-green-600">Active</Badge>
                            ) : (
                              <Badge variant="secondary">Inactive</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => showClientDetails(client)}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-10">
                  <AlertCircle size={32} className="mx-auto text-muted-foreground" />
                  <p className="mt-2">No clients found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create new client dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
            <DialogDescription>
              Enter the client's information to create a new profile.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateClient}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input id="dateOfBirth" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="skinType">Skin Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select skin type" />
                    </SelectTrigger>
                    <SelectContent>
                      {skinTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Any special considerations or preferences..." />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Client</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Client details sheet */}
      <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        {selectedClient && (
          <SheetContent className="sm:max-w-[540px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedClient.profileImage} alt={`${selectedClient.firstName} ${selectedClient.lastName}`} />
                  <AvatarFallback className="bg-primary text-white">
                    {selectedClient.firstName[0]}{selectedClient.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  {selectedClient.firstName} {selectedClient.lastName}
                  <div className="flex gap-2 mt-1">
                    {selectedClient.tags && selectedClient.tags.map((tag: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </SheetTitle>
              <SheetDescription className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-muted-foreground" />
                  <span>{selectedClient.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-muted-foreground" />
                  <span>{selectedClient.phone}</span>
                </div>
              </SheetDescription>
            </SheetHeader>

            <Tabs defaultValue="profile" className="mt-6">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="history">Treatment History</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6 mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Date of Birth</h4>
                    <p>{formatDate(selectedClient.dateOfBirth)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Skin Type</h4>
                    <p>{selectedClient.skinType}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Address</h4>
                  <p>{selectedClient.address}</p>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Allergies</h4>
                  <p>{selectedClient.allergies || "None reported"}</p>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Preferred Treatments</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedClient.preferredTreatments && selectedClient.preferredTreatments.map((treatment: string, index: number) => (
                      <Badge key={index} variant="outline" className="bg-accent">
                        {treatment}
                      </Badge>
                    ))}
                    {(!selectedClient.preferredTreatments || selectedClient.preferredTreatments.length === 0) && (
                      <p>No preferred treatments specified</p>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Notes</h4>
                  <p className="text-sm">{selectedClient.notes || "No notes available"}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Member Since</h4>
                    <p>{formatDate(selectedClient.memberSince)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Total Spent</h4>
                    <p>${selectedClient.totalSpent.toFixed(2)}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-medium mb-1">Status</h4>
                    <Badge className={selectedClient.status === 'active' ? 'bg-green-500' : 'bg-secondary'}>
                      {selectedClient.status.charAt(0).toUpperCase() + selectedClient.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-6 mt-4">
                <div className="space-y-4">
                  {selectedClient.history && selectedClient.history.length > 0 ? (
                    selectedClient.history.map((item: any) => (
                      <Card key={item.id} className="overflow-hidden">
                        <CardHeader className="pb-2 pt-4 px-4">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                              {item.type === 'appointment' ? (
                                <Calendar size={16} className="text-primary" />
                              ) : (
                                <FileText size={16} className="text-secondary" />
                              )}
                              <span className="font-medium">
                                {item.type === 'appointment' ? item.service : 'Product Purchase'}
                              </span>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-sm">{formatDate(item.date)}</span>
                              {getStatusBadge(item.status)}
                            </div>
                          </div>
                          {item.type === 'appointment' && (
                            <div className="text-sm text-muted-foreground mt-1">
                              Practitioner: {item.practitioner}
                            </div>
                          )}
                          {item.type === 'purchase' && item.items && (
                            <div className="text-sm text-muted-foreground mt-1">
                              Items: {item.items.join(', ')}
                            </div>
                          )}
                        </CardHeader>
                        <CardContent className="px-4 py-2">
                          {item.notes && (
                            <div className="text-sm mb-2">{item.notes}</div>
                          )}
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-sm text-muted-foreground">Amount</span>
                            <span className="font-medium">${item.amount.toFixed(2)}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <Clock size={32} className="mx-auto text-muted-foreground" />
                      <p className="mt-2">No history available for this client</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-center mt-4">
                  <Button variant="outline">
                    Add New Record
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-8 flex gap-2">
              <Button variant="outline" className="flex-1">
                <Edit size={16} className="mr-2" />
                Edit Client
              </Button>
              <Button 
                variant="destructive" 
                className="flex-1"
                onClick={() => handleDeleteClient(selectedClient.id)}
              >
                <Trash2 size={16} className="mr-2" />
                Delete Client
              </Button>
            </div>
            
            <div className="mt-4 flex justify-center">
              <Button variant="secondary" className="w-full">
                Book Appointment
              </Button>
            </div>
          </SheetContent>
        )}
      </Sheet>
    </div>
  );
};