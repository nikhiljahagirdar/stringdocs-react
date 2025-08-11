import React from "react";
import { FaStripe, FaPaypal } from "react-icons/fa";

const PaymentStep = ({ formData, errors, nextHandler, previousHandler,Paymenthandler }) => (
  <div>
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
      <div className="flex flex-col gap-4">
        <button
          type="button"
          className="flex items-center justify-center gap-2 border p-4 rounded-lg text-xl text-gray-700 hover:border-blue-500 hover:shadow-md transition-all duration-200"
        >
          <FaStripe className="text-blue-600 text-3xl" /> Pay with Stripe
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 border p-4 rounded-lg text-xl text-gray-700 hover:border-blue-500 hover:shadow-md transition-all duration-200"
        >
          <FaPaypal className="text-blue-800 text-3xl" /> Pay with PayPal
        </button>
      </div>
      {errors.payment && <span className="text-red-500 text-sm">{errors.payment}</span>}
    </div>
    <div className="flex justify-between mt-6">
      <button onClick={previousHandler} className="bg-gray-400 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-500 transition-colors duration-200">
        Back
      </button>
      <button onClick={nextHandler}
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
      >
        Pay Now
      </button>
    </div>
  </div>
);

export default PaymentStep;
