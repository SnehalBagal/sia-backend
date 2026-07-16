import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";




export default function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }

    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "https://https://sia-backend-khcp.onrender.com/tasks"
      );

      if (Array.isArray(res.data)) {
  setTasks(res.data);
} else {
  setTasks([]);
}

    } catch (err) {
      console.log(err);
    }
  };

  const totalTasks = tasks.length;

  const pendingTasks = Array.isArray(tasks)
  ? tasks.filter(
      (task) => task.status === "Pending"
    ).length
  : 0;

const progressTasks = Array.isArray(tasks)
  ? tasks.filter(
      (task) => task.status === "In Progress"
    ).length
  : 0;

const completedTasks = Array.isArray(tasks)
  ? tasks.filter(
      (task) => task.status === "Completed"
    ).length
  : 0;

useEffect(() => {
  fetchTodayEvents();
}, []);

const fetchTodayEvents = async () => {
  try {

    const res = await axios.get(
      "https://https://sia-backend-khcp.onrender.com/today-events"
    );

    if (res.data.length > 0) {

      alert(
        res.data
          .map(
            e => `${e.event_type}: ${e.title}`
          )
          .join("\n")
      );

    }

  } catch (err) {
    console.log(err);
  }
};

const [popupEvents, setPopupEvents] = useState([]);
const [showEventPopup, setShowEventPopup] = useState(false);
useEffect(() => {
  fetchPopupEvents();
}, []);

const fetchPopupEvents = async () => {
  try {
    const username = localStorage.getItem("username");

    const res = await axios.get(
      "https://https://sia-backend-khcp.onrender.com/popup-events/" +
        username
    );

    if (res.data.length > 0) {
      setPopupEvents(res.data);
      setShowEventPopup(true);
    }

  } catch (err) {
    console.log(err);
  }
};



  return (
    <div>
      <Sidebar />

      {showEventPopup && popupEvents.length > 0 && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.4)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999
    }}
  >
    <div
      style={{
        background: "white",
        width: "420px",
        borderRadius: "12px",
        padding: "25px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
      }}
    >
      <h2>🔔 Today's Events</h2>

      {popupEvents.map((event) => (
        <div
          key={event.id}
          style={{
            borderBottom: "1px solid #ddd",
            padding: "10px 0"
          }}
        >
          <h3>
            {event.event_type === "Birthday" && "🎂 "}
            {event.event_type === "Meeting" && "📅 "}
            {event.event_type === "Festival" && "🎉 "}
            {event.event_type === "Office Announcement" && "📢 "}
            {event.event_type === "Training" && "🎓 "}
            {event.event_type === "Urgent Notice" && "⚠️ "}
            {event.event_type === "Work Anniversary" && "🥳 "}
            {event.title}
          </h3>

          <p>{event.description}</p>
          <small>{event.event_date}</small>
        </div>
      ))}

      <button
        onClick={async () => {
          const username = localStorage.getItem("username");

          for (const event of popupEvents) {
            await axios.post(
              "https://https://sia-backend-khcp.onrender.com/events/" +
                event.id +
                "/seen/" +
                username
            );
          }

          setShowEventPopup(false);
        }}
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "10px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        OK, Got it
      </button>
    </div>
  </div>
)}

      <div style={{ marginLeft: "260px", padding: "40px" }}>
        <h1>SIA Dashboard</h1>
        <p>Welcome to your office task management system.</p>

        <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
          <div style={{ padding: "25px", border: "1px solid #ddd", borderRadius: "12px", width: "200px" }}>
            <h3>Total Tasks</h3>
            <h1>{totalTasks}</h1>
          </div>

          

          <div style={{ padding: "25px", border: "1px solid #ddd", borderRadius: "12px", width: "200px" }}>
            <h3>Pending</h3>
            <h1>{pendingTasks}</h1>
          </div>

          <div style={{ padding: "25px", border: "1px solid #ddd", borderRadius: "12px", width: "200px" }}>
            <h3>In Progress</h3>
            <h1>{progressTasks}</h1>
          </div>

          <div style={{ padding: "25px", border: "1px solid #ddd", borderRadius: "12px", width: "200px" }}>
            <h3>Completed</h3>
            <h1>{completedTasks}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
