import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  Search, 
  PlusCircle, 
  Send, 
  Paperclip, 
  MoreVertical,
  Clock,
  CheckCheck,
  Phone,
  Video
} from 'lucide-react';

// Sample messages data
const conversations = [
  {
    id: 1,
    user: {
      name: 'Emma Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
      status: 'online'
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
      name: 'James Brown',
      avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
      status: 'offline'
    },
    lastMessage: {
      text: 'Thank you for your help!',
      time: '9:42 AM',
      unread: false
    }
  },
  {
    id: 3,
    user: {
      name: 'Olivia Martinez',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
      status: 'online'
    },
    lastMessage: {
      text: 'Is my appointment still scheduled for tomorrow?',
      time: 'Yesterday',
      unread: true
    }
  },
  {
    id: 4,
    user: {
      name: 'William Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
      status: 'offline'
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
      name: 'Sophia Garcia',
      avatar: 'https://randomuser.me/api/portraits/women/13.jpg',
      status: 'offline'
    },
    lastMessage: {
      text: 'I need to reschedule my appointment.',
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
      sender: 'admin',
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
      sender: 'admin',
      text: 'Great choice! We have availability on Monday at 2 PM, Tuesday at 10 AM, and Wednesday at 3 PM. Would any of those times work for you?',
      time: '10:32 AM'
    },
    {
      id: 5,
      sender: 'client',
      text: 'Tuesday at 10 AM works perfectly for me.',
      time: '10:33 AM'
    },
    {
      id: 6,
      sender: 'admin',
      text: "Excellent! I've scheduled you for Tuesday at 10 AM for an Advanced Facial Treatment. Please arrive 10 minutes early to complete any necessary paperwork. Is there anything else you need?",
      time: '10:35 AM'
    }
  ]
};

export const AdminMessagesPage = () => {
  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Messages</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Message
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-6 h-[calc(100vh-210px)]">
        {/* Conversations List */}
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Conversations</CardTitle>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Options</span>
              </Button>
            </div>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search messages..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto space-y-1 p-2">
            {conversations.map((convo) => (
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
                  <p className="text-sm text-muted-foreground truncate">{convo.lastMessage.text}</p>
                </div>
                {convo.lastMessage.unread && (
                  <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                )}
              </div>
            ))}
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
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                  <span className="sr-only">Call</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                  <span className="sr-only">Video call</span>
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
                className={`flex ${message.sender === 'admin' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'admin'
                      ? 'bg-muted text-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <div
                    className={`flex items-center justify-end gap-1 mt-1 text-xs ${
                      message.sender === 'admin' ? 'text-muted-foreground' : 'text-primary-foreground/70'
                    }`}
                  >
                    <span>{message.time}</span>
                    {message.sender === 'admin' && <CheckCheck className="h-3 w-3" />}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
          <div className="p-4 border-t border-border/30">
            <div className="flex items-center gap-2">
              <Input placeholder="Type a message..." className="flex-1" />
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
                <span className="sr-only">Attach file</span>
              </Button>
              <Button>
                <Send className="h-5 w-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};