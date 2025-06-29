import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getBookings } from '../../services/api';

const BookingList = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookings();
        setBookings(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch bookings');
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Booking List</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Resource</th>
              <th className="text-left p-2">Start Time</th>
              <th className="text-left p-2">End Time</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-b">
                <td className="p-2">{booking.resource.name}</td>
                <td className="p-2">{new Date(booking.startTime).toLocaleString()}</td>
                <td className="p-2">{new Date(booking.endTime).toLocaleString()}</td>
                <td className="p-2">{booking.status}</td>
                <td className="p-2">{booking.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingList;