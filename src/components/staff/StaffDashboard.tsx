import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useAuth } from '../context/AuthContext';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import {
  Calendar,
  Users,
  CheckCircle,
  Clock,
  UserPlus,
  AlertCircle,
  CalendarPlus
} from 'lucide-react';

// Sample appointments data
const appointmentsData = [
  {
    id: '1',
    client: 'Emma Wilson',
    service: 'Advanced Facial Treatment',
    date: '2025-05-10',
    time: '10:00 AM',
    status: 'Confirmed',
    duration: 60
  },
  {
    id: '2',
    client: 'James Brown',
    service: 'Skin Analysis & Consultation',
    date: '2025-05-10',
    time: '11:30 AM',
    status: 'Confirmed',
    duration: 45
  },
  {
    id: '3',
    client: 'Olivia Martinez',
    service: 'Medical Dermatology',
    date: '2025-05-10',
    time: '1:00 PM',
    status: 'Confirmed',
    duration: 60
  },
  {
    id: '4',
    client: 'William Johnson',
    service: 'Hydrating Skin Therapy',
    date: '2025-05-11',
    time: '9:30 AM',
    status: 'Pending',
    duration: 90
  },
  {
    id: '5',
    client: 'Sophia Garcia',
    service: 'Anti-Aging Treatment',
    date: '2025-05-11',
    time: '11:30 AM',
    status: 'Confirmed',
    duration: 75
  }
];

// Sample client data
const clientsData = [
  {
    id: '1',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    phone: '(555) 123-4567',
    lastVisit: '2025-04-15',
    visits: 12,
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    id: '2',
    name: 'James Brown',
    email: 'james@example.com',
    phone: '(555) 234-5678',
    lastVisit: '2025-04-28',
    visits: 3,
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: '3',
    name: 'Olivia Martinez',
    email: 'olivia@example.com',
    phone: '(555) 345-6789',
    lastVisit: '2025-03-20',
    visits: 5,
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: '4',
    name: 'William Johnson',
    email: 'william@example.com',
    phone: '(555) 456-7890',
    lastVisit: '2025-05-02',
    visits: 1,
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
  },
  {
    id: '5',
    name: 'Sophia Garcia',
    email: 'sophia@example.com',
    phone: '(555) 567-8901',
    lastVisit: '2025-04-10',
    visits: 8,
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
  },
];

export const StaffDashboard: React.FC = () => {
  const { user } = useAuth();
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Staff Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">
            Welcome back, {user?.name || 'Staff Member'}
          </span>
        </div>
      </div>

      {/* Date & Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-medium">{today}</h2>
              <p className="text-muted-foreground">You have 3 appointments scheduled for today</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Clock className="mr-2 h-4 w-4" />
                Check Schedule
              </Button>
              <Button>
                <CalendarPlus className="mr-2 h-4 w-4" />
                Add Appointment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Today's Appointments
              </p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Clients
              </p>
              <p className="text-2xl font-bold">42</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Completed Appointments
              </p>
              <p className="text-2xl font-bold">186</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="appointments">
        <TabsList className="mb-4">
          <TabsTrigger value="appointments">Today's Appointments</TabsTrigger>
          <TabsTrigger value="clients">My Clients</TabsTrigger>
        </TabsList>
        
        <TabsContent value="appointments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appointments - May 10, 2025</CardTitle>
            </CardHeader>
            <CardContent>
              {appointmentsData
                .filter(appointment => appointment.date === '2025-05-10')
                .map((appointment, index) => (
                  <div key={appointment.id} className={`flex flex-col md:flex-row justify-between items-start md:items-center p-4 ${
                    index < appointmentsData.filter(a => a.date === '2025-05-10').length - 1 ? 'border-b border-border/30' : ''
                  }`}>
                    <div className="flex items-center gap-4 mb-3 md:mb-0">
                      <div className={`rounded-full p-2 ${
                        appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {appointment.status === 'Confirmed' ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <AlertCircle className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{appointment.client}</p>
                        <p className="text-sm text-muted-foreground">{appointment.service}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6 w-full md:w-auto">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                        <span className="text-sm">{appointment.time} ({appointment.duration} min)</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Details</Button>
                        <Button size="sm">Check In</Button>
                      </div>
                    </div>
                  </div>
                ))
              }
              
              <div className="mt-4 border-t border-border/30 pt-4">
                <h3 className="font-medium mb-2">Upcoming Appointments</h3>
                {appointmentsData
                  .filter(appointment => appointment.date === '2025-05-11')
                  .map((appointment, index) => (
                    <div key={appointment.id} className={`flex flex-col md:flex-row justify-between items-start md:items-center p-4 ${
                      index < appointmentsData.filter(a => a.date === '2025-05-11').length - 1 ? 'border-b border-border/30' : ''
                    }`}>
                      <div className="flex items-center gap-4 mb-3 md:mb-0">
                        <div className={`rounded-full p-2 ${
                          appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {appointment.status === 'Confirmed' ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            <AlertCircle className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{appointment.client}</p>
                          <p className="text-sm text-muted-foreground">{appointment.service}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6 w-full md:w-auto">
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm">May 11, 2025</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm">{appointment.time}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Details</Button>
                          <Button size="sm" variant="ghost">Reschedule</Button>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Client List</CardTitle>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add New Client
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {clientsData.map(client => (
                  <div key={client.id} className="flex items-start gap-4 p-4 border border-border/30 rounded-lg">
                    <ImageWithFallback 
                      src={client.avatar}
                      alt={client.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{client.name}</h3>
                        <span className="text-sm text-muted-foreground">{client.visits} visits</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{client.email}</p>
                      <p className="text-sm text-muted-foreground">{client.phone}</p>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                          Last visit: {client.lastVisit}
                        </span>
                        <Button size="sm" variant="outline">View Profile</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};