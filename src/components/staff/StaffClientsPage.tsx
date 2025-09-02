import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import {
  Search,
  Filter,
  User,
  Calendar,
  Phone,
  Mail,
  Edit,
  MoreVertical,
  FileText,
  ClipboardList,
  Clock
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

// Sample client data
const clients = [
  {
    id: '1',
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    phone: '(555) 123-4567',
    avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
    joinDate: '2024-01-15',
    lastVisit: '2025-05-01',
    nextAppointment: '2025-05-10',
    status: 'Active',
    preferredServices: ['Advanced Facial Treatment', 'Anti-Aging Treatments'],
    notes: 'Has sensitive skin. Prefers afternoon appointments.',
    appointmentCount: 8
  },
  {
    id: '2',
    name: 'James Brown',
    email: 'james.brown@example.com',
    phone: '(555) 234-5678',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    joinDate: '2024-02-20',
    lastVisit: '2025-04-28',
    nextAppointment: '2025-05-12',
    status: 'Active',
    preferredServices: ['Hydrating Skin Therapy', 'Skin Analysis'],
    notes: 'Concerned about sun damage.',
    appointmentCount: 5
  },
  {
    id: '3',
    name: 'Olivia Martinez',
    email: 'olivia.martinez@example.com',
    phone: '(555) 345-6789',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    joinDate: '2024-03-05',
    lastVisit: '2025-05-08',
    nextAppointment: '2025-05-15',
    status: 'Active',
    preferredServices: ['Medical Dermatology'],
    notes: 'Being treated for acne.',
    appointmentCount: 12
  },
  {
    id: '4',
    name: 'William Johnson',
    email: 'william.johnson@example.com',
    phone: '(555) 456-7890',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    joinDate: '2024-04-10',
    lastVisit: '2025-03-15',
    nextAppointment: null,
    status: 'Inactive',
    preferredServices: ['Skin Analysis & Consultation'],
    notes: 'Has a history of eczema.',
    appointmentCount: 2
  },
  {
    id: '5',
    name: 'Sophia Garcia',
    email: 'sophia.garcia@example.com',
    phone: '(555) 567-8901',
    avatar: 'https://randomuser.me/api/portraits/women/13.jpg',
    joinDate: '2024-02-12',
    lastVisit: '2025-05-05',
    nextAppointment: '2025-05-26',
    status: 'Active',
    preferredServices: ['Anti-Aging Treatments', 'Advanced Facial Treatment'],
    notes: 'Very concerned about fine lines.',
    appointmentCount: 7
  },
  {
    id: '6',
    name: 'Benjamin Taylor',
    email: 'benjamin.taylor@example.com',
    phone: '(555) 678-9012',
    avatar: 'https://randomuser.me/api/portraits/men/13.jpg',
    joinDate: '2024-01-30',
    lastVisit: '2025-04-15',
    nextAppointment: '2025-06-10',
    status: 'Active',
    preferredServices: ['Medical Dermatology', 'Skin Analysis & Consultation'],
    notes: 'Has previously been treated for psoriasis.',
    appointmentCount: 6
  }
];

// Sample appointments for client history view
const clientAppointments = [
  {
    id: 'a1',
    date: '2025-05-01',
    time: '10:00 AM',
    service: 'Advanced Facial Treatment',
    duration: 60,
    notes: 'Client reported satisfaction with results.',
    staffMember: 'Dr. Emily Johnson'
  },
  {
    id: 'a2',
    date: '2025-04-15',
    time: '11:00 AM',
    service: 'Anti-Aging Treatment',
    duration: 60,
    notes: 'Recommended follow-up in 2 weeks.',
    staffMember: 'Dr. Emily Johnson'
  },
  {
    id: 'a3',
    date: '2025-03-20',
    time: '2:00 PM',
    service: 'Skin Analysis & Consultation',
    duration: 30,
    notes: 'Initial analysis showed signs of dehydration.',
    staffMember: 'Dr. Michael Chen'
  }
];

export const StaffClientsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedClient, setSelectedClient] = useState<typeof clients[0] | null>(null);
  const [activeDialog, setActiveDialog] = useState<'history' | 'details' | null>(null);

  // Filter clients based on search query and status filter
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'All' || client.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const openClientHistory = (client: typeof clients[0]) => {
    setSelectedClient(client);
    setActiveDialog('history');
  };

  const openClientDetails = (client: typeof clients[0]) => {
    setSelectedClient(client);
    setActiveDialog('details');
  };

  return (
    <>
      <div className="flex-1 space-y-6 p-6 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Client Records</h1>
        </div>

        {/* Client Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex flex-row items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Clients</p>
                <p className="text-2xl font-bold">{clients.length}</p>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <User className="h-5 w-5 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-row items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Clients</p>
                <p className="text-2xl font-bold">
                  {clients.filter(client => client.status === 'Active').length}
                </p>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <User className="h-5 w-5 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-row items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Upcoming Appointments</p>
                <p className="text-2xl font-bold">
                  {clients.filter(client => client.nextAppointment).length}
                </p>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-row items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">New This Month</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <User className="h-5 w-5 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className=''>
          <CardHeader className="pb-3">
            <CardTitle>Client Directory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
              <div className="flex gap-2 flex-1">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search clients..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Filter className="text-muted-foreground h-4 w-4" />
                <select
                  className="p-2 border border-border rounded-md"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="All">All Clients</option>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredClients.map(client => (
                    <Card key={client.id} className="overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <ImageWithFallback
                              src={client.avatar}
                              alt={client.name}
                              className="rounded-full h-12 w-12 object-cover"
                            />
                            <div>
                              <h3 className="font-medium">{client.name}</h3>
                              <Badge variant={client.status === 'Active' ? 'default' : 'secondary'}>
                                {client.status}
                              </Badge>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openClientDetails(client)}>
                                <User className="mr-2 h-4 w-4" />
                                <span>Client Details</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openClientHistory(client)}>
                                <ClipboardList className="mr-2 h-4 w-4" />
                                <span>View History</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit Details</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                <span>Send Message</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{client.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{client.phone}</span>
                          </div>
                        </div>

                        <div className="border-t border-border/30 mt-4 pt-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Last Visit</span>
                            <span className="text-sm">
                              {new Date(client.lastVisit).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Next Appointment</span>
                            <span className="text-sm">
                              {client.nextAppointment ? new Date(client.nextAppointment).toLocaleDateString() : 'None Scheduled'}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-between">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openClientHistory(client)}
                          >
                            <ClipboardList className="h-4 w-4 mr-1" />
                            View History
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => openClientDetails(client)}
                          >
                            <User className="h-4 w-4 mr-1" />
                            Client Details
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="list">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/30">
                        <th className="text-left font-medium p-3">Client</th>
                        <th className="text-left font-medium p-3">Contact Info</th>
                        <th className="text-left font-medium p-3">Status</th>
                        <th className="text-left font-medium p-3">Last Visit</th>
                        <th className="text-left font-medium p-3">Next Appointment</th>
                        <th className="text-left font-medium p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredClients.map(client => (
                        <tr key={client.id} className="border-b border-border/30 last:border-0 hover:bg-muted/20">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <ImageWithFallback
                                src={client.avatar}
                                alt={client.name}
                                className="rounded-full h-8 w-8 object-cover"
                              />
                              <span>{client.name}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <div>
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3 text-muted-foreground" />
                                <span className="text-sm">{client.email}</span>
                              </div>
                              <div className="flex items-center gap-1 mt-1">
                                <Phone className="h-3 w-3 text-muted-foreground" />
                                <span className="text-sm">{client.phone}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge variant={client.status === 'Active' ? 'default' : 'secondary'}>
                              {client.status}
                            </Badge>
                          </td>
                          <td className="p-3">{new Date(client.lastVisit).toLocaleDateString()}</td>
                          <td className="p-3">
                            {client.nextAppointment ? new Date(client.nextAppointment).toLocaleDateString() : 'None Scheduled'}
                          </td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => openClientHistory(client)}
                              >
                                <ClipboardList className="h-4 w-4" />
                                <span className="sr-only">View History</span>
                              </Button>
                              <Button
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => openClientDetails(client)}
                              >
                                <User className="h-4 w-4" />
                                <span className="sr-only">Client Details</span>
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
          </CardContent>
        </Card>

      </div>
      {/* Client History Dialog */}
      {selectedClient && (
        <Dialog open={activeDialog === 'history'} onOpenChange={() => activeDialog === 'history' && setActiveDialog(null)}>
          <DialogContent className="sm:max-w-[425px] md:max-w-[625px] ld:max-w-[825px] max-h-screen overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Client History: {selectedClient.name}</DialogTitle>
            </DialogHeader>

            <div className="grid md:grid-cols-5 gap-6">
              <Card className="md:col-span-2">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <ImageWithFallback
                      src={selectedClient.avatar}
                      alt={selectedClient.name}
                      className="rounded-full h-20 w-20 object-cover mb-4"
                    />
                    <h3 className="font-medium">{selectedClient.name}</h3>
                    <Badge variant={selectedClient.status === 'Active' ? 'default' : 'secondary'} className="mt-1 mb-4">
                      {selectedClient.status}
                    </Badge>

                    <div className="w-full text-left space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedClient.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedClient.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Client since {new Date(selectedClient.joinDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-3">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Appointment History</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {clientAppointments.map(appointment => (
                      <div key={appointment.id} className="border-b border-border/30 pb-4 last:border-b-0 last:pb-0">
                        <div className="flex flex-col sm:flex-row justify-between">
                          <div>
                            <div className="font-medium">{appointment.service}</div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(appointment.date).toLocaleDateString()}</span>
                              <Clock className="h-3 w-3 ml-2" />
                              <span>{appointment.time}</span>
                            </div>
                          </div>
                          <div className="text-sm mt-1 sm:mt-0">
                            <span className="text-muted-foreground">Staff: </span>
                            <span>{appointment.staffMember}</span>
                          </div>
                        </div>

                        {appointment.notes && (
                          <div className="mt-2 text-sm bg-muted/30 p-2 rounded-md">
                            <span className="text-muted-foreground mr-1">Notes:</span>
                            {appointment.notes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {clientAppointments.length === 0 && (
                    <div className="text-center py-6">
                      <FileText className="h-10 w-10 text-muted-foreground mx-auto" />
                      <p className="mt-2">No appointment history found</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setActiveDialog(null)}>Close</Button>
              <Button>Book New Appointment</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Client Details Dialog */}
      {selectedClient && (
        <Dialog open={activeDialog === 'details'} onOpenChange={() => activeDialog === 'details' && setActiveDialog(null)}>
          <DialogContent className="sm:max-w-[425px] md:max-w-[625px] ld:max-w-[825px] max-h-screen overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Client Details</DialogTitle>
            </DialogHeader>

            <div className="grid md:grid-cols-[1fr_2fr] gap-6">
              <div className="flex flex-col items-center text-center">
                <ImageWithFallback
                  src={selectedClient.avatar}
                  alt={selectedClient.name}
                  className="rounded-full h-24 w-24 object-cover mb-4"
                />
                <h3 className="font-medium">{selectedClient.name}</h3>
                <Badge variant={selectedClient.status === 'Active' ? 'default' : 'secondary'} className="mt-1">
                  {selectedClient.status}
                </Badge>
              </div>

              <div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p>{selectedClient.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p>{selectedClient.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Client Since</p>
                    <p>{new Date(selectedClient.joinDate).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Total Appointments</p>
                    <p>{selectedClient.appointmentCount}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Last Visit</p>
                    <p>{new Date(selectedClient.lastVisit).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Next Appointment</p>
                    <p>
                      {selectedClient.nextAppointment
                        ? new Date(selectedClient.nextAppointment).toLocaleDateString()
                        : 'None scheduled'
                      }
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-1">Preferred Services</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedClient.preferredServices.map((service, index) => (
                      <Badge key={index} variant="outline">{service}</Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-1">Client Notes</p>
                  <div className="bg-muted/30 p-3 rounded-md">
                    {selectedClient.notes || 'No notes available'}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setActiveDialog(null)}>Close</Button>
              <Button variant="outline">Message Client</Button>
              <Button variant="outline">Edit Details</Button>
              <Button>Book Appointment</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};