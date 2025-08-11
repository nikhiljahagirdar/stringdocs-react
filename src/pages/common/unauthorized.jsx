import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineWarning } from "react-icons/ai";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-red-200 shadow-lg rounded-xl p-8 text-center">
        <div className="flex justify-center items-center">
        <AiOutlineWarning className="text-red-500 text-6xl mb-4" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">403 - Unauthorized</h1>
        <p className="text-gray-600 mt-2">
          You do not have permission to access this page.
        </p>
       
      </div>
    </div>
  );
};

export default Unauthorized;
