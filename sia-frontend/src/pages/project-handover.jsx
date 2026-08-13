import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";


export default function ProjectHandover() {

  const [projectName, setProjectName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [engineer, setEngineer] = useState(localStorage.getItem("username"));
  const [completionDate, setCompletionDate] = useState("");
  const [commissioningProblem, setCommissioningProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [pendingWork, setPendingWork] = useState("");
  const [engineerNotes, setEngineerNotes] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [plcBrand, setPlcBrand] = useState("");
  const [plcModel, setPlcModel] = useState("");
  const [plcIp, setPlcIp] = useState("");
  const [plcPassword, setPlcPassword] = useState("");
  const [plcCpuPartNumber, setPlcCpuPartNumber] = useState("");
  const [plcFirmwareVersion, setPlcFirmwareVersion] = useState("");
  const [rackSlot, setRackSlot] = useState("");
  const [plcSerialNumber, setPlcSerialNumber] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {

    const res = await axios.get(
        "https://sia-backend-khcp.onrender.com/projects-list"
    );

    setProjects(res.data);

  };


  const viewRecord = (row) => {

    navigate("/project-handover-report", {
        state: row
    });

  };  


  const editRecord = (row) => {

    console.log("Edit clicked", row);

    setEditingId(row.id);
  
    

    setProjectName(row.project_name || "");
    setCustomerName(row.customer_name || "");
    setEngineer(row.engineer || "");
    setCompletionDate(row.completion_date || "");

    setPlcBrand(row.plc_brand || "");
    setPlcModel(row.plc_model || "");
    setPlcIp(row.plc_ip || "");
    setPlcPassword(row.plc_password || "");

    setPlcCpuPartNumber(row.plc_cpu_part_number || "");
    setPlcFirmwareVersion(row.plc_firmware_version || "");
    setRackSlot(row.rack_slot || "");
    setPlcSerialNumber(row.plc_serial_number || "");

    setCommissioningProblem(row.commissioning_problem || "");
    setSolution(row.solution || "");
    setPendingWork(row.pending_work || "");
    setEngineerNotes(row.engineer_notes || "");
    setCustomerNotes(row.customer_notes || "");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

};

  useEffect(() => {
    loadRecords();
}, []);

const loadRecords = async () => {
    try {
        const res = await axios.get(
            "https://sia-backend-khcp.onrender.com/project-handover"
        );
        setRecords(res.data);
    } catch (err) {
        console.log(err);
    }
};


  const deleteRecord = async (id) => {

    if (!window.confirm("Delete this record?")) return;

    try {
        await axios.delete(
            `https://sia-backend-khcp.onrender.com/project-handover/${id}`
        );

        alert("Deleted Successfully");
        loadRecords();

    } catch (err) {
        console.log(err);
        alert("Delete Failed");
    }
};


  const saveProjectHandover = async () => {

    try {

        const token = localStorage.getItem("token");

        const data = {
            project_name: projectName,
            customer_name: customerName,
            engineer: engineer,
            completion_date: completionDate,

            plc_brand: plcBrand,
            plc_model: plcModel,
            plc_ip: plcIp,
            plc_password: plcPassword,
            plc_cpu_part_number: plcCpuPartNumber,
            plc_firmware_version: plcFirmwareVersion,
            rack_slot: rackSlot,
            plc_serial_number: plcSerialNumber,

            commissioning_problem: commissioningProblem,
            solution: solution,
            pending_work: pendingWork,
            engineer_notes: engineerNotes,
            customer_notes: customerNotes
        };

        if (editingId === null) {

    await axios.post(
        "https://sia-backend-khcp.onrender.com/project-handover",
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    alert("Project Handover Saved");
    loadRecords();
    clearForm();

} else {

    await axios.put(
        `https://sia-backend-khcp.onrender.com/project-handover/${editingId}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    alert("Project Handover Updated");

    loadRecords();
    clearForm();
}

        loadRecords();

    } catch (err) {

        console.log(err);
        alert("Failed to Save");

    }
};


  const clearForm = () => {
    setEditingId(null);

    setProjectName("");
    setCustomerName("");
    setEngineer(localStorage.getItem("username"));
    setCompletionDate("");

    setPlcBrand("");
    setPlcModel("");
    setPlcIp("");
    setPlcPassword("");
    setPlcCpuPartNumber("");
    setPlcFirmwareVersion("");
    setRackSlot("");
    setPlcSerialNumber("");

    setCommissioningProblem("");
    setSolution("");
    setPendingWork("");
    setEngineerNotes("");
    setCustomerNotes("");
};
      
      



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

          <select
            value={projectName}
            onChange={(e) => {

              const selectedProject = projects.find(
                p => p.project_name === e.target.value
              );

              if (!selectedProject) return;

              setProjectName(selectedProject.project_name);

              setEngineer(selectedProject.assignee);

            }}
          >

          <option value="">
            Select Project
          </option>

          {projects.map((project) => (

          <option
            key={project.id}
            value={project.project_name}
          >

          {project.project_name}

          </option>

          ))}

          </select>

          <input
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          <input
            placeholder="Engineer"
            value={engineer}
            readOnly
          />

          <input
            type="date"
            value={completionDate}
            onChange={(e) => setCompletionDate(e.target.value)}
          />

        </div>   {/* Project Information ends here */}


        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "20px"
          }}
        >

          <h2>PLC Details</h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
              marginTop: "15px"
            }}
          >

            <select
              style={{ width: "220px" }}
              value={plcBrand}
              onChange={(e) => setPlcBrand(e.target.value)}
            >
              <option>Siemens</option>
              <option>Allen Bradley</option>
              <option>Mitsubishi</option>
              <option>Schneider</option>
              <option>Omron</option>
              <option>Delta</option>
              <option>Keyence</option>
              <option>Other</option>
            </select>

            <input
              style={{ width: "220px" }}
              placeholder="PLC Model"
              value={plcModel}
              onChange={(e) => setPlcModel(e.target.value)}
            />

            <input
              style={{ width: "220px" }}
              placeholder="PLC IP Address"
              value={plcIp}
              onChange={(e) => setPlcIp(e.target.value)}
            />

            <input
              style={{ width: "220px" }}
              placeholder="PLC Password"
              value={plcPassword}
              onChange={(e) => setPlcPassword(e.target.value)}
            />

            <input
              style={{ width: "220px" }}
              placeholder="PLC CPU Part Number"
              value={plcCpuPartNumber}
              onChange={(e) => setPlcCpuPartNumber(e.target.value)}
            />

            <input
              style={{ width: "220px" }}
              placeholder="PLC Firmware Version"
              value={plcFirmwareVersion}
              onChange={(e) => setPlcFirmwareVersion(e.target.value)}
            />

            <input
              style={{ width: "220px" }}
              placeholder="Rack / Slot"
              value={rackSlot}
              onChange={(e) => setRackSlot(e.target.value)}
            />

            <input
              style={{ width: "220px" }}
              placeholder="PLC Serial Number"
              value={plcSerialNumber}
              onChange={(e) => setPlcSerialNumber(e.target.value)}
            />

          </div>
        </div>   {/* PLC Card Ends */}





        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "20px"
          }}
        >

          <h2>HMI Details</h2>

          <select>
            <option>Siemens</option>
            <option>Weintek</option>
            <option>Allen Bradley</option>
            <option>Schneider</option>
            <option>Delta</option>
            <option>Pro-face</option>
            <option>Other</option>
          </select>

          <input placeholder="HMI Model" />

          <input placeholder="HMI IP Address" />

          <input placeholder="HMI Password" />

          <input placeholder="Project File Name" />

        </div>   {/* HMI Details Ends */}


        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "20px"
          }}
        >

          <h2>SCADA Details</h2>

          <select>
            <option>WinCC Professional</option>
            <option>WinCC Unified</option>
            <option>WinCC Flexible</option>
            <option>FactoryTalk View</option>
            <option>Ignition</option>
            <option>Wonderware</option>
            <option>Citect SCADA</option>
            <option>AVEVA</option>
            <option>Other</option>
          </select>

          <input placeholder="SCADA Version" />

          <input placeholder="Runtime Username" />

          <input placeholder="Runtime Password" />

          <input placeholder="Project File Name" />

        </div>   {/* SCADA Ends */}


        <div
            style={{
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "10px",
                marginTop: "20px"
            }}
        >
            <h2>Communication Details</h2>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "15px",
                    marginTop: "15px"
            }}
            >
            <label><input type="checkbox" /> Profinet</label>

            <label><input type="checkbox" /> Profibus</label>

            <label><input type="checkbox" /> Ethernet/IP</label>

            <label><input type="checkbox" /> Modbus TCP</label>

            <label><input type="checkbox" /> Modbus RTU</label>

            <label><input type="checkbox" /> OPC UA</label>

            <label><input type="checkbox" /> MQTT</label>

            <label><input type="checkbox" /> CANopen</label>

            <label><input type="checkbox" /> RS232</label>

            <label><input type="checkbox" /> RS485</label>

            <label><input type="checkbox" /> Other</label>
        </div>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "20px"
          }}
        >

          <h2>Network Configuration</h2>

          <input placeholder="PLC IP Address" />

          <input placeholder="HMI IP Address" />

          <input placeholder="SCADA PC IP Address" />

          <input placeholder="Gateway" />

          <input placeholder="Subnet Mask" />

          <input placeholder="DNS Server" />

        </div>   {/* Network Ends */}

          <div
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "20px"
            }}
          >

          <h2>Commissioning Report</h2>

          <h4>Problem Found During Commissioning</h4>

          <textarea
            value={commissioningProblem}
            onChange={(e)=>setCommissioningProblem(e.target.value)}
            rows={5}
            style={{
              width:"100%",
              marginBottom:"20px"
            }}
          />

          <h4>Solution Provided</h4>

          <textarea
            value={solution}
            onChange={(e)=>setSolution(e.target.value)}
            rows={5}
            style={{
              width:"100%",
              marginBottom:"20px"
            }}
          />

          <h4>Pending Work</h4>

          <textarea
            value={pendingWork}
            onChange={(e)=>setPendingWork(e.target.value)}
            rows={5}
            style={{
              width:"100%",
              marginBottom:"20px"
            }}
          />

          <h4>Engineer Notes</h4>

          <textarea
            value={engineerNotes}
            onChange={(e)=>setEngineerNotes(e.target.value)}
            rows={6}
            style={{
              width:"100%",
              marginBottom:"20px"
            }}
          />

          <h4>Customer Notes</h4>

          <textarea
            value={customerNotes}
            onChange={(e)=>setCustomerNotes(e.target.value)}
            rows={6}
            style={{
              width:"100%"
            }}
          />

          <div
            style={{
              textAlign: "center",
              marginTop: "30px"
            }}
          >

          <button
            onClick={saveProjectHandover}
            style={{
              background: "#28a745",
              color: "white",
              padding: "12px 25px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            {editingId === null
              ? "Save Project Handover"
              : "Update Project Handover"}
          </button>

          </div>

            </div>

          {/* Project Handover Records */}

          <h2 style={{ marginTop: "40px" }}>Project Handover Records</h2>

          <table border="1" cellPadding="8" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Project</th>
                <th>Customer</th>
                <th>Engineer</th>
                <th>Date</th>
                <th>PLC Brand</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {records.length === 0 ? (

                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No Records Found
                  </td>
                </tr>

              ) : (

                  records.map((row) => (

                    <tr key={row.id}>

                      <td>{row.id}</td>
                      <td>{row.project_name}</td>
                      <td>{row.customer_name}</td>
                      <td>{row.engineer}</td>
                      <td>{row.completion_date}</td>
                      <td>{row.plc_brand}</td>

                      <td>

                        <button onClick={() => viewRecord(row)}>
                          View
                        </button>

                        <button onClick={() => editRecord(row)}>
                          Edit
                        </button>

                        <button onClick={() => deleteRecord(row.id)}>
                          Delete
                        </button>

                      </td>

                  </tr>

              ))

          )}

      </tbody>

  </table>
  {selectedRecord && (

  <div
    style={{
        marginTop: "30px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        background: "#fff"
    }}
  >

  <h2>Project Handover Report</h2>
  <button
    onClick={() => window.print()}
    style={{
        padding: "10px 20px",
        marginBottom: "20px",
        cursor: "pointer"
    }}
  >
    Print / Save PDF
  </button>

  <hr />

  <h3>Project Information</h3>

  <p><b>Project Name:</b> {selectedRecord.project_name}</p>
  <p><b>Customer:</b> {selectedRecord.customer_name}</p>
  <p><b>Engineer:</b> {selectedRecord.engineer}</p>
  <p><b>Completion Date:</b> {selectedRecord.completion_date}</p>

  <hr />

  <h3>PLC Details</h3>

  <p><b>PLC Brand:</b> {selectedRecord.plc_brand}</p>
  <p><b>PLC Model:</b> {selectedRecord.plc_model}</p>
  <p><b>PLC IP:</b> {selectedRecord.plc_ip}</p>
  <p><b>PLC Password:</b> {selectedRecord.plc_password}</p>
  <p><b>CPU Part Number:</b> {selectedRecord.plc_cpu_part_number}</p>
  <p><b>Firmware Version:</b> {selectedRecord.plc_firmware_version}</p>
  <p><b>Rack Slot:</b> {selectedRecord.rack_slot}</p>
  <p><b>Serial Number:</b> {selectedRecord.plc_serial_number}</p>

  <hr />

  <h3>Commissioning Report</h3>

  <p><b>Problem:</b></p>
  <p>{selectedRecord.commissioning_problem}</p>

  <p><b>Solution:</b></p>
  <p>{selectedRecord.solution}</p>

  <p><b>Pending Work:</b></p>
  <p>{selectedRecord.pending_work}</p>

  <p><b>Engineer Notes:</b></p>
  <p>{selectedRecord.engineer_notes}</p>

  <p><b>Customer Notes:</b></p>
  <p>{selectedRecord.customer_notes}</p>

  </div>

  )}




      </div>

    </div>

);
} 