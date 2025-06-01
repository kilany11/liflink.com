import React from 'react';
import { Building, Users, Shield, Globe, Play, FileText, Download } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Liflink</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your trusted partner in B2B technology procurement, connecting businesses with top-tier vendors across the GCC region.
        </p>
      </div>

      {/* Video Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Platform Overview</h2>
        <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl">
          <iframe
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            title="Liflink Platform Overview"
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Presentation Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Platform Presentation</h2>
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Download Our Presentation</h3>
              <p className="text-gray-600 mb-6">
                Learn more about Liflink's features, benefits, and how we're transforming B2B technology procurement in the GCC region.
              </p>
              <div className="space-y-4">
                <a
                  href="/presentation.pdf"
                  download
                  className="inline-flex items-center px-6 py-3 bg-[#0A66C2] text-white rounded-lg hover:bg-[#004182] transition-colors w-full justify-center"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download PDF Presentation
                </a>
                <a
                  href="/presentation.pptx"
                  download
                  className="inline-flex items-center px-6 py-3 border border-[#0A66C2] text-[#0A66C2] rounded-lg hover:bg-blue-50 transition-colors w-full justify-center"
                >
                  <FileText className="h-5 w-5 mr-2" />
                  Download PowerPoint
                </a>
              </div>
            </div>
            <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Presentation Preview"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg font-medium">Preview Presentation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600">
            To simplify and streamline the B2B technology procurement process, ensuring businesses find the perfect solutions while fostering transparency and efficiency in vendor selection.
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
          <p className="text-gray-600">
            To become the leading B2B technology procurement platform in the GCC region, driving digital transformation and innovation across industries.
          </p>
        </div>
      </div>

      {/* Key Features */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Why Choose Liflink?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <Building className="h-6 w-6 text-[#0A66C2]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Vendors</h3>
            <p className="text-gray-600">
              All vendors are thoroughly vetted to ensure quality and reliability.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <Users className="h-6 w-6 text-[#0A66C2]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Support</h3>
            <p className="text-gray-600">
              Dedicated team to guide you through the procurement process.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <Shield className="h-6 w-6 text-[#0A66C2]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Platform</h3>
            <p className="text-gray-600">
              Advanced security measures to protect your business information.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <Globe className="h-6 w-6 text-[#0A66C2]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Regional Focus</h3>
            <p className="text-gray-600">
              Specialized in serving the GCC region's unique business needs.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-[#004182] to-[#0A66C2] rounded-lg p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Procurement Process?</h2>
        <p className="text-xl mb-6">Join hundreds of businesses that trust Liflink for their technology needs.</p>
        <div className="flex justify-center space-x-4">
          <a href="/register" className="bg-white text-[#0A66C2] px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
            Get Started
          </a>
          <a href="/contact" className="border border-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;