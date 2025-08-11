import React from 'react';

const PopupDialog = ({ isOpen, onClose, children, className }) => {
  if (!isOpen) {
    return null;
  }

  return (
    // Overlay
    <div
      className={`fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 ${className}`}
      onClick={onClose}
    >
      {/* Dialog Content */}
      <div
        className="relative bg-white rounded-lg shadow-xl p-8 w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4 flex flex-end bg-gray-100 shadow-lg"><button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button></div>
        {/* Children content will be rendered here */}
        {children}
      </div>
    </div>
  );
};

export default PopupDialog;