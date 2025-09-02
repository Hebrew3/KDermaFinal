
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  Search,
  Clock,
  Calendar,
} from "lucide-react";
import { CURRENCY_SYMBOL, formatCurrency } from '../utils/currency';

// Sample services data with updated image URLs
const services = [
  {
    id: "1",
    name: "Advanced Facial Treatment",
    description:
      "Rejuvenate your skin with our signature facial treatments customized for your specific skin type and concerns.",
    price: 85,
    duration: 60,
    image:
      "/public/services/hydrating-skin-therapy.jpg",
    category: "Facial",
    features: [
      "Deep cleansing",
      "Exfoliation",
      "Customized masks",
      "LED therapy",
    ],
    popularity: "High",
    status: "Active",
  },
  {
    id: "2",
    name: "Medical Dermatology",
    description:
      "Professional medical treatments for various skin conditions including acne, rosacea, eczema, and psoriasis.",
    price: 120,
    duration: 45,
    image:
      "/public/services/skin-analysis-consultation.jpg",
    category: "Medical",
    features: [
      "Skin condition diagnosis",
      "Prescription treatments",
      "Follow-up care",
      "Medical-grade products",
    ],
    popularity: "Medium",
    status: "Active",
  },
  {
    id: "3",
    name: "Anti-Aging Treatments",
    description:
      "Turn back the clock with our advanced anti-aging therapies that reduce fine lines and restore youthful glow.",
    price: 150,
    duration: 60,
    image:
      "/public/services/hydrating-skin-therapy.jpg",
    category: "Anti-Aging",
    features: [
      "Collagen stimulation",
      "Fine line reduction",
      "Skin tightening",
      "Age spot treatment",
    ],
    popularity: "High",
    status: "Active",
  },
  {
    id: "4",
    name: "Hydrating Skin Therapy",
    description:
      "Deep hydration treatments to restore moisture balance and revitalize dehydrated skin for a plump, dewy complexion.",
    price: 95,
    duration: 90,
    image:
      "/public/services/hydrating-skin-therapy.jpg",
    category: "Hydration",
    features: [
      "Hyaluronic infusion",
      "Moisture barrier repair",
      "Hydrating masks",
      "Long-lasting hydration",
    ],
    popularity: "Medium",
    status: "Active",
  },
  {
    id: "5",
    name: "Skin Analysis & Consultation",
    description:
      "Comprehensive skin analysis using advanced technology to develop a personalized skincare regimen.",
    price: 65,
    duration: 30,
    image:
      "/public/services/skin-analysis-consultation.jpg",
    category: "Consultation",
    features: [
      "Digital skin scanning",
      "Personalized assessment",
      "Custom treatment plan",
      "Product recommendations",
    ],
    popularity: "Low",
    status: "Active",
  },
];

// Sample upcoming service appointments
const upcomingAppointments = [
  {
    id: "ua1",
    service: "Advanced Facial Treatment",
    client: "Emma Wilson",
    date: "2025-05-10",
    time: "10:00 AM",
  },
  {
    id: "ua2",
    service: "Skin Analysis & Consultation",
    client: "James Brown",
    date: "2025-05-10",
    time: "11:30 AM",
  },
  {
    id: "ua3",
    service: "Medical Dermatology",
    client: "Olivia Martinez",
    date: "2025-05-10",
    time: "1:00 PM",
  },
];

