import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const RegistrationTypeStep = ({ formData, onSelect, onNext , error }) => (
  <div className="flex flex-col items-center justify-center w-max-4xl ">
    <div className="mb-4 flex flex-col">
      <label className="block text-sm font-medium mb-2">Register as:</label>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => onSelect("individual")}
          className={`border p-4 rounded flex-1 transition hover:shadow-lg ${
            formData.account_type === "individual" ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Individual User</h3>
            {formData.account_type === "individual" && (
              <FaCheckCircle className="text-blue-500 text-xl" />
            )}
          </div>
          <p className="text-sm text-gray-600">Register for personal use.</p>
        </button>
        <button
          type="button"
          onClick={() => onSelect("company")}
          className={`border p-4 rounded flex-1 transition hover:shadow-lg ${
            formData.account_type === "company" ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Company</h3>
            {formData.account_type=== "company" && (
              <FaCheckCircle className="text-blue-500 text-xl" />
            )}
          </div>
          <p className="text-sm text-gray-600">Register on behalf of a company.</p>
        </button>
      </div>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
    <div className="flex justify-end">
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={onNext} >Next</button>
    </div>
  </div>
);
export default RegistrationTypeStep;