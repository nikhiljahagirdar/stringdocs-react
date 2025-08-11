import React, { useState } from "react";
import { FaApplePay,FaCreditCard,FaPaypal,FaChevronRight } from "react-icons/fa";



function PaymentComponent({formData,plans}) {
  const [selectedMethod, setSelectedMethod] = useState(null); // 'stripe', 'paypal'
  const [error, setError] = useState(""); // For displaying simple errors
  // Assuming you might use this later for pre-selection or validation
  



  const paymentOptions = [
    // Renamed 'card' label to 'Credit/Debit Card' for clarity
    { id: "stripe", label: "Credit/Debit Card", icon: <FaCreditCard size={24}/> },
    { id: "paypal", label: "PayPal", icon: <FaPaypal size={24}/> },
    // Add more payment options here if needed
  ];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-3xl "> {/* Added max-w-md and mx-auto for better centering */}
      <h2 className="text-xl font-semibold mb-6 text-center">Select Payment Method</h2> {/* Increased mb and centered text */}

      {/* Changed flex direction to column and added spacing */}
      <div className="flex flex-col space-y-4 mb-6"> {/* Use space-y for vertical spacing */}
        {paymentOptions.map((option) => (
          <button
            key={option.id}
            // Modified classes for full width, vertical layout, and arrow positioning
            className={`flex items-center justify-between p-4 h-auto border rounded-lg w-full text-left ${ // Use justify-between, set height to auto, width full, text-left
              selectedMethod === option.id
                ? "bg-blue-100 border-blue-300 ring-2 ring-blue-200" // Enhanced selected style
                : "bg-gray-50 hover:bg-gray-100 border-gray-200" // Standard style with hover effect
            }`}
            onClick={() => {
              setSelectedMethod(option.id);
              setError(""); // Clear error on selection
            }}
          >
            {/* Group icon and label */}
            <div className="flex items-center">
              <span className="mr-3 text-indigo-600">{option.icon}</span> {/* Added margin-right */}
              <span className="font-medium">{option.label}</span>
            </div>
            {/* Arrow icon on the right */}
            <FaChevronRight className="text-gray-400" />
          </button>
        ))}
      </div>

      {/* Optional: Add a submit button if needed */}
      {/* <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
        disabled={!selectedMethod} // Disable if no method is selected
      >
        Proceed
      </button> */}

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
    </div>
  );
}

export default PaymentComponent;


