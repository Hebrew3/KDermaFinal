
import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  ChevronRight, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Heart, 
  Clock, 
  ArrowRight, 
  Loader2, 
  Lock, 
  Eye, 
  EyeOff 
} from 'lucide-react';
import { Logo } from './Logo';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { SafeCheckbox } from './ui/safe-checkbox';
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Service type definition
interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  imageUrl: string;
  isFreeTrialAvailable?: boolean;
}

// Form steps type
type SignupStep = 'personal' | 'services' | 'confirmation';

// Form data validation errors
interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  agreeToTerms?: string;
  services?: string;
}

// Mock data for services with fixed image URLs
const services: Service[] = [
  {
    id: "skin-analysis",
    name: "Skin Analysis",
    description: "Comprehensive skin evaluation with personalized treatment recommendations",
    duration: "30 min",
    price: 95,
    imageUrl: "/services/skin-analysis-consultation.jpg"
  },
  {
    id: "chemical-peel",
    name: "Chemical Peel",
    description: "Exfoliating treatment to improve skin texture and appearance",
    duration: "45 min",
    price: 150,
    imageUrl: "/services/hydrating-skin-therapy.jpg"
  },
  {
    id: "facial",
    name: "Facial",
    description: "Classic facial treatment to cleanse, exfoliate and hydrate skin",
    duration: "60 min",
    price: 120,
    imageUrl: "/services/hydrating-skin-therapy.jpg"
  },
  {
    id: "microdermabrasion",
    name: "Microdermabrasion",
    description: "Physical exfoliation that removes the outer layer of skin",
    duration: "45 min",
    price: 135,
    imageUrl: "/services/hydrating-skin-therapy.jpg"
  },
  {
    id: "led-therapy",
    name: "LED Light Therapy",
    description: "Treatment using various wavelengths of light to target skin concerns",
    duration: "30 min",
    price: 110,
    isFreeTrialAvailable: true,
    imageUrl: "/services/hydrating-skin-therapy.jpg"
  },
  {
    id: "acne-treatment",
    name: "Acne Treatment",
    description: "Specialized treatment to address active acne and prevent future breakouts",
    duration: "45 min",
    price: 135,
    imageUrl: "/services/hydrating-skin-therapy.jpg"
  },
  {
    id: "botox",
    name: "Botox Injection",
    description: "Minimally invasive treatment to reduce appearance of wrinkles",
    duration: "30 min",
    price: 350,
    imageUrl: "/services/skin-analysis-consultation.jpg"
  },
  {
    id: "dermal-fillers",
    name: "Dermal Fillers",
    description: "Injectable treatments to restore volume and fullness",
    duration: "45 min",
    price: 450,
    imageUrl: "/services/skin-analysis-consultation.jpg"
  }
];

