import { useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { RfqContext } from '../../context/RfqContext';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const RespondRfqPage = () => {
  const { rfqId } = useParams<{ rfqId: string }>();
  const { getRfqById, submitRfqResponse } = useContext(RfqContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const rfq = getRfqById(rfqId || '');
  
  const [solution, setSolution] = useState('');
  const [price, setPrice] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  if (!rfq) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900">RFQ not found</h1>
        <p className="mt-4 text-lg text-gray-600">
          The RFQ you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/dashboard/vendor"
          className="mt-8 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#0A66C2] hover:bg-[#004182]"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }
  
  // Check if vendor has already responded
  const hasResponded = rfq.responses.some(response => response.vendorName === user?.company);
  
  if (hasResponded) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Response already submitted</h1>
        <p className="mt-4 text-lg text-gray-600">
          You have already submitted a response to this RFQ.
        </p>
        <Link
          to={`/rfq/${rfqId}`}
          className="mt-8 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#0A66C2] hover:bg-[#004182]"
        >
          View RFQ Details
        </Link>
      </div>
    );
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!solution || !price || !timeframe) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await submitRfqResponse(rfqId || '', {
        solution,
        price: parseFloat(price),
        timeframe,
      });
      
      toast.success('Response submitted successfully');
      navigate(`/rfq/${rfqId}`);
    } catch (error) {
      toast.error('Error submitting response');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link
          to={`/rfq/${rfqId}`}
          className="inline-flex items-center text-[#0A66C2] hover:text-[#004182]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to RFQ
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Respond to RFQ</h1>
          <p className="text-gray-600">{rfq.title}</p>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">RFQ Details</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-700 mb-4">{rfq.description}</p>
              
              <div className="mt-4">
                <h3 className="text-md font-medium text-gray-900 mb-2">Requirements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rfq.requirements.map((req, index) => (
                    <div key={index} className="flex">
                      <span className="font-medium text-gray-700 mr-2">{req.key}:</span>
                      <span className="text-gray-600">{req.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Customer:</span>{' '}
                  <span className="text-gray-600">{rfq.customerName}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Deadline:</span>{' '}
                  <span className="text-gray-600">{new Date(rfq.deadline).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="solution" className="block text-sm font-medium text-gray-700 mb-1">
                  Proposed Solution <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="solution"
                  name="solution"
                  rows={6}
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0A66C2] focus:border-[#0A66C2]"
                  placeholder="Describe your proposed solution in detail"
                  required
                ></textarea>
                <p className="mt-1 text-sm text-gray-500">
                  Provide a detailed description of your solution that addresses all the requirements.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price (USD) <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      min="0"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#0A66C2] focus:border-[#0A66C2]"
                      placeholder="0.00"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">USD</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="timeframe" className="block text-sm font-medium text-gray-700 mb-1">
                    Timeframe <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="timeframe"
                    name="timeframe"
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0A66C2] focus:border-[#0A66C2]"
                    placeholder="e.g., 4 weeks, 2 months"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <Link
                  to={`/rfq/${rfqId}`}
                  className="mr-4 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0A66C2] hover:bg-[#004182] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A66C2] disabled:opacity-50"
                >
                  {isLoading ? 'Submitting...' : 'Submit Response'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RespondRfqPage;