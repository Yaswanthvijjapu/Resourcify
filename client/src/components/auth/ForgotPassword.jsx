import { useState } from 'react';
import { forgotPassword } from '../../services/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setSuccess('Password reset link sent to your email');
      setEmail('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset link');
      setSuccess('');
    }
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;