import React from "react";

export const AvailableStockTable = ({ data }) => {
  return (
    <div className="available-stock-table flex flex-col h-full">
      {/* Title */}
      <h2 className="text-center font-bold text-xl mb-4">Available Stock</h2>

      {/* Table */}
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left px-4 py-2 font-medium">Brand</th>
            <th className="text-left px-4 py-2 font-medium">Size</th>
            <th className="text-left px-4 py-2 font-medium">Quantity (Bags)</th>
            <th className="text-left px-4 py-2 font-medium">Quantity (Kg)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record) => (
            <tr key={record.id} className="border-b">
              <td className="text-left px-4 py-2">{record.brand}</td>
              <td className="text-left px-4 py-2">{record.size}</td>
              <td className="text-left px-4 py-2">{record.quantityBags}</td>
              <td className="text-left px-4 py-2">{record.quantityKg}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AvailableStockTable;
