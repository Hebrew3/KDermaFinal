import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { 
  ArrowUp, 
  ArrowDown, 
  Wallet, 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  ChevronDown,
  Layers,
  Package,
  LineChart as LineChartIcon,
  BarChart2
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select } from '../ui/select';
import { Button } from '../ui/button';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  Area,
  AreaChart,
  ComposedChart,
  Scatter,
} from 'recharts';
import { formatCurrency } from '../utils/currency';

// Sample data for revenue chart
const revenueData = [
  { name: 'Jan', revenue: 4800, expenses: 3200, profit: 1600 },
  { name: 'Feb', revenue: 5200, expenses: 3400, profit: 1800 },
  { name: 'Mar', revenue: 6100, expenses: 3800, profit: 2300 },
  { name: 'Apr', revenue: 5700, expenses: 3500, profit: 2200 },
  { name: 'May', revenue: 7400, expenses: 4100, profit: 3300 },
  { name: 'Jun', revenue: 8200, expenses: 4600, profit: 3600 },
  { name: 'Jul', revenue: 7800, expenses: 4400, profit: 3400 },
  { name: 'Aug', revenue: 9100, expenses: 5200, profit: 3900 },
  { name: 'Sep', revenue: 8500, expenses: 4900, profit: 3600 },
  { name: 'Oct', revenue: 9800, expenses: 5400, profit: 4400 },
  { name: 'Nov', revenue: 10200, expenses: 5800, profit: 4400 },
  { name: 'Dec', revenue: 11500, expenses: 6200, profit: 5300 }
];

// Sample data for appointments
const appointmentsData = [
  { name: 'Jan', completed: 145, cancelled: 12, noShow: 8 },
  { name: 'Feb', completed: 162, cancelled: 15, noShow: 10 },
  { name: 'Mar', completed: 184, cancelled: 18, noShow: 12 },
  { name: 'Apr', completed: 172, cancelled: 14, noShow: 9 },
  { name: 'May', completed: 198, cancelled: 20, noShow: 11 },
  { name: 'Jun', completed: 211, cancelled: 22, noShow: 13 },
  { name: 'Jul', completed: 204, cancelled: 19, noShow: 10 },
  { name: 'Aug', completed: 216, cancelled: 24, noShow: 14 },
  { name: 'Sep', completed: 208, cancelled: 21, noShow: 12 },
  { name: 'Oct', completed: 223, cancelled: 25, noShow: 15 },
  { name: 'Nov', completed: 234, cancelled: 23, noShow: 14 },
  { name: 'Dec', completed: 254, cancelled: 28, noShow: 16 }
];

// Sample data for service popularity
const servicePopularityData = [
  { name: 'Advanced Facial', value: 35 },
  { name: 'Anti-Aging', value: 22 },
  { name: 'Medical Dermatology', value: 18 },
  { name: 'Hydrating Therapy', value: 15 },
  { name: 'Skin Analysis', value: 10 }
];

// Sample data for customer demographics
const customerDemographicsData = [
  { age: '18-24', value: 12 },
  { age: '25-34', value: 28 },
  { age: '35-44', value: 25 },
  { age: '45-54', value: 18 },
  { age: '55-64', value: 12 },
  { age: '65+', value: 5 }
];

// Sample data for top staff
const topStaffData = [
  { name: 'Dr. Emily Johnson', appointments: 234, revenue: 28750 },
  { name: 'Dr. Michael Chen', appointments: 198, revenue: 24600 },
  { name: 'Sarah Williams', appointments: 176, revenue: 18400 },
  { name: 'Robert Davis', appointments: 145, revenue: 15800 },
  { name: 'Jessica Martinez', appointments: 110, revenue: 12200 }
];

// Sample data for KPIs
const kpiData = {
  totalRevenue: {
    value: '₱86,450',
    change: '+12.5%',
    increasing: true
  },
  averageRevenue: {
    value: '₱84.50',
    change: '+5.2%',
    increasing: true
  },
  totalAppointments: {
    value: '1,245',
    change: '+8.4%',
    increasing: true
  },
  newClients: {
    value: '186',
    change: '-2.1%',
    increasing: false
  },
  conversionRate: {
    value: '68.2%',
    change: '+3.5%',
    increasing: true
  },
  appointmentCompletionRate: {
    value: '91.4%',
    change: '+1.2%',
    increasing: true
  }
};

