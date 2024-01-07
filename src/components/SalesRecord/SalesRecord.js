// SalesRecord.js
import React, { useState, useEffect } from 'react';

const SalesRecord = () => {
  const [salesRecords, setSalesRecords] = useState([]);

  useEffect(() => {
    // Example: Fetch data from a Firestore collection
    const fetchData = async () => {
      // Replace 'yourCollection' with the actual Firestore collection name
      const response = await firestore.collection('SalesRecord').get();

      // Extract data from the response
      const data = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSalesRecords(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Sales Record</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th> {/* New Date column */}
            <th>Brand</th>
            <th>Size</th>
            <th>Metric</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {salesRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.date && new Date(record.date).toLocaleDateString()}</td> {/* Display date */}
              <td>{record.brand}</td>
              <td>{record.size}</td>
              <td>{record.metric}</td>
              <td>{record.quantity}</td>
              <td>{record.unitPrice}</td>
              <td>{record.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesRecord;
