import { useEffect, useState } from "react";
import axios from "axios";

function ProjectHandoverList() {

    const [records, setRecords] = useState([]);

    useEffect(() => {
        loadRecords();
    }, []);

    const loadRecords = async () => {
        const res = await axios.get(
            "https://sia-backend-khcp.onrender.com/project-handover"
        );
        setRecords(res.data);
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
            console.error(err);
            alert("Delete Failed");
        }
    };


    return (
        <div>
            <h2>Project Handover Records</h2>

            <table border="1" cellPadding="8">
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
                                    <button>Edit</button>

                                    <button onClick={() => deleteRecord(row.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
                    
            </table>

        </div>
    );
}

export default ProjectHandoverList;