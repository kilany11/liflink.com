import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { RfqProvider } from './context/RfqContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ConstructionBanner from './components/common/ConstructionBanner';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CustomerDashboard from './pages/customer/Dashboard';
import VendorDashboard from './pages/vendor/Dashboard';
import SegmentsPage from './pages/SegmentsPage';
import SegmentDetailPage from './pages/SegmentDetailPage';
import CompanyDetailPage from './pages/CompanyDetailPage';
import CreateRfqPage from './pages/customer/CreateRfqPage';
import ManageRfqPage from './pages/customer/ManageRfqPage';
import RfqDetailPage from './pages/RfqDetailPage';
import RespondRfqPage from './pages/vendor/RespondRfqPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <RfqProvider>
        <Router>
          <ConstructionBanner />
          <Navbar />
          <div className="min-h-screen pt-16 pb-24 bg-gray-50">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route 
                path="/dashboard/customer" 
                element={
                  <ProtectedRoute userType="customer">
                    <CustomerDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/vendor" 
                element={
                  <ProtectedRoute userType="vendor">
                    <VendorDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="/segments" element={<SegmentsPage />} />
              <Route path="/segments/:segmentId" element={<SegmentDetailPage />} />
              <Route path="/companies/:companyId" element={<CompanyDetailPage />} />
              <Route 
                path="/rfq/create" 
                element={
                  <ProtectedRoute userType="customer">
                    <CreateRfqPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/rfq/manage" 
                element={
                  <ProtectedRoute userType="customer">
                    <ManageRfqPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="/rfq/:rfqId" element={<RfqDetailPage />} />
              <Route 
                path="/rfq/:rfqId/respond" 
                element={
                  <ProtectedRoute userType="vendor">
                    <RespondRfqPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Footer />
          <Toaster position="top-right" />
        </Router>
      </RfqProvider>
    </AuthProvider>
  );
}

export default App;