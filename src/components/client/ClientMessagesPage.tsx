import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { NativeSelect } from '../ui/native-select';
import { 
  Search, 
  PlusCircle, 
  Send, 
  Paperclip, 
  MoreVertical,
  Clock,
  CheckCheck,
  Bell,
  FileQuestion,
  Calendar,
  UserPlus,
  CalendarDays
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';

// Sample messages data
const conversations = [
  {
    id: 1,
    user: {
      name: 'Dr. Emily Johnson',
      role: 'Dermatologist',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      status: 'online'
    },
    lastMessage: {
      text: 'Your appointment has been confirmed for Tuesday at 10 AM.',
      time: '10:25 AM',
      unread: true
    }
  },
  {
    id: 2,
    user: {
      name: 'Sarah Williams',
      role: 'Esthetician',
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
      status: 'offline'
    },
    lastMessage: {
      text: 'How are you feeling after your treatment yesterday?',
      time: '9:42 AM',
      unread: false
    }
  },
  {
    id: 3,
    user: {
      name: 'DERMA Support',
      role: 'Support',
      avatar: '/imports/derma-logo.jpg',
      status: 'online'
    },
    lastMessage: {
      text: 'Thank you for your inquiry. We will get back to you shortly.',
      time: 'Yesterday',
      unread: false
    }
  }
];

// Sample active conversation messages
const activeConversation = {
  user: conversations[0].user,
  messages: [
    {
      id: 1,
      sender: 'staff',
      text: 'Hello Emma! I hope you are doing well today.',
      time: '10:20 AM'
    },
    {
      id: 2,
      sender: 'client',
      text: 'Hi Dr. Johnson, I am doing great. I wanted to confirm my appointment for next week.',
      time: '10:22 AM'
    },
    {
      id: 3,
      sender: 'staff',
      text: 'Of course! I can confirm that your appointment is scheduled for Tuesday, May 15th at 10:00 AM for an Advanced Facial Treatment.',
      time: '10:24 AM'
    },
    {
      id: 4,
      sender: 'staff',
      text: 'Is there anything specific you would like us to address during your appointment?',
      time: '10:25 AM'
    }
  ]
};

// Sample quick questions for new message dialog
const quickQuestions = [
  "I would like to reschedule my appointment",
  "What should I do before my appointment?",
  "Do you have any openings this week?",
  "I have a question about my recent treatment"
];

export const ClientMessagesPage = () => {
  const [showNewMessageDialog, setShowNewMessageDialog] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(convo => 
    convo.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Here you would typically send the message to an API
      // For now, just clear the input
      setMessageText('');
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Messages</h1>
        <Button onClick={() => setShowNewMessageDialog(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Message
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 h-[calc(100vh-210px)]">
        {/* Conversations List */}
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-3">
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search messages..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto space-y-1 p-2">
            {filteredConversations.map((convo) => (
              <div
                key={convo.id}
                className={`flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-muted/50 ${
                  convo.id === 1 ? 'bg-muted' : ''
                }`}
              >
                <div className="relative">
                  <ImageWithFallback
                    src={convo.user.avatar}
                    alt={convo.user.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <span
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card ${
                      convo.user.status === 'online' ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{convo.user.name}</h3>
                    <span className="text-xs text-muted-foreground">{convo.lastMessage.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">{convo.user.role}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{convo.lastMessage.text}</p>
                </div>
                {convo.lastMessage.unread && (
                  <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                )}
              </div>
            ))}
            
            {filteredConversations.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full">
                <Bell className="h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">No conversations found</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Active Conversation */}
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-3 border-b border-border/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ImageWithFallback
                  src={activeConversation.user.avatar}
                  alt={activeConversation.user.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium">{activeConversation.user.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {activeConversation.user.status === 'online' ? (
                      <span className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-green-500 mr-1" />
                        Online
                      </span>
                    ) : (
                      'Offline'
                    )}
                  </p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Book Appointment</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileQuestion className="h-4 w-4 mr-2" />
                    <span>Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <span>Clear Conversation</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeConversation.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'staff' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'staff'
                      ? 'bg-muted text-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <div
                    className={`flex items-center justify-end gap-1 mt-1 text-xs ${
                      message.sender === 'staff' ? 'text-muted-foreground' : 'text-primary-foreground/70'
                    }`}
                  >
                    <span>{message.time}</span>
                    {message.sender === 'client' && <CheckCheck className="h-3 w-3" />}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
          <div className="p-4 border-t border-border/30">
            <div className="flex items-center gap-2">
              <Input 
                placeholder="Type a message..." 
                className="flex-1"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
                <span className="sr-only">Attach file</span>
              </Button>
              <Button onClick={handleSendMessage}>
                <Send className="h-5 w-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium">Appointments</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              View and manage your upcoming appointments
            </p>
            <Button variant="outline" size="sm">View Appointments</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <FileQuestion className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium">FAQ</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Browse frequently asked questions
            </p>
            <Button variant="outline" size="sm">View FAQ</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium">Notifications</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Manage your message notifications
            </p>
            <Button variant="outline" size="sm">Settings</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <UserPlus className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium">Referrals</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Refer friends and earn rewards
            </p>
            <Button variant="outline" size="sm">Refer a Friend</Button>
          </CardContent>
        </Card>
      </div>
      
      {/* New Message Dialog */}
      <Dialog open={showNewMessageDialog} onOpenChange={setShowNewMessageDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>New Message</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <NativeSelect 
                id="recipient" 
                defaultValue=""
              >
                <option value="">Select a recipient...</option>
                {conversations.map(convo => (
                  <option key={convo.id} value={convo.id}>{convo.user.name} ({convo.user.role})</option>
                ))}
                <option value="support">DERMA Support</option>
              </NativeSelect>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Type your message here..." 
                className="h-32"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Quick Questions</Label>
              <div className="grid grid-cols-1 gap-2">
                {quickQuestions.map((question, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    className="justify-start h-auto py-2 px-3 text-left"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowNewMessageDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowNewMessageDialog(false)}>
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};