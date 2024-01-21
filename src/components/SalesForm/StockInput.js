// StockInput.js
import React, { useState } from "react";
import { addDoc, collectionPath } from "../../firebase";

export const StockInput = () => {
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [metric, setMetric] = useState("Bag");
  

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

    
  };

  // Inside handleSubmit function in StockInput.js
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
        date: new Date().toISOString(), // Use the current date
      });

      setBrand("");
      setSize("");
      setQuantity("");
      setMetric("Bag");
      
    }
  };

  return (
    <div>
      <section className='sales-form-section'>
      <h2>Stock Input</h2>
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

        <button type="submit">Submit</button>
      </form>
      </section>
    </div>
  );
};



export default StockInput;
