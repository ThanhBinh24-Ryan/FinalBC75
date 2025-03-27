import { Link, useLocation, useNavigate } from "react-router-dom";
import AdminAvatar from "../../../assets/AdminAvatar.png";
import FiverLogoShort from "../../../assets/Fiverr-Logo-short.png";
import "./index.scss";

const navigation = [
  { name: "User Management", href: "users", icon: "fa-users" },
  { name: "Job Management", href: "jobs", icon: "fa-briefcase" },
  { name: "Job Type Management", href: "job-types", icon: "fa-list" },
  { name: "Service Management", href: "services", icon: "fa-cogs" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const getCurrentNavigation = () => {
    const currentPath = location.pathname;
    const currentNavItem = navigation.find((item) =>
      currentPath.includes(item.href)
    );
    return currentNavItem ? currentNavItem.name : "";
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <div className="h-screen flex flex-col gap-y-8 overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200 px-6 py-6 shadow-sm">
      {/* Logo Section */}
      <Link
        to="/admin"
        className="flex h-16 shrink-0 items-center gap-x-4 logo-link"
      >
        <img
          className="h-12 w-13 rounded-full shadow-md"
          src={FiverLogoShort}
          alt="Fiverr Logo"
        />
        <span
          className="text-xl font-bold text-gray-900 tracking-tight"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Admin Dashboard
        </span>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-10">
          <li>
            <h3 className="text-sm font-semibold text-gray-800 mb-4 tracking-wide">
              Main Menu
            </h3>
            <ul role="list" className="space-y-4">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={classNames(
                      getCurrentNavigation() === item.name
                        ? "bg-teal-100 text-teal-800 shadow-sm"
                        : "text-gray-700 hover:bg-gray-200 hover:text-gray-900",
                      "flex items-center gap-x-4 rounded-xl py-3 px-5 text-sm font-medium transition-all duration-300 transform hover:scale-105 relative"
                    )}
                  >
                    <i className={`fas ${item.icon} fa-fw text-lg`}></i>
                    <span>{item.name}</span>
                    {getCurrentNavigation() === item.name && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-teal-600 rounded-r"></span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {/* Recent Activity */}
          <li>
            <div className="bg-white rounded-xl p-5 shadow-md">
              <h3 className="text-sm font-semibold text-gray-800 mb-4">
                Recent Activity
              </h3>
              <ul className="space-y-3 text-xs text-gray-600">
                <li className="flex items-center gap-x-3 hover:text-teal-600 transition-colors">
                  <i className="fas fa-user-plus text-teal-500"></i>
                  <span>User JohnDoe registered</span>
                </li>
                <li className="flex items-center gap-x-3 hover:text-teal-600 transition-colors">
                  <i className="fas fa-briefcase text-indigo-500"></i>
                  <span>Job "Web Developer" created</span>
                </li>
                <li className="flex items-center gap-x-3 hover:text-teal-600 transition-colors">
                  <i className="fas fa-cogs text-purple-500"></i>
                  <span>Service "SEO" updated</span>
                </li>
              </ul>
            </div>
          </li>

          {/* Quick Stats */}
          <li>
            <div className="bg-white rounded-xl p-5 shadow-md">
              <h3 className="text-sm font-semibold text-gray-800 mb-4">
                Quick Stats
              </h3>
              <ul className="space-y-3 text-xs text-gray-600">
                <li className="flex justify-between items-center">
                  <span>Total Users:</span>
                  <span className="font-semibold text-teal-600 bg-teal-100 px-2 py-1 rounded-full">
                    1,245
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Active Jobs:</span>
                  <span className="font-semibold text-teal-600 bg-teal-100 px-2 py-1 rounded-full">
                    89
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Services:</span>
                  <span className="font-semibold text-teal-600 bg-teal-100 px-2 py-1 rounded-full">
                    32
                  </span>
                </li>
              </ul>
            </div>
          </li>

          {/* Admin Profile & Logout */}
          <li className="mt-auto">
            <div className="flex flex-col gap-y-6">
              <a
                href="#"
                className="flex items-center gap-x-4 p-4 rounded-xl text-sm font-semibold text-gray-800 hover:bg-gray-200 transition-all duration-300"
              >
                <img
                  className="h-12 w-12 rounded-full border-2 border-teal-500 p-0.5 shadow-sm"
                  src={AdminAvatar}
                  alt="Admin Avatar"
                />
                <div className="flex flex-col">
                  <span className="text-gray-900 font-semibold">Admin</span>
                  <span className="text-xs text-gray-500">Super Admin</span>
                </div>
              </a>
              <button
                onClick={handleLogout}
                className="w-full py-3 px-5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl text-sm font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center gap-x-2"
              >
                <i className="fas fa-sign-out-alt"></i>
                Logout
              </button>
            </div>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="text-xs text-gray-500 text-center">
        <p>Version 1.0.0</p>
        <p>{new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}
