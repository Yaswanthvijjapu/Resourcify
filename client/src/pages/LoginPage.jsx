import Login from '../components/auth/Login';
import Footer from '../components/common/Footer';

const LoginPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-1">
        <Login />
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;