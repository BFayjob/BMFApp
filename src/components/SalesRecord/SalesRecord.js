import { useState, useEffect } from "react";
import { salesRecordPath, getDocs } from "../../firebase.js";
import 'tailwindcss/tailwind.css';


export const SalesRecord = () => {
  // State for holding sales records data
  const [salesRecords, setSalesRecords] = useState([]);

  // Loading state to track whether data is being fetched
  const [loading, setLoading] = useState(true);

  // Error state to handle any potential errors during data fetching
  const [error, setError] = useState(null);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Temporary array to store fetched data
        const response = [];

        // Reference to the Firestore collection

        // Fetch data from the Firestore collection
        const querySnapshot = await getDocs(salesRecordPath);

        // Loop through each document and extract data
        querySnapshot.forEach((doc) => {
          response.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        // Set the state with the fetched data
        setSalesRecords(response);

        // Set loading to false once data is fetched
        setLoading(false);

        
      } catch (error) {
        // Handle any errors that occur during data fetching
        console.error("Error fetching or updating data:", error);
        setError("An error occurred while fetching or updating data.");

        // Set loading to false in case of an error
        setLoading(false);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  // Loading state: Show a loading message while data is being fetched
  if (loading) {
    return <p>Loading...</p>;
  }

  // Error state: Display an error message if data fetching encounters an issue
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Render the component with the fetched data
  return (
    <div>
      <h2>Sales Record</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th> {/* New Date column */}
            <th>Brand</th>
            <th>Size</th>
            <th>Metric</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Price</th>
            <th>Remarks</th>

          </tr>
        </thead>
        <tbody>
          {salesRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>
                {record.date && new Date(record.date).toLocaleDateString()}
              </td>
              <td>{record.brand}</td>
              <td>{record.size}</td>
              <td>{record.metric}</td>
              <td>{record.quantity}</td>
              <td>{record.unitPrice}</td>
              <td>{record.totalPrice}</td>
              <td>{record.remarks}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesRecord;
