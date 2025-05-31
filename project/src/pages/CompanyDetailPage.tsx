import { useParams, Link } from 'react-router-dom';
import { segments } from '../data/segments';

const CompanyDetailPage = () => {
  const { companyId } = useParams<{ companyId: string }>();
  
  // Find the company across all segments
  const company = segments
    .flatMap((segment) => segment.companies)
    .find((company) => company.id === companyId);
  
  // Find the segment that contains this company
  const segment = segments.find((segment) => 
    segment.companies.some((c) => c.id === companyId)
  );

  if (!company || !segment) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Company not found</h1>
        <p className="mt-4 text-lg text-gray-600">
          The company you're looking for doesn't exist or has been removed.
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
      <div className="mb-6">
        <Link
          to={`/segments/${segment.id}`}
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
          Back to {segment.name}
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <img
                src={company.logoUrl}
                alt={company.name}
                className="h-16 w-16 object-contain rounded"
              />
              <div className="ml-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{company.name}</h1>
                <p className="text-[#0A66C2] font-medium">{segment.name} Provider</p>
              </div>
            </div>
            <Link
              to="/rfq/create"
              className="bg-[#0A66C2] hover:bg-[#004182] text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Include in RFQ
            </Link>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About {company.name}</h2>
            <p className="text-gray-600">{company.description}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {company.services.map((service, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md">
                  <span className="text-gray-800 font-medium">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Other companies in {segment.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {segment.companies
            .filter((c) => c.id !== company.id)
            .map((otherCompany) => (
              <Link
                to={`/companies/${otherCompany.id}`}
                key={otherCompany.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={otherCompany.logoUrl}
                      alt={otherCompany.name}
                      className="h-12 w-12 object-contain rounded"
                    />
                    <h3 className="text-lg font-semibold text-gray-900 ml-3">{otherCompany.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{otherCompany.description}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailPage;