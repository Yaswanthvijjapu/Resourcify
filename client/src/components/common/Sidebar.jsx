import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4 md:block hidden">
      <h2 className="text-xl font-bold mb-6">Resourcify</h2>
      <nav>
        <Link to="/dashboard" className="block py-2 hover:bg-gray-700">Dashboard</Link>
        <Link to="/resources" className="block py-2 hover:bg-gray-700">Resources</Link>
        <Link to="/bookings" className="block py-2 hover:bg-gray-700">Bookings</Link>
        {['Admin', 'Manager'].includes(user?.role) && (
          <Link to="/analytics" className="block py-2 hover:bg-gray-700">Analytics</Link>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;