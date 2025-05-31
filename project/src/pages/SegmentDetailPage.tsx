import { useParams, Link } from 'react-router-dom';
import { segments } from '../data/segments';

const SegmentDetailPage = () => {
  const { segmentId } = useParams<{ segmentId: string }>();
  const segment = segments.find((s) => s.id === segmentId);

  if (!segment) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Segment not found</h1>
        <p className="mt-4 text-lg text-gray-600">
          The segment you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/segments"
          className="mt-8 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#0A66C2] hover:bg-[#004182]"
        >
          Back to Segments
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero section */}
      <div className="relative rounded-xl overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-[#004182]/80 to-[#0A66C2]/70 z-10"></div>
        <img
          src={segment.imageUrl}
          alt={segment.name}
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center p-6 md:p-12">
          <div className="flex items-center mb-4">
            <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-white">
              {React.createElement(segment.icon, { size: 24 })}
            </div>
            <h1 className="text-white text-3xl md:text-4xl font-bold ml-3">{segment.name}</h1>
          </div>
          <p className="text-white/90 text-lg max-w-3xl">{segment.description}</p>
        </div>
      </div>

      {/* Companies section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Vendors in this segment</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {segment.companies.map((company) => (
            <Link
              to={`/companies/${company.id}`}
              key={company.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={company.logoUrl}
                    alt={company.name}
                    className="h-12 w-12 object-contain rounded"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 ml-3">{company.name}</h3>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">{company.description}</p>
                <div className="flex flex-wrap gap-2">
                  {company.services.slice(0, 3).map((service, index) => (
                    <span key={index} className="bg-blue-50 text-[#0A66C2] text-xs px-2 py-1 rounded">
                      {service}
                    </span>
                  ))}
                  {company.services.length > 3 && (
                    <span className="bg-blue-50 text-[#0A66C2] text-xs px-2 py-1 rounded">
                      +{company.services.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* RFQ CTA section */}
      <div className="mt-12 bg-gradient-to-r from-[#004182] to-[#0A66C2] rounded-lg p-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Ready to get started?</h2>
            <p className="text-white/90 max-w-xl">
              Create an RFQ to receive detailed proposals from top vendors in this segment.
            </p>
          </div>
          <Link
            to="/rfq/create"
            className="bg-white text-[#0A66C2] hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors"
          >
            Create RFQ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SegmentDetailPage;