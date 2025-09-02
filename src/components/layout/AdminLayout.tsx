import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Package,
  Settings,
  BarChart,
  MessageSquare,
  BoxesIcon,
  Users2
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { logout } = useAuth();

  const adminNavItems = [
    {
      title: 'Dashboard',
      href: '/admin',
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      title: 'Client Records',
      href: '/admin/clients',
      icon: <Users2 className="h-5 w-5" />
    },
    {
      title: 'Appointments',
      href: '/admin/appointments',
      icon: <Calendar className="h-5 w-5" />
    },
    {
      title: 'Services',
      href: '/admin/services',
      icon: <Package className="h-5 w-5" />
    },
    {
      title: 'Inventory',
      href: '/admin/inventory',
      icon: <BoxesIcon className="h-5 w-5" />
    },
    {
      title: 'Analytics',
      href: '/admin/analytics',
      icon: <BarChart className="h-5 w-5" />
    },
    {
      title: 'Settings',
      href: '/admin/settings',
      icon: <Settings className="h-5 w-5" />
    }
  ];

  // Set favicon dynamically
  useEffect(() => {
    // Update favicon
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/jpg';
    link.rel = 'shortcut icon';
    link.href = '/assets/images/kderma.jpg';
    document.getElementsByTagName('head')[0].appendChild(link);

    // Update page title
    document.title = "DERMA Admin Portal";
  }, []);

  return (
    <div className="flex h-screen bg-muted/30">
      <Sidebar
        navItems={adminNavItems}
        onLogout={logout}
        userRole="admin"
      />
      <main className="flex-1  overflow-y-auto pb-0">
        <Outlet />
      </main>
    </div>
  );
};