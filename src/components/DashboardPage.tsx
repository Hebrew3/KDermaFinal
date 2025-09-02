import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import {
  Calendar,
  Award,
  TrendingUp,
  Clock,
  DollarSign,
  CalendarCheck
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export const DashboardPage = () => {
  // Sample data for the dashboard
  const stats = [
    {
      title: "Total Appointments",
      value: "128",
      change: "+14%",
      icon: <Calendar className="h-5 w-5 text-primary" />,
      description: "from last month",
    },
    {
      title: "Total Service Avail",
      value: "18",
      change: "+3",
      icon: <Award className="h-5 w-5 text-primary" />,
      description: "new this month",
    },
    {
      title: "Upcoming Schedule",
      value: "7",
      change: "+2",
      icon: <CalendarCheck className="h-5 w-5 text-primary" />,
      description: "for this week",
    },
    {
      title: "Total Discount Points",
      value: "6,590",
      change: "+8%",
      icon: <DollarSign className="h-5 w-5 text-primary" />,
      description: "from last month",
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      client: {
        name: "Emma Wilson",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      },
      service: "Haircut & Style",
      time: "10:00 AM",
      duration: "45 min",
    },
    {
      id: 2,
      client: {
        name: "James Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      },
      service: "Men's Haircut",
      time: "11:30 AM",
      duration: "30 min",
    },
    {
      id: 3,
      client: {
        name: "Sophie Chen",
        avatar:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      },
      service: "Hair Coloring",
      time: "1:00 PM",
      duration: "120 min",
    },
  ];

  const recentClients = [
    {
      id: 1,
      name: "Emily Johnson",
      email: "emily@example.com",
      lastVisit: "May 7, 2025",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    },
    {
      id: 2,
      name: "Alex Thompson",
      email: "alex@example.com",
      lastVisit: "May 5, 2025",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    },
    {
      id: 3,
      name: "Maria Garcia",
      email: "maria@example.com",
      lastVisit: "May 3, 2025",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-medium">Dashboard Overview</h1>
        <p className="text-gray-500">
          Welcome back! Here's what's happening with your salon
          today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">{stat.title}</p>
                  <p className="font-medium text-xl mt-1">{stat.value}</p>
                </div>
                <div className="bg-muted p-2 rounded-full">
                  {stat.icon}
                </div>
              </div>
              <div className="mt-3 flex items-center text-xs">
                <TrendingUp className="text-green-500 h-3 w-3 mr-1" />
                <span className="text-green-500">{stat.change}</span>
                <span className="text-gray-500 ml-1">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs for Appointments and Clients */}
      <Tabs defaultValue="appointments">
        <TabsList>
          <TabsTrigger value="appointments">
            Today's Appointments
          </TabsTrigger>
          <TabsTrigger value="clients">
            Recent Clients
          </TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center p-3 bg-muted rounded-lg"
                  >
                    <ImageWithFallback
                      src={appointment.client.avatar}
                      alt={appointment.client.name}
                      className="w-10 h-10 rounded-full"
                      type="person"
                    />
                    <div className="ml-4 flex-1">
                      <p className="font-medium">
                        {appointment.client.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {appointment.service}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Clock className="text-primary h-4 w-4 mr-1" />
                      <div className="text-right">
                        <p className="font-medium">
                          {appointment.time}
                        </p>
                        <p className="text-sm text-gray-500">
                          {appointment.duration}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Recent Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentClients.map((client) => (
                  <div
                    key={client.id}
                    className="flex items-center p-3 bg-muted rounded-lg"
                  >
                    <ImageWithFallback
                      src={client.avatar}
                      alt={client.name}
                      className="w-10 h-10 rounded-full"
                      type="person"
                    />
                    <div className="ml-4 flex-1">
                      <p className="font-medium">
                        {client.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {client.email}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        Last visit
                      </p>
                      <p className="font-medium">
                        {client.lastVisit}
                      </p>
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