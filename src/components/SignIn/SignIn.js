import React, { useState, useEffect } from "react";
import { addDoc, stockRecordPath, refundRecordPath } from "../../firebase";
import "./SignIn.css"; // Make sure to create a corresponding CSS file

const CustomerSearchDialog = ({ customerNameDatePairs, onSearch }) => {
  const [customerName, setCustomerName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleSearch = () => {
    // Perform the search operation based on customerName and selectedDate
    onSearch(customerName, selectedDate);
  };

  return (
    <div>
      <label>
        Customer Name:
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </label>

      <label>
        Purchase Date:
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </label>

      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export const SignIn = () => {
  const [customerNameDatePairs, setCustomerNameDatePairs] = useState([]);
  const [selectedCustomerNameDatePair] = useState(null);
  const [salesRecords, setSalesRecords] = useState([]);
  const [refundItems, setRefundItems] = useState([]);
  const [refundAmount, setRefundAmount] = useState(0);

  useEffect(() => {
    // Fetch customer name-date pairs for the search dropdown
    fetchCustomerNameDatePairs();
  }, []);

  const fetchCustomerNameDatePairs = async () => {
    // Replace this with actual logic to fetch customer name-date pairs
    // from your database or wherever they are stored
    const nameDatePairsFromDatabase = [
      // Example format
      { customerName: "John Doe", date: "2024-01-06T12:30:00Z" },
      // ... Add more pairs as needed
    ];

    setCustomerNameDatePairs(nameDatePairsFromDatabase);
  };

  const handleSearch = (customerName, selectedDate) => {
    // Implement logic to fetch sales records based on customerName and selectedDate
    // Update the component state to display the fetched items
    // For simplicity, assume fetchedItems is an array of purchased items

    const fetchedItems = [
      // Example items, replace with actual fetched items
      {
        date: "2024-01-06T12:30:00Z",
        brand: "Bluecrown",
        size: "2mm",
        quantity: 5,
        metric: "Bag",
        unitPrice: 17700,
        total: 80000,
      },
      // Add more items as needed
    ];

    // Display the fetched items in the component
    // You need to implement the rendering logic based on your UI design
    console.log("Fetched Items:", fetchedItems);
    setSalesRecords(fetchedItems);
  };

  const handleAddToRefund = (selectedRecord, selectedItem) => {
    // Prompt the user for the quantity to refund
    const quantityToRefund = prompt(`Enter quantity to refund for ${selectedItem.brand}-${selectedItem.size}-${selectedItem.metric}`);
  
    // Check if the user entered a valid quantity
    if (quantityToRefund === null || isNaN(quantityToRefund) || quantityToRefund <= 0 || quantityToRefund > selectedItem.quantity) {
      // Handle invalid input or cancellation
      return;
    }

    // Calculate total based on the entered quantity and unit price
    const total = quantityToRefund * selectedItem.unitPrice;

    // Add the selected item to the refund items list
    const newItem = {
      date: selectedRecord.date,
      brand: selectedItem.brand,
      size: selectedItem.size,
      metric: selectedItem.metric,
      unitPrice: selectedItem.unitPrice,
      quantity: quantityToRefund,
      total,
    };
    setRefundItems([...refundItems, newItem]);
  };

  const handleRemoveFromRefund = (index) => {
    // Remove the selected item from the refund items list
    const updatedRefundItems = [...refundItems];
    updatedRefundItems.splice(index, 1);
    setRefundItems(updatedRefundItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update sales refund record with refund information
      await addDoc(refundRecordPath, {
        customerName: selectedCustomerNameDatePair.customerName,
        date: selectedCustomerNameDatePair.date,
        items: refundItems,
        totalAmount: refundAmount,
        dateProcessed: new Date().toISOString(),
        // ... Other fields ...
      });

      // Update stock record with returned items
      await addDoc(stockRecordPath, {
        items: refundItems,
        date: new Date().toISOString(),
        remarks: "Returned items from refund",
        // ... Other fields ...
      });

      // Handle financial transactions (e.g., issue a refund to the customer)
      // Add your financial transactions code here

      // Clear refund form after a successful refund
      setRefundItems([]);
      setRefundAmount(0);

      // Inform the user about the successful refund
      alert("Refund successful");
    } catch (error) {
      console.error("Error processing refund:", error);
    }
  };

  return (
    <div>
      <h2>Refund Form</h2>

      <CustomerSearchDialog
        customerNameDatePairs={customerNameDatePairs}
        onSearch={handleSearch}
      />

      {selectedCustomerNameDatePair && (
        <div>
          <h3>Sales Records for {selectedCustomerNameDatePair.customerName} on {new Date(selectedCustomerNameDatePair.date).toLocaleDateString()}</h3>
          {salesRecords.length > 0 ? (
            <ul>
              {salesRecords.map((record, index) => (
                <li key={index}>
                  <p>Date: {new Date(record.date).toLocaleString()}</p>
                  <ul>
                    {record.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        Brand: {item.brand}, Size: {item.size}, Quantity: {item.quantity}, Metric: {item.metric}, Unit Price: ₦{item.unitPrice}, Total: ₦{item.total}
                        <button type="button" onClick={() => handleAddToRefund(record, item)}>
                          Add to Refund
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>No sales records found for the selected customer name and date.</p>
          )}
        </div>
      )}

      <ul>
        {refundItems.map((item, index) => (
          <li key={index}>
            {item.brand}-{item.size}-{item.metric} - ₦{item.unitPrice} - Qty: {item.quantity} - Total: ₦{item.total}
            <button type="button" onClick={() => handleRemoveFromRefund(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <label>
        Refund Amount: ₦
        <input
          type="number"
          value={refundAmount}
          onChange={(e) => setRefundAmount(e.target.value)}
        />
      </label>

      <button type="submit" onClick={handleSubmit}>Process Refund</button>
    </div>
  );
};

export default SignIn;
