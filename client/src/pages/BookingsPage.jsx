import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import BookingCalendar from '../components/bookings/BookingCalendar';
import BookingList from '../components/bookings/BookingList';
import BookingForm from '../components/bookings/BookingForm';
import BookingApproval from '../components/bookings/BookingApproval';
import Footer from '../components/common/Footer';

const BookingsPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Bookings</h1>
            <BookingForm />
            <BookingCalendar />
            {['Admin', 'Manager'].includes(user.role) && <BookingApproval />}
            <BookingList />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingsPage;