import "./index.scss";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần cần thiết cho Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardOverview() {
  // Dữ liệu giả lập cho biểu đồ
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "New Users",
        data: [120, 190, 300, 500, 200, 300],
        backgroundColor: "rgba(34, 197, 94, 0.6)", // Màu xanh lá của Fiverr
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 1,
      },
      {
        label: "New Jobs",
        data: [80, 150, 200, 400, 150, 250],
        backgroundColor: "rgba(59, 130, 246, 0.6)", // Màu xanh dương
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "User & Job Growth (Last 6 Months)",
      },
    },
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Dashboard Overview
      </h1>

      {/* Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl shadow-md flex items-center gap-x-4">
          <div className="p-3 bg-green-100 rounded-full">
            <i className="fas fa-users text-2xl text-green-600"></i>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Users</p>
            <p className="text-xl font-semibold text-gray-900">1,245</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md flex items-center gap-x-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <i className="fas fa-briefcase text-2xl text-blue-600"></i>
          </div>
          <div>
            <p className="text-sm text-gray-600">Active Jobs</p>
            <p className="text-xl font-semibold text-gray-900">89</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md flex items-center gap-x-4">
          <div className="p-3 bg-purple-100 rounded-full">
            <i className="fas fa-cogs text-2xl text-purple-600"></i>
          </div>
          <div>
            <p className="text-sm text-gray-600">Services</p>
            <p className="text-xl font-semibold text-gray-900">32</p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Activities
        </h3>
        <ul className="space-y-4 text-sm text-gray-600">
          <li className="flex items-center gap-x-3">
            <i className="fas fa-user-plus text-green-500"></i>
            <span>
              User <strong>JohnDoe</strong> registered
            </span>
            <span className="ml-auto text-xs text-gray-400">2 hours ago</span>
          </li>
          <li className="flex items-center gap-x-3">
            <i className="fas fa-briefcase text-blue-500"></i>
            <span>
              Job <strong>"Web Developer"</strong> created
            </span>
            <span className="ml-auto text-xs text-gray-400">5 hours ago</span>
          </li>
          <li className="flex items-center gap-x-3">
            <i className="fas fa-cogs text-purple-500"></i>
            <span>
              Service <strong>"SEO"</strong> updated
            </span>
            <span className="ml-auto text-xs text-gray-400">1 day ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
