import React, { useState, memo } from "react";
import * as Icons from "react-icons/fa";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";
import DynamicIcon from "./DynamicIcon";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";


const Sidebar=  memo(
    function ({ links, collapsed, onToggle }) {

        const [active,setActive] =useState();
   
        console.log(links);
        const renderIcon = (iconName) => {
                return iconName ? <DynamicIcon iconName={iconName} size="1.5em" /> : null;
        };
      
        return (
          <div 
            className={`fixed top-0 left-0 h-full bg-gray-900 text-white transition-all duration-300 ${
              collapsed ? 'w-24' : 'w-64'
            }`}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
                {renderIcon('layout')}
                
              </div>
            </div>
      
            <button
              onClick={onToggle}
              className="absolute -right-3 top-6 bg-gray-900 rounded-full p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors shadow-lg border border-gray-700"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {!collapsed ? (
                          <FaAngleDoubleLeft color="white" />
                        ) : (
                          <FaAngleDoubleRight color="white" />
                        )}
            </button>
      
            <div className="flex flex-col flex-grow">
              <UserProfile collapsed={collapsed} />
              <ul className="flex-grow overflow-auto">
                {links.map(({ name, path, icon }, index) => {
                  return (
                    <li
                      key={index}
                      className="flex items-center pt-2 pb-2 hover:bg-gray-700 rounded cursor-pointer"
                      onClick={() => setActive(name)}
                    >
                      <DynamicIcon iconName={icon} size="1.5em" />
                      {!collapsed && (
                        <Link
                          to={path}
                          className={`ml-2 ${active === name ? "font-bold" : ""}`}
                        >
                          {name}
                        </Link>
                      )}
                      {collapsed && (
                        <Link
                          to={path}
                          className={`ml-2 mb-2 ${active === name ? "font-bold" : ""}`}
                        >
                          {/* For collapsed version, display icon only */}
                          <span className="sr-only">{name}</span>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
            
          </div>
        );
      }
)


export default Sidebar