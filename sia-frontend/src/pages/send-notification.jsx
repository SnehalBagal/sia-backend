import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function SendNotification() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [employees, setEmployees] = useState([]);

  const sendNotification = async () => {
  try {
    const payload = {
      to_user: username,
      sender_name: localStorage.getItem("username") || "Unknown",
      message: message,
      type: type
    };

    console.log("Notification payload:", payload);

    await axios.post(
      "https://sia-backend-khcp.onrender.com/notifications",
      payload
    );

    alert("Notification sent");
  } catch (err) {
    console.log("ERROR DETAILS:", err.response?.data || err);
    alert("Notification failed");
  }
};

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://sia-backend-khcp.onrender.com/employees",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("EMPLOYEES API RESPONSE =", res.data);
      console.log("IS ARRAY =", Array.isArray(res.data));

      setEmployees(Array.isArray(res.data) ? res.data : []);

    } catch (err) {
      console.log("Employee fetch error:", err);
    }
  };
  return (
    <div>
      <Sidebar />

      <div style={{ marginLeft: "240px", padding: "40px" }}>
        <h1>Send Notification</h1>

        <select
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "212px",
            padding: "8px",
            fontSize: "16px"
          }}
        >
          <option value="">Select Name</option>

          {employees.map((employee) => (
            <option
              key={employee.id}
              value={employee.username}
            >
              {employee.full_name}
            </option>
          ))}
        </select>
        <br /><br />

        <input
          placeholder="Notification Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />

        <br /><br />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <br /><br />

        <button onClick={sendNotification}>
          Send Notification
        </button>
      </div>
    </div>
  );
}