export const StaffServicesPage = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] =
    React.useState("All");

  // Filter services based on search query and category
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      service.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      service.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Services</h1>
      </div>

      {/* Service stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Services Offered
              </p>
              <p className="text-2xl font-bold">
                {services.length}
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
              <p className="text-sm font-medium text-muted-foreground">
                Upcoming Today
              </p>
              <p className="text-2xl font-bold">
                {upcomingAppointments.length}
              </p>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <Clock className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Average Price
              </p>
              <p className="text-2xl font-bold">
                {CURRENCY_SYMBOL}
                {Math.round(
                  services.reduce(
                    (sum, service) => sum + service.price,
                    0,
                  ) / services.length,
                )}
              </p>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <div className="flex items-center justify-center h-5 w-5 text-primary font-semibold">
                {CURRENCY_SYMBOL}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        {/* Main services content */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Our Services</CardTitle>
            <div className="flex flex-col sm:flex-row justify-between mt-4 gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search services..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                />
              </div>

              <select
                className="p-2 border border-border rounded-md min-w-[150px]"
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(e.target.value)
                }
              >
                <option value="All">All Categories</option>
                <option value="Facial">Facial</option>
                <option value="Medical">Medical</option>
                <option value="Anti-Aging">Anti-Aging</option>
                <option value="Hydration">Hydration</option>
                <option value="Consultation">
                  Consultation
                </option>
              </select>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="grid">
              <TabsList className="mb-6">
                <TabsTrigger value="grid">
                  Grid View
                </TabsTrigger>
                <TabsTrigger value="list">
                  List View
                </TabsTrigger>
              </TabsList>

              <TabsContent value="grid">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredServices.map((service) => (
                    <Card
                      key={service.id}
                      className="overflow-hidden"
                    >
                      <div className="relative h-48">
                        <ImageWithFallback
                          src={service.image}
                          alt={service.name}
                          className="h-full w-full object-cover"
                          category={service.category.toLowerCase()}
                        />
                        <div className="absolute bottom-0 w-full bg-black/60 text-white p-3">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium truncate">
                              {service.name}
                            </h3>
                            <span className="whitespace-nowrap">
                              {formatCurrency(service.price)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">
                            {service.category}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="text-sm">
                              {service.duration} min
                            </span>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground h-12 overflow-hidden">
                          {service.description}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1">
                          {service.features.map(
                            (feature, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-muted/50"
                              >
                                {feature}
                              </Badge>
                            ),
                          )}
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
                        <th className="text-left font-medium p-3">
                          Service
                        </th>
                        <th className="text-left font-medium p-3">
                          Category
                        </th>
                        <th className="text-left font-medium p-3">
                          Duration
                        </th>
                        <th className="text-left font-medium p-3">
                          Price
                        </th>
                        <th className="text-left font-medium p-3">
                          Popularity
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredServices.map((service) => (
                        <tr
                          key={service.id}
                          className="border-b border-border/30 last:border-0 hover:bg-muted/20"
                        >
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded overflow-hidden">
                                <ImageWithFallback
                                  src={service.image}
                                  alt={service.name}
                                  className="h-full w-full object-cover"
                                  category={service.category.toLowerCase()}
                                />
                              </div>
                              <div>
                                <p className="font-medium">
                                  {service.name}
                                </p>
                                <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                  {service.description}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge variant="outline">
                              {service.category}
                            </Badge>
                          </td>
                          <td className="p-3">
                            {service.duration} min
                          </td>
                          <td className="p-3">
                            {formatCurrency(service.price)}
                          </td>
                          <td className="p-3">
                            <Badge
                              variant={
                                service.popularity === "High"
                                  ? "default"
                                  : service.popularity ===
                                      "Medium"
                                    ? "outline"
                                    : "secondary"
                              }
                            >
                              {service.popularity}
                            </Badge>
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

        {/* Side panel for upcoming service appointments */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">
              Today's Service Appointments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-3 border border-border/30 rounded-md"
              >
                <div className="flex justify-between">
                  <h4 className="font-medium">
                    {appointment.service}
                  </h4>
                  <span className="text-sm">
                    {appointment.time}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Client: {appointment.client}
                </p>
                <div className="mt-2 flex justify-end">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}

            {upcomingAppointments.length === 0 && (
              <div className="text-center py-8">
                <Calendar className="h-10 w-10 text-muted-foreground mx-auto" />
                <p className="mt-2">No upcoming appointments</p>
              </div>
            )}

            <Button className="w-full" variant="outline">
              View Full Schedule
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
