import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Calendar, 
  ClipboardList,
  CreditCard,
  User,
  MessageSquare,
  HelpCircle
} from 'lucide-react';

export const ClientLayout: React.FC = () => {
  const { logout } = useAuth();
  
  const clientNavItems = [
    { 
      title: 'Dashboard', 
      href: '/dashboard', 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      title: 'My Appointments', 
      href: '/dashboard/appointments', 
      icon: <Calendar className="h-5 w-5" /> 
    },
    { 
      title: 'Services', 
      href: '/dashboard/services', 
      icon: <ClipboardList className="h-5 w-5" /> 
    },
    { 
      title: 'Payments', 
      href: '/dashboard/payments', 
      icon: <CreditCard className="h-5 w-5" /> 
    },
    { 
      title: 'Profile', 
      href: '/dashboard/profile', 
      icon: <User className="h-5 w-5" /> 
    },
    { 
      title: 'Messages', 
      href: '/dashboard/messages', 
      icon: <MessageSquare className="h-5 w-5" /> 
    },
    { 
      title: 'Help', 
      href: '/dashboard/help', 
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
    document.title = "DERMA Client Portal";
  }, []);

  return (
    <div className="flex h-screen bg-muted/30">
      <Sidebar 
        navItems={clientNavItems} 
        onLogout={logout}
        userRole="client"
      />
      <main className="flex-1 overflow-y-auto pb-0">
        <Outlet />
      </main>
    </div>
  );
};