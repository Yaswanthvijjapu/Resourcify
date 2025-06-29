import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import ManagerDashboard from '../components/dashboard/ManagerDashboard';
import UserDashboard from '../components/dashboard/UserDashboard';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import Footer from '../components/common/Footer';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <div className="p-6">
            {user.role === 'Admin' && <AdminDashboard />}
            {user.role === 'Manager' && <ManagerDashboard />}
            {user.role === 'User' && <UserDashboard />}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;