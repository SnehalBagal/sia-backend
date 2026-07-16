import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function Kanban() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("https://sia-backend-khcp.onrender.com/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (taskId, status) => {

  try {

    const token = localStorage.getItem("token");

    const url =
      "https://https://sia-backend-khcp.onrender.com/update-task-status/" +
      taskId +
      "?status=" +
      status;

    await axios.put(
      url,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchTasks();

  } catch (err) {

    console.log(err);

    alert("Failed to update task status");
  }
};

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  );

  const progressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  );

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  );

  return (
    <div>
      <Sidebar />

      <div style={{ marginLeft: "240px", padding: "30px" }}>
        <h1>Kanban Board</h1>

        <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
          <div style={{ width: "300px", background: "#f3f4f6", padding: "20px", borderRadius: "10px" }}>
            <h2>Pending</h2>

            {pendingTasks.map((task) => (
              <div key={task.id} style={{ background: "white", padding: "15px", marginTop: "15px", borderRadius: "10px" }}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>

                <button
                  onClick={() => updateStatus(task.id, "In Progress")}
                  style={{ marginTop: "10px", padding: "8px" }}
                >
                  Move to In Progress
                </button>
              </div>
            ))}
          </div>

          <div style={{ width: "300px", background: "#fef3c7", padding: "20px", borderRadius: "10px" }}>
            <h2>In Progress</h2>

            {progressTasks.map((task) => (
              <div key={task.id} style={{ background: "white", padding: "15px", marginTop: "15px", borderRadius: "10px" }}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>

                <button
                  onClick={() => updateStatus(task.id, "Completed")}
                  style={{ marginTop: "10px", padding: "8px" }}
                >
                  Move to Completed
                </button>
              </div>
            ))}
          </div>

          <div style={{ width: "300px", background: "#dcfce7", padding: "20px", borderRadius: "10px" }}>
            <h2>Completed</h2>

            {completedTasks.map((task) => (
              <div key={task.id} style={{ background: "white", padding: "15px", marginTop: "15px", borderRadius: "10px" }}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>

                <button
  onClick={() =>
    updateStatus(
      task.id,
      "Pending"
    )
  }
  style={{
    marginTop: "10px",
    padding: "8px"
  }}
>
  Reopen Task
</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
