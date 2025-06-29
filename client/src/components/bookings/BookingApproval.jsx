import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getBookings, updateBookingStatus } from '../../services/api';

const BookingApproval = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookings();
        setBookings(response.data.filter((b) => b.status === 'pending'));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch bookings');
      }
    };
    fetchBookings();
  }, []);

  const handleStatusUpdate = async (bookingId, status) => {
    try {
      await updateBookingStatus(bookingId, status);
      setBookings(bookings.filter((b) => b._id !== bookingId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update booking');
    }
  };

  if (!['Admin', 'Manager'].includes(user.role)) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Pending Approvals</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="bg-white p-4 rounded shadow">
        {bookings.length === 0 ? (
          <p>No pending bookings</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Resource</th>
                <th className="text-left p-2">Start Time</th>
                <th className="text-left p-2">End Time</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-b">
                  <td className="p-2">{booking.resource.name}</td>
                  <td className="p-2">{new Date(booking.startTime).toLocaleString()}</td>
                  <td className="p-2">{new Date(booking.endTime).toLocaleString()}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleStatusUpdate(booking._id, 'approved')}
                      className="bg-green-500 text-white p-1 rounded mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(booking._id, 'rejected')}
                      className="bg-red-500 text-white p-1 rounded"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BookingApproval;