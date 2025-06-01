import { useState } from 'react';
import { Play, Pause, ChevronRight, Star, Shield, Users, Globe } from 'lucide-react';

const PortfolioPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const features = [
    {
      title: "AI-Powered RFQ System",
      description: "Intelligent system that analyzes requirements and matches with the best vendors",
      image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Vendor Management",
      description: "Comprehensive platform for vendors to showcase their services and capabilities",
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Document Management",
      description: "Secure handling of business documents and proposals",
      image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  const stats = [
    { number: "500+", label: "Registered Companies" },
    { number: "1000+", label: "Completed RFQs" },
    { number: "5", label: "GCC Countries" },
    { number: "98%", label: "Client Satisfaction" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Video */}
      <section className="relative h-[600px] overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        >
          <source src="YOUR_VIDEO_URL" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-6">Liflink Platform</h1>
            <p className="text-xl mb-8 max-w-2xl">
              Revolutionizing B2B technology procurement in the GCC region with AI-powered solutions
            </p>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center px-6 py-3 bg-white text-[#0A66C2] rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-5 w-5 mr-2" />
                  Pause Video
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 mr-2" />
                  Watch Demo
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-[#0A66C2]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-gray-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Liflink?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Star className="h-8 w-8 text-[#0A66C2]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
              <p className="text-gray-600">
                All vendors are thoroughly vetted to ensure high-quality service delivery
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Shield className="h-8 w-8 text-[#0A66C2]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
              <p className="text-gray-600">
                Enterprise-grade security for all your business transactions
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Globe className="h-8 w-8 text-[#0A66C2]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Regional Expertise</h3>
              <p className="text-gray-600">
                Deep understanding of GCC market requirements and regulations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Procurement?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses that trust Liflink for their technology procurement needs
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-3 bg-[#0A66C2] text-white rounded-md font-medium hover:bg-[#004182] transition-colors">
              Get Started
            </button>
            <button className="px-6 py-3 border border-white text-white rounded-md font-medium hover:bg-white hover:text-gray-900 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;