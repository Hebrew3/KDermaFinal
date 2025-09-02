
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useAuth } from '../context/AuthContext';
import { DataTable } from '../ui/data-table';
import { Button } from '../ui/button';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import {
  UserCheck,
  Calendar,
  Package,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  UserPlus
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

// Sample data for analytics
const revenueData = [
  { name: 'Jan', total: 1200 },
  { name: 'Feb', total: 1500 },
  { name: 'Mar', total: 2000 },
  { name: 'Apr', total: 2400 },
  { name: 'May', total: 1800 },
  { name: 'Jun', total: 2800 },
  { name: 'Jul', total: 3200 },
  { name: 'Aug', total: 3600 },
  { name: 'Sep', total: 3000 },
  { name: 'Oct', total: 2500 },
  { name: 'Nov', total: 2800 },
  { name: 'Dec', total: 3500 },
];

// Sample staff data
const staffData = [
  {
    id: '1',
    name: 'Dr. Emily Johnson',
    role: 'Dermatologist',
    status: 'Active',
    appointments: 12,
    clients: 76
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    role: 'Skin Specialist',
    status: 'Active',
    appointments: 8,
    clients: 54
  },
  {
    id: '3',
    name: 'Sarah Williams',
    role: 'Esthetician',
    status: 'On Leave',
    appointments: 0,
    clients: 42
  },
  {
    id: '4',
    name: 'Robert Davis',
    role: 'Medical Assistant',
    status: 'Active',
    appointments: 15,
    clients: 38
  },
];

// Sample clients data
const clientsData = [
  {
    id: '1',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    nextAppointment: '2025-05-15',
    status: 'Active',
    services: 3
  },
  {
    id: '2',
    name: 'James Brown',
    email: 'james@example.com',
    nextAppointment: '2025-05-18',
    status: 'Active',
    services: 1
  },
  {
    id: '3',
    name: 'Olivia Martinez',
    email: 'olivia@example.com',
    nextAppointment: null,
    status: 'Inactive',
    services: 2
  },
  {
    id: '4',
    name: 'William Johnson',
    email: 'william@example.com',
    nextAppointment: '2025-05-12',
    status: 'Active',
    services: 4
  },
  {
    id: '5',
    name: 'Sophia Garcia',
    email: 'sophia@example.com',
    nextAppointment: '2025-05-20',
    status: 'Active',
    services: 2
  },
];

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">
            Welcome back, {user?.name || 'Admin'}
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Clients
              </p>
              <p className="text-2xl font-bold">876</p>
              <p className="mt-1 flex items-center text-sm text-green-600">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                12% increase
              </p>
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
                Monthly Revenue
              </p>
              <p className="text-2xl font-bold">₱45,650</p>
              <p className="mt-1 flex items-center text-sm text-green-600">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                8% increase
              </p>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <Package className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Active Staff
              </p>
              <p className="text-2xl font-bold">12</p>
              <p className="mt-1 flex items-center text-sm text-red-600">
                <ArrowDownRight className="mr-1 h-4 w-4" />
                1 on leave
              </p>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <UserCheck className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Appointments
              </p>
              <p className="text-2xl font-bold">189</p>
              <p className="mt-1 flex items-center text-sm text-green-600">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                24 today
              </p>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overview Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                  <YAxis stroke="#888888" fontSize={12} tickFormatter={(value) => `₱${value}`} />
                  <Tooltip 
                    formatter={(value: number) => [`₱${value}`, 'Revenue']} 
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Bar dataKey="total" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Latest Registrations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between border-b border-border/30 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <ImageWithFallback 
                        src={`/services/${i % 2 === 0 ? 'hydrating-skin-therapy' : 'skin-analysis-consultation'}.jpg`}
                        alt="Client avatar"
                        className="h-10 w-10 rounded-full object-cover"
                        type="avatar"
                      />
                      <div>
                        <p className="font-medium">New Client Registration</p>
                        <p className="text-sm text-muted-foreground">
                          {i === 1 ? '2 hours ago' : i === 2 ? '5 hours ago' : '1 day ago'}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                ))}

                <Button variant="ghost" className="w-full">
                  View all registrations
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="font-medium">Staff Meeting</p>
                  <p className="text-sm text-muted-foreground">
                    Monthly staff meeting scheduled for May 15, 2025 at 10:00 AM
                  </p>
                </div>

                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="font-medium">System Update</p>
                  <p className="text-sm text-muted-foreground">
                    System maintenance scheduled for May 12, 2025 at 2:00 AM
                  </p>
                </div>

                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="font-medium">New Service Package</p>
                  <p className="text-sm text-muted-foreground">
                    New premium service package has been added to the system
                  </p>
                </div>

                <Button variant="ghost" className="w-full">
                  View all notifications
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="staff" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Staff Management</CardTitle>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add New Staff
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border/30">
                      <th className="p-4 font-medium">Name</th>
                      <th className="p-4 font-medium">Role</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">Appointments</th>
                      <th className="p-4 font-medium">Clients</th>
                      <th className="p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffData.map((staff) => (
                      <tr key={staff.id} className="border-b border-border/30 last:border-0">
                        <td className="p-4">{staff.name}</td>
                        <td className="p-4">{staff.role}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs ${
                            staff.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {staff.status}
                          </span>
                        </td>
                        <td className="p-4">{staff.appointments}</td>
                        <td className="p-4">{staff.clients}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="ghost">View</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Client Management</CardTitle>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add New Client
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border/30">
                      <th className="p-4 font-medium">Name</th>
                      <th className="p-4 font-medium">Email</th>
                      <th className="p-4 font-medium">Next Appointment</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">Services</th>
                      <th className="p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientsData.map((client) => (
                      <tr key={client.id} className="border-b border-border/30 last:border-0">
                        <td className="p-4">{client.name}</td>
                        <td className="p-4">{client.email}</td>
                        <td className="p-4">{client.nextAppointment || 'None scheduled'}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs ${
                            client.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {client.status}
                          </span>
                        </td>
                        <td className="p-4">{client.services}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="ghost">View</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
