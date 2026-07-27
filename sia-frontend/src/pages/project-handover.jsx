import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function ProjectHandover() {

  const [projectName, setProjectName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [engineer, setEngineer] = useState(localStorage.getItem("username"));
  const [completionDate, setCompletionDate] = useState("");

  return (
    <div>
      <Sidebar />

      <div
        style={{
          marginLeft: "240px",
          padding: "30px"
        }}
      >

        <h1>Project Handover</h1>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "20px"
          }}
        >

          <h2>Project Information</h2>

          <input
            placeholder="Project Name"
            value={projectName}
            onChange={(e)=>setProjectName(e.target.value)}
          />

          <input
            placeholder="Customer Name"
            value={customerName}
            onChange={(e)=>setCustomerName(e.target.value)}
          />

          <input
            placeholder="Engineer"
            value={engineer}
            readOnly
          />

          <input
            type="date"
            value={completionDate}
            onChange={(e)=>setCompletionDate(e.target.value)}
          />

        </div>

      </div>

    </div>
  );
}