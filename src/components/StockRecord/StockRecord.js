import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import SalesRecord from './SalesRecord';
import { firestore } from '../../firebase'; // Import your Firebase configuration

export const StockRecord = () => {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStockRecords();
  }, []);

  const fetchStockRecords = async () => {
    setLoading(true);
    try {
      const stockCollection = collection(firestore, "stockRecords");
      const stockSnapshot = await getDocs(stockCollection);
      const stockData = stockSnapshot.docs.map((doc) => doc.data());
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
                <td>{record.quantityInBags}</td>
                <td>{record.quantityInKg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <SalesRecord onUpdate={fetchStockRecords} />
    </div>
  );
};

export default StockRecord;
