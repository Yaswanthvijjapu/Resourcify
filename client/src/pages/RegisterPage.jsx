import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import Register from '../components/auth/Register';
import Footer from '../components/common/Footer';

const RegisterPage = () => {
  const { user } = useContext(AuthContext);

  if (user?.role !== 'Admin') return <div className="p-6">Access Denied</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <div className="p-6">
            <Register />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;