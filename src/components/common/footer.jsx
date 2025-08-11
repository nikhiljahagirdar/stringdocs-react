import React from "react";

const Footer = () => {
    return (
      <footer className="w-full py-6 border-t border-gray-200 mt-8">
      <div className="max-w-7xl mx-auto text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} wizdocx.com. All rights reserved.
      </div>
  </footer>
    );
};

export default Footer;