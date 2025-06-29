import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import ResourceList from '../components/resources/ResourceList';
import ResourceForm from '../components/resources/ResourceForm';
import Footer from '../components/common/Footer';

const ResourcesPage = () => {
  const { user } = useContext(AuthContext);
  const [filters, setFilters] = useState({
    type: '',
    capacity: '',
    availability: '',
    features: '',
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Resources</h1>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Filter Resources</h2>
              <form onSubmit={handleFilterSubmit} className="bg-white p-4 rounded shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Resource Type</label>
                    <select
                      name="type"
                      value={filters.type}
                      onChange={handleFilterChange}
                      className="mt-1 p-2 w-full border rounded"
                    >
                      <option value="">All Types</option>
                      <option value="Meeting Room">Meeting Room</option>
                      <option value="Lab Equipment">Lab Equipment</option>
                      <option value="Vehicle">Vehicle</option>
                      <option value="Workstation/Desk">Workstation/Desk</option>
                      <option value="Training Room">Training Room</option>
                      <option value="Sports Facility">Sports Facility</option>
                      <option value="Auditorium/Event Hall">Auditorium/Event Hall</option>
                      <option value="Storage Space">Storage Space</option>
                      <option value="Shared Equipment">Shared Equipment</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Minimum Capacity</label>
                    <input
                      type="number"
                      name="capacity"
                      value={filters.capacity}
                      onChange={handleFilterChange}
                      className="mt-1 p-2 w-full border rounded"
                      placeholder="e.g., 10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Availability</label>
                    <input
                      type="text"
                      name="availability"
                      value={filters.availability}
                      onChange={handleFilterChange}
                      className="mt-1 p-2 w-full border rounded"
                      placeholder="e.g., 9am-6pm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Features</label>
                    <input
                      type="text"
                      name="features"
                      value={filters.features}
                      onChange={handleFilterChange}
                      className="mt-1 p-2 w-full border rounded"
                      placeholder="e.g., Projector,Whiteboard"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  Apply Filters
                </button>
              </form>
            </div>
            {user.role === 'Admin' && <ResourceForm />}
            <ResourceList filters={filters} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResourcesPage;