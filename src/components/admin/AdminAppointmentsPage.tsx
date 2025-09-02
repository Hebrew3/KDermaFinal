import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Calendar as CalendarComponent } from '../ui/calendar';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  UserCircle,
  CalendarDays,
  ListFilter
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';

// Sample appointments data
const appointmentsData = [
  {
    id: '1',
    client: {
      name: 'Emma Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/11.jpg'
    },
    staff: {
      name: 'Dr. Emily Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
    },
    service: 'Advanced Facial Treatment',
    date: '2025-05-10',
    time: '10:00 AM',
    status: 'Confirmed',
    duration: 60,
    notes: 'Client has sensitive skin, use gentle products only.'
  },
  {
    id: '2',
    client: {
      name: 'James Brown',
      avatar: 'https://randomuser.me/api/portraits/men/11.jpg'
    },
    staff: {
      name: 'Dr. Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
    },
    service: 'Skin Analysis & Consultation',
    date: '2025-05-10',
    time: '11:30 AM',
    status: 'Confirmed',
    duration: 45,
    notes: 'First-time client, comprehensive consultation needed.'
  },
  {
    id: '3',
    client: {
      name: 'Olivia Martinez',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg'
    },
    staff: {
      name: 'Dr. Emily Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
    },
    service: 'Medical Dermatology',
    date: '2025-05-10',
    time: '1:00 PM',
    status: 'Confirmed',
    duration: 60,
    notes: 'Follow-up for acne treatment.'
  },
  {
    id: '4',
    client: {
      name: 'William Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/12.jpg'
    },
    staff: {
      name: 'Dr. Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
    },
    service: 'Hydrating Skin Therapy',
    date: '2025-05-10',
    time: '3:00 PM',
    status: 'Cancelled',
    duration: 90,
    notes: 'Cancellation reason: personal emergency.'
  },
  {
    id: '5',
    client: {
      name: 'Sophia Garcia',
      avatar: 'https://randomuser.me/api/portraits/women/13.jpg'
    },
    staff: {
      name: 'Sarah Williams',
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg'
    },
    service: 'Anti-Aging Treatment',
    date: '2025-05-11',
    time: '9:30 AM',
    status: 'Confirmed',
    duration: 75,
    notes: 'Client requested specific anti-aging products.'
  },
  {
    id: '6',
    client: {
      name: 'David Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/13.jpg'
    },
    staff: {
      name: 'Dr. Emily Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
    },
    service: 'Skin Condition Assessment',
    date: '2025-05-11',
    time: '11:00 AM',
    status: 'Pending',
    duration: 60,
    notes: 'Client needs confirmation call.'
  }
];

