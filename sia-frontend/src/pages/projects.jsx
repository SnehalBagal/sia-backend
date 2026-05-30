import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function Projects() {

  const [projects, setProjects] = useState([]);

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  useEffect(() => {

    fetchProjects();

  }, []);

  const fetchProjects = async () => {

    try {

      const res = await axios.get(
        "https://sia-backend-production-4dcd.up.railway.app/projects"
      );

      setProjects(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  const createProject = async () => {

    try {

      await axios.post(
        "https://sia-backend-production-4dcd.up.railway.app/create-project",
        {
          project_name: projectName,
          description,
          created_by: createdBy
        }
      );

      alert("Project Created");

      fetchProjects();

    } catch (err) {

      console.log(err);

    }
  };

  return (

    <div>

      <Sidebar />

      <div
        style={{
          marginLeft: "240px",
          padding: "40px"
        }}
      >

        <h1>Projects</h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "300px",
            gap: "10px",
            marginTop: "20px"
          }}
        >

          <input
            placeholder="Project Name"
            onChange={(e) =>
              setProjectName(e.target.value)
            }
          />

          <textarea
            placeholder="Description"
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          <input
            placeholder="Created By"
            onChange={(e) =>
              setCreatedBy(e.target.value)
            }
          />

          <button
            onClick={createProject}
            style={{
              padding: "10px"
            }}
          >
            Create Project
          </button>

        </div>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            gap: "20px",
            flexWrap: "wrap"
          }}
        >

          {
            projects.map((project) => (

              <div
                key={project.id}
                style={{
                  width: "300px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "20px"
                }}
              >

                <h2>{project.project_name}</h2>

                <p>{project.description}</p>

                <hr />

                <p>
                  <b>Created By:</b>
                  {" "}
                  {project.created_by}
                </p>

                <p>
                  <b>Status:</b>
                  {" "}
                  {project.status}
                </p>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  );
}