// ===================== NEW DATA FOR TREATMENT TRENDS =====================
// Sample data for treatment trends
const treatmentTrendsData = [
  { month: 'Jan', acneTreatment: 85, antiAging: 65, hydration: 45, skinBrightening: 35, dermabrasion: 25 },
  { month: 'Feb', acneTreatment: 80, antiAging: 70, hydration: 50, skinBrightening: 40, dermabrasion: 30 },
  { month: 'Mar', acneTreatment: 75, antiAging: 85, hydration: 55, skinBrightening: 45, dermabrasion: 35 },
  { month: 'Apr', acneTreatment: 70, antiAging: 90, hydration: 65, skinBrightening: 50, dermabrasion: 40 },
  { month: 'May', acneTreatment: 65, antiAging: 95, hydration: 70, skinBrightening: 65, dermabrasion: 45 },
  { month: 'Jun', acneTreatment: 60, antiAging: 105, hydration: 85, skinBrightening: 80, dermabrasion: 50 },
  { month: 'Jul', acneTreatment: 55, antiAging: 115, hydration: 90, skinBrightening: 85, dermabrasion: 55 },
  { month: 'Aug', acneTreatment: 50, antiAging: 125, hydration: 100, skinBrightening: 90, dermabrasion: 60 },
  { month: 'Sep', acneTreatment: 55, antiAging: 130, hydration: 110, skinBrightening: 95, dermabrasion: 65 },
  { month: 'Oct', acneTreatment: 60, antiAging: 140, hydration: 120, skinBrightening: 100, dermabrasion: 70 },
  { month: 'Nov', acneTreatment: 65, antiAging: 145, hydration: 130, skinBrightening: 105, dermabrasion: 75 },
  { month: 'Dec', acneTreatment: 70, antiAging: 150, hydration: 140, skinBrightening: 110, dermabrasion: 80 }
];

// Treatment growth rate data
const treatmentGrowthData = [
  { name: 'Anti-Aging', growth: 42, revenue: 4500 },
  { name: 'Hydration', growth: 28, revenue: 3800 },
  { name: 'Skin Brightening', growth: 22, revenue: 3200 },
  { name: 'Dermabrasion', growth: 18, revenue: 2700 },
  { name: 'Acne Treatment', growth: -12, revenue: 2200 }
];

// Treatment popularity by age group
const treatmentByDemographicData = [
  { name: '18-24', acneTreatment: 65, antiAging: 15, hydration: 45, skinBrightening: 40, dermabrasion: 20 },
  { name: '25-34', acneTreatment: 50, antiAging: 45, hydration: 60, skinBrightening: 55, dermabrasion: 35 },
  { name: '35-44', acneTreatment: 30, antiAging: 75, hydration: 55, skinBrightening: 45, dermabrasion: 40 },
  { name: '45-54', acneTreatment: 15, antiAging: 85, hydration: 40, skinBrightening: 35, dermabrasion: 45 },
  { name: '55-64', acneTreatment: 10, antiAging: 90, hydration: 35, skinBrightening: 30, dermabrasion: 40 },
  { name: '65+', acneTreatment: 5, antiAging: 80, hydration: 30, skinBrightening: 25, dermabrasion: 30 }
];

