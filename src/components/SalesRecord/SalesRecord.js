import { useState, useEffect } from "react";
import { salesRecordPath, getDocs, deleteDoc } from "../../firebase.js";
import 'tailwindcss/tailwind.css';

export const SalesRecord = () => {
  const [salesRecords, setSalesRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(""); // State for selected date

  useEffect(() => {
    fetchData();
  }, [selectedDate]); // Refetch data when selected date changes

  const fetchData = async () => {
    try {
      const response = [];
      const querySnapshot = await getDocs(salesRecordPath);

      querySnapshot.forEach((doc) => {
        response.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      // Filter sales records based on the selected date
      const filteredRecords = selectedDate
        ? response.filter((record) => record.date === selectedDate)
        : response;

      setSalesRecords(filteredRecords);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching or updating data:", error);
      setError("An error occurred while fetching or updating data.");
      setLoading(false);
    }
  };

  const handleDelete = async (id, date) => {
    try {
      // Allow deletion only if the entry date is the present date
      const isPresentDate = new Date(date).toLocaleDateString() === new Date().toLocaleDateString();

      if (isPresentDate) {
        await deleteDoc(salesRecordPath, id);
        fetchData(); // Refetch data after deletion
      } else {
        alert("You can only delete entries on the present date.");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div>
      <h2>Sales Record</h2>
      <label htmlFor="datePicker">Select Date:</label>
      <input
        type="date"
        id="datePicker"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            
            <th>Date</th>
            <th>Brand</th>
            <th>Size</th>
            <th>Metric</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Price</th>
            <th>Remarks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {salesRecords.map((record) => (
            <tr key={record.brand}>
             
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
              <td>
                <button onClick={() => handleDelete(record.id, record.date)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesRecord;
