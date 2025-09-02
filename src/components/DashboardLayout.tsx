import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Menu, Bell, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Get current page title based on route
  const getCurrentPageTitle = () => {
    const path = location.pathname;
    
    if (path.includes('/dashboard/services')) return 'Services';
    if (path.includes('/dashboard/appointments')) return 'Appointments';
    if (path.includes('/dashboard/clients')) return 'Clients';
    if (path.includes('/dashboard/settings')) return 'Settings';
    return 'Dashboard'; // Default
  };

  // Check if the screen is mobile on load and when resizing
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Run once on mount
    checkIfMobile();

    // Close sidebar on mobile by default
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }

    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // This function handles backdrop click on mobile to close sidebar
  const handleBackdropClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // Get the current page title
  const pageTitle = getCurrentPageTitle();

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* Backdrop for mobile when sidebar is open */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        closeSidebar={() => setSidebarOpen(false)} 
        isMobile={isMobile}
      />
      
      {/* Main content */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen && !isMobile ? 'md:ml-64' : ''}`}>
        {/* Dashboard navbar */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center">
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden mr-2"
                aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
              >
                <Menu size={24} />
              </Button>

              {/* Desktop sidebar toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden md:flex mr-2"
                aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
              >
                {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
              </Button>
              
              <h1 className="text-primary flex items-center">
                <div className="relative min-h-8 max-w-[75vw] md:max-w-xs lg:max-w-sm">
                  <div className="transition-all duration-300 absolute whitespace-nowrap overflow-hidden text-ellipsis transform flex items-center text-base sm:text-lg md:text-xl"
                       style={{ opacity: sidebarOpen ? 1 : 0, transform: `translateY(${sidebarOpen ? 0 : -20}px)`, maxWidth: '100%' }}>
                    {pageTitle}
                  </div>
                  <div className="transition-all duration-300 absolute whitespace-nowrap overflow-hidden text-ellipsis transform flex items-center text-base sm:text-lg md:text-xl"
                       style={{ opacity: !sidebarOpen ? 1 : 0, transform: `translateY(${!sidebarOpen ? 0 : 20}px)`, maxWidth: '100%' }}>
                    <span className="hidden sm:inline">DERMA </span>{pageTitle}
                  </div>
                  {/* Invisible spacer to maintain height - matches the largest title */}
                  <div className="invisible whitespace-nowrap text-base sm:text-lg md:text-xl">
                    <span className="sm:inline">DERMA </span>Appointments
                  </div>
                </div>
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-500">
                <Bell size={20} />
              </Button>
              <Avatar>
                <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" />
                <AvatarFallback className="bg-primary text-white">JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};