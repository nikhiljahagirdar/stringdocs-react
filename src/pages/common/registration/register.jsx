import React, { useState, useEffect } from "react";
import { getAllPlans } from "../../../apis/plans";
import { registerUser } from "../../../apis/auth";
import CompanyStep from './CompanyStep';
import UserDetailsStep from './userStep';
import PlanSelectionStep from './planstep';
import RegistrationTypeStep from './registrationtypestep';
import PaymentStep from './paymentstep';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchPlans } from "../../../store/slices/plansSlice";

import axios from "axios"
const RegistrationForm = () => {

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    account_type: "individual",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    company_name: "",
    company_address: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    company_phone_number: "",
    company_email: "",
    company_website: "",
    logo: "",
    subscription_id: null,
    billingCycle: "yearly", // 'monthly' or 'yearly'
    price_id: ""
  });
  const [errors, setErrors] = useState({});
  const [plans, setPlans] = useState([
    {
      "id": 1,
      "monthly_price": 49,
      "yearly_price": 550,
      "plan_name": "Basic",
      "plan_details": "Basic plan details",
      "stripe_monthly_price_id": "price_1RAh7OPPOKuYevb9eKMlpibj",
      "stripe_yearly_price_id": "price_1RAh8IPPOKuYevb91bshDrN5",
      "createdon": "2025-08-03T15:09:58.733348+00:00",
      "updatedon": null
    },
    {
      "id": 2,
      "monthly_price": 99,
      "yearly_price": 1150,
      "plan_name": "Premium",
      "plan_details": "Premium plan details",
      "stripe_monthly_price_id": "price_1RAh60PPOKuYevb9SqUjKfBm",
      "stripe_yearly_price_id": "price_1RAh4ePPOKuYevb9wZHCK3RO",
      "createdon": "2025-08-03T15:09:58.733348+00:00",
      "updatedon": null
    },
    {
      "id": 3,
      "monthly_price": 150,
      "yearly_price": 1750,
      "plan_name": "Enterprise",
      "plan_details": "Enterprise plan details",
      "stripe_monthly_price_id": "price_1RAh21PPOKuYevb9IZCkdjHY",
      "stripe_yearly_price_id": "price_1RAh3UPPOKuYevb91W2TKPqZ",
      "createdon": "2025-08-03T15:09:58.733348+00:00",
      "updatedon": null
    },]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registrationType = formData.account_type;


  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await getAllPlans();
        dispatch(fetchPlans(response.data));
        setPlans(response.data);
        if (response.code === 200) {

        }
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };
    fetchPlans();

  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegistrationTypeSelect = (type) => {
    setFormData({ ...formData, account_type: type });
    setErrors({}); // Clear errors when type is selected
  };

  const handlePlanSelect = (planId, monthly_price_id, yearly_price_id) => {
    if (formData.billingCycle === "monthly") {
      setFormData({ ...formData, subscription_id: planId, price_id: monthly_price_id });
    }
    else {
      setFormData({ ...formData, subscription_id: planId, price_id: yearly_price_id });
    }

    setErrors({}); // Clear errors when plan is selected
  };

  const handleBillingCycleToggle = () => {
    setFormData((prevData) => ({
      ...prevData,
      billingCycle: prevData.billingCycle === "monthly" ? "yearly" : "monthly",
    }));
  };

  const validateStep = () => {
    let newErrors = {};
    let isValid = true;

    if (step === 1) {
      if (!formData.account_type) {
        newErrors.account_type = "Please select a registration type.";
        isValid = false;
      }
    } else if (step === 2) {
      // User Details validation
      if (!formData.firstname) newErrors.firstname = "First Name is required.";
      if (!formData.lastname) newErrors.lastname = "Last Name is required.";
      if (!formData.email) {
        newErrors.email = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid.";
      }
      if (!formData.password) newErrors.password = "Password is required.";
      if (formData.password.length < 6)
        newErrors.password = "Password must be at least 6 characters.";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match.";

      if (formData.account_type === "company") {
        // Company Details validation
        if (!formData.company_name) newErrors.company_name = "Company Name is required.";
        if (!formData.company_address) newErrors.company_address = "Company Address is required.";
        if (!formData.city) newErrors.city = "City is required.";
        if (!formData.state) newErrors.state = "State is required.";
        if (!formData.zip_code) newErrors.zip_code = "Zip Code is required.";
        if (!formData.country) newErrors.country = "Country is required.";
        if (!formData.company_phone_number)
          newErrors.company_phone_number = "Company Phone Number is required.";
        if (!formData.company_email) {
          newErrors.company_email = "Company Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.company_email)) {
          newErrors.company_email = "Company Email is invalid.";
        }
      }
    } else if (step === 3) {
      // Plan Selection validation
      if (!formData.subscription_id) newErrors.subscription_id = "Please select a plan.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (validateStep()) {
      setStep((prevStep) => prevStep + 1);
      if (step === 3 && validateStep()) {
        try {
          const payload = {
            ...formData,
            role: registrationType,
            subscription_type: formData.billingCycle,
          };
          delete payload.confirmPassword; // Don't send confirmPassword to backend

          const response = await registerUser(payload);
          if (response.code === 201) {
            const checkoutSession = await axios.post("https://hammerhead-app-mtxys.ondigitalocean.app/payment/create-checkout-session", {
              user_subscription_id: formData.planId,
              stripe_payment_id: formData.price_id,
              amount: formData.amount,
              currency: "USD",
              customer_email: formData.email,
            });
            window.location.href = checkoutSession.data;
          }
          navigate("/login"); // Redirect to login page on success
        } catch (error) {
          console.error("Registration error:", error);
          setErrors({
            form: error.response?.data?.message || "Registration failed. Please try again.",
          });
        }
      }
    }
  };

  const handleBack = async () => {
    setStep((prevStep) => prevStep - 1);
  };



  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 pt-16">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <div>
          {step === 1 && ( // Registration Type Step
            <RegistrationTypeStep
              formData={formData}
              errors={errors}
              onSelect={handleRegistrationTypeSelect}
              onNext={handleNext}
            />
          )}
          {step === 2 && registrationType === "individual" && ( // User Details Step for Individual
            <UserDetailsStep formData={formData} errors={errors} onChange={handleChange} onBack={handleBack} onNext={handleNext} />
          )}
          {step === 2 && registrationType === "company" && ( // Company Details Step for Company
            <CompanyStep formData={formData} errors={errors} onChange={handleChange} onBack={handleBack} onNext={handleNext} />
          )}
          {step === 3 && (
            <PlanSelectionStep
              plans={plans}
              formData={formData}
              errors={errors}
              onBillingCycleToggle={handleBillingCycleToggle}
              onPlanSelect={handlePlanSelect}
              onBack={handleBack}
              onNext={handleNext}
            />
          )}

        </div>

      </div>
    </div>
  );
};

export default RegistrationForm;
