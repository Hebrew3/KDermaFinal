import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, UserPlus } from 'lucide-react';
import { Button } from './ui/button';

interface SignupPromotionProps {
  delay?: number; // Time in ms before the promotion appears
  position?: 'bottom-right' | 'bottom-left';
}

export const SignupPromotion = ({ 
  delay = 5000, 
  position = 'bottom-right' 
}: SignupPromotionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  
  useEffect(() => {
    // Check if user has already seen this promotion
    const hasSeenPromo = localStorage.getItem('derma_signup_promo_seen');
    
    if (!hasSeenPromo && !isDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [delay, isDismissed]);
  
  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    // Set flag in local storage so it doesn't show up again soon
    localStorage.setItem('derma_signup_promo_seen', 'true');
  };
  
  const handleSignup = () => {
    // Record that user clicked on signup
    localStorage.setItem('derma_signup_promo_seen', 'true');
    // Let the Link component handle navigation
  };
  
  if (!isVisible || isDismissed) {
    return null;
  }
  
  return (
    <div className={`fixed ${position === 'bottom-right' ? 'bottom-4 right-4' : 'bottom-4 left-4'} z-50 pointer-events-auto`}>
      <div className="bg-white rounded-lg shadow-lg border border-primary p-4 max-w-sm transition-all duration-300 opacity-100 translate-y-0">
        <button 
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          aria-label="Close promotion"
        >
          <X size={18} />
        </button>
        
        <div className="flex items-center mb-3">
          <div className="bg-primary/10 rounded-full p-2 mr-3">
            <UserPlus className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-medium">Join DERMA Today!</h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">
          Create your free account now and get 15% off your first treatment plus access to exclusive offers.
        </p>
        
        <div className="flex justify-between items-center">
          <button 
            onClick={handleDismiss}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Maybe later
          </button>
          
          <Link to="/signup" onClick={handleSignup}>
            <Button className="bg-primary text-white hover:bg-primary/90">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};