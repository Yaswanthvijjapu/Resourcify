import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getResources, createBooking } from '../../services/api';

const BookingForm = () => {
  const { user } = useContext(AuthContext);
  const [resources, setResources] = useState([]);
  const [formData, setFormData] = useState({
    resourceId: '',
    startTime: '',
    endTime: '',
    notes: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBooking(formData);
      setSuccess('Booking created successfully');
      setFormData({ resourceId: '', startTime: '', endTime: '', notes: '' });
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create booking');
      setSuccess('');
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Create Booking</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Resource</label>
          <select
            name="resourceId"
            value={formData.resourceId}
            onChange={handleChange}
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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Start Time</label>
          <input
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">End Time</label>
          <input
            type="datetime-local"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Create Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;