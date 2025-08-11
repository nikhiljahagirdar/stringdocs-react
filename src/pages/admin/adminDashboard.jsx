import React,{ useState } from 'react';
import { 
  FaUsers, FaFilePdf, FaChartBar, FaCog, 
  FaBell, FaSearch, FaUserShield, FaServer,
  FaMoneyBillWave, FaDatabase, FaShieldAlt
} from 'react-icons/fa';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Stats data
  const stats = {
    totalUsers: 1248,
    activeUsers: 892,
    totalDocuments: 5683,
    processedToday: 243,
    revenue: '$12,847'
  };

  // User activity data
  const userActivity = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    activeUsers: [450, 620, 780, 810, 890, 920],
    newUsers: [120, 180, 210, 190, 230, 250]
  };

  // Document types data
  const documentTypes = {
    labels: ['Bookmarked', 'Secured', 'OCR', 'Cleaned', 'Converted'],
    data: [1245, 980, 1560, 870, 1028],
    colors: ['#3B82F6', '#10B981', '#F59E0B', '#6366F1', '#EC4899']
  };

  // Recent users
  const recentUsers = [
    { id: 1, name: 'Alex Johnson', email: 'alex@example.com', plan: 'Premium', lastActive: '2 mins ago' },
    { id: 2, name: 'Sarah Williams', email: 'sarah@example.com', plan: 'Enterprise', lastActive: '15 mins ago' },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com', plan: 'Basic', lastActive: '1 hour ago' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', plan: 'Premium', lastActive: '3 hours ago' },
    { id: 5, name: 'David Wilson', email: 'david@example.com', plan: 'Basic', lastActive: '1 day ago' }
  ];

  // System alerts
  const systemAlerts = [
    { id: 1, type: 'warning', message: 'Storage usage at 78%', time: '10 mins ago' },
    { id: 2, type: 'info', message: 'New version available (v2.3.1)', time: '2 hours ago' },
    { id: 3, type: 'error', message: 'Backup failed on server 3', time: '5 hours ago' }
  ];


  const getAlertColor = (type) => {
    switch(type) {
      case 'error': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
     
     

      {/* Main Content */}
      <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 mb-6">
          <div className="bg-white overflow-hidden shadow rounded-lg col-span-2">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <FaUsers className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <FaUserShield className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Users</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stats.activeUsers}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <FaFilePdf className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Documents</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stats.totalDocuments}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg col-span-2">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <FaMoneyBillWave className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Monthly Revenue</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stats.revenue}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

       

        {/* Recent Users and System Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Users</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {recentUsers.map((user) => (
                <div key={user.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-600 text-sm font-medium">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                        user.plan === 'Premium' ? 'bg-purple-100 text-purple-800' :
                        user.plan === 'Enterprise' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {user.plan}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">{user.lastActive}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 bg-gray-50 text-right">
              <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                View all users →
              </button>
            </div>
          </div>

          {/* Recent Documents */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Documents</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-10 w-10 rounded-full ${getAlertColor(alert.type)} flex items-center justify-center`}>
                        <FaShieldAlt className="h-5 w-5" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{alert.message}</div>
                        <div className="text-sm text-gray-500">{alert.time}</div>
                      </div>
                    </div>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 bg-gray-50 text-right">
              <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                View all alerts →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;