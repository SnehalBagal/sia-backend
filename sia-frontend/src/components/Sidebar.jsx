import { Link } from "react-router-dom";

export default function Sidebar() {

  const role = localStorage.getItem("role");

  const logout = () => {

  localStorage.removeItem("token");

  localStorage.removeItem("username");

  localStorage.removeItem("role");

  window.location.href = "/";
};

const username = localStorage.getItem("username");

  return (

    <div
      style={{
        width: "220px",
        height: "100vh",
        background: "#111827",
        color: "white",
        padding: "20px",
        position: "fixed",
        left: 0,
        top: 0
      }}
    >

      <h2>SIA</h2>

      <p style={{ color: "white" }}>
  Logged in as:
  {" "}
  {username}
</p>

      <hr />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px"
        }}
      >

        <Link
          to="/dashboard"
          style={{ color: "white" }}
        >
          Dashboard
        </Link>

        <Link
          to="/tasks"
          style={{ color: "white" }}
        >
          Tasks
        </Link>

        <Link
          to="/create-task"
          style={{ color: "white" }}
        >
          Create Task
        </Link>

        <Link
          to="/attendance"
          style={{ color: "white" }}
        >
          Attendance
        </Link>

        <Link
          to="/kanban"
          style={{ color: "white" }}
        >
          Kanban
        </Link>

        {
  role === "admin" && (

    <Link
      to="/employees"
      style={{ color: "white" }}
    >
      Employees
    </Link>

  )
}

        <Link 
          to="/projects"  
          style={{ color: "white" }}
        >
          Projects
        </Link>


        <Link 
          to="/notifications"  
          style={{ color: "white" }} 
        >
          Notifications
        </Link>

        <Link to="/send-notification"  
          style={{ color: "white" }} 
        >
          Send Notification
        </Link>

        <button
  onClick={logout}
  style={{
    marginTop: "20px",
    padding: "10px",
    width: "100%"
  }}
>
  Logout
</button>

<Link to="/files" style={{ color: "white" }}>
  Files
</Link>


      </div>

    </div>
  );
}