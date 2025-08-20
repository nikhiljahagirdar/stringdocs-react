import React, { useState } from 'react';
import { useSelector } from 'react-redux'; // Assuming you're using Redux for state management
import ProfileDropdown from './ProfileDropdown';
import MobileMenu from './MobileMenu';
import { FiMenu, FiX } from 'react-icons/fi';
import DynamicIcon from '../DynamicIcon'

const Header = ({navLinks}) => {
  console.log("navlinks in header",navLinks)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth); // Make sure state.auth is correctly structured
  
  return (
    <header className="w-full bg-white  border-b border-gray-200 text-white shadow-lg fixed top-0 z-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center  h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#home" className="text-2xl font-bold text-blue-600 ">
              DocStrings
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden sm:ml-12 sm:flex sm:space-x-2 lg:space-x-4">
            {(navLinks.length>0) && (navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className=" text-md font-md text-purple-800 hover:bg-opacity-10 transition-colors flex items-center"
              >
              <span className="pr-3">
                 
                 <span className="flex flex-row items-center space-x-2">
                  <span className="p-1"><DynamicIcon size='16px' iconName={link.icon} /></span>
                  {link.name}
                </span>
                
              
              </span>
                
              </a>
            )))}
          </nav>

          {/* Right side: Profile Dropdown or Login */}
          {/* <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user && user.is_authenticated ? (
              <ProfileDropdown user={user} />
            ) : (
              <a
                href="/login"
                className="px-4 py-2 rounded-md text-sm font-medium bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors"
              >
                Login
              </a>
            )}
          </div> */}

          {/* Mobile: Profile/Login and Menu Button */}
          <div className="sm:hidden flex items-center">
            {user && user.isAuthenticated ? (
              <ProfileDropdown user={user} />
            ) : (
              <a
                href="/signin"
                className="px-3 py-1.5 rounded-md text-xs font-medium bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors mr-2"
              >
                Login
              </a>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="ml-1 inline-flex items-center justify-center p-2 rounded-md text-gray-200 outline-none "
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <FiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div> {/* Closes div for mobile items */}
        </div> {/* Closes div for flex items-center justify-between */}
      </div> {/* Closes div for max-w-7xl */}

      {/* Mobile Menu */}
      <MobileMenu navLinks={navLinks} isOpen={isMobileMenuOpen} />
    </header>
  );
};

export default Header;