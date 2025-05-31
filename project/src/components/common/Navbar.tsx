import { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Logo className="flex-shrink-0" />
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              <Link 
                to="/segments"
                className={`text-gray-700 hover:text-[#0A66C2] px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/segments' ? 'text-[#0A66C2] font-semibold' : ''
                }`}
              >
                Service Segments
              </Link>
              {isAuthenticated && user?.userType === 'customer' && (
                <>
                  <Link 
                    to="/rfq/create"
                    className={`text-gray-700 hover:text-[#0A66C2] px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === '/rfq/create' ? 'text-[#0A66C2] font-semibold' : ''
                    }`}
                  >
                    Create RFQ
                  </Link>
                  <Link 
                    to="/rfq/manage"
                    className={`text-gray-700 hover:text-[#0A66C2] px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === '/rfq/manage' ? 'text-[#0A66C2] font-semibold' : ''
                    }`}
                  >
                    Manage RFQs
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="hidden md:flex md:items-center">
            {isAuthenticated ? (
              <div className="relative ml-3">
                <div>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A66C2]"
                  >
                    <div className="h-8 w-8 rounded-full bg-[#0A66C2] flex items-center justify-center text-white">
                      {user?.name.charAt(0)}
                    </div>
                    <span className="ml-2 text-gray-700">{user?.name}</span>
                    <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
                  </button>
                </div>
                {userMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <Link
                      to={`/dashboard/${user?.userType}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </div>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-[#0A66C2] px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-[#0A66C2] hover:bg-[#004182] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#0A66C2] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0A66C2]"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          <Link
            to="/segments"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#0A66C2] hover:bg-gray-50"
            onClick={() => setIsOpen(false)}
          >
            Service Segments
          </Link>
          {isAuthenticated && user?.userType === 'customer' && (
            <>
              <Link
                to="/rfq/create"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#0A66C2] hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Create RFQ
              </Link>
              <Link
                to="/rfq/manage"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#0A66C2] hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Manage RFQs
              </Link>
            </>
          )}
          {isAuthenticated ? (
            <>
              <Link
                to={`/dashboard/${user?.userType}`}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#0A66C2] hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#0A66C2] hover:bg-gray-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#0A66C2] hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 rounded-md text-base font-medium bg-[#0A66C2] text-white hover:bg-[#004182] px-3 py-2 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar