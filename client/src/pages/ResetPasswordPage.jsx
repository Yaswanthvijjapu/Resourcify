import { useParams } from 'react-router-dom';
import ResetPassword from '../components/auth/ResetPassword';
import Footer from '../components/common/Footer';

const ResetPasswordPage = () => {
  const { token } = useParams();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-1">
        <ResetPassword token={token} />
      </div>
      <Footer />
    </div>
  );
};

export default ResetPasswordPage;