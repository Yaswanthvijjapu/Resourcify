import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { createResource } from '../../services/api';

const ResourceForm = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    department: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createResource(formData);
      setSuccess('Resource created successfully');
      setFormData({ name: '', description: '', department: '' });
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create resource');
      setSuccess('');
    }
  };

  if (user.role !== 'Admin') return null;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Create Resource</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Create Resource
        </button>
      </form>
    </div>
  );
};

export default ResourceForm;