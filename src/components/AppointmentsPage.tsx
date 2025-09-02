import { useState } from 'react';
import { Calendar } from './ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { format, addDays } from 'date-fns';
import { Search, Calendar as CalendarIcon, Plus, Filter, Clock, User } from 'lucide-react';
import { toast } from "sonner";

// Mock data for appointments
const mockAppointments = [
  { 
    id: 1, 
    patientName: 'Emma Johnson', 
    date: new Date(), 
    time: '10:00 AM', 
    service: 'Skin Analysis', 
    duration: 30,
    status: 'confirmed',
    notes: 'First time client, consultation for acne treatment',
    practitioner: 'Dr. Sarah Williams'
  },
  { 
    id: 2, 
    patientName: 'Michael Brown', 
    date: new Date(), 
    time: '11:30 AM', 
    service: 'Chemical Peel', 
    duration: 45,
    status: 'confirmed',
    notes: 'Follow-up treatment',
    practitioner: 'Dr. Sarah Williams'
  },
  { 
    id: 3, 
    patientName: 'Olivia Davis', 
    date: addDays(new Date(), 1), 
    time: '2:00 PM', 
    service: 'Microdermabrasion', 
    duration: 60,
    status: 'pending',
    notes: 'Sensitive skin, check medical history',
    practitioner: 'Dr. Robert Chen'
  },
  { 
    id: 4, 
    patientName: 'James Wilson', 
    date: addDays(new Date(), 2), 
    time: '9:15 AM', 
    service: 'Laser Hair Removal', 
    duration: 45,
    status: 'confirmed',
    notes: 'Session 3 of 6',
    practitioner: 'Dr. Anna Lopez'
  },
  { 
    id: 5, 
    patientName: 'Sophia Martinez', 
    date: addDays(new Date(), 3), 
    time: '4:30 PM', 
    service: 'Botox Injection', 
    duration: 30,
    status: 'cancelled',
    notes: 'Postponed from last week',
    practitioner: 'Dr. Robert Chen'
  }
];

// Service options
const serviceOptions = [
  'Skin Analysis',
  'Chemical Peel',
  'Microdermabrasion',
  'Laser Hair Removal',
  'Botox Injection',
  'Dermal Fillers',
  'Acne Treatment',
  'Facial',
  'Skin Tag Removal'
];

// Practitioners
const practitioners = [
  'Dr. Sarah Williams',
  'Dr. Robert Chen',
  'Dr. Anna Lopez',
  'Dr. David Kim'
];

