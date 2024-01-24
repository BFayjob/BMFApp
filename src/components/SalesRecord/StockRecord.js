//stockRecord.js
import React, { useState, useEffect } from 'react';
import { stockRecordPath, getDocs } from "../../firebase.js";


export const StockRecord = () => {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStockRecords();
  }, []);

  const fetchStockRecords = async () => {
    setLoading(true);
    try {
      const stockSnapshot = await getDocs(stockRecordPath);
      const stockData = stockSnapshot.docs.map((doc) => doc.data());
      console.log(stockData);
      setStock(stockData);
    } catch (error) {
      console.error('Fetch failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Stock Records</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Brand</th>
              <th>Size</th>
              <th>Quantity (in bags)</th>
              <th>Quantity (in kg)</th>
            </tr>
          </thead>
          <tbody>
            {stock.map((record, index) => (
              <tr key={index}>
                <td>{record.brand}</td>
                <td>{record.size}</td>
                <td>{record.quantity}</td>
                <td>{record.quantityInKg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* <SalesRecord onUpdate={fetchStockRecords} /> */}
    </div>
  );
};

export default StockRecord;
