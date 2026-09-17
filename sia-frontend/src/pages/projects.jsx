import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [editingProjectId, setEditingProjectId] = useState("");
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();



  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await axios.get(
      "https://sia-backend-khcp.onrender.com/projects"
    );

    setProjects(Array.isArray(res.data) ? res.data : []);
  };

  const createProject = async () => {
    const token = localStorage.getItem("token");

    await axios.post(
      "https://sia-backend-khcp.onrender.com/create-project",
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

    const selectProjectForEdit = (projectId) => {
    const project = projects.find(
      (p) => p.id === Number(projectId)
    );

    if (!project) {
      setEditingProjectId("");
      setEditing(false);
      return;
    }

    setEditingProjectId(project.id);
    setProjectName(project.project_name || "");
    setAssignee(project.assignee || "");
    setReporter(project.reporter || "");
    setStartDate(project.start_date || "");
    setDueDate(project.due_date || "");
    setStatus(project.status || "Discussion");
    setPriority(project.priority || "Medium");

    setEditing(true);
  };


  const updateProject = async () => {
    if (!editingProjectId) {
      alert("Please select a project");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `https://sia-backend-khcp.onrender.com/projects/${editingProjectId}`,
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

      alert("Project Updated");

      setEditingProjectId("");
      setEditing(false);

      setProjectName("");
      setAssignee("");
      setReporter("");
      setStartDate("");
      setDueDate("");
      setStatus("Discussion");
      setPriority("Medium");

      fetchProjects();

    } catch (err) {
      console.log(err);
      alert("Failed to update project");
    }
  };

  const deleteProject = async (projectId) => {
    if (!window.confirm("Delete project?")) return;

    await axios.delete(
      "https://sia-backend-khcp.onrender.com/projects/" +
        projectId
    );

    alert("Project deleted");
    fetchProjects();
  };

  const completeProject = (project) => {

    navigate("/project-handover", {
      state: project
    });

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
    background: "#dba4a4",
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

        {/* ================= EDIT PROJECT ================= */}

        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #555",
            borderRadius: "10px"
          }}
        >
          <h2>Edit Project</h2>

          <select
            value={editingProjectId}
            onChange={(e) => selectProjectForEdit(e.target.value)}
            style={{
              padding: "8px",
              minWidth: "250px",
              marginRight: "10px"
            }}
          >
            <option value="">Select Project</option>

            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.project_name}
              </option>
            ))}
          </select>

          {editing && (
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                gap: "10px",
                flexWrap: "wrap"
              }}
            >
              <input
                placeholder="Project Name / Code"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />

              <input
                placeholder="Assignee"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
              />

              <input
                placeholder="Reporter"
                value={reporter}
                onChange={(e) => setReporter(e.target.value)}
              />

              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />

              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Discussion</option>
                <option>Ongoing</option>
                <option>Done</option>
                <option>Hold</option>
              </select>

            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>

              <button
                onClick={updateProject}
                style={{
                background: "#007bff",
                color: "white",
                border: "none",
                padding: "8px 18px",
                borderRadius: "5px",
                cursor: "pointer"
                }}
              >
                Update Project
              </button>

              <button
                onClick={() => {
                  setEditingProjectId("");
                  setEditing(false);
                }}
                  style={{
                  padding: "8px 18px",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
                >
                Cancel
              </button>
            </div>
          )}
        </div>


        {/* ================= CREATE PROJECT ================= */}

        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #555",
            borderRadius: "10px"
          }}
        >
          <h2>Create Project</h2>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap"
            }}
          >
            <input
              placeholder="Project Name / Code"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />

            <input
              placeholder="Assignee"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
            />

            <input
              placeholder="Reporter"
              value={reporter}
              onChange={(e) => setReporter(e.target.value)}
            />

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Discussion</option>
              <option>Ongoing</option>
              <option>Done</option>
              <option>Hold</option>
            </select>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <button onClick={createProject}>
              Create Project
            </button>
          </div>
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
                <th style={th}>Complete</th>
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
                      onClick={() => completeProject(project)}
                      style={{
                        background: "#28a745",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "5px",
                        cursor: "pointer"
                      }}
                    >
                      Complete
                    </button>
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
