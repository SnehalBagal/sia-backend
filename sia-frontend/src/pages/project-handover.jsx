import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

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


  const saveProjectHandover = async () => {

  try {

    const token = localStorage.getItem("token");

    await axios.post(
      "https://sia-backend-khcp.onrender.com/create-project-handover",
      {
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
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Project Handover Saved");

  } catch (err) {

    console.log(err);

    alert("Failed to Save");

  }

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

          <input
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />

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
            Save Project Handover
          </button>

          </div>

          </div>


      </div>

</div>

);
}