export const AppointmentsPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Filter appointments based on selected date and search query
  const filteredAppointments = mockAppointments.filter(appointment => {
    const dateMatches = format(appointment.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
    const searchMatches = appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         appointment.service.toLowerCase().includes(searchQuery.toLowerCase());
    const statusMatches = selectedStatus === 'all' || appointment.status === selectedStatus;
    
    return (dateMatches || !selectedDate) && searchMatches && statusMatches;
  });

  // Handle creating a new appointment
  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Appointment created successfully!");
    setIsCreateDialogOpen(false);
  };

  // Show appointment details
  const showAppointmentDetails = (appointment: any) => {
    setSelectedAppointment(appointment);
    setIsDetailsDialogOpen(true);
  };
  
  // Generate time slots in 15-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 18; hour++) {
      for (let min = 0; min < 60; min += 15) {
        const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
        const period = hour < 12 ? 'AM' : 'PM';
        slots.push(`${formattedHour}:${min === 0 ? '00' : min} ${period}`);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'confirmed':
        return <Badge className="bg-green-500 hover:bg-green-600">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>;
      case 'cancelled':
        return <Badge className="bg-destructive hover:bg-destructive/90">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1>Appointments</h1>
        <Button className="gap-1" onClick={() => setIsCreateDialogOpen(true)}>
          <Plus size={16} />
          <span>New Appointment asd</span>
        </Button>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        
        <div className="mt-4 flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div className="flex items-center gap-2 flex-grow max-w-md">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search appointments..." 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-1">
              <Filter size={16} />
              <span className="hidden sm:inline">Filter</span>
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="list" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>
                {filteredAppointments.length} appointments scheduled for {format(selectedDate, 'MMMM do, yyyy')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredAppointments.length > 0 ? (
                <div className="space-y-4">
                  {filteredAppointments.map((appointment) => (
                    <div 
                      key={appointment.id} 
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                      onClick={() => showAppointmentDetails(appointment)}
                    >
                      <div>
                        <h3 className="text-primary">{appointment.patientName}</h3>
                        <div className="text-sm text-muted-foreground flex gap-2 items-center mt-1">
                          <CalendarIcon size={14} />
                          {format(appointment.date, 'MMM d, yyyy')} at {appointment.time}
                        </div>
                      </div>
                      <div className="mt-2 sm:mt-0 flex flex-col sm:items-end">
                        <span className="text-sm">{appointment.service}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock size={12} /> {appointment.duration} min
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <User size={12} /> {appointment.practitioner.split(' ').pop()}
                          </span>
                          {getStatusBadge(appointment.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No appointments found for this date.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calendar" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => setSelectedDate(date || new Date())}
                  className="border rounded-md"
                />
              </CardContent>
            </Card>
            
            <Card className="md:col-span-5 mt-6 md:mt-0">
              <CardHeader className="pb-3">
                <CardTitle>Appointments for {format(selectedDate, 'MMMM do, yyyy')}</CardTitle>
                <CardDescription>
                  {filteredAppointments.length} appointments scheduled
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="p-3 border-l-4 border-primary rounded bg-accent/50 hover:bg-accent transition-colors cursor-pointer"
                        onClick={() => showAppointmentDetails(appointment)}
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-medium">{appointment.time}</span>
                          {getStatusBadge(appointment.status)}
                        </div>
                        <div className="mt-1">
                          <h4>{appointment.patientName}</h4>
                          <p className="text-sm text-muted-foreground">{appointment.service} ({appointment.duration} min)</p>
                          <p className="text-xs text-muted-foreground mt-1">With {appointment.practitioner}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No appointments scheduled for this date.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create appointment dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule New Appointment</DialogTitle>
            <DialogDescription>
              Create a new appointment for a client.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateAppointment}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Client Name
                </Label>
                <Input id="name" className="col-span-3" placeholder="Enter client name" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <div className="col-span-3">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => setSelectedDate(date || new Date())}
                    className="border rounded-md p-3"
                    initialFocus
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Time
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time, index) => (
                      <SelectItem key={index} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="service" className="text-right">
                  Service
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceOptions.map((service, index) => (
                      <SelectItem key={index} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="practitioner" className="text-right">
                  Practitioner
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select practitioner" />
                  </SelectTrigger>
                  <SelectContent>
                    {practitioners.map((practitioner, index) => (
                      <SelectItem key={index} value={practitioner}>
                        {practitioner}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Notes
                </Label>
                <Textarea className="col-span-3" placeholder="Add appointment notes (optional)" />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Schedule Appointment</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Appointment details dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        {selectedAppointment && (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Appointment Details</DialogTitle>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-muted-foreground">
                  {format(selectedAppointment.date, 'MMMM d, yyyy')} at {selectedAppointment.time}
                </p>
                {getStatusBadge(selectedAppointment.status)}
              </div>
            </DialogHeader>
            
            <div className="py-4">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Client</h4>
                  <p>{selectedAppointment.patientName}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Service</h4>
                  <p>{selectedAppointment.service}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Duration</h4>
                  <p>{selectedAppointment.duration} minutes</p>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Practitioner</h4>
                  <p>{selectedAppointment.practitioner}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Notes</h4>
                  <p className="text-sm">{selectedAppointment.notes}</p>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" className="gap-2" onClick={() => setIsDetailsDialogOpen(false)}>
                Close
              </Button>
              <Button variant="default" className="gap-2">
                Edit Appointment
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};