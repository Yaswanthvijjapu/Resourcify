import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Resourcify</Link>
        {user && (
          <div className="flex space-x-4">
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/resources" className="hover:underline">Resources</Link>
            <Link to="/bookings" className="hover:underline">Bookings</Link>
            {['Admin', 'Manager'].includes(user.role) && (
              <Link to="/analytics" className="hover:underline">Analytics</Link>
            )}
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;