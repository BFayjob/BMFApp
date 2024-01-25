import React, { useState, useEffect } from 'react';
import { stockRecordPath, getDocs } from "../../firebase.js";

export const StockRecord = () => {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchStockRecords();
  }, [selectedDate]);

  const fetchStockRecords = async () => {
    setLoading(true);
    try {
      const stockSnapshot = await getDocs(stockRecordPath);
      const stockData = stockSnapshot.docs.map((doc) => doc.data());
      // Assuming you have a field named 'timestamp' in your stock records
      const currentTimestamp = new Date().getHours();

      const openingStockData = stockData.filter(record => {
        const recordTimestamp = new Date(record.timestamp).getHours();
        return recordTimestamp <= 6;
      });

      const closingStockData = stockData.filter(record => {
        const recordTimestamp = new Date(record.timestamp).getHours();
        return recordTimestamp >= 20;
      });

      setStock({
        openingStock: openingStockData,
        closingStock: closingStockData,
      });
    } catch (error) {
      console.error('Fetch failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setSelectedDate(selectedDate);
  };

  return (
    <div>
      <h2>Stock Records</h2>
      <label>Select Date: </label>
      <input
        type="date"
        value={selectedDate.toISOString().split('T')[0]}
        onChange={handleDateChange}
      />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex">
          <div>
            <h3>Opening Stock Records</h3>
            <table className="table">
              {/* Opening stock table structure */}
            </table>
          </div>

          <div>
            <h3>Closing Stock Records</h3>
            <table className="table">
              {/* Closing stock table structure */}
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockRecord;
