import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { RfqContext } from '../../context/RfqContext';
import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const CustomerDashboard = () => {
  const { user } = useContext(AuthContext);
  const { userRfqs } = useContext(RfqContext);
  const [activeTab, setActiveTab] = useState('all');

  const filteredRfqs = userRfqs.filter(rfq => {
    if (activeTab === 'all') return true;
    if (activeTab === 'draft') return rfq.status === 'draft';
    if (activeTab === 'published') return rfq.status === 'published';
    if (activeTab === 'in_review') return rfq.status === 'in_review';
    if (activeTab === 'completed') return rfq.status === 'completed';
    return true;
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
        return <FileText className="h-10 w-10 text-gray-500" />;
      case 'published':
        return <Clock className="h-10 w-10 text-blue-500" />;
      case 'in_review':
        return <AlertCircle className="h-10 w-10 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="h-10 w-10 text-green-500" />;
      default:
        return null;
    }
  };

  const getRfqStats = () => {
    const stats = {
      draft: 0,
      published: 0,
      in_review: 0,
      completed: 0,
    };

    userRfqs.forEach(rfq => {
      stats[rfq.status as keyof typeof stats]++;
    });

    return stats;
  };

  const stats = getRfqStats();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}</h1>
        <p className="mt-2 text-gray-600">Manage your RFQs and review vendor proposals.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Draft RFQs</h3>
          <p className="text-3xl font-bold text-gray-800">{stats.draft}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Published RFQs</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.published}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">In Review</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.in_review}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Completed</h3>
          <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/rfq/create"
            className="bg-[#0A66C2] hover:bg-[#004182] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Create New RFQ
          </Link>
          <Link
            to="/segments"
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Browse Segments
          </Link>
          <Link
            to="/rfq/manage"
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Manage All RFQs
          </Link>
        </div>
      </div>

      {/* RFQs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('all')}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'all'
                  ? 'border-[#0A66C2] text-[#0A66C2]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All RFQs
            </button>
            <button
              onClick={() => setActiveTab('draft')}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'draft'
                  ? 'border-[#0A66C2] text-[#0A66C2]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Drafts
            </button>
            <button
              onClick={() => setActiveTab('published')}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'published'
                  ? 'border-[#0A66C2] text-[#0A66C2]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Published
            </button>
            <button
              onClick={() => setActiveTab('in_review')}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'in_review'
                  ? 'border-[#0A66C2] text-[#0A66C2]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              In Review
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'completed'
                  ? 'border-[#0A66C2] text-[#0A66C2]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Completed
            </button>
          </nav>
        </div>

        <div className="p-6">
          {filteredRfqs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No RFQs found. Create your first RFQ to get started.</p>
              <Link
                to="/rfq/create"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0A66C2] hover:bg-[#004182]"
              >
                Create New RFQ
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredRfqs.map((rfq) => (
                <Link
                  to={`/rfq/${rfq.id}`}
                  key={rfq.id}
                  className="block bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start">
                    <div className="mr-4">
                      {getStatusIcon(rfq.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">{rfq.title}</h3>
                        {getStatusBadge(rfq.status)}
                      </div>
                      <p className="mt-1 text-gray-600 line-clamp-2">{rfq.description}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-4">
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Segment:</span> {rfq.segment}
                        </div>
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Vendors:</span> {rfq.companies.length}
                        </div>
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Responses:</span> {rfq.responses.length}
                        </div>
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Created:</span> {new Date(rfq.createdAt).toLocaleDateString()}
                        </div>
                        {rfq.status !== 'completed' && (
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">Deadline:</span> {new Date(rfq.deadline).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="ml-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;