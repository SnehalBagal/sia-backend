import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function CreateTask() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [assignedBy, setAssignedBy] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
  fetchProjects();
}, []);

const fetchProjects = async () => {
  const res = await axios.get(
    "https://sia-backend-khcp.onrender.com/projects"
  );

  setProjects(res.data);
};

 const createTask = async () => {

  try {

    const token = localStorage.getItem("token");

    await axios.post(
      "https://sia-backend-khcp.onrender.com/create-task",
      {
        title,
        description,
        assigned_to: assignedTo,
        assigned_by: assignedBy,
        priority,
        due_date: dueDate,
        project_name: projectName
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Task Created");

  } catch (err) {

    console.log(err);

    alert("Error creating task");
  }
};
  return (
  <div>
    <Sidebar />

    <div style={{ marginLeft: "240px", padding: "40px" }}>

      <h1>Create Task</h1>
      <select
  value={projectName}
  onChange={(e) => setProjectName(e.target.value)}
>
  <option value="">Select Project</option>

  {projects.map((project) => (
    <option key={project.id} value={project.project_name}>
      {project.project_name}
    </option>
  ))}
</select>
      

      <br /><br />

      <input
        placeholder="Title"
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <br /><br />

      <textarea
        placeholder="Description"
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <br /><br />

      <input
        placeholder="Assigned To"
        onChange={(e) =>
          setAssignedTo(e.target.value)
        }
      />

      <br /><br />

      <input
        placeholder="Assigned By"
        onChange={(e) =>
          setAssignedBy(e.target.value)
        }
      />

      <br /><br />

      <input
        placeholder="Priority"
        onChange={(e) =>
          setPriority(e.target.value)
        }
      />

      <br /><br />

      <input
        type="date"
        onChange={(e) =>
          setDueDate(e.target.value)
        }
      />

      <br /><br />

      <button onClick={createTask}>
        Create Task
      </button>

    </div>
    </div>
  );
}
