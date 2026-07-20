import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function SendNotification() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const sendNotification = async () => {
  try {
    const payload = {
  to_user: username,
  sender_name: localStorage.getItem("username") || "Unknown",
  message: message
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

  return (
    <div>
      <Sidebar />

      <div style={{ marginLeft: "240px", padding: "40px" }}>
        <h1>Send Notification</h1>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

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