// ================ NEW DATA FOR PRODUCT USAGE FORECASTING =================
// Sample data for product usage correlated with treatments
const productUsageData = [
  { 
    month: 'Jan', 
    antiAgingSerum: 120, 
    hydratingMask: 85, 
    vitaminCSerum: 95, 
    acneTreatmentGel: 110, 
    exfoliatingScrub: 65
  },
  { 
    month: 'Feb', 
    antiAgingSerum: 125, 
    hydratingMask: 90, 
    vitaminCSerum: 100, 
    acneTreatmentGel: 105, 
    exfoliatingScrub: 70
  },
  { 
    month: 'Mar', 
    antiAgingSerum: 135, 
    hydratingMask: 100, 
    vitaminCSerum: 110, 
    acneTreatmentGel: 100, 
    exfoliatingScrub: 75
  },
  { 
    month: 'Apr', 
    antiAgingSerum: 145, 
    hydratingMask: 110, 
    vitaminCSerum: 120, 
    acneTreatmentGel: 95, 
    exfoliatingScrub: 80
  },
  { 
    month: 'May', 
    antiAgingSerum: 155, 
    hydratingMask: 120, 
    vitaminCSerum: 130, 
    acneTreatmentGel: 90, 
    exfoliatingScrub: 85
  },
  { 
    month: 'Jun', 
    antiAgingSerum: 165, 
    hydratingMask: 130, 
    vitaminCSerum: 140, 
    acneTreatmentGel: 85, 
    exfoliatingScrub: 90
  },
  { 
    month: 'Jul', 
    antiAgingSerum: 175, 
    hydratingMask: 140, 
    vitaminCSerum: 150, 
    acneTreatmentGel: 80, 
    exfoliatingScrub: 95
  },
  { 
    month: 'Aug', 
    antiAgingSerum: 190, 
    hydratingMask: 150, 
    vitaminCSerum: 160, 
    acneTreatmentGel: 75, 
    exfoliatingScrub: 100
  },
  { 
    month: 'Sep', 
    antiAgingSerum: 200, 
    hydratingMask: 160, 
    vitaminCSerum: 170, 
    acneTreatmentGel: 80, 
    exfoliatingScrub: 105
  },
  { 
    month: 'Oct', 
    antiAgingSerum: 210, 
    hydratingMask: 170, 
    vitaminCSerum: 180, 
    acneTreatmentGel: 85, 
    exfoliatingScrub: 110
  },
  { 
    month: 'Nov', 
    antiAgingSerum: 225, 
    hydratingMask: 180, 
    vitaminCSerum: 190, 
    acneTreatmentGel: 90, 
    exfoliatingScrub: 115
  },
  { 
    month: 'Dec', 
    antiAgingSerum: 240, 
    hydratingMask: 190, 
    vitaminCSerum: 200, 
    acneTreatmentGel: 95, 
    exfoliatingScrub: 120
  }
];

// Product forecasting data for next 6 months
const productForecastData = [
  { month: 'Jan', actual: 475, forecast: 475 },
  { month: 'Feb', actual: 490, forecast: 490 },
  { month: 'Mar', actual: 520, forecast: 520 },
  { month: 'Apr', actual: 550, forecast: 550 },
  { month: 'May', actual: 580, forecast: 580 },
  { month: 'Jun', actual: 610, forecast: 610 },
  { month: 'Jul', actual: 640, forecast: 640 },
  { month: 'Aug', actual: 670, forecast: 670 },
  { month: 'Sep', actual: 705, forecast: 705 },
  { month: 'Oct', actual: 740, forecast: 740 },
  { month: 'Nov', actual: 775, forecast: 775 },
  { month: 'Dec', actual: 810, forecast: 810 },
  { month: 'Jan 2026', actual: null, forecast: 850 },
  { month: 'Feb 2026', actual: null, forecast: 880 },
  { month: 'Mar 2026', actual: null, forecast: 920 },
  { month: 'Apr 2026', actual: null, forecast: 950 },
  { month: 'May 2026', actual: null, forecast: 990 },
  { month: 'Jun 2026', actual: null, forecast: 1030 }
];

// Product inventory optimization data
const productInventoryData = [
  { name: 'Anti-Aging Serum', current: 75, optimal: 95, restock: true },
  { name: 'Hydrating Mask', current: 45, optimal: 60, restock: true },
  { name: 'Vitamin C Serum', current: 60, optimal: 70, restock: true },
  { name: 'Acne Treatment Gel', current: 50, optimal: 40, restock: false },
  { name: 'Exfoliating Scrub', current: 30, optimal: 40, restock: true }
];

// Colors for charts
const COLORS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)'];

