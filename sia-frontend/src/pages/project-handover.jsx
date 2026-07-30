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

            <select style={{ width: "220px" }}>
              <option>Siemens</option>
              <option>Allen Bradley</option>
              <option>Mitsubishi</option>
              <option>Schneider</option>
              <option>Omron</option>
              <option>Delta</option>
              <option>Keyence</option>
              <option>Other</option>
            </select>

            <input style={{ width: "220px" }} placeholder="PLC Model" />

            <input style={{ width: "220px" }} placeholder="PLC IP Address" />

            <input style={{ width: "220px" }} placeholder="PLC Password" />

            <input style={{ width: "220px" }} placeholder="PLC CPU Part Number" />

            <input style={{ width: "220px" }} placeholder="PLC Firmware Version" />

            <input style={{ width: "220px" }} placeholder="Rack / Slot" />

            <input style={{ width: "220px" }} placeholder="PLC Serial Number" />

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

      </div>

</div>

);
}