import { segments } from '../data/segments';
import { Link } from 'react-router-dom';

const SolutionsPage = () => {
  // Get unique services across all companies
  const allServices = Array.from(
    new Set(
      segments.flatMap(segment =>
        segment.companies.flatMap(company => company.services)
      )
    )
  ).sort();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Our Solutions</h1>
        <p className="mt-4 text-lg text-gray-600">
          Comprehensive technology solutions to meet your business needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allServices.map((service, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{service}</h3>
            <div className="space-y-4">
              <p className="text-gray-600">
                Providers offering {service} solutions:
              </p>
              <div className="flex flex-wrap gap-2">
                {segments.flatMap(segment =>
                  segment.companies
                    .filter(company => company.services.includes(service))
                    .map(company => (
                      <Link
                        key={company.id}
                        to={`/companies/${company.id}`}
                        className="inline-flex items-center bg-blue-50 text-[#0A66C2] text-sm px-3 py-1 rounded-full hover:bg-blue-100"
                      >
                        {company.name}
                      </Link>
                    ))
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolutionsPage;