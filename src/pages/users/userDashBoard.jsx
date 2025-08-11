import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Custom Card Component with Tailwind CSS for gradients and styling
const MetricCard = ({ title, value, gradientClass }) => (
  <div
    className={`p-6 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105 text-blue-800 ${gradientClass}`}
  >
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="mt-2 text-4xl font-bold">{value}</p>
  </div>
);

const UserDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hardcoded user ID and API endpoint
  const userId = 8;
  const apiUrl = `http://localhost:8000/user-dashboard/user/${userId}`;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setDashboardData(response.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to fetch dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-600">Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  // Handle case where data is null after loading (unlikely but good practice)
  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-600">No data available.</p>
      </div>
    );
  }
  
  const { user_dashboard, company_dashboard } = dashboardData;
  const { user_file_metrics, recent_files } = user_dashboard;


  return (
    <div className="min-h-screen w-full bg-gray-100 p-8">
      <div className="w-full mx-auto">
        <h4 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome to your Dashboard, 
        </h4>

        {/* My Files Section */}
        <h2 className="text-md font-bold text-gray-700 mb-4">My Files</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Files"
            value={user_file_metrics.total_my_files}
            gradientClass="bg-white border border-indigo-500 text-indigo-500"
          />
          <MetricCard
            title="Completed"
            value={user_file_metrics.my_completed_files}
            gradientClass="bg-white border border-green-700 text-green-700"
          />
          <MetricCard
            title="Pending"
            value={user_file_metrics.my_pending_files}
            gradientClass="bg-white border border-amber-400 text-amber-400"
          />
          <MetricCard
            title="Failed"
            value={user_file_metrics.my_failed_files}
            gradientClass="bg-white border border-red-600 text-red-600"
          />
        </div>

      {/* Company Files Section */}
       
        {/* Recent Files Section */}
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-bold text-gray-700 mb-4">Recent Files</h3>
          <ul className="divide-y divide-gray-200">
            {recent_files.map((file) => (
              <li key={file.id} className="py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-medium text-gray-900">{file.filename}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Status: <span className="font-semibold capitalize">{file.status}</span> | Uploaded On: {new Date(file.createdon).toLocaleString()}
                    </p>
                  </div>
                  <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full capitalize">
                    {file.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;