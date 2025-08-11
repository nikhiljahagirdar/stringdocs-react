import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InvoiceList from '../../../components//invoicesInvoiceList';
import LoadingSpinner from '../components/LoadingSpinner';

function InvoicesBilling() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await invoicesApi.getInvoices();
        setInvoices(data);
      } catch (err) {
        setError("Failed to fetch invoices. Please try again.");
        console.error("Error fetching invoices:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="invoices-page">
      <div className="invoices-header">
        <h1>Your Invoices</h1>
        <Link to="/invoices/new" className="button primary">
          Create New Invoice
        </Link>
      </div>
      {invoices.length === 0 ? (
        <p>No invoices found. Start by creating a new one!</p>
      ) : (
        <InvoiceList invoices={invoices} />
      )}
    </div>
  );
}

export default InvoicesPage;