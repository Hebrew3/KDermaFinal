import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  Search, 
  Send, 
  Paperclip, 
  MoreVertical,
  Clock,
  CheckCheck,
  Filter,
  Mail,
  User
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Badge } from '../ui/badge';

// Sample messages data
const conversations = [
  {
    id: 1,
    user: {
      name: 'Emma Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
      status: 'online',
      type: 'client'
    },
    lastMessage: {
      text: 'Hi, I would like to schedule an appointment for next week.',
      time: '10:25 AM',
      unread: true
    }
  },
  {
    id: 2,
    user: {
      name: 'Dr. Emily Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      status: 'online',
      type: 'staff'
    },
    lastMessage: {
      text: 'Can you cover my shift tomorrow afternoon?',
      time: '9:42 AM',
      unread: true
    }
  },
  {
    id: 3,
    user: {
      name: 'Olivia Martinez',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
      status: 'offline',
      type: 'client'
    },
    lastMessage: {
      text: 'Is my appointment still scheduled for tomorrow?',
      time: 'Yesterday',
      unread: false
    }
  },
  {
    id: 4,
    user: {
      name: 'William Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
      status: 'offline',
      type: 'client'
    },
    lastMessage: {
      text: 'Can you recommend a good moisturizer?',
      time: 'Yesterday',
      unread: false
    }
  },
  {
    id: 5,
    user: {
      name: 'Dr. Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      status: 'offline',
      type: 'staff'
    },
    lastMessage: {
      text: 'Staff meeting has been moved to 3pm on Friday.',
      time: '2 days ago',
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
      sender: 'client',
      text: 'Hi, I would like to schedule an appointment for next week.',
      time: '10:25 AM'
    },
    {
      id: 2,
      sender: 'staff',
      text: 'Hello Emma! I would be happy to help you schedule an appointment. What service are you interested in?',
      time: '10:28 AM'
    },
    {
      id: 3,
      sender: 'client',
      text: 'I am interested in the Advanced Facial Treatment.',
      time: '10:30 AM'
    },
    {
      id: 4,
      sender: 'staff',
      text: 'Great choice! We have availability on Monday at 2 PM, Tuesday at 10 AM, and Wednesday at 3 PM. Would any of those times work for you?',
      time: '10:32 AM'
    },
    {
      id: 5,
      sender: 'client',
      text: 'Tuesday at 10 AM works perfectly for me.',
      time: '10:33 AM'
    }
  ]
};

export const StaffMessagesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [messageText, setMessageText] = useState('');

  // Filter conversations based on search query and type
  const filteredConversations = conversations.filter(convo => {
    const matchesSearch = convo.user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || convo.user.type === filterType;
    return matchesSearch && matchesType;
  });

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
        <Button>
          <Mail className="mr-2 h-4 w-4" />
          New Message
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-6 h-[calc(100vh-210px)]">
        {/* Conversations List */}
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-3 space-y-4">
            <CardTitle>Conversations</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search messages..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs defaultValue="all" value={filterType} onValueChange={setFilterType}>
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="client" className="flex-1">Clients</TabsTrigger>
                <TabsTrigger value="staff" className="flex-1">Staff</TabsTrigger>
              </TabsList>
            </Tabs>
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
                    <Badge 
                      variant="outline" 
                      className="text-xs h-4 px-1"
                    >
                      {convo.user.type === 'client' ? 'Client' : 'Staff'}
                    </Badge>
                    <p className="text-sm text-muted-foreground truncate">
                      {convo.lastMessage.text}
                    </p>
                  </div>
                </div>
                {convo.lastMessage.unread && (
                  <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                )}
              </div>
            ))}
            
            {filteredConversations.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full">
                <Mail className="h-12 w-12 text-muted-foreground" />
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
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{activeConversation.user.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {activeConversation.user.type === 'client' ? 'Client' : 'Staff'}
                    </Badge>
                  </div>
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
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">View profile</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                  <span className="sr-only">More options</span>
                </Button>
              </div>
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
                    {message.sender === 'staff' && <CheckCheck className="h-3 w-3" />}
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
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium">Message Templates</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Access quick reply templates for common responses
            </p>
            <Button variant="outline" size="sm">View Templates</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium">Response Time</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-1">
              Your average response time
            </p>
            <h4 className="text-xl font-bold">4.2 min</h4>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <Filter className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium">Message Filters</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Filter messages by date, status or type
            </p>
            <Button variant="outline" size="sm">Manage Filters</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <User className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium">Client Communication</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              View communication guidelines
            </p>
            <Button variant="outline" size="sm">View Guidelines</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};