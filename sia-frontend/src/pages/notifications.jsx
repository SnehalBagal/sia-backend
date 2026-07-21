import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {

  try {

    const username = localStorage.getItem("username");

    const url =
      "https://sia-backend-khcp.onrender.com/notifications/" +
      username;

    const res = await axios.get(url);

    setNotifications(res.data);

    await axios.put(
    "https://sia-backend-khcp.onrender.com/notifications/" +
    username +
    "/mark-read"
  );

  } catch (err) {

    console.log(err);

  }
};

  return (
    <div>
      <Sidebar />

      <div style={{ marginLeft: "240px", padding: "40px" }}>
        <h1>Notifications</h1>

        {notifications.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "10px",
              marginTop: "15px"
            }}
          >
            <h3>{item.type}</h3>

<p>
  <b>From:</b> {item.sender_name || "Unknown"}
</p>

<p>{item.message}</p>

<small>{item.created_at}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
