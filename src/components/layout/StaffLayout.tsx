import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  ClipboardList,
  MessageSquare,
  HelpCircle
} from 'lucide-react';

export const StaffLayout: React.FC = () => {
  const { logout } = useAuth();
  
  const staffNavItems = [
    { 
      title: 'Dashboard', 
      href: '/staff', 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      title: 'My Schedule', 
      href: '/staff/schedule', 
      icon: <Calendar className="h-5 w-5" /> 
    },
    { 
      title: 'Clients', 
      href: '/staff/clients', 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      title: 'Services', 
      href: '/staff/services', 
      icon: <ClipboardList className="h-5 w-5" /> 
    },
    { 
      title: 'Messages', 
      href: '/staff/messages', 
      icon: <MessageSquare className="h-5 w-5" />,
      badge: '2'
    },
    { 
      title: 'Help', 
      href: '/staff/help', 
      icon: <HelpCircle className="h-5 w-5" /> 
    }
  ];

  // Set favicon dynamically
  useEffect(() => {
    // Update favicon
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/jpg';
    link.rel = 'shortcut icon';
    link.href = '/imports/derma-logo.jpg';
    document.getElementsByTagName('head')[0].appendChild(link);
    
    // Update page title
    document.title = "DERMA Staff Portal";
  }, []);

  return (
    <div className="flex h-screen bg-muted/30">
      <Sidebar 
        navItems={staffNavItems} 
        onLogout={logout}
        userRole="staff"
      />
      <main className="flex-1 overflow-y-auto pb-0">
        <Outlet />
      </main>
    </div>
  );
};