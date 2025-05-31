import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { RfqContext } from '../../context/RfqContext';
import { AlertCircle, Clock, FileText, CheckCircle } from 'lucide-react';

const VendorDashboard = () => {
  const { user } = useContext(AuthContext);
  const { userRfqs } = useContext(RfqContext);

  // Separate RFQs by status
  const pendingRfqs = userRfqs.filter(rfq => rfq.status === 'published');
  const respondedRfqs = userRfqs.filter(rfq => {
    const hasResponded = rfq.responses.some(response => response.vendorName === user?.company);
    return hasResponded && rfq.status !== 'completed';
  });
  const completedRfqs = userRfqs.filter(rfq => rfq.status === 'completed');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Pending Response</span>;
      case 'in_review':
        return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">In Review</span>;
      case 'completed':
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Completed</span>;
      default:
        return null;
    }
  };

  const getResponseStatus = (rfq: any) => {
    const response = rfq.responses.find((r: any) => r.vendorName === user?.company);
    if (!response) return null;
    
    switch (response.status) {
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Pending</span>;
      case 'accepted':
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Accepted</span>;
      case 'rejected':
        return <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Rejected</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.company || user?.name}</h1>
        <p className="mt-2 text-gray-600">Manage your RFQ responses and track opportunities.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Clock className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Pending RFQs</h3>
              <p className="text-3xl font-bold text-gray-800">{pendingRfqs.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Responded</h3>
              <p className="text-3xl font-bold text-gray-800">{respondedRfqs.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Completed</h3>
              <p className="text-3xl font-bold text-gray-800">{completedRfqs.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pending RFQs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Pending RFQs</h2>
          <p className="text-sm text-gray-600">RFQs that require your response</p>
        </div>

        {pendingRfqs.length === 0 ? (
          <div className="p-6 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No pending RFQs</h3>
            <p className="mt-1 text-sm text-gray-500">
              You don't have any pending RFQs that require a response.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {pendingRfqs.map((rfq) => (
              <div key={rfq.id} className="p-6 hover:bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-gray-900 mr-3">{rfq.title}</h3>
                      {getStatusBadge(rfq.status)}
                    </div>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">{rfq.description}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                      <div>
                        <span className="font-medium">Customer:</span> {rfq.customerName}
                      </div>
                      <div>
                        <span className="font-medium">Segment:</span> {rfq.segment}
                      </div>
                      <div>
                        <span className="font-medium">Deadline:</span> {new Date(rfq.deadline).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <Link
                      to={`/rfq/${rfq.id}/respond`}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0A66C2] hover:bg-[#004182]"
                    >
                      Respond to RFQ
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Responded RFQs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Responded RFQs</h2>
          <p className="text-sm text-gray-600">RFQs you have responded to and are awaiting decision</p>
        </div>

        {respondedRfqs.length === 0 ? (
          <div className="p-6 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No responded RFQs</h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven't responded to any RFQs yet.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {respondedRfqs.map((rfq) => (
              <div key={rfq.id} className="p-6 hover:bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-gray-900 mr-3">{rfq.title}</h3>
                      {getStatusBadge(rfq.status)}
                    </div>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">{rfq.description}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                      <div>
                        <span className="font-medium">Customer:</span> {rfq.customerName}
                      </div>
                      <div>
                        <span className="font-medium">Segment:</span> {rfq.segment}
                      </div>
                      <div>
                        <span className="font-medium">Your Response:</span> {getResponseStatus(rfq)}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <Link
                      to={`/rfq/${rfq.id}`}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white hover:bg-gray-50 text-gray-700"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed RFQs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Completed RFQs</h2>
          <p className="text-sm text-gray-600">RFQs that have been completed</p>
        </div>

        {completedRfqs.length === 0 ? (
          <div className="p-6 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No completed RFQs</h3>
            <p className="mt-1 text-sm text-gray-500">
              You don't have any completed RFQs yet.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {completedRfqs.map((rfq) => (
              <div key={rfq.id} className="p-6 hover:bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-gray-900 mr-3">{rfq.title}</h3>
                      {getStatusBadge(rfq.status)}
                    </div>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">{rfq.description}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                      <div>
                        <span className="font-medium">Customer:</span> {rfq.customerName}
                      </div>
                      <div>
                        <span className="font-medium">Segment:</span> {rfq.segment}
                      </div>
                      <div>
                        <span className="font-medium">Result:</span> {getResponseStatus(rfq)}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <Link
                      to={`/rfq/${rfq.id}`}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white hover:bg-gray-50 text-gray-700"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;