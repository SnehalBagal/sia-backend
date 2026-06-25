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
        "https://sia-backend-production-4dcd.up.railway.app/tasks"
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
      "https://sia-backend-production-4dcd.up.railway.app/today-events"
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

  return (
    <div>
      <Sidebar />

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