import React, { useState, useEffect } from "react";
import { WelcomeMessage } from "./WelcomeMessage"; // Adjust the import path
import { SalesForm } from "./SalesForm/SalesForm";
import { SalesHistory } from "./SalesRecord/SalesHistory.js"; // Adjust the path based on your project structure
import { AvailableStockTable } from "./AvailableStockTable.js"; // Adjust the path based on your project structure

export const Dashboard = () => {
  // Mock stock data (replace with your desired structure)
  const mockStockData = [
    { brand: "Bluecrown", size: "2mm", quantityBags: 23, quantityKg: 4 },
    { brand: "Ecofloat", size: "3mm", quantityBags: 5.5, quantityKg: 0 },
    // ... more mock records
  ];

  const [stockRecords, setStockRecords] = useState(mockStockData);

  // Replace this with your sales update logic when integrating with an API
  const updateStockOnSale = (soldItems) => {
    // Simulate stock update based on sold items
    setStockRecords((prevRecords) =>
      prevRecords.map((record) => {
        const soldItem = soldItems.find(
          (item) => item.brand === record.brand && item.size === record.size
        );

        if (soldItem) {
          record.quantityBags -= soldItem.quantityBags;
          record.quantityKg -= soldItem.quantityKg;
        }

        return record;
      })
    );
  };

  return (
    <div className="dashboard-container flex flex-col h-screen">
      {/* Welcome Message */}
      <WelcomeMessage username="BOLUWATIFE" className="mb-4 w-full bg-gray-200 p-4 text-center font-bold text-xl" />

      {/* Available Stock and Sales Form (side-by-side) */}
      <div className="flex flex-row mb-4">
        <div className="available-stock w-1/2 flex-grow mr-4 bg-gray-100 rounded shadow-md p-4">
          <AvailableStockTable data={stockRecords} />
        </div>
        <div className="sales-form w-1/2 flex-grow">
          <SalesForm
            // ... sales form props
            onSaleMade={updateStockOnSale} // Pass updateStockOnSale directly
          />
        </div>
      </div>

      {/* Sales History (spans full width) */}
      <div className="sales-history w-full flex-grow">
        <SalesHistory isDashboard={true} />
      </div>
    </div>
  );
};

export default Dashboard;
