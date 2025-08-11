import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const allPlans = [
  {
    "id": 1,
    "plan_name": "Basic",
    "plan_details": "Basic plan details",
    "stripe_monthly_price_id": "price_123",
    "stripe_yearly_price_id": "price_456",
    "monthly_price": 9.99,
    "yearly_price": 99.99,
    "createdOn": "2025-07-25T14:30:25",
    "updatedOn": null
  },
  {
    "id": 2,
    "plan_name": "Premium",
    "plan_details": "Premium plan details",
    "stripe_monthly_price_id": "price_789",
    "stripe_yearly_price_id": "price_101",
    "monthly_price": 19.99,
    "yearly_price": 199.99,
    "createdOn": "2025-07-25T14:30:25",
    "updatedOn": null
  },
  {
    "id": 3,
    "plan_name": "Enterprise",
    "plan_details": "Enterprise plan details",
    "stripe_monthly_price_id": "price_112",
    "stripe_yearly_price_id": "price_131",
    "monthly_price": 29.99,
    "yearly_price": 299.99,
    "createdOn": "2025-07-25T14:30:25",
    "updatedOn": null
  }]

const PlanStep = ({
  plans,
  formData,
  errors,
  onPlanSelect,
  onBillingCycleToggle,
  onBack,
  onNext,
}) => {

  //const bestPlans=useSelector((state)=>state.plans.plans)

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-4 flex items-center gap-2">
        <span className={formData.billingCycle === "monthly" ? "font-bold text-blue-600" : ""}>
          Monthly
        </span>
        <button
          type="button"
          id="billingCycleToggle"
          role="switch"
          aria-checked={formData.billingCycle === "yearly"}
          tabIndex={0}
          onClick={onBillingCycleToggle}
          className={`relative inline-flex h-6 w-12 border-2 border-gray-300 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 ${formData.billingCycle === "yearly" ? "bg-blue-600" : ""
            }`}
        >
          <span
            className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform ${formData.billingCycle === "yearly" ? "translate-x-6" : "translate-x-1"
              }`}
          />
        </button>
        <span className={formData.billingCycle === "yearly" ? "font-bold text-blue-600" : ""}>
          Yearly
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {allPlans.map((plan) => (
          <div
            key={plan.id}
            className={`border p-4 rounded cursor-pointer transition hover:shadow-lg ${formData.subscription_id === plan.id ? "border-blue-500 bg-blue-50" : ""
              }`}
            onClick={() => {
              onPlanSelect(plan.id, plan.stripe_monthly_price_id, plan.stripe_yearly_price_id)
            }
            }
            role="button"
            tabIndex={0}
            aria-pressed={formData.subscription_id === plan.id}
          >
            {formData.subscription_id === plan.id && (
              <FaCheckCircle className="absolute top-2 right-2 text-blue-500 text-xl" />
            )}
            <h3 className="text-lg font-semibold">{plan.plan_name || plan.name}</h3>
            <p className="text-sm mt-2">{plan.plan_details}</p>
            <p className="text-xl font-bold mt-4">
              $
              {formData.billingCycle === "monthly"
                ? plan.monthly_price || plan.priceMonthly
                : plan.yearly_price || plan.priceYearly}{" "}
              / {formData.billingCycle}
            </p>
          </div>
        ))}
      </div>
      {errors.subscription_id && (
        <span className="text-red-500 text-sm">{errors.subscription_id}</span>
      )}
      <div className="flex justify-between mt-4">
        <button onClick={onBack} className="bg-gray-400 text-white px-4 py-2 rounded">
          Back
        </button>
        <button onClick={onNext} className="bg-blue-600 text-white px-4 py-2 rounded">
          Next
        </button>
      </div>
    </div>
  )
};

export default PlanStep;