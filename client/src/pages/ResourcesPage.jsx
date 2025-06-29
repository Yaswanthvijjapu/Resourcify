import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import ResourceList from '../components/resources/ResourceList';
import ResourceForm from '../components/resources/ResourceForm';
import Footer from '../components/common/Footer';

const ResourcesPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Resources</h1>
            {user.role === 'Admin' && <ResourceForm />}
            <ResourceList />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResourcesPage;