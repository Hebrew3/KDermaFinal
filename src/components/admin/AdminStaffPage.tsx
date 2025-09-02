import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select } from '../ui/select';
import { Badge } from '../ui/badge';
import { 
  UserPlus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  Calendar, 
  Users
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';

// Sample staff data
const staffData = [
  {
    id: '1',
    name: 'Dr. Emily Johnson',
    role: 'Dermatologist',
    email: 'emily.johnson@derma.com',
    phone: '(555) 123-4567',
    status: 'Active',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    appointments: 12,
    clients: 76,
    startDate: '2023-02-15',
    specialties: ['Medical Dermatology', 'Acne Treatment']
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    role: 'Skin Specialist',
    email: 'michael.chen@derma.com',
    phone: '(555) 234-5678',
    status: 'Active',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    appointments: 8,
    clients: 54,
    startDate: '2023-05-10',
    specialties: ['Anti-Aging', 'Skin Analysis']
  },
  {
    id: '3',
    name: 'Sarah Williams',
    role: 'Esthetician',
    email: 'sarah.williams@derma.com',
    phone: '(555) 345-6789',
    status: 'On Leave',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    appointments: 0,
    clients: 42,
    startDate: '2024-01-05',
    specialties: ['Facials', 'Skin Care']
  },
  {
    id: '4',
    name: 'Robert Davis',
    role: 'Medical Assistant',
    email: 'robert.davis@derma.com',
    phone: '(555) 456-7890',
    status: 'Active',
    avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    appointments: 15,
    clients: 38,
    startDate: '2023-11-20',
    specialties: ['Patient Care', 'Treatment Support']
  },
  {
    id: '5',
    name: 'Jessica Martinez',
    role: 'Receptionist',
    email: 'jessica.martinez@derma.com',
    phone: '(555) 567-8901',
    status: 'Active',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    appointments: 0,
    clients: 0,
    startDate: '2024-02-12',
    specialties: ['Scheduling', 'Client Relations']
  },
];

export const AdminStaffPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Filter staff based on search query and filters
  const filteredStaff = staffData.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          staff.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = selectedRole === 'All' || staff.role === selectedRole;
    const matchesStatus = selectedStatus === 'All' || staff.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Get unique roles for filter
  const roles = ['All', ...Array.from(new Set(staffData.map(staff => staff.role)))];
  
  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Staff Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add New Staff
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="Enter first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Enter last name" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="staff@example.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="(555) 123-4567" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select id="role">
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Skin Specialist">Skin Specialist</option>
                    <option value="Esthetician">Esthetician</option>
                    <option value="Medical Assistant">Medical Assistant</option>
                    <option value="Receptionist">Receptionist</option>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select id="status">
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Inactive">Inactive</option>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specialties">Specialties</Label>
                <Input id="specialties" placeholder="Enter specialties (comma separated)" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Add Staff Member</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Staff Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="flex gap-2 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search by name or email..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <Filter className="text-muted-foreground h-4 w-4" />
                <Select 
                  value={selectedRole} 
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </Select>
              </div>
              
              <Select 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </Select>
            </div>
          </div>
          
          <Tabs defaultValue="list">
            <TabsList className="mb-6">
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/30">
                      <th className="text-left font-medium p-3">Name</th>
                      <th className="text-left font-medium p-3">Role</th>
                      <th className="text-left font-medium p-3">Status</th>
                      <th className="text-left font-medium p-3">Email</th>
                      <th className="text-left font-medium p-3">Clients</th>
                      <th className="text-left font-medium p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStaff.map(staff => (
                      <tr key={staff.id} className="border-b border-border/30 last:border-0 hover:bg-muted/20">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <ImageWithFallback
                              src={staff.avatar}
                              alt={staff.name}
                              className="rounded-full h-8 w-8 object-cover"
                            />
                            <span>{staff.name}</span>
                          </div>
                        </td>
                        <td className="p-3">{staff.role}</td>
                        <td className="p-3">
                          <Badge variant={staff.status === 'Active' ? 'default' : staff.status === 'On Leave' ? 'outline' : 'secondary'}>
                            {staff.status}
                          </Badge>
                        </td>
                        <td className="p-3">{staff.email}</td>
                        <td className="p-3">{staff.clients}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-destructive text-destructive hover:bg-destructive/10">
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Remove</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Confirm Removal</DialogTitle>
                                </DialogHeader>
                                <p>Are you sure you want to remove {staff.name} from the staff?</p>
                                <DialogFooter>
                                  <Button variant="outline">Cancel</Button>
                                  <Button variant="destructive">Remove</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};