export const AdminAnalyticsPage = () => {
  const [timeframe, setTimeframe] = useState('year');

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Analytics Dashboard</h1>
        <div className="flex gap-2 items-center">
          <span className="text-muted-foreground">Timeframe:</span>
          <Select value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </Select>
        </div>
      </div>
      
      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold">{kpiData.totalRevenue.value}</p>
              <div className={`flex items-center text-sm ${kpiData.totalRevenue.increasing ? 'text-green-600' : 'text-red-600'}`}>
                {kpiData.totalRevenue.increasing ? 
                  <ArrowUp className="mr-1 h-4 w-4" /> : 
                  <ArrowDown className="mr-1 h-4 w-4" />
                }
                {kpiData.totalRevenue.change}
              </div>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <Wallet className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Appointments</p>
              <p className="text-2xl font-bold">{kpiData.totalAppointments.value}</p>
              <div className={`flex items-center text-sm ${kpiData.totalAppointments.increasing ? 'text-green-600' : 'text-red-600'}`}>
                {kpiData.totalAppointments.increasing ? 
                  <ArrowUp className="mr-1 h-4 w-4" /> : 
                  <ArrowDown className="mr-1 h-4 w-4" />
                }
                {kpiData.totalAppointments.change}
              </div>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">New Clients</p>
              <p className="text-2xl font-bold">{kpiData.newClients.value}</p>
              <div className={`flex items-center text-sm ${kpiData.newClients.increasing ? 'text-green-600' : 'text-red-600'}`}>
                {kpiData.newClients.increasing ? 
                  <ArrowUp className="mr-1 h-4 w-4" /> : 
                  <ArrowDown className="mr-1 h-4 w-4" />
                }
                {kpiData.newClients.change}
              </div>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Average Revenue Per Appointment</p>
              <p className="text-2xl font-bold">{kpiData.averageRevenue.value}</p>
              <div className={`flex items-center text-sm ${kpiData.averageRevenue.increasing ? 'text-green-600' : 'text-red-600'}`}>
                {kpiData.averageRevenue.increasing ? 
                  <ArrowUp className="mr-1 h-4 w-4" /> : 
                  <ArrowDown className="mr-1 h-4 w-4" />
                }
                {kpiData.averageRevenue.change}
              </div>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Appointment Completion Rate</p>
              <p className="text-2xl font-bold">{kpiData.appointmentCompletionRate.value}</p>
              <div className={`flex items-center text-sm ${kpiData.appointmentCompletionRate.increasing ? 'text-green-600' : 'text-red-600'}`}>
                {kpiData.appointmentCompletionRate.increasing ? 
                  <ArrowUp className="mr-1 h-4 w-4" /> : 
                  <ArrowDown className="mr-1 h-4 w-4" />
                }
                {kpiData.appointmentCompletionRate.change}
              </div>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="revenue">
        <TabsList className="mb-4">
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="services">Service Analysis</TabsTrigger>
          <TabsTrigger value="treatment-trends">Treatment Trends</TabsTrigger>
          <TabsTrigger value="product-forecast">Product Forecast</TabsTrigger>
          <TabsTrigger value="clients">Client Demographics</TabsTrigger>
          <TabsTrigger value="staff">Staff Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Revenue Overview</CardTitle>
              <div className="space-x-2">
                <Button variant="outline" size="sm">
                  Monthly
                </Button>
                <Button variant="outline" size="sm">
                  Quarterly
                </Button>
                <Button variant="default" size="sm">
                  Yearly
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `₱${value}`} />
                  <Tooltip formatter={(value) => `₱${value}`} />
                  <Legend />
                  <Bar dataKey="revenue" name="Revenue" fill="var(--chart-1)" />
                  <Bar dataKey="expenses" name="Expenses" fill="var(--chart-2)" />
                  <Bar dataKey="profit" name="Profit" fill="var(--chart-3)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Service Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={servicePopularityData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {servicePopularityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₱${value}`} />
                    <Line 
                      type="monotone" 
                      dataKey="profit" 
                      name="Profit" 
                      stroke="var(--chart-3)" 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="appointments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={appointmentsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" name="Completed" fill="var(--chart-1)" />
                  <Bar dataKey="cancelled" name="Cancelled" fill="var(--chart-4)" />
                  <Bar dataKey="noShow" name="No Show" fill="var(--chart-5)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Appointment Completion Rate Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={appointmentsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    name="Completed Appointments"
                    stroke="var(--chart-1)"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="services" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Service Popularity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={servicePopularityData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {servicePopularityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Services by Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {servicePopularityData.map((service, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                        <span>{service.name}</span>
                      </div>
                      <div className="font-medium">{formatCurrency(service.value * 245)}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Service Booking Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    name="Advanced Facial"
                    stroke="var(--chart-1)"
                  />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    name="Anti-Aging"
                    stroke="var(--chart-2)"
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    name="Hydrating Therapy"
                    stroke="var(--chart-3)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* NEW TAB: Treatment Trends Analysis */}
        <TabsContent value="treatment-trends" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Treatment Popularity Trends</CardTitle>
              <div className="flex items-center">
                <LineChartIcon className="h-5 w-5 mr-2 text-primary" />
                <span className="text-sm text-muted-foreground">Treatment usage over time</span>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={treatmentTrendsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'Number of Treatments', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="acneTreatment" name="Acne Treatment" stroke="var(--chart-1)" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="antiAging" name="Anti-Aging" stroke="var(--chart-2)" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="hydration" name="Hydration" stroke="var(--chart-3)" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="skinBrightening" name="Skin Brightening" stroke="var(--chart-4)" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="dermabrasion" name="Dermabrasion" stroke="var(--chart-5)" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Treatment Growth Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    layout="vertical"
                    data={treatmentGrowthData}
                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis type="number" domain={[-20, 50]} />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    <Bar 
                      dataKey="growth" 
                      name="YoY Growth %" 
                      fill="var(--chart-2)"
                      label={{ position: 'right', formatter: (value) => `${value}%` }}
                    >
                      {treatmentGrowthData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.growth < 0 ? "var(--destructive)" : "var(--chart-2)"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
              <div className="p-4 pt-0">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Insight:</span> Anti-Aging treatments show the strongest growth trend, 
                  followed by Hydration treatments. Acne treatments are declining in popularity.
                </p>
              </div>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Treatment Revenue Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={treatmentGrowthData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="revenue"
                    >
                      {treatmentGrowthData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `₱${value}`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Treatment Popularity by Age Group</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart 
                  data={treatmentByDemographicData} 
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="acneTreatment" name="Acne Treatment" stackId="a" fill="var(--chart-1)" />
                  <Bar dataKey="antiAging" name="Anti-Aging" stackId="a" fill="var(--chart-2)" />
                  <Bar dataKey="hydration" name="Hydration" stackId="a" fill="var(--chart-3)" />
                  <Bar dataKey="skinBrightening" name="Skin Brightening" stackId="a" fill="var(--chart-4)" />
                  <Bar dataKey="dermabrasion" name="Dermabrasion" stackId="a" fill="var(--chart-5)" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Key Finding:</span> Anti-aging treatments are most popular among 45-64 age groups, 
                  while acne treatments are predominantly used by 18-34 age groups.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* NEW TAB: Product Usage Forecasting */}
        <TabsContent value="product-forecast" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Product Usage Correlation with Treatments</CardTitle>
              <div className="flex items-center">
                <Package className="h-5 w-5 mr-2 text-primary" />
                <span className="text-sm text-muted-foreground">Inventory analysis</span>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={productUsageData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'Units Used', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => `${value} units`} />
                  <Legend />
                  <Area type="monotone" dataKey="antiAgingSerum" name="Anti-Aging Serum" fill="var(--chart-1)" stroke="var(--chart-1)" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="hydratingMask" name="Hydrating Mask" fill="var(--chart-2)" stroke="var(--chart-2)" fillOpacity={0.3} />
                  <Line type="monotone" dataKey="vitaminCSerum" name="Vitamin C Serum" stroke="var(--chart-3)" strokeWidth={2} />
                  <Line type="monotone" dataKey="acneTreatmentGel" name="Acne Treatment Gel" stroke="var(--chart-4)" strokeWidth={2} />
                  <Bar dataKey="exfoliatingScrub" name="Exfoliating Scrub" fill="var(--chart-5)" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Product Usage Forecast (6 Months)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={productForecastData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[400, 1100]} />
                    <Tooltip formatter={(value) => value ? `${value} units` : 'N/A'} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      name="Actual Usage" 
                      stroke="var(--chart-1)" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="forecast" 
                      name="Forecasted Usage" 
                      stroke="var(--chart-2)" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Forecast shows:</span> Projected 27.1% increase in product usage over the next 6 months, 
                    with seasonal peaks expected in Jan-Mar 2026.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Inventory Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {productInventoryData.map((product, index) => (
                    <div key={index} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{product.name}</span>
                        {product.restock ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            Restock Needed
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Optimal Stock
                          </span>
                        )}
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div 
                          className="h-2.5 rounded-full" 
                          style={{ 
                            width: `${(product.current / product.optimal) * 100}%`,
                            backgroundColor: product.current < product.optimal ? 'var(--destructive)' : 'var(--chart-3)'
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Current: {product.current} units</span>
                        <span>Optimal: {product.optimal} units</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button className="w-full">
                    <Package className="h-4 w-4 mr-2" />
                    Generate Purchase Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Treatment to Product Usage Correlation</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart 
                  data={[
                    { name: 'Anti-Aging', antiAgingSerum: 0.85, hydratingMask: 0.35, vitaminCSerum: 0.6, acneTreatmentGel: 0.1, exfoliatingScrub: 0.25 },
                    { name: 'Acne Treatment', antiAgingSerum: 0.15, hydratingMask: 0.2, vitaminCSerum: 0.35, acneTreatmentGel: 0.9, exfoliatingScrub: 0.4 },
                    { name: 'Hydration', antiAgingSerum: 0.25, hydratingMask: 0.95, vitaminCSerum: 0.45, acneTreatmentGel: 0.05, exfoliatingScrub: 0.3 },
                    { name: 'Skin Brightening', antiAgingSerum: 0.4, hydratingMask: 0.25, vitaminCSerum: 0.85, acneTreatmentGel: 0.15, exfoliatingScrub: 0.35 },
                    { name: 'Dermabrasion', antiAgingSerum: 0.3, hydratingMask: 0.4, vitaminCSerum: 0.3, acneTreatmentGel: 0.2, exfoliatingScrub: 0.95 }
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 1]} tickFormatter={(value) => `${value * 100}%`} />
                  <Tooltip formatter={(value) => `${(value * 100).toFixed(0)}%`} />
                  <Legend />
                  <Bar dataKey="antiAgingSerum" name="Anti-Aging Serum" fill="var(--chart-1)" />
                  <Bar dataKey="hydratingMask" name="Hydrating Mask" fill="var(--chart-2)" />
                  <Bar dataKey="vitaminCSerum" name="Vitamin C Serum" fill="var(--chart-3)" />
                  <Bar dataKey="acneTreatmentGel" name="Acne Treatment Gel" fill="var(--chart-4)" />
                  <Bar dataKey="exfoliatingScrub" name="Exfoliating Scrub" fill="var(--chart-5)" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Correlation Analysis:</span> This chart shows the percentage of product 
                  usage per treatment type. For example, Anti-Aging treatments use 85% of Anti-Aging Serum inventory.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="clients" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Client Age Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={customerDemographicsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="age" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" name="Percentage" fill="var(--chart-1)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Client Retention Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-[300px]">
                  <div className="relative h-40 w-40">
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                      <circle
                        className="text-muted stroke-current"
                        strokeWidth="10"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                      />
                      <circle
                        className="text-primary stroke-current"
                        strokeWidth="10"
                        strokeLinecap="round"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        strokeDasharray="251.2"
                        strokeDashoffset="62.8"
                      />
                    </svg>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                      <p className="text-3xl font-bold">75%</p>
                      <p className="text-sm text-muted-foreground">Retention</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <p className="text-center text-sm text-muted-foreground">
                      75% of clients return for a second appointment
                    </p>
                    <div className="flex items-center justify-center mt-2 text-sm text-green-600">
                      <ArrowUp className="h-4 w-4 mr-1" />
                      <span>+5% from last month</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>New Client Acquisition</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    name="New Clients"
                    stroke="var(--chart-1)"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="staff" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Staff Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/30">
                      <th className="p-3 text-left font-medium">Staff Member</th>
                      <th className="p-3 text-left font-medium">Appointments</th>
                      <th className="p-3 text-left font-medium">Revenue Generated</th>
                      <th className="p-3 text-left font-medium">Completion Rate</th>
                      <th className="p-3 text-left font-medium">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topStaffData.map((staff, index) => (
                      <tr key={index} className="border-b border-border/30">
                        <td className="p-3 font-medium">{staff.name}</td>
                        <td className="p-3">{staff.appointments}</td>
                        <td className="p-3">{formatCurrency(staff.revenue)}</td>
                        <td className="p-3">{`${90 + Math.floor(Math.random() * 10)}%`}</td>
                        <td className="p-3">
                          <div className="flex items-center text-green-600">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            <span>{`+${Math.floor(Math.random() * 10) + 1}%`}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Staff Revenue Contribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={topStaffData.map(staff => ({ name: staff.name, value: staff.revenue }))}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {topStaffData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `₱${value}`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Staff Workload</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={topStaffData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="appointments" name="Appointments" fill="var(--chart-2)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};