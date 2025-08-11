// src/components/PaymentFailurePage.jsx
import React from 'react';

// Simple X Circle SVG Icon (included directly for self-containment)
const XCircleIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// Dumb component - no props, just renders static content for failure
function PaymentFailure() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-12">
      <div className="bg-white p-8 md:p-10 rounded-lg shadow-xl max-w-lg w-full text-center">
        {/* Failure Icon */}
        <XCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />

        {/* Failure Message */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Payment Failed
        </h1>
        <p className="text-gray-600 mb-6">
          Unfortunately, we were unable to process your payment at this time.
        </p>

        {/* Guidance */}
        <p className="text-sm text-gray-500 mb-8">
          Please double-check your payment information and ensure you have sufficient funds. You may want to try using a different payment method.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/checkout" // Link back to checkout or payment page to try again
            className="w-full sm:w-auto inline-block px-6 py-3 bg-indigo-600 text-white font-medium text-sm rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Try Again
          </a>
          {/* Optional: Link to support or contact page */}
          {/* <a
            href="/contact-support"
            className="w-full sm:w-auto inline-block px-6 py-3 bg-gray-200 text-gray-700 font-medium text-sm rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition duration-150 ease-in-out"
          >
            Contact Support
          </a> */}
        </div>

         {/* Optional: Simple support text */}
         <p className="mt-8 text-xs text-gray-500">
            If you continue to experience issues, please contact our support team.
            {/* Example email link */}
            {/* <br /> <a href="mailto:support@example.com" className="text-indigo-600 hover:underline">support@example.com</a> */}
         </p>

      </div>
    </div>
  );
}

// No PropTypes needed as it's a dumb component without props.

export default PaymentFailure;