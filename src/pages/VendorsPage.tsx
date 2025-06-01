import { Link } from 'react-router-dom';
import { segments } from '../data/segments';

const VendorsPage = () => {
  // Flatten all companies from all segments
  const allCompanies = segments.flatMap(segment => 
    segment.companies.map(company => ({
      ...company,
      segmentName: segment.name
    }))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Our Trusted Vendors</h1>
        <p className="mt-4 text-lg text-gray-600">
          Leading technology providers across various segments in the GCC region
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allCompanies.map((company) => (
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
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900">{company.name}</h3>
                  <p className="text-sm text-[#0A66C2]">{company.segmentName}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-2">{company.description}</p>
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
  );
};

export default VendorsPage;