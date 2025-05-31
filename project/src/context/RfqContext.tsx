import { createContext, useState, useEffect, ReactNode } from 'react';
import { mockRfqs } from '../data/mockRfqs';

export interface Rfq {
  id: string;
  title: string;
  description: string;
  customerId: string;
  customerName: string;
  segment: string;
  companies: string[];
  status: 'draft' | 'published' | 'in_review' | 'completed';
  requirements: {
    key: string;
    value: string;
  }[];
  responses: RfqResponse[];
  createdAt: string;
  deadline: string;
}

export interface RfqResponse {
  id: string;
  rfqId: string;
  vendorId: string;
  vendorName: string;
  vendorLogo?: string;
  solution: string;
  price: number;
  timeframe: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

interface RfqContextType {
  rfqs: Rfq[];
  userRfqs: Rfq[];
  createRfq: (rfqData: Partial<Rfq>) => Promise<string>;
  updateRfq: (id: string, rfqData: Partial<Rfq>) => Promise<void>;
  getRfqById: (id: string) => Rfq | undefined;
  submitRfqResponse: (rfqId: string, responseData: Partial<RfqResponse>) => Promise<void>;
  evaluateResponses: (rfqId: string) => Promise<RfqResponse[]>;
}

export const RfqContext = createContext<RfqContextType>({
  rfqs: [],
  userRfqs: [],
  createRfq: async () => '',
  updateRfq: async () => {},
  getRfqById: () => undefined,
  submitRfqResponse: async () => {},
  evaluateResponses: async () => [],
});

export const RfqProvider = ({ children }: { children: ReactNode }) => {
  const [rfqs, setRfqs] = useState<Rfq[]>([]);
  const [userRfqs, setUserRfqs] = useState<Rfq[]>([]);

  useEffect(() => {
    // Load RFQs from mock data
    setRfqs(mockRfqs);
    
    // Filter user RFQs based on logged in user
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.userType === 'customer') {
        setUserRfqs(mockRfqs.filter(rfq => rfq.customerId === user.id));
      } else {
        // For vendors, show RFQs where they're listed in the companies
        setUserRfqs(mockRfqs.filter(rfq => rfq.companies.includes(user.company || '')));
      }
    }
  }, []);

  const createRfq = async (rfqData: Partial<Rfq>): Promise<string> => {
    // Get user data
    const userData = localStorage.getItem('user');
    if (!userData) throw new Error('User not authenticated');
    
    const user = JSON.parse(userData);
    
    // Create new RFQ
    const newRfq: Rfq = {
      id: Math.random().toString(36).substring(2, 9),
      title: rfqData.title || 'Untitled RFQ',
      description: rfqData.description || '',
      customerId: user.id,
      customerName: user.name,
      segment: rfqData.segment || '',
      companies: rfqData.companies || [],
      status: 'draft',
      requirements: rfqData.requirements || [],
      responses: [],
      createdAt: new Date().toISOString(),
      deadline: rfqData.deadline || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    };
    
    // Add to state
    setRfqs(prev => [...prev, newRfq]);
    setUserRfqs(prev => [...prev, newRfq]);
    
    return newRfq.id;
  };

  const updateRfq = async (id: string, rfqData: Partial<Rfq>): Promise<void> => {
    const updatedRfqs = rfqs.map(rfq => 
      rfq.id === id ? { ...rfq, ...rfqData } : rfq
    );
    
    setRfqs(updatedRfqs);
    
    // Update user RFQs as well
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.userType === 'customer') {
        setUserRfqs(updatedRfqs.filter(rfq => rfq.customerId === user.id));
      } else {
        setUserRfqs(updatedRfqs.filter(rfq => rfq.companies.includes(user.company || '')));
      }
    }
  };

  const getRfqById = (id: string): Rfq | undefined => {
    return rfqs.find(rfq => rfq.id === id);
  };

  const submitRfqResponse = async (rfqId: string, responseData: Partial<RfqResponse>): Promise<void> => {
    const userData = localStorage.getItem('user');
    if (!userData) throw new Error('User not authenticated');
    
    const user = JSON.parse(userData);
    
    const newResponse: RfqResponse = {
      id: Math.random().toString(36).substring(2, 9),
      rfqId,
      vendorId: user.id,
      vendorName: user.company || user.name,
      vendorLogo: user.logoUrl,
      solution: responseData.solution || '',
      price: responseData.price || 0,
      timeframe: responseData.timeframe || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    const updatedRfqs = rfqs.map(rfq => {
      if (rfq.id === rfqId) {
        return {
          ...rfq,
          responses: [...rfq.responses, newResponse],
          status: 'in_review'
        };
      }
      return rfq;
    });
    
    setRfqs(updatedRfqs);
    
    // Update user RFQs
    if (user.userType === 'customer') {
      setUserRfqs(updatedRfqs.filter(rfq => rfq.customerId === user.id));
    } else {
      setUserRfqs(updatedRfqs.filter(rfq => rfq.companies.includes(user.company || '')));
    }
  };

  const evaluateResponses = async (rfqId: string): Promise<RfqResponse[]> => {
    const rfq = rfqs.find(r => r.id === rfqId);
    if (!rfq) throw new Error('RFQ not found');
    
    // Sort responses by price (lowest first) and add 3% markup
    const evaluatedResponses = [...rfq.responses].map(response => ({
      ...response,
      price: response.price * 1.03, // Add 3% markup
    })).sort((a, b) => a.price - b.price);
    
    // Update RFQ with evaluated responses and mark as completed
    const updatedRfqs = rfqs.map(r => {
      if (r.id === rfqId) {
        return {
          ...r,
          responses: evaluatedResponses,
          status: 'completed'
        };
      }
      return r;
    });
    
    setRfqs(updatedRfqs);
    
    // Update user RFQs
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.userType === 'customer') {
        setUserRfqs(updatedRfqs.filter(rfq => rfq.customerId === user.id));
      } else {
        setUserRfqs(updatedRfqs.filter(rfq => rfq.companies.includes(user.company || '')));
      }
    }
    
    return evaluatedResponses;
  };

  return (
    <RfqContext.Provider 
      value={{ 
        rfqs, 
        userRfqs, 
        createRfq, 
        updateRfq, 
        getRfqById, 
        submitRfqResponse, 
        evaluateResponses 
      }}
    >
      {children}
    </RfqContext.Provider>
  );
};