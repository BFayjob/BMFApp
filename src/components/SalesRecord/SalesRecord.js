import React, { useState, useEffect } from "react";

export const SalesRecord = () => {
  const [salesRecords, setSalesRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch sales records from the database or Firebase
    const fetchSalesRecords = async () => {
      try {
        setLoading(true);

        // Simulate fetching sales records from the database
        const fetchedRecords = await fetchSalesRecordsFromDatabase();

        setSalesRecords(fetchedRecords);
      } catch (error) {
        console.error("Error fetching sales records:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesRecords();
  }, []);

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
        date: "2024-01-06T12:30:00Z", // Replace with the actual date
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
            <th>Customer Name</th>
            <th>Brand-Size</th>
            <th>Quantity</th>
            <th>Metric</th>
            <th>Unit Price</th>
            <th>Total Before Discount</th>
            <th>Discount (%)</th>
            <th>Discounted Total</th>
            <th>Cash Amount</th>
            <th>Transfer Amount</th>
            <th>Use Both Payments</th>
            <th>Date</th>
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
                <td>{record.customerName}</td>
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
                <td>₦{record.cashAmount}</td>
                <td>₦{record.transferAmount}</td>
                <td>{record.useBothPayments ? "Yes" : "No"}</td>
                <td>{new Date(record.date).toLocaleString()}</td>
                <td>{record.remarks}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <section className="sales-record-section">
        <h2>Sales Records</h2>
        {loading ? (
          <div className="text">Loading...</div>
        ) : (
          <div>{renderSalesRecordsTable()}</div>
        )}
      </section>
    </div>
  );
};

export default SalesRecord;
