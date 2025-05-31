import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { segments } from '../data/segments';
import { ChevronRight, Search, CheckCircle, Briefcase, FileText, BarChart4, Server, Cloud, Shield, Building2, Database, Network, Globe } from 'lucide-react';

const HomePage = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#004182] to-[#0A66C2] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Simplify Your Technology Procurement
              </h1>
              <p className="text-lg md:text-xl text-gray-200">
                Connect with top technology vendors, create professional RFQs, and get the best solutions for your business needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <Link
                    to={`/dashboard/${user?.userType}`}
                    className="bg-white text-[#0A66C2] hover:bg-gray-100 px-6 py-3 rounded-md font-medium text-center transition-colors"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="bg-white text-[#0A66C2] hover:bg-gray-100 px-6 py-3 rounded-md font-medium text-center transition-colors"
                    >
                      Get Started
                    </Link>
                    <Link
                      to="/login"
                      className="border border-white bg-transparent hover:bg-white/10 px-6 py-3 rounded-md font-medium text-center transition-colors"
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="relative hidden lg:block">
              <img
                src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Business team working together"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-800 font-medium">Trusted by 500+ companies</p>
                    <p className="text-gray-500 text-sm">Secure & Reliable</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave effect */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path
              fill="#f9fafb"
              fillOpacity="1"
              d="M0,128L48,138.7C96,149,192,171,288,170.7C384,171,480,149,576,149.3C672,149,768,171,864,181.3C960,192,1056,192,1152,170.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* List of Service Providers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Service Providers</h2>
            <p className="mt-4 text-lg text-gray-600">
              Connect with leading technology service providers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <Cloud className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Cloud Providers</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Amazon Web Services
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Microsoft Azure
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Google Cloud Platform
                </li>
              </ul>
              <Link
                to="/segments/cloud-services"
                className="text-[#0A66C2] hover:text-[#004182] flex items-center font-medium"
              >
                View All Providers <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <Network className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Network Providers</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Cisco Systems
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Juniper Networks
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Arista Networks
                </li>
              </ul>
              <Link
                to="/segments/networking"
                className="text-[#0A66C2] hover:text-[#004182] flex items-center font-medium"
              >
                View All Providers <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Storage Providers</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Dell EMC
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  NetApp
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Pure Storage
                </li>
              </ul>
              <Link
                to="/segments/storage"
                className="text-[#0A66C2] hover:text-[#004182] flex items-center font-medium"
              >
                View All Providers <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Providers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Solutions Providers</h2>
            <p className="mt-4 text-lg text-gray-600">
              Expert providers of comprehensive business solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900">Security Solutions</h3>
                  <p className="text-gray-600">Enterprise security providers</p>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Palo Alto Networks
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Fortinet
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  CrowdStrike
                </li>
              </ul>
              <Link
                to="/segments/security"
                className="text-[#0A66C2] hover:text-[#004182] flex items-center font-medium"
              >
                View Solutions <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900">Digital Solutions</h3>
                  <p className="text-gray-600">Digital transformation experts</p>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Accenture
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Deloitte Digital
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  IBM Consulting
                </li>
              </ul>
              <Link
                to="/segments/digital"
                className="text-[#0A66C2] hover:text-[#004182] flex items-center font-medium"
              >
                View Solutions <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <Server className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900">Infrastructure Solutions</h3>
                  <p className="text-gray-600">Complete IT infrastructure</p>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  HPE
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Dell Technologies
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Lenovo
                </li>
              </ul>
              <Link
                to="/segments/infrastructure"
                className="text-[#0A66C2] hover:text-[#004182] flex items-center font-medium"
              >
                View Solutions <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Segment Solutions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Segment Solutions</h2>
            <p className="mt-4 text-lg text-gray-600">
              Industry-specific technology solutions for your business
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative group overflow-hidden rounded-lg shadow-md">
              <div className="absolute inset-0 bg-gradient-to-r from-[#004182]/80 to-[#0A66C2]/70 z-10"></div>
              <img
                src="https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Financial Services"
                className="w-full h-64 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-center p-6">
                <h3 className="text-white text-2xl font-bold mb-2">Financial Services</h3>
                <p className="text-white/90 mb-4">
                  Secure and compliant technology solutions for financial institutions
                </p>
                <Link
                  to="/segments/financial"
                  className="inline-flex items-center text-white font-medium"
                >
                  Explore Solutions <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-lg shadow-md">
              <div className="absolute inset-0 bg-gradient-to-r from-[#004182]/80 to-[#0A66C2]/70 z-10"></div>
              <img
                src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Healthcare"
                className="w-full h-64 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-center p-6">
                <h3 className="text-white text-2xl font-bold mb-2">Healthcare</h3>
                <p className="text-white/90 mb-4">
                  HIPAA-compliant solutions for healthcare providers
                </p>
                <Link
                  to="/segments/healthcare"
                  className="inline-flex items-center text-white font-medium"
                >
                  Explore Solutions <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform simplifies the technology procurement process, saving you time and ensuring you get the best solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-[#0A66C2] mb-6">
                <Briefcase className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Choose Provider</h3>
              <p className="text-gray-600">
                Browse through our verified providers and select the ones that match your needs.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-[#0A66C2] mb-6">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Create RFQ</h3>
              <p className="text-gray-600">
                Use our wizard to create a detailed RFQ that clearly outlines your requirements.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-[#0A66C2] mb-6">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Get Proposals</h3>
              <p className="text-gray-600">
                Providers submit detailed proposals with solutions tailored to your specifications.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-[#0A66C2] mb-6">
                <BarChart4 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">4. Compare & Choose</h3>
              <p className="text-gray-600">
                Review proposals, compare prices, and select the provider that best meets your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-[#004182] to-[#0A66C2] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to streamline your procurement process?</h2>
          <p className="text-lg text-gray-200 mb-8 max-w-3xl mx-auto">
            Join hundreds of businesses that have simplified their technology procurement and saved time and money.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="bg-white text-[#0A66C2] hover:bg-gray-100 px-8 py-3 rounded-md font-medium transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              to="/segments"
              className="border border-white bg-transparent hover:bg-white/10 px-8 py-3 rounded-md font-medium transition-colors"
            >
              Explore Providers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;