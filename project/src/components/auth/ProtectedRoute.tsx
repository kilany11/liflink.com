import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  userType?: 'customer' | 'vendor';
}

const ProtectedRoute = ({ children, userType }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0A66C2]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (userType && user?.userType !== userType) {
    return <Navigate to={`/dashboard/${user?.userType}`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;