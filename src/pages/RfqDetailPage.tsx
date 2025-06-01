import { useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { RfqContext, RfqResponse } from '../context/RfqContext';
import { AuthContext } from '../context/AuthContext';
import { FileText, Clock, AlertCircle, CheckCircle, ArrowUp, ArrowDown } from 'lucide-react';
import { toast } from 'react-hot-toast';

const RfqDetailPage = () => {
  const { rfqId } = useParams<{ rfqId: string }>();
  const { getRfqById, evaluateResponses } = useContext(RfqContext);
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const rfq = getRfqById(rfqId || '');
  const [sortBy, setSortBy] = useState('price-asc');
  const [isEvaluating, setIsEvaluating] = useState(false);
  
  if (!rfq) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900">RFQ not found</h1>
        <p className="mt-4 text-lg text-gray-600">
          The RFQ you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/segments"
          className="mt-8 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#0A66C2] hover:bg-[#004182]"
        >
          Browse Segments
        </Link>
      </div>
    );
  }
  
  const isCustomer = isAuthenticated && user?.userType === 'customer' && user?.id === rfq.customerId;
  const isVendor = isAuthenticated && user?.userType === 'vendor';
  
  // Check if vendor has already responded
  const hasResponded = isVendor && rfq.responses.some(response => response.vendorName === user?.company);
  
  // Sort responses
  const sortedResponses = [...rfq.responses].sort((a, b) => {
    if (sortBy === 'price-asc') {
      return a.price - b.price;
    } else if (sortBy === 'price-desc') {
      return b.price - a.price;
    } else if (sortBy === 'timeframe-asc') {
      return a.timeframe.localeCompare(b.timeframe);
    } else if (sortBy === 'timeframe-desc') {
      return b.timeframe.localeCompare(a.timeframe);
    } else {
      return 0;
    }
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Draft</span>;
      case 'published':
        return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Published</span>;
      case 'in_review':
        return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">In Review</span>;
      case 'completed':
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Completed</span>;
      default:
        return null;
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <FileText className="h-6 w-6 text-gray-500" />;
      case 'published':
        return <Clock className="h-6 w-6 text-blue-500" />;
      case 'in_review':
        return <AlertCircle className="h-6 w-6 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      default:
        return null;
    }
  };
  
  const handleEvaluate = async () => {
    if (rfq.responses.length === 0) {
      toast.error('No responses to evaluate');
      return;
    }
    
    setIsEvaluating(true);
    
    try {
      await evaluateResponses(rfq.id);
      toast.success('Responses evaluated successfully');
    } catch (error) {
      toast.error('Error evaluating responses');
    } finally {
      setIsEvaluating(false);
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        {user?.userType === 'customer' ? (
          <Link
            to="/rfq/manage"
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
            Back to All RFQs
          </Link>
        ) : (
          <Link
            to="/dashboard/vendor"
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
            Back to Dashboard
          </Link>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {getStatusIcon(rfq.status)}
              <h1 className="text-2xl font-bold text-gray-900 ml-2">{rfq.title}</h1>
              <div className="ml-4">{getStatusBadge(rfq.status)}</div>
            </div>
            {isVendor && rfq.status === 'published' && !hasResponded && (
              <Link
                to={`/rfq/${rfq.id}/respond`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0A66C2] hover:bg-[#004182]"
              >
                Respond to RFQ
              </Link>
            )}
            {isCustomer && rfq.status === 'in_review' && rfq.responses.length > 0 && (
              <button
                onClick={handleEvaluate}
                disabled={isEvaluating}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0A66C2] hover:bg-[#004182] disabled:opacity-50"
              >
                {isEvaluating ? 'Evaluating...' : 'Evaluate Responses'}
              </button>
            )}
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-gray-700 mb-8">{rfq.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">RFQ Information</h2>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Customer</p>
                    <p className="mt-1 text-sm text-gray-900">{rfq.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Segment</p>
                    <p className="mt-1 text-sm text-gray-900">{rfq.segment}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Created</p>
                    <p className="mt-1 text-sm text-gray-900">{new Date(rfq.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Deadline</p>
                    <p className="mt-1 text-sm text-gray-900">{new Date(rfq.deadline).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Vendors</p>
                    <p className="mt-1 text-sm text-gray-900">{rfq.companies.length}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Responses</p>
                    <p className="mt-1 text-sm text-gray-900">{rfq.responses.length}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h2>
              <div className="bg-gray-50 p-4 rounded-md">
                {rfq.requirements.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rfq.requirements.map((req, index) => (
                      <div key={index}>
                        <p className="text-sm font-medium text-gray-500">{req.key}</p>
                        <p className="mt-1 text-sm text-gray-900">{req.value}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No specific requirements provided.</p>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Vendor Responses</h2>
              
              {rfq.responses.length > 0 && (
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border-gray-300 rounded-md shadow-sm focus:ring-[#0A66C2] focus:border-[#0A66C2]"
                  >
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                    <option value="timeframe-asc">Timeframe (Shortest First)</option>
                    <option value="timeframe-desc">Timeframe (Longest First)</option>
                  </select>
                </div>
              )}
            </div>
            
            {rfq.responses.length === 0 ? (
              <div className="bg-gray-50 p-8 rounded-md text-center">
                <Clock className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No responses yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {rfq.status === 'draft'
                    ? 'This RFQ is still in draft mode and hasn\'t been published yet.'
                    : rfq.status === 'published'
                    ? 'Waiting for vendors to respond to this RFQ.'
                    : 'No vendors have responded to this RFQ.'}
                </p>
                {isVendor && rfq.status === 'published' && !hasResponded && (
                  <div className="mt-6">
                    <Link
                      to={`/rfq/${rfq.id}/respond`}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0A66C2] hover:bg-[#004182]"
                    >
                      Respond to RFQ
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {rfq.status === 'completed' && (
                  <div className="bg-green-50 border border-green-200 p-4 rounded-md mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-green-400\" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">Evaluation Complete</h3>
                        <div className="mt-2 text-sm text-green-700">
                          <p>
                            The responses have been evaluated. The vendors are sorted by recommended order based on price and timeframe.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {sortedResponses.map((response: RfqResponse, index) => (
                  <div 
                    key={response.id} 
                    className={`bg-white border rounded-lg overflow-hidden shadow-sm ${
                      rfq.status === 'completed' && index === 0 ? 'border-green-500 ring-1 ring-green-500' : 'border-gray-200'
                    }`}
                  >
                    {rfq.status === 'completed' && index === 0 && (
                      <div className="bg-green-50 text-green-700 text-sm font-medium px-4 py-2 border-b border-green-200">
                        Recommended Solution
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          {response.vendorLogo ? (
                            <img
                              src={response.vendorLogo}
                              alt={response.vendorName}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500 font-medium">
                                {response.vendorName.charAt(0)}
                              </span>
                            </div>
                          )}
                          <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-900">{response.vendorName}</h3>
                            <p className="text-sm text-gray-500">
                              Submitted {new Date(response.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="text-2xl font-bold text-gray-900">
                            ${response.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                          <div className="text-sm text-gray-500">Timeframe: {response.timeframe}</div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-md font-medium text-gray-900 mb-2">Proposed Solution</h4>
                        <p className="text-gray-700">{response.solution}</p>
                      </div>
                      
                      {rfq.status === 'completed' && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex justify-between items-center">
                            <div>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  response.status === 'accepted'
                                    ? 'bg-green-100 text-green-800'
                                    : response.status === 'rejected'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {response.status === 'accepted'
                                  ? 'Accepted'
                                  : response.status === 'rejected'
                                  ? 'Rejected'
                                  : 'Pending Decision'}
                              </span>
                            </div>
                            {rfq.status === 'completed' && (
                              <div className="flex items-center">
                                <div className="text-sm text-gray-500 mr-2">
                                  {index === 0
                                    ? 'Best value'
                                    : `${(response.price / sortedResponses[0].price - 1) * 100 > 0
                                        ? '+'
                                        : ''}${((response.price / sortedResponses[0].price - 1) * 100).toFixed(1)}% vs best`}
                                </div>
                                {index === 0 ? (
                                  <div className="text-green-500">
                                    <ArrowUp size={16} />
                                  </div>
                                ) : (
                                  <div className="text-red-500">
                                    <ArrowDown size={16} />
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RfqDetailPage;