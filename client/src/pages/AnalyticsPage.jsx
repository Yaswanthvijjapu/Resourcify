import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import UtilizationChart from '../components/analytics/UtilizationChart';
import MostUsedResources from '../components/analytics/MostUsedResources';
import IdleTimes from '../components/analytics/IdleTimes';
import Footer from '../components/common/Footer';

const AnalyticsPage = () => {
  const { user } = useContext(AuthContext);

  if (!['Admin', 'Manager'].includes(user.role)) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Analytics</h1>
            <UtilizationChart />
            <MostUsedResources />
            <IdleTimes />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AnalyticsPage;