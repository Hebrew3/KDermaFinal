import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { NativeSelect } from '../ui/native-select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Search, 
  FileQuestion,
  Book, 
  MessageSquare,
  Video,
  Mail,
  Phone,
  ExternalLink,
  Play,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';

// Sample FAQ items
const faqItems = [
  {
    question: "How do I book an appointment?",
    answer: "You can book an appointment through your dashboard by clicking on 'Appointments' in the sidebar and then selecting 'Book New Appointment'. Choose your preferred service, date, time, and staff member to complete your booking."
  },
  {
    question: "How do I reschedule an appointment?",
    answer: "To reschedule, go to your Appointments page, find the appointment you wish to change, and click 'Reschedule'. You'll be able to select a new date and time based on availability."
  },
  {
    question: "What is your cancellation policy?",
    answer: "We request that you provide at least 24 hours notice when cancelling appointments. Cancellations with less than 24 hours notice may be subject to a cancellation fee of 50% of the service price."
  },
  {
    question: "How do I update my profile information?",
    answer: "You can update your profile by navigating to the 'Profile' section in your dashboard. Click 'Edit Profile' to update your personal information, contact details, and preferences."
  },
  {
    question: "Do you offer gift cards?",
    answer: "Yes! Gift cards can be purchased through our website or at our location. They are available in various denominations and can be used for any of our services or products."
  },
  {
    question: "What should I do before my appointment?",
    answer: "We recommend arriving 10 minutes before your scheduled appointment time. For skincare treatments, please come with clean skin free of makeup. If you're taking any medications or have skin conditions, please let your provider know before treatment."
  }
];

// Sample tutorial videos
const tutorials = [
  {
    id: 1,
    title: "How to Book an Appointment",
    duration: "2:15",
    thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    description: "A step-by-step guide to booking appointments through your dashboard."
  },
  {
    id: 2,
    title: "Understanding Your Skin Type",
    duration: "4:30",
    thumbnail: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    description: "Learn how to identify your skin type and choose the right treatments."
  },
  {
    id: 3,
    title: "Daily Skincare Routine",
    duration: "5:45",
    thumbnail: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    description: "Recommended daily skincare routines for different skin types."
  },
  {
    id: 4,
    title: "Managing Your Account",
    duration: "3:20",
    thumbnail: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    description: "Learn how to update your profile and manage your preferences."
  }
];

// Sample guides
const guides = [
  {
    title: "New Client Welcome Guide",
    description: "Everything you need to know as a new client",
    icon: <Book className="h-5 w-5" />,
  },
  {
    title: "Service Catalog",
    description: "Detailed information about all our services",
    icon: <FileQuestion className="h-5 w-5" />,
  },
  {
    title: "Aftercare Instructions",
    description: "How to care for your skin after treatments",
    icon: <FileQuestion className="h-5 w-5" />,
  },
  {
    title: "Product Recommendations",
    description: "Personalized product suggestions for your skin",
    icon: <FileQuestion className="h-5 w-5" />,
  }
];

export const ClientHelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  
  // Filter FAQs based on search query
  const filteredFaqs = searchQuery 
    ? faqItems.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqItems;

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Help & Support</h1>
        <Button onClick={() => setContactDialogOpen(true)}>
          <MessageSquare className="mr-2 h-4 w-4" />
          Contact Support
        </Button>
      </div>
      
      {/* Search bar */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input 
          placeholder="Search for help articles, guides, and more..." 
          className="pl-10 h-12"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Quick access cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <FileQuestion className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-medium">FAQs</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Find answers to common questions
            </p>
            <Button variant="outline" size="sm">View All FAQs</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <Video className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-medium">Video Tutorials</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Watch guides on using our services
            </p>
            <Button variant="outline" size="sm">Watch Tutorials</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <MessageSquare className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-medium">Contact Support</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Get help from our team
            </p>
            <Button variant="outline" size="sm" onClick={() => setContactDialogOpen(true)}>
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="faqs">
        <TabsList className="w-full max-w-md mx-auto">
          <TabsTrigger value="faqs" className="flex-1">FAQs</TabsTrigger>
          <TabsTrigger value="tutorials" className="flex-1">Video Tutorials</TabsTrigger>
          <TabsTrigger value="guides" className="flex-1">Guides & Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="faqs">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
                
                {filteredFaqs.length === 0 && (
                  <div className="text-center py-8">
                    <FileQuestion className="h-12 w-12 text-muted-foreground mx-auto" />
                    <h3 className="mt-4 font-medium">No results found</h3>
                    <p className="text-muted-foreground mt-1">
                      Try a different search term or browse all FAQs
                    </p>
                  </div>
                )}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tutorials">
          <Card>
            <CardHeader>
              <CardTitle>Video Tutorials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tutorials.map(tutorial => (
                  <div key={tutorial.id} className="border border-border/30 rounded-lg overflow-hidden">
                    <div className="relative">
                      <img 
                        src={tutorial.thumbnail} 
                        alt={tutorial.title}
                        className="w-full h-[160px] object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Button variant="outline" className="rounded-full h-12 w-12 p-0 bg-white/20 backdrop-blur-sm">
                          <Play className="h-5 w-5" />
                          <span className="sr-only">Play</span>
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {tutorial.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{tutorial.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{tutorial.description}</p>
                      <Button variant="outline" size="sm" className="mt-3">Watch Tutorial</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="guides">
          <Card>
            <CardHeader>
              <CardTitle>Guides & Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {guides.map((guide, index) => (
                  <div key={index} className="border border-border/30 rounded-lg p-4 flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3">
                      {guide.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{guide.title}</h3>
                      <p className="text-sm text-muted-foreground">{guide.description}</p>
                      <Button variant="ghost" size="sm" className="mt-2 flex items-center gap-1">
                        <span>View Guide</span>
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-border/30 mt-6 pt-6">
                <h3 className="font-medium mb-4">Need more help?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 rounded-full p-3">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Call Support</h4>
                      <p className="text-sm text-muted-foreground">Mon-Fri, 9am-5pm</p>
                      <p className="font-medium">(555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 rounded-full p-3">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Email Support</h4>
                      <p className="text-sm text-muted-foreground">Response within 24 hours</p>
                      <p className="font-medium">support@derma.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Contact Support Dialog */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Support</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <NativeSelect 
                id="subject" 
                defaultValue=""
              >
                <option value="">Select a subject...</option>
                <option value="appointment">Appointment Issue</option>
                <option value="account">Account Problem</option>
                <option value="billing">Billing Question</option>
                <option value="service">Service Question</option>
                <option value="other">Other Inquiry</option>
              </NativeSelect>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Please describe your issue in detail..." 
                className="h-32"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="attachment">Attachment (optional)</Label>
              <Input id="attachment" type="file" />
              <p className="text-xs text-muted-foreground">Max file size: 5MB</p>
            </div>
            
            <div className="space-y-2">
              <Label>Preferred Contact Method</Label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input type="radio" id="email" name="contact" value="email" />
                  <Label htmlFor="email">Email</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="radio" id="phone" name="contact" value="phone" />
                  <Label htmlFor="phone">Phone</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setContactDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setContactDialogOpen(false)}>
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};