export const AdminAppointmentsPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedView, setSelectedView] = useState('day');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const formattedDate = date ? date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';

  // Filter appointments based on date, search, and status
  const filteredAppointments = appointmentsData.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    const selectedDateString = date?.toDateString();

    // Date filter
    const matchesDate = selectedDateString === appointmentDate.toDateString();

    // Search filter
    const matchesSearch = !searchQuery ||
      appointment.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus = selectedStatus === 'All' || appointment.status === selectedStatus;

    return matchesDate && matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Appointments</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Appointment</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Select id="client">
                  <option value="">Select a client</option>
                  <option value="Emma Wilson">Emma Wilson</option>
                  <option value="James Brown">James Brown</option>
                  <option value="Olivia Martinez">Olivia Martinez</option>
                  <option value="William Johnson">William Johnson</option>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="staff">Staff Member</Label>
                <Select id="staff">
                  <option value="">Select staff</option>
                  <option value="Dr. Emily Johnson">Dr. Emily Johnson</option>
                  <option value="Dr. Michael Chen">Dr. Michael Chen</option>
                  <option value="Sarah Williams">Sarah Williams</option>
                  <option value="Robert Davis">Robert Davis</option>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service">Service</Label>
                <Select id="service">
                  <option value="">Select a service</option>
                  <option value="Advanced Facial Treatment">Advanced Facial Treatment</option>
                  <option value="Medical Dermatology">Medical Dermatology</option>
                  <option value="Anti-Aging Treatment">Anti-Aging Treatment</option>
                  <option value="Hydrating Skin Therapy">Hydrating Skin Therapy</option>
                  <option value="Skin Analysis & Consultation">Skin Analysis & Consultation</option>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Input id="notes" placeholder="Add appointment notes..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Create Appointment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {/* grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 */}
      <div className="grid grid-cols-1 md:grid-cols-[249px_1fr] gap-6">

        {/* Calendar Sidebar */}
        <div className="space-y-6 ">
          <Card>
            <CardContent className="p-4">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Appointment Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span>Confirmed</span>
                  </div>
                  <Badge variant="outline">12</Badge>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-amber-400 mr-2"></div>
                    <span>Pending</span>
                  </div>
                  <Badge variant="outline">4</Badge>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span>Cancelled</span>
                  </div>
                  <Badge variant="outline">2</Badge>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span>Completed</span>
                  </div>
                  <Badge variant="outline">8</Badge>
                </li>
                <li className="flex items-center justify-between text-sm font-medium pt-2 border-t border-border/30">
                  <span>Total</span>
                  <Badge variant="default">26</Badge>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <CalendarDays className="mr-2 h-4 w-4" />
                View All Appointments
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <UserCircle className="mr-2 h-4 w-4" />
                View All Clients
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ListFilter className="mr-2 h-4 w-4" />
                Manage Appointment Types
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{formattedDate}</CardTitle>
              <p className="text-muted-foreground mt-1 text-sm">
                {filteredAppointments.length} appointments scheduled
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  if (date) {
                    const newDate = new Date(date);
                    newDate.setDate(newDate.getDate() - 1);
                    setDate(newDate);
                  }
                }}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous day</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  if (date) {
                    const newDate = new Date(date);
                    newDate.setDate(newDate.getDate() + 1);
                    setDate(newDate);
                  }
                }}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next day</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDate(new Date())}
              >
                Today
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="list" value={selectedView} onValueChange={setSelectedView}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <TabsList>
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="day">Day View</TabsTrigger>
                </TabsList>

                <div className="flex flex-1 sm:flex-none gap-2">
                  <div className="relative flex-1 sm:flex-none sm:w-[200px]">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <Select
                    value={selectedStatus}
                    onValueChange={(v) => setSelectedStatus(v)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Statuses</SelectItem>
                      <SelectItem value="Confirmed">Confirmed</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <TabsContent value="list" className="mt-0">
                <div className="space-y-4">
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-border/30 rounded-lg hover:bg-muted/30"
                      >
                        <div className="flex items-center mb-3 sm:mb-0">
                          <ImageWithFallback
                            src={appointment.client.avatar}
                            alt={appointment.client.name}
                            className="rounded-full h-10 w-10 object-cover mr-3"
                          />
                          <div>
                            <h4 className="font-medium">{appointment.client.name}</h4>
                            <p className="text-sm text-muted-foreground">{appointment.service}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.time} ({appointment.duration} min)</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <ImageWithFallback
                              src={appointment.staff.avatar}
                              alt={appointment.staff.name}
                              className="rounded-full h-6 w-6 object-cover"
                            />
                            <span className="text-sm">{appointment.staff.name}</span>
                          </div>

                          <Badge variant={
                            appointment.status === 'Confirmed' ? 'default' :
                              appointment.status === 'Pending' ? 'outline' :
                                appointment.status === 'Cancelled' ? 'destructive' : 'secondary'
                          }>
                            {appointment.status}
                          </Badge>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">Details</Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Appointment Details</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                  <ImageWithFallback
                                    src={appointment.client.avatar}
                                    alt={appointment.client.name}
                                    className="rounded-full h-12 w-12 object-cover"
                                  />
                                  <div>
                                    <h3 className="font-medium">{appointment.client.name}</h3>
                                    <p className="text-muted-foreground">{appointment.service}</p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Date</p>
                                    <p className="font-medium">{new Date(appointment.date).toLocaleDateString()}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Time</p>
                                    <p className="font-medium">{appointment.time}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Duration</p>
                                    <p className="font-medium">{appointment.duration} minutes</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Status</p>
                                    <Badge variant={
                                      appointment.status === 'Confirmed' ? 'default' :
                                        appointment.status === 'Pending' ? 'outline' :
                                          appointment.status === 'Cancelled' ? 'destructive' : 'secondary'
                                    }>
                                      {appointment.status}
                                    </Badge>
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">Staff Member</p>
                                  <div className="flex items-center gap-2">
                                    <ImageWithFallback
                                      src={appointment.staff.avatar}
                                      alt={appointment.staff.name}
                                      className="rounded-full h-6 w-6 object-cover"
                                    />
                                    <p className="font-medium">{appointment.staff.name}</p>
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">Notes</p>
                                  <p className="bg-muted p-3 rounded-md">{appointment.notes}</p>
                                </div>
                              </div>
                              <DialogFooter>
                                <div className="flex gap-2">
                                  <Button variant="outline">Edit</Button>
                                  <Button variant={appointment.status === 'Cancelled' ? 'default' : 'destructive'}>
                                    {appointment.status === 'Cancelled' ? 'Restore' : 'Cancel Appointment'}
                                  </Button>
                                </div>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <Calendar className="h-12 w-12 mx-auto text-muted-foreground" />
                      <h3 className="mt-4 font-medium">No appointments found</h3>
                      <p className="text-muted-foreground mt-1">
                        There are no appointments scheduled for this date or matching your filters.
                      </p>
                      <Button className="mt-4">Create New Appointment</Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="day" className="mt-0">
                <div className="border border-border/30 rounded-md">
                  <div className="grid grid-cols-1 divide-y divide-border/30">
                    {['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'].map((timeSlot) => {
                      const appointmentsAtTime = filteredAppointments.filter((apt) => apt.time === timeSlot);

                      return (
                        <div key={timeSlot} className="flex min-h-[100px]">
                          <div className="w-20 p-2 bg-muted/30 flex-shrink-0 border-r border-border/30 flex items-center justify-center">
                            <span className="text-sm text-muted-foreground">{timeSlot}</span>
                          </div>
                          <div className="flex-1 p-2">
                            {appointmentsAtTime.length > 0 ? (
                              appointmentsAtTime.map((apt) => (
                                <div
                                  key={apt.id}
                                  className={`p-2 rounded-md mb-1 flex justify-between items-center ${apt.status === 'Confirmed' ? 'bg-green-100 border border-green-200' :
                                    apt.status === 'Pending' ? 'bg-amber-50 border border-amber-200' :
                                      apt.status === 'Cancelled' ? 'bg-red-50 border border-red-200 opacity-60' :
                                        'bg-blue-50 border border-blue-200'
                                    }`}
                                >
                                  <div className="flex items-center">
                                    <ImageWithFallback
                                      src={apt.client.avatar}
                                      alt={apt.client.name}
                                      className="rounded-full h-8 w-8 object-cover mr-3"
                                    />
                                    <div>
                                      <p className="font-medium text-sm">{apt.client.name}</p>
                                      <p className="text-xs text-muted-foreground">{apt.service}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {apt.status === 'Confirmed' && <CheckCircle className="h-4 w-4 text-green-600" />}
                                    {apt.status === 'Pending' && <AlertCircle className="h-4 w-4 text-amber-500" />}
                                    {apt.status === 'Cancelled' && <XCircle className="h-4 w-4 text-red-500" />}
                                    <span className="text-xs">{apt.duration} min</span>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="h-full flex items-center justify-center border border-dashed border-border/30 rounded-md">
                                <p className="text-sm text-muted-foreground">Available</p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};