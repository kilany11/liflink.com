import { Link } from 'react-router-dom';
import { segments } from '../data/segments';

const SegmentsPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Technology Segments</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Browse through our technology segments and find the perfect solutions for your business needs.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {segments.map((segment) => (
          <Link
            to={`/segments/${segment.id}`}
            key={segment.id}
            className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#004182]/80 to-[#0A66C2]/70 z-10"></div>
            <img
              src={segment.imageUrl}
              alt={segment.name}
              className="w-full h-64 object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-white">
                  {React.createElement(segment.icon, { size: 24 })}
                </div>
                <h3 className="text-white text-2xl font-bold ml-3">{segment.name}</h3>
              </div>
              <p className="text-white/90 mb-4">{segment.description}</p>
              <div className="mt-auto">
                <span className="text-white/90 text-sm">
                  {segment.companies.length} Vendors Available
                </span>
                <div className="mt-2 inline-flex items-center text-white font-medium">
                  View Vendors
                  <svg
                    className="ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-16 bg-gray-50 rounded-lg p-8 shadow-sm">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Need assistance with your procurement?</h2>
          <p className="mt-2 text-gray-600">
            Our platform guides you through the entire process, from requirements to vendor selection.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Simplified RFQ Creation</h3>
            <p className="text-gray-600">
              Our intuitive RFQ creation wizard helps you specify your exact requirements with clarity.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Vendor Matching</h3>
            <p className="text-gray-600">
              We connect you with the right vendors who specialize in your specific requirements.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Solution Evaluation</h3>
            <p className="text-gray-600">
              Compare vendor responses and get AI-powered recommendations for the best solution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SegmentsPage;