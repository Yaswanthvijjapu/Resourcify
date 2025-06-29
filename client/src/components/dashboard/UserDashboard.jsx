import { useState, useEffect } from 'react';
import { getBookings } from '../../services/api';

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookings();
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold">My Bookings</h2>
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id} className="py-2">
              {booking.resource.name} - {new Date(booking.startTime).toLocaleString()} to{' '}
              {new Date(booking.endTime).toLocaleString()} ({booking.status})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;