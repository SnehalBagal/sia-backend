import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

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
        "import.meta.env.VITE_API_URL/tasks"
      );

      setTasks(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const progressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

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