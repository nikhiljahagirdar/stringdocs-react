// src/components/StripePaymentSuccess.jsx
import { useCallback, useEffect } from "react";
import React from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
// Simple Checkmark SVG Icon (included directly for self-containment)
const CheckCircleIcon = ({ className }) => (
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
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// Dumb component - no props, just renders static content
function PaymentSuccess() {
  const [sesssubscription, setSessionSubscription] = React.useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  console.log("searchParams", searchParams.get("session_id"));

  const  session_id  = searchParams.get("session_id"); // Extracting the ID from the URL parameters

  const fetchPaymentDetails = useCallback(async () => {
    console.log("session_id", session_id)
    const sessData = await axios.post(
      "https://localhost:3443/api/stripe/save-subscription",
      { sessionId: session_id }
    );

    if (sessData.status == 200) {
      const saveData = sessData.data;
      setSessionSubscription(saveData);
    }
  }, [session_id])// Added session_id as a dependency


  useEffect(() => {
    (async function functionName() {
       await fetchPaymentDetails();
      console.log(sesssubscription)
    })();
  }, [ fetchPaymentDetails]); // Empty dependency array means this effect runs only once after the initial render

  return (
    <div className="flex items-center justify-center w-full bg-gray-100 px-4 py-12">
      <div className="bg-white p-8 md:p-10 rounded-lg shadow-xl max-w-lg w-full text-center">
        {/* Success Icon */}
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />

        {/* Success Message */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you! Your payment has been processed successfully.
        </p>

        {/* Confirmation Note */}
        <p className="text-sm text-gray-500 mb-8">
          You should receive an email confirmation shortly with the details of
          your transaction.
        </p>

        {/* Call to Action Button (Hardcoded Link) */}
        <div className="mt-8">
          <a
            href="/dashboard" // Link to a common post-payment destination
            className="w-full sm:w-auto inline-block px-6 py-3 bg-indigo-600 text-white font-medium text-sm rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Go to Dashboard
          </a>
        </div>

        {/* Optional: Minimalist Support Info */}
        {/* <p className="mt-8 text-xs text-gray-500">
            If you have any questions, please contact support.
         </p> */}
      </div>
    </div>
  );
}

// No PropTypes needed as it's a dumb component without props.

export default PaymentSuccess;
