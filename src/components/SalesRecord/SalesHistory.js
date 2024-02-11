// salesHistory.js

import React, { useState, useEffect } from "react";
import { CSVLink } from 'react-csv';
import {DayPicker} from 'react-day-picker';



export const SalesHistory = ({ isDashboard, date }) => {
  const [salesRecords, setSalesRecords] = useState([]);
  const [ SelectedDates, setSelectedDates] = useState(null);
  const [loading, setLoading] = useState(false);


  const fetchSalesRecords = async (startDate, endDate) => {
    try {
      setLoading(true);

      // Simulate fetching sales records from the database
      const fetchedRecords = await fetchSalesRecordsFromDatabase();

       // Filter records based on `isDashboard` and `date`

      setSalesRecords(fetchedRecords);
    } catch (error) {
      console.error("Error fetching sales records:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    // Fetch sales records only when necessary
    if (!isDashboard && date) {
      fetchSalesRecords(date.startDate, date.endDate);
    }
    // eslint-disable-next-line
  }, [isDashboard, date]);

  const handleDateChange = (newDates) => {
    setSelectedDates(newDates);
    if (!isDashboard) {
      fetchSalesRecords(newDates[0], newDates[newDates.length - 1]); // Use first and last dates
    }
  };

  // Memoize formatDataForCSV to prevent unnecessary re-renders

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
        remarks: "Customer satisfied with the purchase.",
      },
      // Add more records as needed
    ];

    return recordsFromDatabase;
  };

  const formatDataForCSV = (selectedRecords) => {
    const csvData = [
      // Add headers for the CSV file
      ['Brand-Size', 'Quantity', 'Metric', 'Unit Price', 'Total Before Discount', 'Discount (%)', 'Discounted Total', 'Customer Name', 'Cash Amount', 'Transfer Amount', 'Use Both Payments', 'Remarks'],
      ...selectedRecords.map((record) => {
        // Separate cells for Brand and Size (assuming first item)
        const firstItem = record.items[0]; // Assuming first item represents 'Brand-Size'
  
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
          // Calculate discounted total based on discount or use original value
          record.discount > 0
            ? record.totalBeforeDiscount * (1 - record.discount / 100)
            : record.totalBeforeDiscount, // Use original if no discount
          record.customerName,
          record.cashAmount,
          record.transferAmount,
          record.useBothPayments ? 'Yes' : 'No',
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
            <th>Total Before Discount</th>
            <th>Discount (%)</th>
            <th>Discounted Total</th>
            <th>Customer Name</th>
            <th>Cash Amount</th>
            <th>Transfer Amount</th>
            <th>Use Both Payments</th>
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
                <td className="sales-record-cell border border-gray-300 p-2 text-center">₦{record.totalBeforeDiscount}</td>
                <td className="sales-record-cell border border-gray-300 p-2 text-center">{record.discount}%</td>
                <td className="sales-record-cell border border-gray-300 p-2 text-center">₦{discountedTotal}</td>
                <td className="sales-record-cell border border-gray-300 p-2 text-center">{record.customerName}</td>
                <td className="sales-record-cell border border-gray-300 p-2 text-center">₦{record.cashAmount}</td>
                <td className="sales-record-cell border border-gray-300 p-2 text-center">₦{record.transferAmount}</td>
                <td className="sales-record-cell border border-gray-300 p-2 text-center">{record.useBothPayments ? "Yes" : "No"}</td>
                <td className="sales-record-cell border border-gray-300 p-2 text-center">{record.remarks}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };



  return (
    <div className="sales-history-wrapper bg-cream p-4 rounded shadow-md  ">
       <DayPicker
        selected={SelectedDates}
        onDayClick={handleDateChange}
        modifiers={{
          selected: {
            backgroundColor: 'lightblue',
          },
        }}
      />
      <h2 className="wrapper-title text-2xl font-bold mb-4 text-center">Sales History</h2>
      {loading ? (
        <div className="loading-text text-center">Loading...</div>
      ) : (
        <div className="sales-records-table grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-full overflow-x-auto flex items-center justify-center">
          {/* Render table content here */}
          {renderSalesRecordsTable(salesRecords)}

          <CSVLink
  data={formatDataForCSV(salesRecords)} // Pass the formatted data
  filename={`sales-history-${date}.csv`} className="w-1/10 py-2 px-4 bg-green-950 text-white font-bold rounded-md shadow-md hover:bg-army-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-army-green-light" // Customize filename with the selected date
>
  Download CSV
</CSVLink>
        </div>
      )}
    </div>
  );
  
};

export default SalesHistory;
