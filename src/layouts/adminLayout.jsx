import React, { useState} from 'react';
import { Outlet, Link } from "react-router-dom";
import { FaAngleDoubleLeft,FaAngleDoubleRight ,FaHome,FaUser,FaCog } from "react-icons/fa";
import Header from '../components/common/Header';
import Footer from '../components/common/footer';


const adminLinks = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <FaHome />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <FaUser />,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: <FaCog />,
  },
];


const AdminLayout = () => {
  
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      <Header navLinks={[]} className="sticky top-0 z-10" />
      <div className="flex flex-1 pt-16"> {/* Added pt-16 to account for fixed header */}
        <aside
          className={`bg-gray-800 text-white transition-all duration-300 ${
            collapsed ? "w-20" : "w-64"
          } flex flex-col`}
        >
          <div className="p-4 flex justify-end">
            <button onClick={() => setCollapsed(!collapsed)} className="text-white">
              {collapsed ? <FaAngleDoubleRight size={20} /> : <FaAngleDoubleLeft size={20} />}
            </button>
          </div>
          <nav className="flex-1">
            <ul>
              {adminLinks.map((link) => (
                <li key={link.name} className="mb-2">
                  <Link
                    to={link.path}
                    className="flex items-center p-4 hover:bg-gray-700"
                  >
                    <span className="mr-3">{link.icon}</span>
                    {!collapsed && <span>{link.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
      <Footer className="sticky bottom-0 z-10" />
    </div>
  );
};



export default AdminLayout;