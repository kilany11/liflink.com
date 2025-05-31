import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { Upload } from 'lucide-react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState<'customer' | 'vendor'>('customer');
  const [company, setCompany] = useState('');
  const [documents, setDocuments] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    onDrop: (acceptedFiles) => {
      setDocuments(prev => [...prev, ...acceptedFiles]);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (userType === 'vendor' && documents.length === 0) {
      toast.error('Please upload required documents');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register({
        name,
        email,
        password,
        userType,
        company: userType === 'vendor' ? company : undefined,
        documents
      });
      
      toast.success('Account created successfully! Your free trial has started.');
      navigate(`/dashboard/${userType}`);
    } catch (error) {
      toast.error('Error creating account');
    } finally {
      setIsLoading(false);
    }
  };

  const removeDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-[#0A66C2] hover:text-[#004182]">
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#0A66C2] focus:border-[#0A66C2] sm:text-sm"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#0A66C2] focus:border-[#0A66C2] sm:text-sm"
                placeholder="john@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#0A66C2] focus:border-[#0A66C2] sm:text-sm"
                placeholder="********"
              />
            </div>
            
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#0A66C2] focus:border-[#0A66C2] sm:text-sm"
                placeholder="********"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Account Type <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <div 
                  className={`border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium cursor-pointer ${
                    userType === 'customer'
                      ? 'bg-[#0A66C2] text-white border-[#0A66C2]'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setUserType('customer')}
                >
                  Customer
                </div>
                <div 
                  className={`border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium cursor-pointer ${
                    userType === 'vendor'
                      ? 'bg-[#0A66C2] text-white border-[#0A66C2]'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setUserType('vendor')}
                >
                  Vendor
                </div>
              </div>
            </div>
            
            {userType === 'vendor' && (
              <>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#0A66C2] focus:border-[#0A66C2] sm:text-sm"
                    placeholder="Acme Corp"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Official Documents <span className="text-red-500">*</span>
                  </label>
                  <div 
                    {...getRootProps()} 
                    className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-[#0A66C2] transition-colors cursor-pointer"
                  >
                    <input {...getInputProps()} />
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-600">
                        Drag & drop files here, or click to select files
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, PNG, JPG up to 10MB each
                      </p>
                    </div>
                  </div>
                  
                  {documents.length > 0 && (
                    <ul className="mt-3 divide-y divide-gray-200">
                      {documents.map((file, index) => (
                        <li key={index} className="py-3 flex justify-between items-center">
                          <div className="flex items-center">
                            <Upload className="h-5 w-5 text-gray-400" />
                            <span className="ml-2 text-sm text-gray-900">{file.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeDocument(index)}
                            className="text-sm text-red-600 hover:text-red-900"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#0A66C2] hover:bg-[#004182] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A66C2] disabled:bg-[#0A66C2]/70"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                    <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-6">
          <div className="rounded-md bg-blue-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <Upload className="h-5 w-5 text-blue-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Free Trial Period</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    Start with a 30-day free trial. After the trial period, continue with our yearly subscription plan to access all features.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <p className="mt-4 text-center text-xs text-gray-600">
            By signing up, you agree to our{' '}
            <a href="#" className="font-medium text-[#0A66C2] hover:text-[#004182]">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="font-medium text-[#0A66C2] hover:text-[#004182]">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;