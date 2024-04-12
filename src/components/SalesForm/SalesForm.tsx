import React, { useState, useEffect } from "react";
import { createItem } from "../../aws.ts";
// import { parsedTransaction } from "../../demo.ts";
import { v4 } from "uuid";

interface OrderItem {
  brand: string;
  size: string;
  quantity: number;
  unitPrice: number;
}

const SalesForm: React.FC = () => {
  // console.log(parsedTransaction);

  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [brand, setBrand] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("0");
  const [metric, setMetric] = useState<string>("Bag");
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [remarks, setRemarks] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [customerName, setCustomerName] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("Cash");
  const [loading, setLoading] = useState<boolean>(false);

  const brands: string[] = [
    "Bluecrown",
    "Ecofloat",
    "Coppens",
    "Alleraqua",
    "Vital",
    "Aqualis",
    "Alpha",
    "Ace",
  ];

  const [cashAmount, setCashAmount] = useState<number>(0);
  const [transferAmount, setTransferAmount] = useState<number>(0);
  const [useBothPayments, setUseBothPayments] = useState<boolean>(false);

  const sizesByBrand: Record<string, string[]> = {
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

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBrand(e.target.value);
    setSize("");
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(e.target.value);
  };

  const handleMetricChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMetric(e.target.value);
    setQuantity("0");
    fetchUnitPrice();
  };

  const fetchUnitPrice = async () => {
    try {
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

  const handleRemarksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemarks(e.target.value);
  };

  const handleCustomerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerName(e.target.value);
  };

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPaymentMethod(e.target.value);
  };

  const handleAddToCart = () => {
    if (brand && size && parseInt(quantity) > 0) {
      setOrderItems([
        ...orderItems,
        { brand, size, quantity: parseInt(quantity), unitPrice },
      ]);
      setBrand("");
      setSize("");
      setQuantity("0");
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

  const handleCashAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCashAmount(parseFloat(e.target.value) || 0);
  };

  const handleTransferAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTransferAmount(parseFloat(e.target.value) || 0);
  };

  const handleUseBothPaymentsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUseBothPayments(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const shouldSubmit = window.confirm(
      "Are you sure you want to submit this sale?"
    );

    if (shouldSubmit) {
      setLoading(true);

      try {
        const id = v4();
        const datas = {
          TableName: "sales",
          Item: {
            id: { S: id },
            customerName: { S: customerName },
            items: {
              L: orderItems.map((item) => ({
                M: {
                  brand: { S: item.brand },
                  size: { S: item.size },
                  quantity: { S: item.quantity.toString() },
                  unitPrice: { S: item.unitPrice.toString() },
                },
              })),
            },
            totalBeforeDiscount: { S: calculateOrderTotal().toString() },
            discount: { S: discount.toString() },
            discountedTotal: { S: calculateDiscountedTotal().toString() },
            paymentMethod: { S: paymentMethod },
            date: { S: new Date().toISOString() },
            remarks: { S: remarks },
          },
        };

        await createItem(datas);

        setOrderItems([]);
        setBrand("");
        setSize("");
        setQuantity("0");
        setMetric("Bag");
        setUnitPrice(0);
        setTotalPrice(0);
        setRemarks("");
        setDiscount(0);
        setCustomerName("");
        setPaymentMethod("Cash");

        alert("Order submitted successfully!");
      } catch (error) {
        console.error("Error submitting order:", error);
        alert("Error submitting order. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-center items-center">
      <section className="max-w-md p-6 rounded-lg shadow-md bg-army-green-light text-army-green">
        <h2 className="text-2xl font-bold text-center mb-4">Sales Form</h2>
        {loading ? (
          <div className="text">Loading...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label className="block mb-2 font-medium text-sm">
              Brand:
              <select
                value={brand}
                onChange={handleBrandChange}
                className="w-full px-3 py-2 rounded-md border border-army-green-dark focus:border-2 focus:border-army-green"
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
              <label className="block mb-2 font-medium text-sm">
                Size:
                <select
                  value={size}
                  onChange={handleSizeChange}
                  className="w-full px-3 py-2 rounded-md border border-army-green-dark focus:border-2 focus:border-army-green"
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
            <label className="block mb-2 font-medium text-sm">
              Metric:
              <select
                value={metric}
                onChange={handleMetricChange}
                className="w-full px-3 py-2 rounded-md border border-army-green-dark focus:border-2 focus:border-army-green"
              >
                <option value="Bag">Bag</option>
                <option value="Kg">Kg</option>
                <option value="HalfBag">HalfBag</option>
              </select>
            </label>
            <label className="block mb-2 font-medium text-sm">
              Quantity:
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                required
                className="w-full px-3 py-2 rounded-md border border-army-green-dark focus:border-2 focus:border-army-green"
              />
            </label>
            <label className="block mb-2 font-medium text-sm">
              Unit Price:
              <input
                type="number" // Use type="number" for numeric input
                value={unitPrice}
                onChange={(e) => setUnitPrice(parseFloat(e.target.value))} // Update state on change
                className="w-full px-3 py-2 rounded-md border border-army-green-dark focus:border-2 focus:border-army-green"
              />
            </label>
            <label className="block mb-2 font-medium text-sm">
              Total:
              <input
                type="text"
                value={totalPrice}
                readOnly
                className="w-full px-3 py-2 rounded-md border border-army-green-dark focus:border-2 focus:border-army-green"
              />
            </label>
            <label className="block mb-2 font-medium text-sm">
              Remarks:
              <input
                type="text"
                value={remarks}
                onChange={handleRemarksChange}
                className="w-full px-3 py-2 rounded-md border border-army-green-dark focus:border-2 focus:border-army-green"
                placeholder="Enter remarks..."
              />
            </label>
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full py-2 px-4 bg-green-950 text-white font-bold rounded-md shadow-md hover:bg-army-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-army-green-light"
            >
              Add to Cart
            </button>
            <div>
              <h3>Order Items</h3>
              <ul>
                {orderItems.map((item, index) => (
                  <li key={index}>
                    {item.brand} - {item.size} - {item.quantity}{" "}
                    <button
                      onClick={() =>
                        setOrderItems(orderItems.filter((_, i) => i !== index))
                      }
                      className="w-full py-2 px-4 bg-green-950 text-white font-bold rounded-md shadow-md hover:bg-army-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-army-green-light"
                    >
                      Remove Item
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Total: ₦{calculateOrderTotal()}</h4>
            </div>
            <label className="block mb-2 font-medium text-sm">
              Customer Name:
              <input
                type="text"
                value={customerName}
                onChange={handleCustomerNameChange}
                className="w-full px-3 py-2 rounded-md border border-army-green-dark focus:border-2 focus:border-army-green"
              />
            </label>
            <label className="block mb-2 font-medium text-sm">
              Payment Method:
              <select
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
                className="w-full px-3 py-2 rounded-md border border-army-green-dark focus:border-2 focus:border-army-green"
              >
                <option value="Cash">Cash</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Both">Both</option>
              </select>
            </label>
            {paymentMethod === "Cash" || paymentMethod === "Both" ? (
              <label className="block mb-2 font-medium text-sm">
                Cash Amount (₦):
                <input
                  type="number"
                  value={cashAmount}
                  onChange={handleCashAmountChange}
                  className="w-full px-3 py-2 rounded-md border border-army-green-dark focus:border-2 focus:border-army-green"
                  disabled={paymentMethod === "Both" && !useBothPayments}
                />
              </label>
            ) : null}
            {paymentMethod === "Bank Transfer" || paymentMethod === "Both" ? (
              <label className="block mb-2 font-medium text-sm">
                Transfer Amount (₦):
                <input
                  type="number"
                  value={transferAmount}
                  onChange={handleTransferAmountChange}
                  className="w-full px-3 py-2 rounded-md border border-army-green-dark focus:border-2 focus:border-army-green"
                  disabled={paymentMethod === "Both" && !useBothPayments}
                />
              </label>
            ) : null}
            {paymentMethod === "Both" ? (
              <label className="block mb-2 font-medium text-sm">
                Use both payments:
                <input
                  type="checkbox"
                  checked={useBothPayments}
                  onChange={handleUseBothPaymentsChange}
                  className="w-full px-3 py-2 rounded-md border border-army-green-dark focus:border-2 focus:border-army-green"
                />
              </label>
            ) : null}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-950 text-white font-bold rounded-md shadow-md hover:bg-army-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-army-green-light"
            >
              Submit Order
            </button>{" "}
          </form>
        )}
      </section>
    </div>
  );
};

const fetchUnitPriceFromDatabase = async (
  brand: string,
  size: string,
  metric: string
): Promise<number> => {
  const unitPrices: Record<string, number> = {
    "Bluecrown-2mm-Bag": 17700,
    "Bluecrown-2mm-Kg": 1300,
    "Bluecrown-2mm-HalfBag": 8900,
    "Ecofloat-3mm-Bag": 12500,
    "Ecofloat-3mm-Kg": 1200,
    "Ecofloat-3mm-HalfBag": 6300,
    // ... add more unit prices as needed
  };

  const brandSizeKey = `${brand}-${size}-${metric}`;

  return unitPrices[brandSizeKey] || 0;
};

export default SalesForm;
