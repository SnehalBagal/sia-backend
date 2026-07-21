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

      const res = await axios.get(
        "https://sia-backend-khcp.onrender.com/notifications/" +
          username
      );

      setNotifications(
        Array.isArray(res.data) ? res.data : []
      );

      await axios.put(
        "https://sia-backend-khcp.onrender.com/notifications/" +
          username +
          "/mark-read"
      );
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE NOTIFICATION
  const deleteNotification = async (notificationId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notification?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        "https://sia-backend-khcp.onrender.com/notifications/" +
          notificationId
      );

      // Remove immediately from screen
      setNotifications((currentNotifications) =>
        currentNotifications.filter(
          (item) => item.id !== notificationId
        )
      );
    } catch (err) {
      console.log(err);
      alert("Failed to delete notification");
    }
  };

  // FORMAT DATE
  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div>
      <Sidebar />

      <div
        style={{
          marginLeft: "240px",
          padding: "40px",
          background: "#f8fafc",
          minHeight: "100vh"
        }}
      >
        <h1
          style={{
            marginBottom: "30px",
            color: "#111827"
          }}
        >
          🔔 Notifications
        </h1>

        {notifications.length === 0 ? (
          <div
            style={{
              background: "white",
              padding: "40px",
              borderRadius: "12px",
              textAlign: "center",
              color: "#6b7280"
            }}
          >
            <div
              style={{
                fontSize: "45px",
                marginBottom: "10px"
              }}
            >
              🔔
            </div>

            <h3>No notifications</h3>

            <p>
              You don't have any notifications right now.
            </p>
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              style={{
                background: "white",
                border: "1px solid #e5e7eb",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "15px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                display: "flex",
                alignItems: "flex-start",
                gap: "15px"
              }}
            >
              {/* Notification Icon */}

              <div
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  background: "#dbeafe",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  flexShrink: 0
                }}
              >
                🔔
              </div>

              {/* Notification Content */}

              <div
                style={{
                  flex: 1
                }}
              >
                <h3
                  style={{
                    margin: "0 0 8px 0",
                    color: "#111827"
                  }}
                >
                  {item.type || "Notification"}
                </h3>

                <p
                  style={{
                    margin: "5px 0",
                    color: "#4b5563"
                  }}
                >
                  From:{" "}
                  <strong>
                    {item.sender_name || "Unknown"}
                  </strong>
                </p>

                <p
                  style={{
                    margin: "12px 0",
                    fontSize: "16px",
                    color: "#1f2937"
                  }}
                >
                  {item.message}
                </p>

                <small
                  style={{
                    color: "#9ca3af"
                  }}
                >
                  🕒 {formatDate(item.created_at)}
                </small>
              </div>

              {/* Delete Button */}

              <button
                onClick={() =>
                  deleteNotification(item.id)
                }
                title="Delete notification"
                style={{
                  border: "none",
                  background: "#fee2e2",
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "18px",
                  flexShrink: 0
                }}
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}