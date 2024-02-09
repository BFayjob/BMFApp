import React, { useState, useEffect } from "react";
import "./SalesForm.css";
import { addDoc, salesRecordPath } from "../../firebase";


export const SalesForm = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [metric, setMetric] = useState("Bag");
  const [unitPrice, setUnitPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [remarks, setRemarks] = useState("");
  const [discount, setDiscount] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [loading, setLoading] = useState(false);

  const brands = [
    "Bluecrown",
    "Ecofloat",
    "Coppens",
    "Alleraqua",
    "Vital",
    "Aqualis",
    "Alpha",
    "Ace",
  ];

  const [cashAmount, setCashAmount] = useState(0);
const [transferAmount, setTransferAmount] = useState(0);
const [useBothPayments, setUseBothPayments] = useState(false);

  const sizesByBrand = {
    Bluecrown: ["2mm", "3mm", "4mm", "6mm", "9mm"],
    Ecofloat: ["3mm", "4mm", "6mm", "9mm"],
    Alleraqua: [
      "0.2mm",
      "0.4mm",
      "0.5mm",
      "0.9mm",
      "1.3mm",
      "2mm",
      "3mm",
      "4mm",
    ],
    Coppens: [
      "0.2mm",
      "0.3mm",
      "0.5mm",
      "0.8mm",
      "1.2mm",
      "1.5mm",
      "2mm (45%)",
      "2mm (42%)",
    ],
    Vital: ["2mm", "3mm", "4mm", "6mm", "9mm"],
    Aqualis: ["2mm", "3mm", "4mm"],
    Alpha: ["4mm", "6mm", "8mm"],
    Ace: ["3mm", "4mm", "6mm", "8mm"],//
  };

  useEffect(() => {
    const fetchUnitPrice = async () => {
      try {
        // Simulate fetching unit price from a database based on brand, size, and metric
        const unitPriceFromDB = await fetchUnitPriceFromDatabase(
          brand,
          size,
          metric
        );
        setUnitPrice(unitPriceFromDB);
      } catch (error) {
        console.error("Error fetching unit price:", error);
      }
    };

    fetchUnitPrice();
  }, [brand, size, metric]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const quantityValue = parseFloat(quantity) || 0;
      const totalPriceValue = unitPrice * quantityValue;
      setTotalPrice(totalPriceValue);
    };

    calculateTotalPrice();
  }, [unitPrice, quantity]);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
    setSize("");
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleMetricChange = (e) => {
    setMetric(e.target.value);
    setQuantity(""); // Clear quantity when changing metric to avoid conflicts
    fetchUnitPrice();
  };

  const fetchUnitPrice = async () => {
    try {
      // Simulate fetching unit price from a database based on brand, size, and metric
      const unitPriceFromDB = await fetchUnitPriceFromDatabase(
        brand,
        size,
        metric
      );
      setUnitPrice(unitPriceFromDB);
    } catch (error) {
      console.error("Error fetching unit price:", error);
    }
  };

  const handleRemarksChange = (e) => {
    setRemarks(e.target.value);
  };

  const handleDiscountChange = (e) => {
    setDiscount(parseFloat(e.target.value) || 0);
  };

  const handleCustomerNameChange = (e) => {
    setCustomerName(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleAddToCart = () => {
    if (brand && size && quantity > 0) {
      setOrderItems([...orderItems, { brand, size, quantity, unitPrice }]);
      // Reset fields after adding to cart
      setBrand("");
      setSize("");
      setQuantity("");
      setMetric("Bag");
      setUnitPrice(0);
    } else {
      // Display an error message or handle invalid input
    }
  };

  const calculateOrderTotal = () => {
    return orderItems.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0
    );
  };

  const calculateDiscountedTotal = () => {
    const orderTotal = calculateOrderTotal();
    return orderTotal - (orderTotal * discount) / 100;
  };

  const handleCashAmountChange = (e) => {
    setCashAmount(parseFloat(e.target.value) || 0);
  };
  
  const handleTransferAmountChange = (e) => {
    setTransferAmount(parseFloat(e.target.value) || 0);
  };
  
  const handleUseBothPaymentsChange = (e) => {
    setUseBothPayments(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const shouldSubmit = window.confirm(
      "Are you sure you want to submit this sale?"
    );

    if (shouldSubmit) {
      setLoading(true);

      try {
        // Perform any actions before submitting the order

        // Simulate adding the order to the sales records
        await addDoc(salesRecordPath, {
          customerName,
          items: orderItems,
          totalBeforeDiscount: calculateOrderTotal(),
          discount,
          discountedTotal: calculateDiscountedTotal(),
          paymentMethod,
          date: new Date().toISOString(),
          remarks,
        });

        // Optionally, update stock or perform other actions

        // Reset the form after successful submission
        setOrderItems([]);
        setBrand("");
        setSize("");
        setQuantity("0");
        setMetric("Bag");
        setUnitPrice(0);
        setTotalPrice(0);
        setRemarks("");
        setDiscount("");
        setCustomerName("");
        setPaymentMethod("Cash");

        // Inform the user about successful submission
        alert('Order submitted successfully!');
      } catch (error) {
        console.error('Error submitting order:', error);
        // Handle error or inform the user about the failure
        alert('Error submitting order. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-cream text-army-green">
     <section className="sales-form-section p-4 rounded-lg">
       <h2 className="wrapper-title text-2xl font-bold mb-4 text-center">Sales Form</h2>
        {loading ? (
          <div className="text">Loading...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Existing form fields */}
            <label>
              Brand:
              <select value={brand} onChange={handleBrandChange}>
                <option value="">Select Brand</option>
                {brands.map((brandOption) => (
                  <option key={brandOption} value={brandOption}>
                    {brandOption}
                  </option>
                ))}
              </select>
            </label>

            {brand && (
              <label>
                Size:
                <select value={size} onChange={handleSizeChange}>
                  <option value="">Select Size</option>
                  {sizesByBrand[brand].map((sizeOption) => (
                    <option key={sizeOption} value={sizeOption}>
                      {sizeOption}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <label>
              Metric:
              <select value={metric} onChange={handleMetricChange}>
                <option value="Bag">Bag</option>
                <option value="Kg">Kg</option>
                <option value="HalfBag">HalfBag</option>
              </select>
            </label>

            <label>
              Quantity:
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                required
              />
            </label>

            <label>
              Unit Price:
              <input type="text" value={unitPrice} readOnly />
            </label>
            <label>
              Total:
              <input type="text" value={totalPrice} readOnly />
            </label>

            <label>
              Remarks:
              <input
                type="text"
                value={remarks}
                onChange={handleRemarksChange}
                placeholder="Enter remarks..."
              />
            </label>

            <label>
              Discount (%):
              <input
                type="number"
                value={discount}
                onChange={handleDiscountChange}
              />
            </label>

            <button
  type="button"
  onClick={handleAddToCart}
  className="bg-army-green text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-army-green-light hover:bg-army-green-dark"
>
  Add to Cart
</button>

            {/* Display the list of items in the current order */}
            <div>
              <h3>Order Items</h3>
              <ul>
                {orderItems.map((item, index) => (
                  <li key={index}>
                    {item.brand} - {item.size} - {item.quantity}{' '}
                    <button onClick={() => setOrderItems(orderItems.filter((_, i) => i !== index))}>
                      Remove Item
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Display total and discounted total */}
            <div>
              <h4>Total: ₦{calculateOrderTotal()}</h4>
              <h4>Discounted Total: ₦{calculateDiscountedTotal()}</h4>
            </div>

            {/* Additional input fields */}
            <label>
              Customer Name:
              <input
                type="text"
                value={customerName}
                onChange={handleCustomerNameChange}
              />
            </label>

            <label>
  Payment Method:
  <select value={paymentMethod} onChange={handlePaymentMethodChange}>
    <option value="Cash">Cash</option>
    <option value="Bank Transfer">Bank Transfer</option>
    <option value="Both">Both</option>
  </select>
</label>

{/* Input for Cash Amount */}
{paymentMethod === "Cash" || paymentMethod === "Both" ? (
  <label>
    Cash Amount (₦):
    <input
      type="number"
      value={cashAmount}
      onChange={handleCashAmountChange}
      disabled={paymentMethod === "Both" && !useBothPayments}
    />
  </label>
) : null}

{/* Input for Transfer Amount */}
{paymentMethod === "Bank Transfer" || paymentMethod === "Both" ? (
  <label>
    Transfer Amount (₦):
    <input
      type="number"
      value={transferAmount}
      onChange={handleTransferAmountChange}
      disabled={paymentMethod === "Both" && !useBothPayments}
    />
  </label>
) : null}

{/* Checkbox to indicate the use of both payments */}
{paymentMethod === "Both" ? (
  <label>
    Use both payments:
    <input
      type="checkbox"
      checked={useBothPayments}
      onChange={handleUseBothPaymentsChange}
    />
  </label>
) : null}

            

            {/* Add more input fields for other order details */}

            

            <button type="submit" className="bg-army-green text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-army-green-light hover:bg-army-green-dark">
  Submit Order
</button>          </form>
        )}
      </section>
    </div>
  );
};

const fetchUnitPriceFromDatabase = async (brand, size, metric) => {
  // Simulate fetching unit price from a database based on brand, size, and metric
  // Replace this with actual database fetching logic
  const unitPrices = {
    "Bluecrown-2mm-Bag": 17700,
    "Bluecrown-2mm-Kg": 1300,
    "Bluecrown-2mm-HalfBag": 8900, // Example price for HalfBag
    "Ecofloat-3mm-Bag": 12500,
    "Ecofloat-3mm-Kg": 1200,
    "Ecofloat-3mm-HalfBag": 6300, // Example price for HalfBag
    // ... add more unit prices as needed
  };

  const brandSizeKey = `${brand}-${size}-${metric}`;

  return unitPrices[brandSizeKey] || 0;
};

export default SalesForm;
