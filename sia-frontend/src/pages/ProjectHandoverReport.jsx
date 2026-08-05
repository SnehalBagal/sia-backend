import logo from "../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProjectHandoverReport() {


    const location = useLocation();
    const data = location.state || {};
    const navigate = useNavigate();

    return (

        <div
            style={{
                maxWidth: "900px",
                margin: "30px auto",
                padding: "30px",
                background: "white"
            }}
        >

            <div
                style={{
                    textAlign: "center"
                }}
            >

                

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: "3px solid black",
                        paddingBottom: "15px",
                        marginBottom: "25px"
                    }}
                >

                    <img
                        src={logo}
                        alt="Logo"
                        style={{
                            width: "90px"
                        }}
                    />

                    <div style={{ textAlign: "center", flex: 1 }}>

                        <h1 style={{ margin: 0 }}>
                            KPA INDIA SOLUTIONS
                        </h1>

                        <h2 style={{ margin: 0 }}>
                            PROJECT HANDOVER REPORT
                        </h2>

                        <p
                            style={{
                                margin: "8px 0 0 0",
                                fontSize: "14px",
                                color: "#555"
                            }}
                        >
                            Sr. No. 60, Sai Nagar, Kondhwa Budruk,
                            Pune - 411048

                            <br />

                            Email : info@kpaindia.co.in

                            <br />

                            Website : www.kpaindia.co.in
                        </p>

                    </div>

                </div>

                <table
                    width="100%"
                    style={{
                        marginBottom: "25px"
                    }}
                >

                <tbody>

                <tr>

                <td>
                <b>Report No :</b>

                PH-{data?.id}
                </td>

                <td style={{ textAlign: "right" }}>

                <b>Date :</b>

                {data?.completion_date}

                </td>

                </tr>

                </tbody>

                </table>

            </div>

            <h3>Project Information</h3>

            <table
                border="1"
                cellPadding="10"
                width="100%"
                style={{
                    borderCollapse: "collapse"
                }}
            >

                <tbody>

                    <tr>
                        <td><b>Project Name</b></td>
                        <td>{data?.project_name}</td>
                    </tr>

                    <tr>
                        <td><b>Customer</b></td>
                        <td>{data?.customer_name}</td>
                    </tr>

                    <tr>
                        <td><b>Engineer</b></td>
                        <td>{data?.engineer}</td>
                    </tr>

                    <tr>
                        <td><b>Completion Date</b></td>
                        <td>{data?.completion_date}</td>
                    </tr>

                </tbody>

            </table>

            <hr />

            <h3>PLC Details</h3>

            <table
                border="1"
                cellPadding="10"
                width="100%"
                style={{ borderCollapse: "collapse" }}
            >

            <tbody>

            <tr>
                <td><b>PLC Brand</b></td>
                <td>{data?.plc_brand}</td>
            </tr>

            <tr>
                <td><b>PLC Model</b></td>
                <td>{data?.plc_model}</td>
            </tr>

            <tr>
                <td><b>PLC IP</b></td>
                <td>{data?.plc_ip}</td>
            </tr>

            <tr>
                <td><b>PLC Password</b></td>
                <td>{data?.plc_password}</td>
            </tr>

            <tr>
                <td><b>CPU Part Number</b></td>
                <td>{data?.plc_cpu_part_number}</td>
            </tr>

            <tr>
                <td><b>Firmware Version</b></td>
                <td>{data?.plc_firmware_version}</td>
            </tr>

            <tr>
                <td><b>Rack / Slot</b></td>
                <td>{data?.rack_slot}</td>
            </tr>

            <tr>
                <td><b>PLC Serial Number</b></td>
                <td>{data?.plc_serial_number}</td>
            </tr>

            </tbody>

            </table>

            <hr />

            <h3>HMI Details</h3>

            <table
                border="1"
                cellPadding="10"
                width="100%"
                style={{ borderCollapse: "collapse" }}
            >

            <tbody>

            <tr>
                <td><b>HMI Brand</b></td>
                <td>{data?.hmi_brand}</td>
            </tr>

            <tr>
                <td><b>HMI Model</b></td>
                <td>{data?.hmi_model}</td>
            </tr>

            <tr>
                <td><b>HMI IP</b></td>
                <td>{data?.hmi_ip}</td>
            </tr>

            <tr>
                <td><b>HMI Password</b></td>
                <td>{data?.hmi_password}</td>
            </tr>

            <tr>
                <td><b>Runtime Username</b></td>
                <td>{data?.runtime_username}</td>
            </tr>

            <tr>
                <td><b>Runtime Password</b></td>
                <td>{data?.runtime_password}</td>
            </tr>

            <tr>
                <td><b>Project File</b></td>
                <td>{data?.project_file_name}</td>
            </tr>

            </tbody>

            </table>

            <hr />

            <h3>Communication Details</h3>

            <table
                border="1"
                cellPadding="10"
                width="100%"
                style={{ borderCollapse: "collapse" }}
            >

            <tbody>

            <tr>
                <td><b>Communication Type</b></td>
                <td>{data?.communication_type}</td>
            </tr>

            </tbody>

            </table>

            <hr />

            <h3>SCADA Details</h3>

            <table
                border="1"
                cellPadding="10"
                width="100%"
                style={{ borderCollapse: "collapse" }}
            >

            <tbody>

            <tr>
                <td><b>SCADA Name</b></td>
                <td>{data?.scada_name}</td>
            </tr>

            <tr>
                <td><b>SCADA Version</b></td>
                <td>{data?.scada_version}</td>
            </tr>

            <tr>
                <td><b>SCADA IP</b></td>
                <td>{data?.scada_ip}</td>
            </tr>

            <tr>
                <td><b>SCADA Password</b></td>
                <td>{data?.scada_password}</td>
            </tr>

            </tbody>

            </table>

            <hr />

            <h3>Network Configuration</h3>

            <table
                border="1"
                cellPadding="10"
                width="100%"
                style={{ borderCollapse: "collapse" }}
            >

            <tbody>

            <tr>
                <td><b>PLC IP Address</b></td>
                <td>{data?.plc_ip}</td>
            </tr>

            <tr>
                <td><b>HMI IP Address</b></td>
                <td>{data?.hmi_ip}</td>
            </tr>

            <tr>
                <td><b>SCADA PC IP</b></td>
                <td>{data?.scada_pc_ip}</td>
            </tr>

            <tr>
                <td><b>Gateway</b></td>
                <td>{data?.gateway}</td>
            </tr>

            <tr>
                <td><b>Subnet Mask</b></td>
                <td>{data?.subnet_mask}</td>
            </tr>

            <tr>
                <td><b>DNS Server</b></td>
                <td>{data?.dns_server}</td>
            </tr>

            </tbody>

            </table>

            <hr />

            <h3>Commissioning Report</h3>

            <table
                border="1"
                cellPadding="10"
                width="100%"
                style={{ borderCollapse: "collapse" }}
            >

            <tbody>

            <tr>
                <td width="30%"><b>Problem Found During Commissioning</b></td>
                <td>{data?.commissioning_problem}</td>
            </tr>

            <tr>
                <td><b>Solution Provided</b></td>
                <td>{data?.solution}</td>
            </tr>

            <tr>
                <td><b>Pending Work</b></td>
                <td>{data?.pending_work}</td>
            </tr>

            <tr>
                <td><b>Engineer Notes</b></td>
                <td>{data?.engineer_notes}</td>
            </tr>

            <tr>
                <td><b>Customer Notes</b></td>
                <td>{data?.customer_notes}</td>
            </tr>

            </tbody>

            </table>

            <hr style={{ marginTop: "40px" }} />

            <table
                width="100%"
                style={{
                    marginTop: "50px",
                    textAlign: "center"
                }}
            >

            <tbody>

            <tr>

            <td>
            <b>Prepared By</b>
            </td>

            <td>
            <b>Customer</b>
            </td>

            <td>
            <b>Approved By</b>
            </td>

            </tr>

            <tr>

            <td style={{ paddingTop: "60px" }}>
            _____________________
            </td>

            <td style={{ paddingTop: "60px" }}>
            _____________________
            </td>

            <td style={{ paddingTop: "60px" }}>
            _____________________
            </td>

            </tr>

            </tbody>

            </table>

            <br />

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "30px"
                }}
            >

                <button
                    onClick={() => navigate("/project-handover")}
                    style={{
                        padding: "12px 25px",
                        background: "#6c757d",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >
                    ← Back to SIA
                </button>

                <button
                    onClick={() => window.print()}
                    style={{
                        padding: "12px 25px",
                        background: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >
                    🖨 Print / Save PDF
                </button>

            </div>

        </div>

        




    );

}