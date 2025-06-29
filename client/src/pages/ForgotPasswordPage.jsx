import ForgotPassword from '../components/auth/ForgotPassword';
import Footer from '../components/common/Footer';

const ForgotPasswordPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-1">
        <ForgotPassword />
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;