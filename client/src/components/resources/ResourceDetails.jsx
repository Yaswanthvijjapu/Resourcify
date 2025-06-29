import { useParams } from 'react-router-dom';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';

const ResourceDetails = () => {
  const { id } = useParams();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Resource Details</h2>
            <p>Resource ID: {id}</p>
            <p>Details page to be implemented.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResourceDetails;