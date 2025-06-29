import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { getUtilization } from '../../services/api';

const UtilizationChart = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUtilization({ startDate: '2025-06-29', endDate: '2025-06-30' });
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch utilization data');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Resource Utilization</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <BarChart width={600} height={300} data={data} className="bg-white p-4 rounded shadow">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="resourceName" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="utilizationRate" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default UtilizationChart;