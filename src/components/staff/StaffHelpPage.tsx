import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { 
  Search, 
  FileQuestion, 
  Book, 
  MessageSquare, 
  Video, 
  Bookmark,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  CheckCircle2,
  Clock,
  Play,
  BookOpen
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

// Sample FAQ items
const faqItems = [
  {
    question: "How do I view my schedule?",
    answer: "You can view your schedule by clicking on 'My Schedule' in the sidebar navigation. The schedule page offers both daily and list views of your appointments."
  },
  {
    question: "How do I update a client's information?",
    answer: "To update client information, navigate to the Clients page, find the client, and click on 'Client Details'. Then click the 'Edit Details' button to modify their information."
  },
  {
    question: "How do I mark an appointment as completed?",
    answer: "On the Schedule page, find the appointment and click 'View Details'. In the appointment details dialog, use the 'Update Status' button to mark it as completed."
  },
  {
    question: "What should I do if a client is late?",
    answer: "If a client is late, you should follow the clinic's late policy. Generally, if they are less than 15 minutes late, accommodate them with a shortened session. If more than 15 minutes late, you may need to reschedule."
  },
  {
    question: "How do I request time off?",
    answer: "To request time off, go to your Schedule page and click the 'Request Time Off' button in the top right. Fill out the request form with your dates and reason."
  },
  {
    question: "How do I see which services I'm qualified to perform?",
    answer: "Your qualified services are listed on the Services page. You can also check your profile under the staff directory for a complete list of services you're certified to perform."
  }
];

// Sample tutorial videos
const tutorials = [
  {
    id: 1,
    title: "Intro to the Dashboard",
    duration: "3:45",
    thumbnail: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    description: "Learn to navigate the staff dashboard and access key features."
  },
  {
    id: 2,
    title: "Managing Your Schedule",
    duration: "5:20",
    thumbnail: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    description: "Learn how to view and manage your appointments effectively."
  },
  {
    id: 3,
    title: "Client Communication Best Practices",
    duration: "4:15",
    thumbnail: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    description: "Tips for professional and effective client communication."
  },
  {
    id: 4,
    title: "Service Documentation",
    duration: "6:30",
    thumbnail: "https://images.unsplash.com/photo-1590650046871-92c887180603?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    description: "How to properly document services performed for clients."
  }
];

// Sample documentation items
const documentationItems = [
  {
    title: "Staff Handbook",
    description: "Complete guide to policies and procedures",
    icon: <BookOpen className="h-5 w-5" />,
    updated: "May 1, 2025"
  },
  {
    title: "Service Protocols",
    description: "Step-by-step guides for all services",
    icon: <CheckCircle2 className="h-5 w-5" />,
    updated: "April 15, 2025"
  },
  {
    title: "Client Care Guide",
    description: "Best practices for exceptional client care",
    icon: <Book className="h-5 w-5" />,
    updated: "March 28, 2025"
  },
  {
    title: "Emergency Procedures",
    description: "Protocols for medical emergencies",
    icon: <Phone className="h-5 w-5" />,
    updated: "February 10, 2025"
  }
];

export const StaffHelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
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
        <h1 className="text-3xl font-semibold">Help & Resources</h1>
      </div>
      
      {/* Search bar */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input 
          placeholder="Search for help articles, tutorials, and more..." 
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
              Step-by-step visual guides
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
            <Button variant="outline" size="sm">Contact Support</Button>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="faqs">
        <TabsList className="w-full max-w-md mx-auto">
          <TabsTrigger value="faqs" className="flex-1">FAQs</TabsTrigger>
          <TabsTrigger value="tutorials" className="flex-1">Video Tutorials</TabsTrigger>
          <TabsTrigger value="documentation" className="flex-1">Documentation</TabsTrigger>
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
                      <div className="flex justify-between items-center mt-3">
                        <Button variant="outline" size="sm">Watch</Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Bookmark className="h-4 w-4" />
                          <span className="sr-only">Bookmark</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documentation">
          <Card>
            <CardHeader>
              <CardTitle>Documentation & Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documentationItems.map((doc, index) => (
                  <div key={index} className="border border-border/30 rounded-lg p-4 flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3">
                      {doc.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{doc.title}</h3>
                      <p className="text-sm text-muted-foreground">{doc.description}</p>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          Updated: {doc.updated}
                        </span>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <span>View</span>
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
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
    </div>
  );
};