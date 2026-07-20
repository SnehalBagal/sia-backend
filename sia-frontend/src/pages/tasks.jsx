import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function Tasks() {

  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState("All");
  const [comments, setComments] = useState({});
  const [newComments, setNewComments] = useState({});

  useEffect(() => {

    fetchTasks();

  }, []);

  const fetchTasks = async () => {

  try {

    const token = localStorage.getItem("token");

    const res = await axios.get(
      "https://sia-backend-khcp.onrender.com/tasks",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const taskList = Array.isArray(res.data)
      ? res.data
      : [];

    setTasks(taskList);

    taskList.forEach((task) => {
      fetchComments(task.id);
    });

  } catch (err) {

    console.log(err);

  }
};

const fetchComments = async (taskId) => {

  try {

    const res = await axios.get(
      `https://sia-backend-khcp.onrender.com/task-comments/${taskId}`
    );

    setComments((prev) => ({
      ...prev,
      [taskId]: res.data
    }));

  } catch (err) {

    console.log(err);

  }
};

const addComment = async (taskId) => {
  try {
    await axios.post(
  "https://sia-backend-khcp.onrender.com/add-comment",
  {
    task_id: taskId,
    comment: newComments[taskId],
    comment_by: localStorage.getItem("username")
  }
);

    setNewComments({
      ...newComments,
      [taskId]: ""
    });

    fetchComments(taskId);

  } catch (err) {
    console.log(err);
  }
};

const deleteTask = async (taskId) => {

  if (!window.confirm("Delete task?")) return;

  await axios.delete(
    "https://sia-backend-khcp.onrender.com/tasks/" +
      taskId
  );

  alert("Task deleted");

  fetchTasks();
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

        <h1>SIA Tasks</h1>

        <select
  onChange={(e) =>
    setSelectedProject(
      e.target.value
    )
  }
  style={{
    padding: "10px",
    marginTop: "20px",
    marginBottom: "20px"
  }}
>

  <option value="All">
    All Projects
  </option>

  <option value="SIA Frontend">
    SIA Frontend
  </option>

  <option value="ERP System">
    ERP System
  </option>

  <option value="Website">
    Website
  </option>

</select>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "30px"
          }}
        >

          {
            tasks
              .filter((task) => {

                if (selectedProject === "All") {
                  return true;
                }

                return (
                  task.project_name === selectedProject
               );
            })
                .map((task) => (

              <div
                key={task.id}
                style={{
                  width: "300px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "20px",
                  background: "white"
                }}
              >

                <h2>{task.title}</h2>

                <p>
                  <b>Project:</b>
                  {" "}
                  {task.project_name}
                </p>

                <p>{task.description}</p>

                <h3>Comments</h3>

                {
                
                 Array.isArray(comments[task.id]) &&
                 comments[task.id].map((comment) => (

                   <div
                     key={comment.id}
                     style={{
                       background: "#f3f4f6",
                       padding: "8px",
                       marginTop: "8px",
                       borderRadius: "5px"
                     }}
                    >

                      <p>
                        <b>{comment.comment_by}</b>
                      </p>

                      <p>{comment.comment}</p>

                    </div>
                ))
                }

                <input
  placeholder="Add comment"
  value={newComments[task.id] || ""}
  onChange={(e) =>
    setNewComments({
      ...newComments,
      [task.id]: e.target.value
    })
  }
/>

<button
  onClick={() => addComment(task.id)}
>
  Add Comment
</button>

                <hr />

                <p>
                  <b>Assigned To:</b>
                  {" "}
                  {task.assigned_to}
                </p>

                <p>
                  <b>Priority:</b>
                  {" "}
                  {task.priority}
                </p>

                <p>
                  <b>Status:</b>
                  {" "}
                  {task.status}
                </p>

                <p>
                  <b>Due Date:</b>
                  {" "}
                  {task.due_date}
                </p>

                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    marginTop: "10px",
                    background: "gray",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Delete Task
                </button>

                

                
              </div>
            ))
          }

        </div>

      </div>

    </div>
  );
}