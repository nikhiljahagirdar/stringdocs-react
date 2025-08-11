import React, { useState} from 'react';
import { Outlet } from "react-router-dom";
import { FaAngleDoubleLeft,FaAngleDoubleRight ,FaHome,FaUser,FaCog } from "react-icons/fa";
import Header from '../components/common/Header';
import Footer from '../components/common/footer';

const navLinks=[
  {name:"About Services",href:"/user/dashboard",icon:"FaHome" },
  {name:"Contact Us",href:"/user/my-files",icon:"FaFilePdf"},
];

const CommonLayout = () => {
  
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center  ">
        <Header className="sticky top-0 w-full" navLinks={[...navLinks]} />
        <main   className="flex w-full pt-8 pb-8">
          <Outlet />
        </main>
        <Footer className="sticky bottom-0 z-10" />
    </div>
  );
};


export default CommonLayout;