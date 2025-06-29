import { useState, useEffect } from 'react';
import { getResources, getIdleTimes } from '../../services/api';

const IdleTimes = () => {
  const [resources, setResources] = useState([]);
  const [resourceId, setResourceId] = useState('');
  const [idleTimes, setIdleTimes] = useState([]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getIdleTimes({
        resourceId,
        startDate: '2025-06-29',
        endDate: '2025-06-30',
      });
      setIdleTimes(response.data.idleSlots);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch idle times');
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Idle Times</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Resource</label>
          <select
            value={resourceId}
            onChange={(e) => setResourceId(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            required
          >
            <option value="">Select a resource</option>
            {resources.map((resource) => (
              <option key={resource._id} value={resource._id}>
                {resource.name} ({resource.department})
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Fetch Idle Times
        </button>
      </form>
      {idleTimes.length > 0 && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Idle Slots</h3>
          <ul>
            {idleTimes.map((slot, index) => (
              <li key={index} className="py-2">
                {new Date(slot.startTime).toLocaleString()} -{' '}
                {new Date(slot.endTime).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IdleTimes;