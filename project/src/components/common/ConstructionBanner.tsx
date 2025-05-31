import { AlertTriangle } from 'lucide-react';

const ConstructionBanner = () => {
  return (
    <div className="bg-amber-50 border-b border-amber-200">
      <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
          <p className="text-sm text-amber-800">
            This platform is currently under construction. You can try the features, but some functionality may be limited.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConstructionBanner;