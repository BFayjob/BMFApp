import React, { useState, useEffect } from 'react';

const OrderManagement = () => {
  // State to manage the list of customer orders
  const [orders, setOrders] = useState([]);
  
  // State to manage the current order being created
  const [currentOrder, setCurrentOrder] = useState({
    brand: "",
    size: "",
    quantity: 0,
    // Add more fields as needed
  });

  // State for discount percentage
  const [discountPercentage, setDiscountPercentage] = useState(0);

  // State for customer name
  const [customerName, setCustomerName] = useState("");

  // Function to add an item to the current order
  const addItemToOrder = () => {
    // Validate the item and add it to the current order
    // You can add more validation as needed
    if (currentOrder.brand && currentOrder.size && currentOrder.quantity > 0) {
      setOrders([...orders, currentOrder]);
      setCurrentOrder({
        brand: "",
        size: "",
        quantity: 0,
        // Reset other fields as needed
      });
    } else {
      // Display an error message or handle invalid input
    }
  };

  // Function to remove an item from the current order
  const removeItemFromOrder = (index) => {
    const updatedOrders = [...orders];
    updatedOrders.splice(index, 1);
    setOrders(updatedOrders);
  };

  // Function to calculate the total price of the order
  const calculateTotalPrice = () => {
    const totalPrice = orders.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0
    );

    // Apply discount if any
    const discountedPrice = totalPrice - (totalPrice * discountPercentage) / 100;

    return discountedPrice;
  };

  // Function to handle order submission
  const submitOrder = () => {
    // Perform any final validation before submitting the order
    const total = calculateTotalPrice();

    // Create an object representing the order to be added to the sales records
    const orderData = {
      // Include necessary fields from the current order and additional data
      // For example: customerName, remarks, date, etc.
      customerName,
      total,
      items: orders,
      date: new Date().toISOString(),
    };

    // Now you can send this orderData to your sales record or perform other actions

    // Optionally, you can reset the component state for a new order
    setOrders([]);
    setCurrentOrder({
      brand: "",
      size: "",
      quantity: 0,
      // Reset other fields as needed
    });
    setDiscountPercentage(0);
    setCustomerName("");
  };

  return (
    <div>
      <h2>Order Management</h2>
      <div>
        {/* Form for adding items to the order */}
        <label>
          Brand:
          <input
            type="text"
            value={currentOrder.brand}
            onChange={(e) =>
              setCurrentOrder({ ...currentOrder, brand: e.target.value })
            }
          />
        </label>
        <label>
          Size:
          <input
            type="text"
            value={currentOrder.size}
            onChange={(e) =>
              setCurrentOrder({ ...currentOrder, size: e.target.value })
            }
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            value={currentOrder.quantity}
            onChange={(e) =>
              setCurrentOrder({
                ...currentOrder,
                quantity: parseInt(e.target.value, 10),
              })
            }
          />
        </label>
        {/* Add more input fields for other order details */}
        <button onClick={addItemToOrder}>Add Item</button>
      </div>

      {/* Display the list of items in the current order */}
      <div>
        <h3>Current Order</h3>
        <ul>
          {orders.map((item, index) => (
            <li key={index}>
              {item.brand} - {item.size} - {item.quantity}{' '}
              <button onClick={() => removeItemFromOrder(index)}>
                Remove Item
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Other order details, such as customer name, discount, remarks, etc. */}
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
          Discount (%):
          <input
            type="number"
            value={discountPercentage}
            onChange={(e) =>
              setDiscountPercentage(parseInt(e.target.value, 10))
            }
          />
        </label>
        {/* Add more input fields for other order details */}

        {/* Calculate and display the total price of the order */}
        <div>
          <h4>Total Price: ${calculateTotalPrice()}</h4>
        </div>

        {/* Button to submit the order */}
        <button onClick={submitOrder}>Submit Order</button>
      </div>
    </div>
  );
};

export default OrderManagement;
