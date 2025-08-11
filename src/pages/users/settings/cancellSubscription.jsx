import React, { useState } from 'react';

function CancelSubscriptionComponent({ subscriptionId, onSubscriptionCanceled }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to simulate backend API call for cancellation
  const simulateBackendCancellation = async () => {
    // In a real application, this would be a fetch/axios call to your backend:
    // const response = await fetch('/api/cancel-subscription', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ subscriptionId: subscriptionId })
    // });
    // const data = await response.json();
    // if (!response.ok) { throw new Error(data.message || 'Failed to cancel subscription'); }
    // return data;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success or failure
        const isSuccess = Math.random() > 0.2; // 80% success rate for demo

        if (isSuccess) {
          resolve({ message: 'Subscription cancellation scheduled for end of period.' });
        } else {
          reject(new Error('Failed to process cancellation. Please try again or contact support.'));
        }
      }, 1500); // Simulate network delay
    });
  };

  const handleCancelSubscription = async () => {
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');
    setShowConfirmation(false); // Close the modal immediately

    try {
      await simulateBackendCancellation(); // Call the simulated backend
      setSuccessMessage('Your subscription will be canceled at the end of the current billing period.');
      // Optionally, notify parent component or refresh data
      if (onSubscriptionCanceled) {
        onSubscriptionCanceled(subscriptionId);
      }
    } catch (error) {
      console.error('Cancellation error:', error);
      setErrorMessage(error.message || 'An unexpected error occurred during cancellation.');
    } finally {
      setLoading(false);
    }
  };

  const ConfirmationModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm Cancellation</h3>
        <p className="text-gray-700 mb-6">
          Are you sure you want to cancel your subscription? Your access will continue until the end of the current billing period.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setShowConfirmation(false)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-200"
            disabled={loading}
          >
            Keep Subscription
          </button>
          <button
            onClick={handleCancelSubscription}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Canceling...' : 'Yes, Cancel'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto my-8 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Subscription</h2>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline ml-2">{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline ml-2">{errorMessage}</span>
        </div>
      )}

      <p className="text-gray-700 mb-6">
        You can cancel your subscription at any time. Your current plan will remain active until the end of your billing cycle.
      </p>

      <button
        onClick={() => setShowConfirmation(true)}
        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Cancel Subscription'}
      </button>

      {showConfirmation && <ConfirmationModal />}
    </div>
  );
}

export default CancelSubscriptionComponent;
