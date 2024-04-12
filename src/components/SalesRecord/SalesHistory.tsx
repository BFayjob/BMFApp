// salesHistory.js

import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { getItems } from "../../aws.ts";
import {
  DynamoDBItem,
  parseDynamoDBResponse,
  SalesTransaction,
} from "../../demo.ts";

export const SalesHistory = ({ date }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [salesRecords, setSalesRecords] = useState<SalesTransaction[]>([]);
  // const [SelectedDates, setSelectedDates] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSalesRecords = async () => {
      try {
        setLoading(true);
        const data = await getItems({ TableName: "sales" });
        if (!data || !data.Items) return;

        const parsedRecords = data.Items.map((item) =>
          parseDynamoDBResponse(item as DynamoDBItem)
        );
        setSalesRecords(parsedRecords);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesRecords();
  }, []); // Empty dependency array ensures this useEffect runs only once on component mount

  // Memoize formatDataForCSV to prevent unnecessary re-renders
  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setSelectedDate(selectedDate);
  };
  const formatDataForCSV = (selectedRecords: SalesTransaction[]) => {
    const csvData = [
      // Add headers for the CSV file
      [
        "Brand-Size",
        "Quantity",
        "Metric",
        "Unit Price",
        "Total ",
        "Customer Name",
        "Cash Amount",
        "Transfer Amount",
        "Use Both Payments",
        "Remarks",
      ],
      ...selectedRecords.map((record) => {
        // Separate cells for Brand and Size (assuming first item)
        const firstItem = record.items[0]; // Assuming first item represents 'Brand-Size'
        console.log(record);

        // Iterate through items for individual values
        const itemDetails = record.items.map((item) => [
          item.quantity,
          item.metric,
          item.unitPrice,
        ]);

        // Flatten item details into separate columns
        return [
          `${firstItem.brand}-${firstItem.size}`,
          ...itemDetails.flat(),
          record.totalBeforeDiscount,
          record.discount,
          record.customerName,
          record.cashAmount,
          record.transferAmount,
          record.useBothPayments ? "Yes" : "No",
          record.remarks,
        ];
      }),
    ];

    return csvData;
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
            <th>Total</th>
            <th>Customer Name</th>
            <th>Cash Amount</th>
            <th>Transfer Amount</th>
            <th>Use Both Payments</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {salesRecords.map((record, index) => {
            return (
              <tr key={index}>
                <td className="sales-record-cell border border-gray-300 p-2 text-center">
                  {record.items.map((item, itemIndex) => (
                    <div key={itemIndex}>{`${item.brand}-${item.size}`}</div>
                  ))}
                </td>
                <td className="sales-record-cell border border-gray-300 p-2 text-center">
                  {record.items.map((item, itemIndex) => (
                    <div key={itemIndex}>{`${item.quantity}`}</div>
                  ))}
                </td>
                <td className="sales-record-cell border border-gray-300 p-2 text-center">
                  {record.items.map((item, itemIndex) => (
                    <div key={itemIndex}>{`${item.metric}`}</div>
                  ))}
                </td>
                <td className="sales-record-cell border border-gray-300 p-2 text-center">
                  {record.items.map((item, itemIndex) => (
                    <div key={itemIndex}>{`₦${item.unitPrice}`}</div>
                  ))}
                </td>
                <td className="sales-record-cell border border-gray-300 p-2 text-center">
                  ₦{record.totalBeforeDiscount}
                </td>

                <td className="sales-record-cell border border-gray-300 p-2 text-center">
                  {record.customerName}
                </td>
                <td className="sales-record-cell border border-gray-300 p-2 text-center">
                  ₦{record.cashAmount}
                </td>
                <td className="sales-record-cell border border-gray-300 p-2 text-center">
                  ₦{record.transferAmount}
                </td>
                <td className="sales-record-cell border border-gray-300 p-2 text-center">
                  {record.useBothPayments ? "Yes" : "No"}
                </td>
                <td className="sales-record-cell border border-gray-300 p-2 text-center">
                  {record.remarks}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div className="sales-history-wrapper bg-cream p-4 mt-[40px] rounded shadow-md">
      <h2 className="wrapper-title text-2xl font-bold mb-4 text-center">
        Sales History
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
        <div className="loading-text text-center">Loading...</div>
      ) : (
        <div className="sales-records-table grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-full overflow-x-auto flex items-center justify-center">
          {renderSalesRecordsTable()}

          <CSVLink
            data={formatDataForCSV(salesRecords)}
            filename={`sales-history-${date}.csv`}
            className="w-1/10 py-2 px-4 bg-green-950 text-white font-bold rounded-md shadow-md hover:bg-army-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-army-green-light"
          >
            Download CSV
          </CSVLink>
        </div>
      )}
    </div>
  );
};

export default SalesHistory;
