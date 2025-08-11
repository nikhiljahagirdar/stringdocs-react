import React, { useState} from 'react';
import { Outlet } from "react-router-dom";
import { FaAngleDoubleLeft,FaAngleDoubleRight ,FaHome,FaUser,FaCog,FaFilePdf } from "react-icons/fa";
import Header from '../components/common/Header';
import Footer from '../components/common/footer';


const navLinks=[
  {name:"Dashboard",href:"/user/dashboard",icon:"FaHome" },
  {name:"My Files",href:"/user/my-files",icon:"FaFilePdf"},
  {name:"Upload",href:"/user/upload",icon:"FaUser"},
]

const UserLayout = () => {
  
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center">
        <Header navLinks={[...navLinks]} className="sticky top-0 z-10" />
        <main className="w-full flex bg-gray-100 pt-8 pb-8">
          <Outlet />
        </main>
        <Footer className="sticky bottom-0 z-10" />
    </div>
    
  );
};

export default UserLayout;