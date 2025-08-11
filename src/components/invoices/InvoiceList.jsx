import React, { useState, useEffect } from 'react';

function InvoiceListPage() {
  // --- State Management ---
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [clientFilter, setClientFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [invoiceNumberFilter, setInvoiceNumberFilter] = useState('');

  // --- Mock Data & API Simulation ---
  // In a real app, this would be fetched from a backend API
  useEffect(() => {
    setLoading(true);
    setTimeout(() => { // Simulate API call delay
      const mockInvoices = [
        {
          id: 'inv-001',
          invoiceNumber: 'INV-2025-001',
          clientName: 'Acme Corp',
          issueDate: '2025-07-01',
          dueDate: '2025-07-31',
          items: [
            { id: 'item1', description: 'Web Design', quantity: 1, unitPrice: 1500 },
            { id: 'item2', description: 'Hosting (1 year)', quantity: 1, unitPrice: 120 },
          ],
          notes: 'Thanks for your business!',
          status: 'Sent',
        },
        {
          id: 'inv-002',
          invoiceNumber: 'INV-2025-002',
          clientName: 'Beta Solutions',
          issueDate: '2025-07-10',
          dueDate: '2025-08-10',
          items: [
            { id: 'item3', description: 'Consulting Services', quantity: 10, unitPrice: 150 },
          ],
          notes: '',
          status: 'Paid',
        },
        {
          id: 'inv-003',
          invoiceNumber: 'INV-2025-003',
          clientName: 'Acme Corp',
          issueDate: '2025-07-15',
          dueDate: '2025-08-15',
          items: [
            { id: 'item4', description: 'SEO Optimization', quantity: 1, unitPrice: 800 },
          ],
          notes: 'Follow-up on project X.',
          status: 'Draft',
        },
        {
          id: 'inv-004',
          invoiceNumber: 'INV-2025-004',
          clientName: 'Gamma Innovations',
          issueDate: '2025-07-20',
          dueDate: '2025-08-20',
          items: [
            { id: 'item5', description: 'Software License', quantity: 1, unitPrice: 2500 },
          ],
          notes: 'Annual license renewal.',
          status: 'Overdue',
        },
      ];
      setInvoices(mockInvoices);
      setLoading(false);
    }, 700);
  }, []);

  // --- Filtering Logic ---
  useEffect(() => {
    let currentFiltered = invoices;

    // Filter by Invoice Number
    if (invoiceNumberFilter) {
      currentFiltered = currentFiltered.filter(invoice =>
        invoice.invoiceNumber.toLowerCase().includes(invoiceNumberFilter.toLowerCase())
      );
    }

    // Filter by Client Name
    if (clientFilter) {
      currentFiltered = currentFiltered.filter(invoice =>
        invoice.clientName.toLowerCase().includes(clientFilter.toLowerCase())
      );
    }

    // Filter by Status
    if (statusFilter) {
      currentFiltered = currentFiltered.filter(invoice =>
        invoice.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    setFilteredInvoices(currentFiltered);
  }, [invoices, clientFilter, statusFilter, invoiceNumberFilter]);

  // --- Helper to calculate totals (same as before) ---
  const calculateTotals = (invoiceToCalculate) => {
    const subtotal = invoiceToCalculate.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    return { subtotal, total: subtotal }; // Simplified
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 max-w-7xl">
        <div className="text-center p-5 text-gray-600">Loading invoices...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 max-w-7xl">
        <div className="bg-red-100 text-red-700 p-3 rounded-md mb-5 border border-red-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 font-sans max-w-7xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Invoices</h1>

      {/* --- Filter Section --- */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Filter Invoices</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="invoiceNumberFilter" className="block text-sm font-medium text-gray-700 mb-1">Invoice Number:</label>
            <input
              type="text"
              id="invoiceNumberFilter"
              value={invoiceNumberFilter}
              onChange={(e) => setInvoiceNumberFilter(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., INV-2025-001"
            />
          </div>
          <div>
            <label htmlFor="clientFilter" className="block text-sm font-medium text-gray-700 mb-1">Client Name:</label>
            <input
              type="text"
              id="clientFilter"
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Acme Corp"
            />
          </div>
          <div>
            <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">Status:</label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="Draft">Draft</option>
              <option value="Sent">Sent</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {/* --- Invoice List Table --- */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-5">Invoice Details</h2>
        {filteredInvoices.length === 0 && !loading ? (
          <p className="text-gray-600 text-center py-4">No invoices found matching your criteria.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-blue-50">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b border-gray-200">Invoice No.</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b border-gray-200">Client</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b border-gray-200">Issue Date</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b border-gray-200">Due Date</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b border-gray-200">Total</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b border-gray-200">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => {
                  const invoiceTotals = calculateTotals(invoice);
                  return (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-800">{invoice.invoiceNumber}</td>
                      <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-800">{invoice.clientName}</td>
                      <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-800">{invoice.issueDate}</td>
                      <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-800">{invoice.dueDate}</td>
                      <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-800 font-semibold">${invoiceTotals.total.toFixed(2)}</td>
                      <td className="py-3 px-4 border-b border-gray-200 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                          invoice.status === 'Sent' ? 'bg-blue-100 text-blue-800' :
                          invoice.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {invoice.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default InvoiceListPage;