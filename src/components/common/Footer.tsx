import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-[#004182] text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo className="text-white" />
            <p className="text-gray-300 text-sm">
              The B2B technology procurement platform that helps businesses make informed decisions about technology vendors.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Segments</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/segments/cloud-services" className="hover:text-white transition-colors">Cloud Services</Link></li>
              <li><Link to="/segments/it-infrastructure" className="hover:text-white transition-colors">IT Infrastructure</Link></li>
              <li><Link to="/segments/cybersecurity" className="hover:text-white transition-colors">Cybersecurity</Link></li>
              <li><Link to="/segments/data-center" className="hover:text-white transition-colors">Data Center</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">RFQ Templates</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Vendor Directory</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">© {new Date().getFullYear()} Liflink. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer