// SalesForm.js
import React, { useState, useEffect } from "react";
import "./SalesForm.css";
import "tailwindcss/tailwind.css";
import { addDoc, collectionPath } from "../../firebase";

export const SalesForm = () => {
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [metric, setMetric] = useState("Bag");
  const [unitPrice, setUnitPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [remarks, setRemarks] = useState("");

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
    Ace: ["3mm", "4mm", "6mm", "8mm"],
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
    // Clear quantity when changing metric to avoid conflicts
    setQuantity("");

    // Fetch unit price based on the selected metric
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

  // Inside handleSubmit function in SalesForm.js
  const handleSubmit = async (e) => {
    e.preventDefault();

    const shouldSubmit = window.confirm(
      "Are you sure you want to submit this sale?"
    );

    if (shouldSubmit) {
      // ... Other code to store data in Firestore or your database ...

      

      await addDoc(collectionPath, {
        brand,
        size,
        quantity,
        metric,
        unitPrice,
        totalPrice,
        date: new Date().toISOString(), // Use the current date
        remarks,
      });

      setBrand("");
      setSize("");
      setQuantity("");
      setMetric("Bag");
      setUnitPrice(0);
      setTotalPrice(0);
      setRemarks("");
    }
  };

  return (
    <div>
      <section className='sales-form-section'>
      <h2>Sales Form</h2>
      <form onSubmit={handleSubmit}>
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

        <button type="submit">Submit</button>
      </form>
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
