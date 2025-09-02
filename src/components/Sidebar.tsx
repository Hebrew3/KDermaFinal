import { Link, useLocation } from 'react-router-dom';
import {
  LogOut,
  X,
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  Settings,
  LineChart,
  ShoppingBag,
  CreditCard,
  UserCircle,
  HelpCircle,
  ClipboardList
} from 'lucide-react';
import { cn } from './ui/utils';
import { Logo } from './Logo';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { useAuth } from './context/AuthContext';
import { useEffect, useState } from 'react';
import { useIsMobile } from './ui/use-mobile';

interface SidebarProps {
  navItems: {
    title: string;
    href: string;
    icon: React.ReactNode;
    badge?: string;
  }[];
  onLogout: () => void;
  userRole?: 'admin' | 'staff' | 'client';
}

export const Sidebar = ({ navItems, onLogout, userRole = 'client' }: SidebarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [effectiveCollapsed, setEffectiveCollapsed] = useState(false);


  // Only collapse on larger screens
  useEffect(() => {
    console.log(isMobile);

    setEffectiveCollapsed(isMobile ? true : collapsed);
  }, [isMobile, effectiveCollapsed, collapsed])

  return (
    <aside className={cn(
      "sticky top-0 left-0 h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out flex-shrink-0 z-30",
      effectiveCollapsed ? "w-[70px]" : "w-64"
    )}>
      <div className="h-full flex flex-col justify-between py-4 overflow-y-auto overflow-x-hidden">
        <div className="flex-grow overflow-hidden flex flex-col">
          {/* Header with logo */}
          <div className={cn(
            "px-4 flex items-center",
            effectiveCollapsed ? "justify-center" : "justify-between"
          )}>
            <div className={cn(
              "py-4",
              effectiveCollapsed ? "flex justify-center" : ""
            )}>
              <Logo size="small" showText={!effectiveCollapsed} />
            </div>

            {!effectiveCollapsed && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => !isMobile && setCollapsed(true)}
                className="text-sidebar-foreground md:flex hidden"
                aria-label="Collapse sidebar"
              >
                <X size={20} />
              </Button>
            )}

            {effectiveCollapsed && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => !isMobile && setCollapsed(false)}
                className="text-sidebar-foreground mt-4 hidden md:flex"
                aria-label="Expand sidebar"
              >
                <X size={20} />
              </Button>
            )}
          </div>

          {/* User profile section */}
          <div className={cn(
            "border-y border-sidebar-border",
            effectiveCollapsed ? "py-4 px-2" : "p-4",
            "my-4"
          )}>
            <div className={cn(
              "flex items-center",
              effectiveCollapsed ? "flex-col" : "space-x-3"
            )}>
              <Avatar className={cn(
                "border-2 border-primary/30",
                effectiveCollapsed ? "h-8 w-8" : "h-10 w-10"
              )}>
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-primary/20 text-primary">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              {!effectiveCollapsed && (
                <div>
                  <p className="font-medium">{user?.name || 'User'}</p>
                  <p className="text-xs text-sidebar-foreground/80 capitalize">{user?.role || userRole}</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation links */}
          <div className="px-2 flex-grow">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center rounded-lg transition-colors",
                      effectiveCollapsed ? "justify-center p-2" : "px-4 py-2",
                      location.pathname === item.href
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <span className={cn(
                      effectiveCollapsed ? "" : "mr-3"
                    )}>
                      {item.icon}
                    </span>
                    {!effectiveCollapsed && (
                      <span className="flex-1">{item.title}</span>
                    )}
                    {!effectiveCollapsed && item.badge && (
                      <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Logout link at bottom */}
        <div className="px-2 mt-2 flex-shrink-0">
          <Button
            onClick={onLogout}
            variant="ghost"
            className={cn(
              "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg w-full",
              effectiveCollapsed ? "justify-center p-2" : "px-4 py-2 justify-start"
            )}
          >
            <LogOut size={20} className={effectiveCollapsed ? "" : "mr-3"} />
            {!effectiveCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
};