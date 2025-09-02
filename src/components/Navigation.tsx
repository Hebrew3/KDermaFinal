import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Calendar, Settings, LogOut, Home } from 'lucide-react';
import { Button } from './ui/button';
import { Logo } from './Logo';

export const Navigation = ({ scrollToTop, scrollToContact, scrollToAbout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Logo size="small" />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <a 
            href="#" 
            className="text-gray-700 hover:text-primary transition-colors"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            Home
          </a>
          <a 
            href="#services" 
            className="text-gray-700 hover:text-primary transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Services
          </a>
          <a 
            href="#about" 
            className="text-gray-700 hover:text-primary transition-colors"
            onClick={(e) => {
              e.preventDefault();
              scrollToAbout();
            }}
          >
            About
          </a>
          <a 
            href="#contact" 
            className="text-gray-700 hover:text-primary transition-colors"
            onClick={(e) => {
              e.preventDefault();
              scrollToContact();
            }}
          >
            Contact
          </a>
        </nav>

        <div className="hidden md:flex space-x-3">
          <Link to="/login">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-primary text-white hover:bg-primary/90">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-500 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-2 space-y-2">
            <a 
              href="#" 
              className="block py-2 text-gray-700 hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
                setIsOpen(false);
              }}
            >
              Home
            </a>
            <a 
              href="#services" 
              className="block py-2 text-gray-700 hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                setIsOpen(false);
              }}
            >
              Services
            </a>
            <a 
              href="#about" 
              className="block py-2 text-gray-700 hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault();
                scrollToAbout();
                setIsOpen(false);
              }}
            >
              About
            </a>
            <a 
              href="#contact" 
              className="block py-2 text-gray-700 hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault();
                scrollToContact();
                setIsOpen(false);
              }}
            >
              Contact
            </a>
            <div className="pt-2 flex flex-col space-y-2">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-primary text-white hover:bg-primary/90">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};