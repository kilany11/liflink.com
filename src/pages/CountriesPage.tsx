import { Globe, MapPin, Building, Users } from 'lucide-react';

const countries = [
  {
    name: 'Kuwait',
    imageUrl: 'https://images.pexels.com/photos/427679/pexels-photo-427679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A leading market for technology solutions in the Gulf region',
    stats: { vendors: 25, clients: 150, projects: 200 }
  },
  {
    name: 'UAE',
    imageUrl: 'https://images.pexels.com/photos/618079/pexels-photo-618079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Innovation hub with a dynamic technology ecosystem',
    stats: { vendors: 40, clients: 280, projects: 350 }
  },
  {
    name: 'Qatar',
    imageUrl: 'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Rapidly growing market for advanced technology solutions',
    stats: { vendors: 20, clients: 120, projects: 180 }
  },
  {
    name: 'Oman',
    imageUrl: 'https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Emerging technology market with strong growth potential',
    stats: { vendors: 15, clients: 90, projects: 120 }
  },
  {
    name: 'KSA',
    imageUrl: 'https://images.pexels.com/photos/2819082/pexels-photo-2819082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Largest technology market in the GCC region',
    stats: { vendors: 45, clients: 300, projects: 400 }
  }
];

const CountriesPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Our Regional Presence</h1>
        <p className="mt-4 text-lg text-gray-600">
          Serving businesses across the GCC region with local expertise and global standards
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {countries.map((country) => (
          <div key={country.name} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <img
                src={country.imageUrl}
                alt={country.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <h2 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                {country.name}
              </h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6">{country.description}</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-[#0A66C2]">{country.stats.vendors}</div>
                  <div className="text-sm text-gray-500">Vendors</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#0A66C2]">{country.stats.clients}</div>
                  <div className="text-sm text-gray-500">Clients</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#0A66C2]">{country.stats.projects}</div>
                  <div className="text-sm text-gray-500">Projects</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Choose Our Regional Network?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <Globe className="h-6 w-6 text-[#0A66C2]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Regional Coverage</h3>
              <p className="text-gray-600">Comprehensive coverage across all GCC countries</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <MapPin className="h-6 w-6 text-[#0A66C2]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Local Expertise</h3>
              <p className="text-gray-600">Deep understanding of local markets and regulations</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <Building className="h-6 w-6 text-[#0A66C2]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Strong Partnerships</h3>
              <p className="text-gray-600">Established relationships with leading vendors</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <Users className="h-6 w-6 text-[#0A66C2]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Local Support</h3>
              <p className="text-gray-600">Dedicated support teams in each country</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountriesPage;