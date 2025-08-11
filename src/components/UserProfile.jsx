import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";

function UserProfile({ collapsed }) {

  const auth = useSelector((state) => state.auth);

  return (
    <div className="flex items-center justify-center gap-4 p-2 border-b border-gray-700 flex-col">
      {auth?.picture && ( <img
        src={auth?.picture }
        alt={auth?.name || "Guest"}
        className={`rounded-full bg-white transition-all object-fill ${collapsed ? "w-5 h-5" : "w-14 h-14"}`}
      />)}
      {!auth?.picture && (
        <FaUser className={`text-3xl rounded-full bg-white transition-all object-fill ${collapsed ? "w-5 h-5" : "w-14 h-14"}`} />
      )}
      {!collapsed && (
        <div className="flex items-center justify-center">
          <span className="text-lg font-semibold">{auth.name || "Guest"}</span>
        </div>
      )}
    </div>
  );
}

UserProfile.propTypes = {
  
  collapsed: PropTypes.bool.isRequired,
};

export default UserProfile;
