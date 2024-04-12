//refundHistory
import React, { useState, useEffect } from "react";

const simulatedRefundRecords = [
  {
    id: "1234",
    customerName: "John Doe",
    date: "2024-02-10T10:00:00Z",
    items: [
      { brand: "Brand A", size: "M", quantity: 1, unitPrice: 100, total: 100 },
    ],
    totalAmount: 100,
  },
  // Add more simulated records as needed
];

export const RefundHistory = () => {
  const [refundRecords, setRefundRecords] = useState([]);

  useEffect(() => {
    setRefundRecords(simulatedRefundRecords);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      <h2 className="text-2xl font-bold text-center text-green-900 mb-6">
        Refund History
      </h2>

      {refundRecords.length > 0 ? (
        <ul className="list-disc ml-4">
          {refundRecords.map((record) => (
            <li key={record.id} className="mb-4">
              {record.customerName} - {record.date} - ₦{record.totalAmount}
              <p>
                Customer: {record.customerName} - Date:{" "}
                {new Date(record.date).toLocaleDateString()}
              </p>
              <ul className="list-disc ml-4">
                {record.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between mb-2"
                  >
                    <div className="text-gray-700">
                      {item.brand}-{item.size}-{item.metric} - ₦{item.unitPrice}{" "}
                      - Qty: {item.quantity} - Total: ₦{item.total}
                    </div>
                  </li>
                ))}
              </ul>
              <p className="text-gray-700">
                Total Refund Amount: ₦{record.totalAmount}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-700">No refund records found.</p>
      )}
    </div>
  );
};
