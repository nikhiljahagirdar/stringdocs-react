import React from "react";
import PropTypes from "prop-types";


const RenderErrors = ({ errors }) => {  
    return (
     errors.length > 0 && (
        <div className="bg-red-200 p-4 rounded-md mb-4">
        <ul className="list-none p-2">
          {errors.map((error, index) => (
            <li key={index} className="text-red-800 text-xs">{error}</li>
          ))}
        </ul>
      </div>
    )
  );
}


RenderErrors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RenderErrors;
