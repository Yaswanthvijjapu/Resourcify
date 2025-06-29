import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getResources, getBookings, getUtilization } from '../../services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [resources, setResources] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [utilization, setUtilization] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resResponse, bookResponse, utilResponse] = await Promise.all([
          getResources(),
          getBookings(),
          getUtilization({ startDate: '2025-06-29', endDate: '2025-06-30' }),
        ]);
        setResources(resResponse.data);
        setBookings(bookResponse.data);
        setUtilization(utilResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Resources</h2>
          <p>Total: {resources.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Bookings</h2>
          <p>Total: {bookings.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Utilization</h2>
          <BarChart width={300} height={200} data={utilization}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="resourceName" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="utilizationRate" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;