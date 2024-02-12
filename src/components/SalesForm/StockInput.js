// StockInput.js
import React, { useState } from "react";
import { addDoc, stockRecordPath } from "../../firebase";

export const StockInput = () => {
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [metric, setMetric] = useState("Bag");

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

      setLoading(true);

      await addDoc(stockRecordPath, {
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
      setLoading(false);
    }
  };

  return (
    <div className=" container mx-auto px-4 py-8 bg-gray-100">
      <div className=" bg-cream-400 rounded-lg shadow-md p-4">
      <section className="sales-form-section">
        <h2 className="text-2xl font-bold text-center text-army-green-500 mb-6">Stock Input</h2>
        {loading ? (
          <div className="text-center">Loading</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-gray-700 font-medium mb-2">
              Brand:
              <select
                value={brand}
                onChange={handleBrandChange}
                className="appearance-none rounded-md border border-army-green-300 px-3 py-2 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-army-green-500"
              >
                <option value="">Select Brand</option>
                {brands.map((brandOption) => (
                  <option key={brandOption} value={brandOption}>
                    {brandOption}
                  </option>
                ))}
              </select>
            </label>
  
            {brand && (
              <label className="block text-gray-700 font-medium mb-2">
                Size:
                <select
                  value={size}
                  onChange={handleSizeChange}
                  className="appearance-none rounded-md border border-army-green-300 px-3 py-2 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-army-green-500"
                >
                  <option value="">Select Size</option>
                  {sizesByBrand[brand].map((sizeOption) => (
                    <option key={sizeOption} value={sizeOption}>
                      {sizeOption}
                    </option>
                  ))}
                </select>
              </label>
            )}
  
            <label className="block text-gray-700 font-medium mb-2">
              Metric:
              <select
                value={metric}
                onChange={handleMetricChange}
                className="appearance-none rounded-md border border-army-green-300 px-3 py-2 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-army-green-500"
              >
                <option value="Bag">Bag</option>
                <option value="Kg">Kg</option>
                <option value="HalfBag">HalfBag</option>
              </select>
            </label>
  
            <label className="block text-gray-700 font-medium mb-2">
              Quantity:
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                required
                className="appearance-none rounded-md border border-army-green-300 px-3 py-2 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-army-green-500"
              />
            </label>
  
            <button type="submit" className="bg-green-900 text-white px-4 py-2 text-center rounded-md font-medium hover:bg-army-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700">
              Submit
            </button>
          </form>
        )}
      </section>
    </div>
    </div>
  );
  
};

export default StockInput;
