// salesHistory.js

import React, { useState, useEffect } from "react";


export const SalesHistory = ({ isDashboard, date }) => {
  const [salesRecords, setSalesRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch sales records from the database or Firebase
    const fetchSalesRecords = async () => {
      try {
        setLoading(true);

        // Simulate fetching sales records from the database
        const fetchedRecords = await fetchSalesRecordsFromDatabase();

         // Filter records based on `isDashboard` and `date`

        setSalesRecords(fetchedRecords);
      } catch (error) {
        console.error("Error fetching sales records:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesRecords();
  }, [isDashboard, date]);

  const fetchSalesRecordsFromDatabase = async () => {
    // Simulate fetching sales records from a database
    // Replace this with actual database fetching logic

    const recordsFromDatabase = [
      // Example sales record format
      {
        customerName: "John Doe",
        items: [
          { brand: "Bluecrown", size: "2mm", quantity: 5, unitPrice: 17700, metric: "Bag" },
          // Add more items as needed
        ],
        totalBeforeDiscount: 100000, // Replace with the actual total
        discount: 0, // Replace with the actual discount percentage
        paymentMethod: "Cash",
        cashAmount: 80000,
        transferAmount: 0,
        useBothPayments: false,
        remarks: "Customer satisfied with the purchase.",
      },
      // Add more records as needed
    ];

    return recordsFromDatabase;
  };

  const renderSalesRecordsTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Brand-Size</th>
            <th>Quantity</th>
            <th>Metric</th>
            <th>Unit Price</th>
            <th>Total Before Discount</th>
            <th>Discount (%)</th>
            <th>Discounted Total</th>
            <th>Customer Name</th>
            <th>Cash Amount</th>
            <th>Transfer Amount</th>
            <th>Use Both Payments</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {salesRecords.map((record, index) => {
            // Calculate discounted total
            const discountedTotal =
              record.discount > 0
                ? record.totalBeforeDiscount - (record.totalBeforeDiscount * record.discount) / 100
                : record.totalBeforeDiscount;

            return (
              <tr key={index}>
                <td>
                  {record.items.map((item, itemIndex) => (
                    <div key={itemIndex}>{`${item.brand}-${item.size}`}</div>
                  ))}
                </td>
                <td>
                  {record.items.map((item, itemIndex) => (
                    <div key={itemIndex}>{`${item.quantity}`}</div>
                  ))}
                </td>
                <td>
                  {record.items.map((item, itemIndex) => (
                    <div key={itemIndex}>{`${item.metric}`}</div>
                  ))}
                </td>
                <td>
                  {record.items.map((item, itemIndex) => (
                    <div key={itemIndex}>{`₦${item.unitPrice}`}</div>
                  ))}
                </td>
                <td>₦{record.totalBeforeDiscount}</td>
                <td>{record.discount}%</td>
                <td>₦{discountedTotal}</td>
                <td>{record.customerName}</td>
                <td>₦{record.cashAmount}</td>
                <td>₦{record.transferAmount}</td>
                <td>{record.useBothPayments ? "Yes" : "No"}</td>
                <td>{record.remarks}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div className="sales-history-wrapper bg-cream p-4 rounded shadow-md">
      <h2 className="wrapper-title text-2xl font-bold mb-4 text-center">Sales History</h2>
      {loading ? (
        <div className="loading-text text-center">Loading...</div>
      ) : (
        <div className="sales-records-table grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-full overflow-x-auto">
          {/* Render table content here */}
          {renderSalesRecordsTable()}
        </div>
      )}
    </div>
  );
  
};

export default SalesHistory;
