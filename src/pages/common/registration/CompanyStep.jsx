import React from "react";
import TailwindClassList from "../../../tailwindClassList";

const CompanyStep = ({ formData, errors, onChange, onBack, onNext }) => (
  <div className="p-2">
    {/* --- Login Details Section --- */}
    <h4 className="text-xl font-semibold mb-4">Login Details</h4>
     <div className="grid grid-cols-2 gap-4 w-full">
      <div className="mb-4">
        <label htmlFor="firstname" className={TailwindClassList.formLabel}>
          First Name
        </label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          value={formData.firstname}
          onChange={onChange}
          className={TailwindClassList.formInput}
        />
        {errors.firstname && <span className="text-red-500 text-sm">{errors.firstname}</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="lastname" className={TailwindClassList.formLabel}>
          Last Name
        </label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={formData.lastname}
          onChange={onChange}
          className={TailwindClassList.formInput}
        />
        {errors.lastname && <span className="text-red-500 text-sm">{errors.lastname}</span>}
      </div>
    </div>
    <div className="mb-4 w-full">
      <label htmlFor="email" className={TailwindClassList.formLabel}>
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={onChange}
        className={TailwindClassList.formInput}
      />
      {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
    </div>
    <div className="grid grid-cols-2 gap-4 w-full">
      <div className="mb-4">
        <label htmlFor="password" className={TailwindClassList.formLabel}>
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={onChange}
          className={TailwindClassList.formInput}
        />
        {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="confirmPassword" className={TailwindClassList.formLabel}>
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={onChange}
          className={TailwindClassList.formInput}
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm">{errors.confirmPassword}</span>
        )}
      </div>
    </div>
   

    {/* --- Company Details Section --- */}
    <h4 className="text-xl font-semibold mb-4">Company Details</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="md:col-span-2"> {/* Full width */}
        <label htmlFor="company_name" className={TailwindClassList.formLabel}>
          Company Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="company_name"
          name="company_name"
          value={formData.company_name}
          onChange={onChange}
          className={TailwindClassList.formInput}
          required
        />
        {errors.company_name && <span className="text-red-500 text-sm">{errors.company_name}</span>}
      </div>

      <div className="md:col-span-2"> {/* Full width */}
        <label htmlFor="company_address" className={TailwindClassList.formLabel}>
          Company Address <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="company_address"
          name="company_address"
          value={formData.company_address}
          onChange={onChange}
          className={TailwindClassList.formInput}
          required
        />
        {errors.company_address && (
          <span className="text-red-500 text-sm">{errors.company_address}</span>
        )}
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          City <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={onChange}
          className={TailwindClassList.formInput}
          required
        />
        {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
      </div>

      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
          State <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="state"
          name="state"
          value={formData.state}
          onChange={onChange}
          className={TailwindClassList.formInput}
          required
        />
        {errors.state && <span className="text-red-500 text-sm">{errors.state}</span>}
      </div>

      <div>
        <label htmlFor="zip_code" className="block text-sm font-medium text-gray-700">
          Zip Code <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="zip_code"
          name="zip_code"
          value={formData.zip_code}
          onChange={onChange}
          className={TailwindClassList.formInput}
          required
        />
        {errors.zip_code && <span className="text-red-500 text-sm">{errors.zip_code}</span>}
      </div>

      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
          Country <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={onChange}
          className={TailwindClassList.formInput}
          required
        />
        {errors.country && <span className="text-red-500 text-sm">{errors.country}</span>}
      </div>

      <div>
        <label htmlFor="company_phone_number" className="block text-sm font-medium text-gray-700">
          Company Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="company_phone_number"
          name="company_phone_number"
          value={formData.company_phone_number}
          onChange={onChange}
          className={TailwindClassList.formInput}
          required
        />
        {errors.company_phone_number && (
          <span className="text-red-500 text-sm">{errors.company_phone_number}</span>
        )}
      </div>
      <div className="mb-4 md:mb-0">
        <label htmlFor="company_email" className="block text-sm font-medium text-gray-700">
          Company Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="company_email"
          name="company_email"
          value={formData.company_email}
          onChange={onChange}
          className={TailwindClassList.formInput}
          required
        />
        {errors.company_email && (
          <span className="text-red-500 text-sm">{errors.company_email}</span>
        )}
      </div>

      <div className="md:col-span-2"> {/* Full width */}
        <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
          Website (Optional)
        </label>
        <input
          type="text"
          id="company_website"
          name="company_website"
          value={formData.company_website}
          onChange={onChange}
          className={TailwindClassList.formInput}
        />
      </div>

      <div className="md:col-span-2"> {/* Full width */}
        <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
          Logo URL (Optional)
        </label>
        <input
          type="text"
          id="logo"
          name="logo"
          value={formData.logo}
          onChange={onChange}
          className={TailwindClassList.formInput}
        />
      </div>
    </div>

    {/* --- Navigation Buttons --- */}
    <div className="flex w-full justify-between mt-6">
      <button
        onClick={onBack}
        className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Back
      </button>
      <button
        onClick={onNext}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Next
      </button>
    </div>
  </div>
);

export default CompanyStep;