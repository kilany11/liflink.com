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
  evaluation?: {
    technicalScore: number;
    priceScore: number;
    timeframeScore: number;
    totalScore: number;
    strengths: string[];
    weaknesses: string[];
    recommendation: string;
  };
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
    setRfqs(mockRfqs);
    
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.userType === 'customer') {
        setUserRfqs(mockRfqs.filter(rfq => rfq.customerId === user.id));
      } else {
        setUserRfqs(mockRfqs.filter(rfq => rfq.companies.includes(user.company || '')));
      }
    }
  }, []);

  const createRfq = async (rfqData: Partial<Rfq>): Promise<string> => {
    const userData = localStorage.getItem('user');
    if (!userData) throw new Error('User not authenticated');
    
    const user = JSON.parse(userData);
    
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
    
    setRfqs(prev => [...prev, newRfq]);
    setUserRfqs(prev => [...prev, newRfq]);
    
    return newRfq.id;
  };

  const updateRfq = async (id: string, rfqData: Partial<Rfq>): Promise<void> => {
    const updatedRfqs = rfqs.map(rfq => 
      rfq.id === id ? { ...rfq, ...rfqData } : rfq
    );
    
    setRfqs(updatedRfqs);
    
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
    
    if (user.userType === 'customer') {
      setUserRfqs(updatedRfqs.filter(rfq => rfq.customerId === user.id));
    } else {
      setUserRfqs(updatedRfqs.filter(rfq => rfq.companies.includes(user.company || '')));
    }
  };

  const evaluateResponses = async (rfqId: string): Promise<RfqResponse[]> => {
    const rfq = rfqs.find(r => r.id === rfqId);
    if (!rfq) throw new Error('RFQ not found');
    
    // AI-powered evaluation
    const evaluatedResponses = rfq.responses.map(response => {
      // Technical score based on solution matching requirements
      const technicalScore = calculateTechnicalScore(response.solution, rfq.requirements);
      
      // Price score (lower is better)
      const lowestPrice = Math.min(...rfq.responses.map(r => r.price));
      const priceScore = (lowestPrice / response.price) * 100;
      
      // Timeframe score (shorter is better)
      const timeframeInDays = parseTimeframe(response.timeframe);
      const shortestTimeframe = Math.min(...rfq.responses.map(r => parseTimeframe(r.timeframe)));
      const timeframeScore = (shortestTimeframe / timeframeInDays) * 100;
      
      // Calculate total score (weighted average)
      const totalScore = (technicalScore * 0.5) + (priceScore * 0.3) + (timeframeScore * 0.2);
      
      // Generate strengths and weaknesses
      const strengths = [];
      const weaknesses = [];
      
      if (technicalScore > 80) strengths.push('Strong technical solution');
      if (technicalScore < 60) weaknesses.push('Technical solution needs improvement');
      
      if (priceScore > 90) strengths.push('Competitive pricing');
      if (priceScore < 70) weaknesses.push('Price is higher than competitors');
      
      if (timeframeScore > 90) strengths.push('Quick delivery timeframe');
      if (timeframeScore < 70) weaknesses.push('Longer implementation time');
      
      // Generate recommendation
      let recommendation = '';
      if (totalScore > 85) {
        recommendation = 'Highly Recommended - Excellent balance of technical solution, price, and timeframe';
      } else if (totalScore > 70) {
        recommendation = 'Recommended - Good overall proposal with some areas for negotiation';
      } else {
        recommendation = 'Consider Alternatives - Proposal has significant areas for improvement';
      }
      
      return {
        ...response,
        evaluation: {
          technicalScore,
          priceScore,
          timeframeScore,
          totalScore,
          strengths,
          weaknesses,
          recommendation
        }
      };
    }).sort((a, b) => (b.evaluation?.totalScore || 0) - (a.evaluation?.totalScore || 0));
    
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

  // Helper function to calculate technical score
  const calculateTechnicalScore = (solution: string, requirements: { key: string; value: string }[]): number => {
    let score = 0;
    const solutionLower = solution.toLowerCase();
    
    // Check if solution addresses each requirement
    requirements.forEach(req => {
      const keywordMatches = req.value.toLowerCase().split(' ').filter(word => 
        solutionLower.includes(word)
      ).length;
      
      score += (keywordMatches / req.value.split(' ').length) * 100;
    });
    
    // Average score across all requirements
    return score / requirements.length;
  };

  // Helper function to parse timeframe string to days
  const parseTimeframe = (timeframe: string): number => {
    const number = parseInt(timeframe.match(/\d+/)?.[0] || '0');
    if (timeframe.toLowerCase().includes('month')) {
      return number * 30;
    } else if (timeframe.toLowerCase().includes('week')) {
      return number * 7;
    }
    return number; // Assume days if no unit specified
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