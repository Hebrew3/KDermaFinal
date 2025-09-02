
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Logo } from './Logo';
import { toast } from 'sonner';
import { useAuth } from './context/AuthContext';
import { Alert, AlertDescription } from './ui/alert';
import { Checkbox } from './ui/checkbox';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(formData.email, formData.password);
      
      if (success) {
        toast.success("Login successful!");
        
        // Redirect based on user role
        if (formData.email.toLowerCase() === 'admin@admin') {
          navigate("/admin");
        } else if (formData.email.toLowerCase() === 'staff@staff') {
          navigate("/staff");
        } else {
          navigate("/client");
        }
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRememberMeChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      rememberMe: checked
    }));
  };
  
  return (
    <div className="min-h-screen bg-muted/20 flex flex-col items-center py-10 px-4">
      <div className="max-w-md w-full">
        <div className="mb-8 text-center">
          <Logo size="large" />
          <h1 className="mt-4 text-3xl">Welcome Back</h1>
          <p className="text-muted-foreground">
            Sign in to your K DERMA account
          </p>
        </div>
        
        <Card className="w-full border border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive" className="text-sm py-2">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="pr-10"
                  />
                  <button 
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={formData.rememberMe}
                  onCheckedChange={handleRememberMeChange}
                />
                <Label htmlFor="remember" className="text-sm cursor-pointer">Remember me</Label>
              </div>
              
              {/* Demo Credentials */}
              <div className="border border-border/50 rounded-md p-3 bg-muted/20">
                <p className="text-sm font-medium mb-2">Demo Credentials:</p>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Admin: admin@admin / admin</p>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4 mt-4">
              <Button 
                type="submit" 
                className="w-full bg-primary text-white hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin mr-2" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
              
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account? {" "}
                <Link to="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};
