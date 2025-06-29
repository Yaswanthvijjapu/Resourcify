import { useState, useEffect } from 'react';
import { getMostUsed } from '../../services/api';

const MostUsedResources = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMostUsed({ startDate: '2025-06-29', endDate: '2025-06-30' });
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch most-used resources');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Most Used Resources</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="bg-white p-4 rounded shadow">
        {data.length === 0 ? (
          <p>No data available</p>
        ) : (
          <ul>
            {data.map((item) => (
              <li key={item.resourceId} className="py-2">
                {item.resourceName} ({item.department}) - {item.bookingCount} bookings
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MostUsedResources;