import React from 'react';

const MobileMenu = ({ navLinks, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="sm:hidden absolute top-16 inset-x-0 p-2 transition transform origin-top-right z-40">
      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-gray-800 divide-y-2 divide-gray-700">
        <div className="pt-5 pb-6 px-5">
          <div className="mt-6">
            <nav className="grid gap-y-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-700 text-base font-medium text-white"
                >
                  {link.icon && <link.icon className="mr-3 h-6 w-6" />}
                  <span>{link.name}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;