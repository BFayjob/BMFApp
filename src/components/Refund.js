import React, { useState, useEffect } from "react";

// Simplified data for demonstration
const customerNameDatePairs = [
  { customerName: "John Doe", date: "2024-01-06T12:30:00Z" },
  { customerName: "Jane Smith", date: "2024-02-10T10:00:00Z" },
];

const refundRecords = [
  {
    id: "1234",
    customerName: "John Doe",
    date: "2024-02-10T10:00:00Z",
    items: [
      { brand: "Brand A", size: "M", quantity: 1, unitPrice: 100, total: 100 },
    ],
    totalAmount: 100,
  },
];

export const Refund = () => {
  const [selectedCustomerNameDatePair, setSelectedCustomerNameDatePair] = useState(null);

  useEffect(() => {
    // Simulate initial selection - replace with your logic
    setSelectedCustomerNameDatePair(customerNameDatePairs[0]);
  }, []);

  // Mock functions for demonstration
   // eslint-disable-next-line
  const handleSearch = () => {
    console.log("Search triggered!");
     // eslint-disable-next-line
  };
 // eslint-disable-next-line
  const handleSubmit = () => {
    console.log("Refund submitted!");
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      <div className="bg-cream-400 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-green-900 mb-6">Refund Management</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Simplified Refund Form */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Select Customer</h2>
          <select
            value={selectedCustomerNameDatePair?.customerName}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-army-green-500"
            onChange={(e) => {
                const selectedPair = customerNameDatePairs.find(
                  (pair) => pair.customerName === e.target.value
                );
                setSelectedCustomerNameDatePair(selectedPair);
              }}
            >
              {customerNameDatePairs.map((pair) => (
                <option key={pair.customerName} value={pair.customerName}>
                  {pair.customerName}
                </option>
              ))}
            </select>
            {/* Add other form fields as needed (date, product selection, etc.) */}
            <button className="mt-4 bg-green-900 text-white px-4 py-2 rounded-md hover:bg-army-green-600 focus:outline-none focus:ring-2 focus:ring-army-green-600">Search Sales Records</button>          </div>

          {/* Simplified Refund History */}
          <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Refund History</h2>
          <ul className="list-disc">
              {refundRecords.map((record) => (
                <li key={record.id}>
                  {record.customerName} - {record.date} - ₦{record.totalAmount}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mock submit button - replace with your form */}
        
        <button className="mt-4 bg-green-900 text-white px-4 py-2 rounded-md hover:bg-army-green-600 focus:outline-none focus:ring-2 focus:ring-army-green-600">Submit Refund</button>      </div>
    </div>
  );
};
