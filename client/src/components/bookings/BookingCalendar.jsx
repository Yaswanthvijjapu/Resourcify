import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState, useEffect } from 'react';
import { getBookings } from '../../services/api';

const localizer = momentLocalizer(moment);

const BookingCalendar = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookings();
        setBookings(
          response.data.map((booking) => ({
            id: booking._id,
            title: `${booking.resource.name} (${booking.status})`,
            start: new Date(booking.startTime),
            end: new Date(booking.endTime),
          }))
        );
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Booking Calendar</h2>
      <Calendar
        localizer={localizer}
        events={bookings}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        className="bg-white p-4 rounded shadow"
      />
    </div>
  );
};

export default BookingCalendar;