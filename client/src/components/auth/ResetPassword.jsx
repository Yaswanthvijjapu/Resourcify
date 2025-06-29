import { useState } from 'react';
import { resetPassword } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

const ResetPassword = ({ token }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(token, password);
      setSuccess('Password reset successfully');
      setPassword('');
      setError('');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
      setSuccess('');
    }
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;