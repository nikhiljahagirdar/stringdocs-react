import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import default styling
 // Optional: Your custom styles
import PropTypes from "prop-types";

function PhoneInputWithCountry({
  value,
  onChange,
  name = "phone",
  label = "Phone Number",
}) {
  // You could potentially use the passed 'value' and 'onChange' directly
  // Or manage internal state if preferred for this component's logic
  // For simplicity, this example assumes the parent component manages the state
  // via the value and onChange props.

  return (
    <div className="phone-input-container">
      
      <PhoneInput
        country={"us"} // Default country (e.g., United States)
        value={value} // Controlled component: value comes from parent state
        onChange={onChange} // Function from parent to update state
        inputProps={{
          name: name,
          id: name,
          required: true, // Example: make it required
          // autoFocus: true, // Example: auto focus
        }}
        // --- Optional Customization Props ---
        containerClass="w-full" // Custom class for the container div
        inputClass={`w-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${value ? 'border-red-500 focus:ring-red-500' : ''}`} // Custom class for the input field
        dropdownClass="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" // Custom class for the dropdown container
        buttonClass="phone-dropdown-button" // Custom class for the dropdown button (flag area)
        // Enable search functionality in the dropdown
        enableSearch={true}
        searchClass="phone-search-input"
        searchPlaceholder="Search country..."
        // Prioritize certain countries in the list
        // preferredCountries={['us', 'gb', 'de', 'ca']}

        // Localization (example for German)
        // localization={{ Germany: 'Deutschland', 'United States': 'Vereinigte Staaten' }}

        // Placeholder for the input field
        placeholder="Enter phone number"
      />
      {/* You can add validation messages or other elements here */}
    </div>
  );
}

PhoneInputWithCountry.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
};

export default PhoneInputWithCountry;