export const SignupPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<SignupStep>('personal');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Use useRef to track selected services to avoid re-renders
  const selectedServicesRef = useRef<string[]>([]);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    birthdate: '',
    skinType: 'normal',
    selectedServices: [] as string[],
    preferredDate: '',
    preferredTime: '',
    contactPreference: 'email',
    notes: '',
    agreeToTerms: false
  });
  
  // Sync the ref with state
  useEffect(() => {
    selectedServicesRef.current = formData.selectedServices;
  }, [formData.selectedServices]);
  
  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear any error for the field being updated
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Memoize handleServiceToggle with useCallback
  const handleServiceToggle = useCallback((serviceId: string) => {
    setFormData(prev => {
      // Use the ref to avoid dependency loop
      const currentServices = [...selectedServicesRef.current];
      const index = currentServices.indexOf(serviceId);
      
      if (index !== -1) {
        // Service is already selected, remove it
        currentServices.splice(index, 1);
      } else {
        // Service is not selected, add it
        currentServices.push(serviceId);
      }
      
      return { ...prev, selectedServices: currentServices };
    });
  }, []);

  const handleSkinTypeChange = (value: string) => {
    updateFormData('skinType', value);
  };

  const handleContactPreferenceChange = (value: string) => {
    updateFormData('contactPreference', value);
  };
  
  const goToNextStep = () => {
    if (currentStep === 'personal') setCurrentStep('services');
    else if (currentStep === 'services') setCurrentStep('confirmation');
  };
  
  const goToPreviousStep = () => {
    if (currentStep === 'services') setCurrentStep('personal');
    else if (currentStep === 'confirmation') setCurrentStep('services');
  };
  
  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Basic phone validation - allows different formats
    const regex = /^[\d\+\-\.\(\)\s]{7,20}$/;
    return regex.test(phone);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };
  
  const validatePersonalStep = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
      isValid = false;
    }
    
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
      isValid = false;
    }
    
    setErrors(newErrors);
    
    if (!isValid) {
      toast.error("Please fix the form errors");
    }
    
    return isValid;
  };
  
  const validateServicesStep = (): boolean => {
    // Check if any services are selected
    if (formData.selectedServices.length === 0) {
      setErrors(prev => ({ ...prev, services: "Please select at least one service" }));
      toast.error("Please select at least one service");
      return false;
    }
    
    // Clear any service errors
    setErrors(prev => ({ ...prev, services: undefined }));
    return true;
  };
  
  const handleNextClick = () => {
    if (currentStep === 'personal' && validatePersonalStep()) {
      goToNextStep();
    } else if (currentStep === 'services' && validateServicesStep()) {
      goToNextStep();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If we're not on the confirmation step, just go to next step
    if (currentStep !== 'confirmation') {
      handleNextClick();
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real application, we would send the data to a server here
      console.log("Form submitted:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      toast.success("Registration successful! Redirecting to services...");
      
      // Navigate to services page after a short delay
      setTimeout(() => {
        navigate(`/client`, { state: { selectedServices: formData.selectedServices } });
      }, 1000);
    } catch (error) {
      toast.error("There was an error registering your account. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render progress indicator
  const renderProgressSteps = () => {
    const steps: SignupStep[] = ['personal', 'services', 'confirmation'];
    const stepNames = {
      'personal': 'Personal Info',
      'services': 'Select Services',
      'confirmation': 'Confirm'
    };
    
    return (
      <div className="flex items-center justify-center space-x-2 mb-6">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div 
              className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                currentStep === step 
                  ? 'bg-primary text-white' 
                  : steps.indexOf(currentStep) > index
                  ? 'bg-green-500 text-white'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {steps.indexOf(currentStep) > index ? <Check size={16} /> : index + 1}
            </div>
            <span className={`ml-2 text-sm ${currentStep === step ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
              {stepNames[step]}
            </span>
            {index < steps.length - 1 && (
              <span className="mx-2 text-muted-foreground">
                <ChevronRight size={16} />
              </span>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Render personal information form
  const renderPersonalInfoForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            First Name <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="firstName" 
            value={formData.firstName} 
            onChange={(e) => updateFormData('firstName', e.target.value)} 
            className={errors.firstName ? "border-red-500" : ""} 
            required 
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">
            Last Name <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="lastName" 
            value={formData.lastName} 
            onChange={(e) => updateFormData('lastName', e.target.value)} 
            className={errors.lastName ? "border-red-500" : ""}
            required 
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">
          Email Address <span className="text-red-500">*</span>
        </Label>
        <Input 
          id="email" 
          type="email" 
          value={formData.email} 
          onChange={(e) => updateFormData('email', e.target.value)} 
          className={errors.email ? "border-red-500" : ""}
          required 
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">
          Phone Number <span className="text-red-500">*</span>
        </Label>
        <Input 
          id="phone" 
          type="tel" 
          value={formData.phone} 
          onChange={(e) => updateFormData('phone', e.target.value)} 
          className={errors.phone ? "border-red-500" : ""}
          required 
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">
          Password <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Input 
            id="password" 
            type={showPassword ? "text" : "password"} 
            value={formData.password} 
            onChange={(e) => updateFormData('password', e.target.value)} 
            className={errors.password ? "border-red-500 pr-10" : "pr-10"}
            required 
          />
          <button 
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password ? (
          <p className="text-red-500 text-sm">{errors.password}</p>
        ) : (
          <p className="text-xs text-muted-foreground">
            Password must be at least 8 characters
          </p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="birthdate">Date of Birth</Label>
        <Input 
          id="birthdate" 
          type="date" 
          value={formData.birthdate} 
          onChange={(e) => updateFormData('birthdate', e.target.value)} 
        />
      </div>

      <div className="space-y-2">
        <Label>Skin Type</Label>
        <RadioGroup value={formData.skinType} onValueChange={handleSkinTypeChange}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <div className="flex items-center space-x-2 rounded-md border p-2 hover:bg-muted/50">
              <RadioGroupItem value="normal" id="normal" />
              <Label htmlFor="normal" className="cursor-pointer">Normal</Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border p-2 hover:bg-muted/50">
              <RadioGroupItem value="dry" id="dry" />
              <Label htmlFor="dry" className="cursor-pointer">Dry</Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border p-2 hover:bg-muted/50">
              <RadioGroupItem value="oily" id="oily" />
              <Label htmlFor="oily" className="cursor-pointer">Oily</Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border p-2 hover:bg-muted/50">
              <RadioGroupItem value="combination" id="combination" />
              <Label htmlFor="combination" className="cursor-pointer">Combination</Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border p-2 hover:bg-muted/50">
              <RadioGroupItem value="sensitive" id="sensitive" />
              <Label htmlFor="sensitive" className="cursor-pointer">Sensitive</Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border p-2 hover:bg-muted/50">
              <RadioGroupItem value="unsure" id="unsure" />
              <Label htmlFor="unsure" className="cursor-pointer">Not sure</Label>
            </div>
          </div>
        </RadioGroup>
      </div>
      
      <div className="pt-2">
        <div className="flex items-center space-x-2">
          <SafeCheckbox 
            id="terms" 
            checked={formData.agreeToTerms}
            onChange={(checked) => {
              updateFormData('agreeToTerms', checked);
            }}
            className={errors.agreeToTerms ? "border-red-500" : ""}
            disabled={false}
          />
          <Label htmlFor="terms" className={`text-sm ${errors.agreeToTerms ? "text-red-500" : ""}`}>
            I agree to the <a href="#" className="text-primary hover:underline">Terms and Conditions</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a> <span className="text-red-500">*</span>
          </Label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>
        )}
      </div>
    </div>
  );

  // Render services selection with improved UI
  const renderServicesSelection = () => {
    // Direct handler instead of using SafeCheckbox (to avoid the infinite loop)
    const handleServiceCheckboxChange = (serviceId: string, isChecked: boolean) => {
      // Only update if the state is actually changing
      const isCurrentlySelected = formData.selectedServices.includes(serviceId);
      
      if (isChecked !== isCurrentlySelected) {
        handleServiceToggle(serviceId);
      }
    };
    
    return (
      <div>
        <p className="text-muted-foreground mb-4">
          Please select the services you are interested in:
        </p>
        
        {errors.services && (
          <p className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded-md">
            {errors.services}
          </p>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map(service => {
            const isSelected = formData.selectedServices.includes(service.id);
            
            return (
              <div 
                key={service.id} 
                className={`
                  rounded-lg border overflow-hidden transition-all cursor-pointer
                  ${isSelected ? 'border-2 border-primary shadow-md' : 'hover:border-primary/50'}
                `}
                onClick={() => handleServiceToggle(service.id)}
              >
                <div className="relative h-40">
                  <ImageWithFallback 
                    src={service.imageUrl} 
                    alt={service.name} 
                    className="w-full h-full object-cover"
                    type="service"
                  />
                  {service.isFreeTrialAvailable && (
                    <Badge className="absolute top-2 right-2 bg-primary">
                      Free Trial
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Simple div styled as checkbox to avoid Radix issues */}
                    <div 
                      className={`mt-1 h-4 w-4 rounded border flex items-center justify-center ${
                        isSelected ? 'bg-primary border-primary' : 'border-gray-300'
                      }`}
                    >
                      {isSelected && <Check size={12} className="text-white" />}
                    </div>
                    <div className="space-y-1">
                      <Label className={isSelected ? 'text-primary font-medium' : ''}>
                        {service.name}
                      </Label>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                      <div className="flex items-center text-sm mt-2">
                        <span className="flex items-center text-muted-foreground mr-4">
                          <Clock size={14} className="mr-1" />
                          {service.duration}
                        </span>
                        <span className="font-medium">
                          {service.isFreeTrialAvailable ? "Free Trial" : `₱${service.price}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render confirmation step
  const renderConfirmation = () => {
    // Get the names of selected services
    const selectedServiceNames = formData.selectedServices.map(id => 
      services.find(service => service.id === id)?.name || id
    );

    // Calculate total price
    const totalPrice = formData.selectedServices.reduce((sum, id) => {
      const service = services.find(s => s.id === id);
      return sum + (service?.isFreeTrialAvailable ? 0 : (service?.price || 0));
    }, 0);

    return (
      <div className="space-y-6">
        <div>
          <h3 className="mb-2">Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm bg-accent p-4 rounded-lg">
            <div>
              <span className="text-muted-foreground">Name:</span>
              <p>{formData.firstName} {formData.lastName}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Email:</span>
              <p>{formData.email}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Phone:</span>
              <p>{formData.phone}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Date of Birth:</span>
              <p>{formData.birthdate || 'Not provided'}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Skin Type:</span>
              <p className="capitalize">{formData.skinType}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-2">Selected Services</h3>
          <div className="bg-accent p-4 rounded-lg">
            {selectedServiceNames.length > 0 ? (
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedServiceNames.map((name, index) => (
                    <Badge key={index} className="bg-primary px-3 py-1">{name}</Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-2 mt-2 border-t border-border/50">
                  <span className="text-muted-foreground">Estimated Total:</span>
                  <span className="font-semibold">₱{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">No services selected</p>
            )}
          </div>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground text-center">
            By clicking Submit, you agree that all information provided is accurate and you consent to being contacted about your selected services.
          </p>
        </div>
      </div>
    );
  };

  // Render step content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 'personal':
        return renderPersonalInfoForm();
      case 'services':
        return renderServicesSelection();
      case 'confirmation':
        return renderConfirmation();
      default:
        return null;
    }
  };

  // Render form navigation buttons
  const renderFormNavigation = () => (
    <div className="flex justify-between pt-6">
      {currentStep !== 'personal' && (
        <Button 
          type="button" 
          variant="outline" 
          onClick={goToPreviousStep}
          disabled={isSubmitting}
        >
          Back
        </Button>
      )}

      <div className={currentStep === 'personal' ? 'ml-auto' : ''}>
        {currentStep !== 'confirmation' ? (
          <Button type="button" onClick={handleNextClick} className="gap-1">
            Next
            <ArrowRight size={16} />
          </Button>
        ) : (
          <Button 
            type="submit" 
            className="bg-primary hover:bg-primary/90 gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Processing...
              </>
            ) : (
              'Complete Registration'
            )}
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col items-center py-10 px-4">
      <div className="max-w-3xl w-full">
        <div className="mb-8 text-center">
          <Logo size="large" />
          <h1 className="mt-4">Client Registration</h1>
          <p className="text-muted-foreground">
            Sign up to book treatments and manage your appointments at K DERMA
          </p>
        </div>

        {renderProgressSteps()}

        <Card className="w-full border border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>
              {currentStep === 'personal' && 'Your Information'}
              {currentStep === 'services' && 'Select Your Services'}
              {currentStep === 'confirmation' && 'Confirm Your Details'}
            </CardTitle>
            <CardDescription>
              {currentStep === 'personal' && 'Please provide your personal details to get started'}
              {currentStep === 'services' && 'Choose the services you are interested in exploring'}
              {currentStep === 'confirmation' && 'Review your information before submitting'}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              {renderStepContent()}
            </CardContent>
            <CardFooter>
              {renderFormNavigation()}
            </CardFooter>
          </form>
        </Card>
        
        {currentStep === 'personal' && (
          <p className="text-center text-muted-foreground text-sm mt-6">
            Already have an account? <a href="/login" className="text-primary hover:underline">Login here</a>
          </p>
        )}
      </div>
    </div>
  );
};
