import React from "react";

const UserStep = ({ formData, errors, onChange, onBack, onNext }) => (
  <div className="flex flex-col items-center justify-center">
    <div className="grid grid-cols-2 gap-4 w-full">
      <div className="mb-4">
        <label htmlFor="firstname" className="block text-sm font-medium">
          First Name
        </label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          value={formData.firstname}
          onChange={onChange}
          className="mt-1 w-full border p-2 rounded"
        />
        {errors.firstname && <span className="text-red-500 text-sm">{errors.firstname}</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="lastname" className="block text-sm font-medium">
          Last Name
        </label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={formData.lastname}
          onChange={onChange}
          className="mt-1 w-full border p-2 rounded"
        />
        {errors.lastname && <span className="text-red-500 text-sm">{errors.lastname}</span>}
      </div>
    </div>
    <div className="mb-4 w-full">
      <label htmlFor="email" className="block text-sm font-medium">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={onChange}
        className="mt-1 w-full border p-2 rounded"
      />
      {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
    </div>
    <div className="grid grid-cols-2 gap-4 w-full">
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={onChange}
          className="mt-1 w-full border p-2 rounded"
        />
        {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-sm font-medium">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={onChange}
          className="mt-1 w-full border p-2 rounded"
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm">{errors.confirmPassword}</span>
        )}
      </div>
    </div>
    <div className="flex justify-between">
      <button onClick={onBack} className="bg-gray-400 text-white px-4 py-2 rounded">
        Back
      </button>
      <button onClick={onNext} className="bg-blue-600 text-white px-4 py-2 rounded">
        Next
      </button>
    </div>
  </div>
);
export default UserStep;