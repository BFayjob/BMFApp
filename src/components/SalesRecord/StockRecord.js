import React, { useState, useEffect } from "react";

export const StockRecord = () => {
  // const [setStock] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // eslint-disable-next-line
  useEffect(() => {
    fetchStockRecords();
    // eslint-disable-next-line
  }, [selectedDate]);

  const fetchStockRecords = async () => {
    setLoading(true);
    try {
      // const stockSnapshot = await getDocs(stockRecordPath);
      // const stockData = stockSnapshot.docs.map((doc) => doc.data());
      // // Assuming you have a field named 'timestamp' in your stock records
      // const openingStockData = stockData.filter(record => {
      //   const recordTimestamp = new Date(record.timestamp).getHours();
      //   return recordTimestamp <= 6;
      // });
      // const closingStockData = stockData.filter(record => {
      //   const recordTimestamp = new Date(record.timestamp).getHours();
      //   return recordTimestamp >= 20;
      // });
      // setStock({
      //   openingStock: openingStockData,
      //   closingStock: closingStockData,
      // });
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setSelectedDate(selectedDate);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 ">
      <h2 className="text-2xl font-bold text-army-green-500 mb-4">
        Stock Records
      </h2>

      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Date:
      </label>
      <input
        type="date"
        value={selectedDate.toISOString().split("T")[0]}
        onChange={handleDateChange}
        className="appearance-none rounded-md border border-army-green-300 px-3 py-2 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-army-green-500"
      />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="bg-cream-400 rounded-md shadow-md p-4">
            <h3 className="text-xl font-bold text-army-green-500 mb-2">
              Opening Stock Records
            </h3>
            <table className="table">
              {/* Opening stock table structure */}
            </table>
          </div>

          <div className="bg-cream-400 rounded-md shadow-md p-4">
            <h3 className="text-xl font-bold text-army-green-500 mb-2">
              Closing Stock Records
            </h3>
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
