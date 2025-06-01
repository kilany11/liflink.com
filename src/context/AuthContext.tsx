import { createContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  userType: 'customer' | 'vendor';
  company?: string;
  logoUrl?: string;
  documents: {
    id: string;
    name: string;
    url: string;
    verified: boolean;
  }[];
  subscription: {
    status: 'trial' | 'active' | 'expired';
    trialEnds: string;
    currentPeriodEnd: string;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  uploadDocument: (file: File) => Promise<void>;
  startSubscription: () => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  userType: 'customer' | 'vendor';
  company?: string;
  documents: File[];
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  uploadDocument: async () => {},
  startSubscription: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUsers: Record<string, User> = {
      'customer@example.com': {
        id: '1',
        name: 'John Customer',
        email: 'customer@example.com',
        userType: 'customer',
        company: 'ABC Corp',
        documents: [],
        subscription: {
          status: 'trial',
          trialEnds: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        }
      },
      'vendor@example.com': {
        id: '2',
        name: 'Jane Vendor',
        email: 'vendor@example.com',
        userType: 'vendor',
        company: 'Tech Solutions Ltd',
        logoUrl: 'https://via.placeholder.com/150',
        documents: [
          {
            id: 'doc1',
            name: 'Business License',
            url: 'https://example.com/license.pdf',
            verified: true
          }
        ],
        subscription: {
          status: 'trial',
          trialEnds: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        }
      }
    };
    
    if (mockUsers[email] && password === 'password') {
      const userData = mockUsers[email];
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate document upload
    const uploadedDocs = await Promise.all(
      userData.documents.map(async (file) => ({
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        url: URL.createObjectURL(file),
        verified: false
      }))
    );
    
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      name: userData.name,
      email: userData.email,
      userType: userData.userType,
      company: userData.company,
      documents: uploadedDocs,
      subscription: {
        status: 'trial',
        trialEnds: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      }
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    setIsLoading(false);
  };

  const uploadDocument = async (file: File) => {
    if (!user) throw new Error('User not authenticated');
    
    // Simulate document upload
    const newDoc = {
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      url: URL.createObjectURL(file),
      verified: false
    };
    
    const updatedUser = {
      ...user,
      documents: [...user.documents, newDoc]
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const startSubscription = async () => {
    if (!user) throw new Error('User not authenticated');
    
    // Simulate subscription start
    const updatedUser = {
      ...user,
      subscription: {
        status: 'active',
        trialEnds: user.subscription.trialEnds,
        currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      }
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        isLoading, 
        login, 
        register, 
        logout,
        uploadDocument,
        startSubscription
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};