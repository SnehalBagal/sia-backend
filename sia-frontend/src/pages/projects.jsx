import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  const [projectName, setProjectName] = useState("");
  const [assignee, setAssignee] = useState("");
  const [reporter, setReporter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Discussion");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await axios.get(
      "https://sia-backend-production-4dcd.up.railway.app/projects"
    );

    setProjects(Array.isArray(res.data) ? res.data : []);
  };

  const createProject = async () => {
    const token = localStorage.getItem("token");

    await axios.post(
      "https://sia-backend-production-4dcd.up.railway.app/create-project",
      {
  project_name: projectName,
  description: "",
  assignee,
  reporter,
  start_date: startDate || null,
  due_date: dueDate || null,
  status,
  priority,
  created_by: localStorage.getItem("username")
},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Project Created");
    fetchProjects();
  };

  const deleteProject = async (projectId) => {
    if (!window.confirm("Delete project?")) return;

    await axios.delete(
      "https://sia-backend-production-4dcd.up.railway.app/projects/" +
        projectId
    );

    alert("Project deleted");
    fetchProjects();
  };

  const tableBox = {
    marginTop: "30px",
    maxHeight: "450px",
    overflowX: "auto",
    overflowY: "auto",
    border: "1px solid #333",
    borderRadius: "10px"
  };

  const table = {
    width: "1300px",
    borderCollapse: "collapse",
    background: "#1f1f1f",
    color: "white"
  };

  const th = {
    padding: "14px",
    borderBottom: "1px solid #444",
    textAlign: "left",
    whiteSpace: "nowrap"
  };

  const td = {
    padding: "14px",
    borderBottom: "1px solid #333",
    whiteSpace: "nowrap"
  };

  return (
    <div>
      <Sidebar />

      <div style={{ marginLeft: "240px", padding: "40px" }}>
        <h1>Projects</h1>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input placeholder="Project Name / Code" onChange={(e) => setProjectName(e.target.value)} />
          <input placeholder="Assignee" onChange={(e) => setAssignee(e.target.value)} />
          <input placeholder="Reporter" onChange={(e) => setReporter(e.target.value)} />

          <input type="date" onChange={(e) => setStartDate(e.target.value)} />
          <input type="date" onChange={(e) => setDueDate(e.target.value)} />

          <select onChange={(e) => setStatus(e.target.value)}>
            <option>Discussion</option>
            <option>Ongoing</option>
            <option>Done</option>
            <option>Hold</option>
          </select>

          <select onChange={(e) => setPriority(e.target.value)}>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button onClick={createProject}>Create Project</button>
        </div>

        <div style={tableBox}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Project Name / Code</th>
                <th style={th}>Assignee</th>
                <th style={th}>Reporter</th>
                <th style={th}>Start Date</th>
                <th style={th}>Due Date</th>
                <th style={th}>Status</th>
                <th style={th}>Priority</th>  
                <th style={th}>Delete</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td style={td}>{project.project_name}</td>
                  <td style={td}>{project.assignee || "-"}</td>
                  <td style={td}>{project.reporter || project.created_by || "-"}</td>
                  <td style={td}>{project.start_date || "-"}</td>
                  <td style={td}>{project.due_date || "-"}</td>
                  <td style={td}>
                    <select defaultValue={project.status || "Discussion"}>
                      <option>Discussion</option>
                      <option>Ongoing</option>
                      <option>Done</option>
                      <option>Hold</option>
                    </select>
                  </td>
                  <td style={td}>
                    <select defaultValue={project.priority || "Medium"}>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </td>
                  <td style={td}>
  <button
    onClick={() => deleteProject(project.id)}
    style={{
      border: "none",
      background: "transparent",
      cursor: "pointer",
      fontSize: "20px"
    }}
  >
    🗑️
  </button>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}