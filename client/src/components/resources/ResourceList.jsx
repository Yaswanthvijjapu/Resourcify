import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getResources } from '../../services/api';

const ResourceList = () => {
  const { user } = useContext(AuthContext);
  const [resources, setResources] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await getResources();
        setResources(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch resources');
      }
    };
    fetchResources();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Available Resources</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource) => (
          <div key={resource._id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold">{resource.name}</h3>
            <p>{resource.description}</p>
            <p className="text-sm text-gray-600">Department: {resource.department}</p>
            <Link
              to={`/resources/${resource._id}`}
              className="text-blue-500 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceList;