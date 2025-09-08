import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userPicture from "@/assets/images/avatar.jpg";

// Define user types and roles
export type UserRole = 'admin' | 'staff' | 'client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Context type definition
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (params: { firstName: string; lastName: string; email: string; password: string; role?: UserRole }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isLoading: boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample user data - in a real app, this would come from an API
const sampleUsers = [
  {
    id: '1',
    name: 'Daniel De Asis',
    email: 'admin@admin',
    password: 'admin',
    role: 'admin' as UserRole,
    avatar: userPicture,
  },
  {
    id: '2',
    name: 'Staff User',
    email: 'staff@staff',
    password: 'staff',
    role: 'staff' as UserRole,
    avatar: userPicture,
  },
  {
    id: '3',
    name: 'Client User',
    email: 'client@client',
    password: 'client',
    role: 'client' as UserRole,
    avatar: userPicture,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [registeredUsers, setRegisteredUsers] = useState<any[]>([]);
  
  // Check for existing session on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedRegisteredUsers = localStorage.getItem('registeredUsers');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedRegisteredUsers) {
      try {
        setRegisteredUsers(JSON.parse(storedRegisteredUsers));
      } catch {
        setRegisteredUsers([]);
      }
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find matching user
    const foundUser =
      sampleUsers.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      ) ||
      registeredUsers.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
    
    if (foundUser) {
      // Remove password before storing in state
      const { password: _, ...safeUser } = foundUser;
      setUser(safeUser);
      localStorage.setItem('user', JSON.stringify(safeUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  // Register function
  const register: AuthContextType['register'] = async ({ firstName, lastName, email, password, role }) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      // Check existing in sample or registered users
      const emailExists =
        sampleUsers.some(u => u.email.toLowerCase() === email.toLowerCase()) ||
        registeredUsers.some(u => u.email.toLowerCase() === email.toLowerCase());

      if (emailExists) {
        setIsLoading(false);
        return { success: false, message: 'Email already in use' };
      }

      const newUser = {
        id: String(Date.now()),
        name: `${firstName} ${lastName}`.trim(),
        email,
        password,
        role: role || ('client' as UserRole),
        avatar: userPicture,
      };

      const nextUsers = [...registeredUsers, newUser];
      setRegisteredUsers(nextUsers);
      localStorage.setItem('registeredUsers', JSON.stringify(nextUsers));

      // Auto-login the new user (store without password)
      const { password: _pw, ...safeUser } = newUser;
      setUser(safeUser);
      localStorage.setItem('user', JSON.stringify(safeUser));
      setIsLoading(false);
      return { success: true };
    } catch (e) {
      setIsLoading(false);
      return { success: false, message: 'Registration failed' };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Context value
  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};