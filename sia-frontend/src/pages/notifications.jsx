import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const username = localStorage.getItem("username");

    const res = await axios.get(
      `http://192.168.0.105:8000/notifications/${username}`
    );

    setNotifications(res.data);
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
            <p>{item.message}</p>
            <small>{item.created_at}</small>
          </div>
        ))}
      </div>
    </div>
  );
}