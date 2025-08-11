import React, from 'react';
import { FiSettings, FiUploadCloud, FiFileText, FiType, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const PdfConfig = ({configs,selectedConfigs}) => {
 
 return (
    <div className="container mx-auto p-1  my-2 max-w-2xl">
        {configs.length > 0 && (
           <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm mb-2">
          <label htmlFor="bookMark" className="flex items-center text-sm font-medium text-gray-700 cursor-pointer">
            <FiFileText className="mr-2 text-blue-500 text-base" /> Include Bookmarks
          </label>
          <button
            type="button"
            id="bookMark"
            onClick={() => {
              
            }}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              configs.bookMark ? 'bg-green-500 focus:ring-green-500' : 'bg-gray-300 focus:ring-gray-400'
            }`}
          >
            <span
              className={`inline-block h-3 w-3 transform rounded-full text-xs/2 bg-white transition-transform duration-200 ease-in-out ${
                configs.bookMark ? 'translate-x-7' : 'translate-x-1'
              }`}
            ></span>
          </button>
        </div>
        )}
    </div>
  )
}

export default PdfConfig;
//