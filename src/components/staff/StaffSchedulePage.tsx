import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, User, ChevronLeft, ChevronRight, Plus, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Calendar } from '../ui/calendar';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '../ui/dialog';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Select } from '../ui/select';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';

// Sample scheduled appointments
const appointments = [
  {
    id: '1',
    client: {
      name: 'Emma Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/11.jpg'
    },
    service: 'Advanced Facial Treatment',
    duration: 60,
    date: '2025-05-10',
    time: '10:00 AM',
    status: 'Confirmed',
    notes: 'Client has sensitive skin'
  },
  {
    id: '2',
    client: {
      name: 'James Brown',
      avatar: 'https://randomuser.me/api/portraits/men/11.jpg'
    },
    service: 'Skin Analysis',
    duration: 45,
    date: '2025-05-10',
    time: '11:30 AM',
    status: 'Confirmed',
    notes: 'First-time client'
  },
  {
    id: '3',
    client: {
      name: 'Olivia Martinez',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg'
    },
    service: 'Medical Dermatology',
    duration: 60,
    date: '2025-05-10',
    time: '1:00 PM',
    status: 'Confirmed',
    notes: 'Follow-up appointment'
  },
  {
    id: '4',
    client: {
      name: 'William Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/12.jpg'
    },
    service: 'Hydrating Skin Therapy',
    duration: 90,
    date: '2025-05-11',
    time: '10:00 AM',
    status: 'Pending',
    notes: ''
  },
  {
    id: '5',
    client: {
      name: 'Sophia Garcia',
      avatar: 'https://randomuser.me/api/portraits/women/13.jpg'
    },
    service: 'Anti-Aging Treatment',
    duration: 75,
    date: '2025-05-11',
    time: '3:00 PM',
    status: 'Confirmed',
    notes: ''
  }
];

// Time slots for the day view (hourly from 9am to 5pm)
const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

export const StaffSchedulePage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedView, setSelectedView] = useState('day');
  const [selectedStatus, setSelectedStatus] = useState('All');
  
  // Format the currently selected date
  const formattedDate = date ? date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';

  // Filter appointments based on selected date and status
  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    const selectedDateStr = date ? date.toDateString() : '';
    
    const matchesDate = appointmentDate.toDateString() === selectedDateStr;
    const matchesStatus = selectedStatus === 'All' || appointment.status === selectedStatus;
    
    return matchesDate && matchesStatus;
  });

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <h1 className="text-3xl font-semibold">My Schedule</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Office Hours
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                Request Time Off
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Request Time Off</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="time-off-date">Date(s)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input id="time-off-start" type="date" placeholder="Start date" />
                    <Input id="time-off-end" type="date" placeholder="End date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time-off-reason">Reason</Label>
                  <Select id="time-off-reason">
                    <option value="vacation">Vacation</option>
                    <option value="sick">Sick Leave</option>
                    <option value="personal">Personal Day</option>
                    <option value="other">Other</option>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time-off-notes">Notes (Optional)</Label>
                  <Input id="time-off-notes" placeholder="Add any relevant notes" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Submit Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        {/* Calendar sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Today's Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Appointments</span>
                <Badge variant="outline">
                  {appointments.filter(apt => new Date(apt.date).toDateString() === new Date().toDateString()).length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Hours Scheduled</span>
                <Badge variant="outline">6.5</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Next Appointment</span>
                <Badge>10:00 AM</Badge>
              </div>
              <div className="pt-2 border-t border-border">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Confirmed (3)</span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-1">
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <span>Pending (1)</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button className="w-full" variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Export Schedule
          </Button>
        </div>
        
        {/* Main schedule content */}
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
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Filter className="text-muted-foreground h-4 w-4" />
                <Select 
                  value={selectedStatus} 
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedStatus(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </Select>
              </div>
            </div>
            
            {/* Tabs component wrapping all tab content */}
            <Tabs defaultValue="day" value={selectedView} onValueChange={setSelectedView}>
              <TabsList>
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
              
              {/* Day View */}
              <TabsContent value="day">
                <div className="border border-border/30 rounded-md">
                  <div className="grid grid-cols-1 divide-y divide-border/30">
                    {timeSlots.map((timeSlot) => {
                      const appointmentsAtTime = filteredAppointments.filter(apt => apt.time === timeSlot);
                      
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
                                  className={`p-2 rounded-md mb-1 flex justify-between items-center ${
                                    apt.status === 'Confirmed' ? 'bg-green-100 border border-green-200' : 
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
                                  <div className="text-xs">
                                    <span>{apt.duration} min</span>
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
              
              {/* List View */}
              <TabsContent value="list">
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
                          
                          <Badge variant={
                            appointment.status === 'Confirmed' ? 'default' : 
                            appointment.status === 'Pending' ? 'outline' : 
                            appointment.status === 'Cancelled' ? 'destructive' : 'secondary'
                          }>
                            {appointment.status}
                          </Badge>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">View Details</Button>
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
                                
                                {appointment.notes && (
                                  <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Notes</p>
                                    <p className="bg-muted p-3 rounded-md">{appointment.notes}</p>
                                  </div>
                                )}
                              </div>
                              <DialogFooter>
                                <Button variant="outline">Message Client</Button>
                                <Button>Update Status</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                      <h3 className="mt-4 font-medium">No appointments found</h3>
                      <p className="text-muted-foreground mt-1">
                        There are no appointments scheduled for this date or matching your filters.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};