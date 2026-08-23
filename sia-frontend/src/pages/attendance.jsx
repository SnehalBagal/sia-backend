import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function Attendance() {

  const role = localStorage.getItem("role");
  const [filterName, setFilterName] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const [records, setRecords] = useState([]);


  useEffect(() => {

    fetchAttendance();

  }, []);

  const fetchAttendance = async () => {

    try {

      const token = localStorage.getItem("token");

const username = localStorage.getItem("username");

const res = await axios.get(
  "https://sia-backend-khcp.onrender.com/attendance/" + username,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

      if (Array.isArray(res.data)) {
  setRecords(res.data);
} else {
  setRecords([]);
}

    } catch (err) {

      console.log(err);

    }
  };

  const markLogin = async () => {

  try {

    const username = localStorage.getItem("username");

    console.log("USERNAME =", username);

    const url =
      "https://sia-backend-khcp.onrender.com/login-time/" +
      username;

    console.log(url);

    await axios.post(url);

    alert("Login time saved");

    fetchAttendance();

  } catch (err) {

    console.log(err);

    alert("Login failed");
  }
};

  const markLogout = async () => {

  try {

    const username = localStorage.getItem("username");

    await axios.put(
      `https://sia-backend-khcp.onrender.com/logout-time/${username}`
    );

    alert("Logout time saved");

    fetchAttendance();

  } catch (err) {

    console.log(err);

    alert("Logout failed");

  }
};

const updateWorkReport = async (attendanceId, workReport) => {

  const token = localStorage.getItem("token");

  await axios.put(
    `https://sia-backend-khcp.onrender.com/attendance-work/${attendanceId}`,
    null,
    {
      params: {
        work_report: workReport
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  alert("Work report saved");
};


const filteredRecords = Array.isArray(records)
  ? records.filter((record) => {
      const nameMatch = record.username
        ?.toLowerCase()
        .includes(filterName.toLowerCase());

      const recordDate = record.work_date;

      const fromMatch = fromDate
        ? recordDate >= fromDate
        : true;

      const toMatch = toDate
        ? recordDate <= toDate
        : true;

      return nameMatch && fromMatch && toMatch;
    })
  : [];

const deleteAttendance = async (attendanceId) => {

    if (!window.confirm("Are you sure you want to delete this attendance record?")) {
        return;
    }

    try {

        const token = localStorage.getItem("token");

        console.log("TOKEN EXISTS:", !!token);

        await axios.delete(
            `https://sia-backend-khcp.onrender.com/attendance/${attendanceId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert("Attendance deleted");

        setRecords((prev) =>
            prev.filter((item) => item.id !== attendanceId)
        );

    } catch (err) {

        console.log("DELETE ERROR:", err.response?.data || err);

        alert("Failed to delete attendance");

    }
};  


const toggleRow = (id) => {
    setSelectedRows((prev) =>
        prev.includes(id)
            ? prev.filter((rowId) => rowId !== id)
            : [...prev, id]
    );
};

const toggleSelectAll = () => {

    if (selectedRows.length === filteredRecords.length) {
        setSelectedRows([]);
    } else {
        setSelectedRows(filteredRecords.map((record) => record.id));
    }

};

const deleteSelected = async () => {

    if (selectedRows.length === 0) {
        alert("Please select at least one row");
        return;
    }

    if (!window.confirm(
        `Delete ${selectedRows.length} selected records?`
    )) {
        return;
    }

    try {

        const token = localStorage.getItem("token");

        for (const id of selectedRows) {

            await axios.delete(
                `https://sia-backend-khcp.onrender.com/attendance/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

        }

        alert("Selected records deleted successfully");

        setSelectedRows([]);

        fetchAttendance();

    } catch (err) {

        console.log(
            "MULTI DELETE ERROR:",
            err.response?.data || err
        );

        alert("Failed to delete selected records");

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
      <h1>Attendance</h1>

      <input
        placeholder="Filter by employee"
        value={filterName}
        onChange={(e) => setFilterName(e.target.value)}
      />

      <input
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
      />

      <input
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
      />

      <button
        onClick={markLogin}
        style={{
          padding: "10px",
          marginRight: "10px"
        }}
      >
        Login Time
      </button>

      <button
        onClick={markLogout}
        style={{
          padding: "10px"
        }}
      >
        Logout Time
      </button>

      {role === "admin" && (
        <button 
      onClick={deleteSelected}
      disabled={selectedRows.length === 0}
      style={{
        marginLeft: "10px",
        background: selectedRows.length === 0 ? "#ccc" : "#dc3545",
        color: "white",
        padding: "10px 15px",
        border: "none",
        borderRadius: "5px",
        cursor: selectedRows.length === 0
            ? "not-allowed"
            : "pointer"
      }}
    >
      🗑 Delete Selected ({selectedRows.length})
    </button>
  )}

      <table
        border="1"
        cellPadding="10"
        style={{
          marginTop: "20px",
          borderCollapse: "collapse"
        }}
      >
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={
                    records.length > 0 &&
                    selectedRows.length === records.length
                }
                onChange={toggleSelectAll}
              />
            </th>

            <th>Employee</th>
            <th>Login Time</th>
            <th>Logout Time</th>
            <th>Total Hours</th>
            <th>Daily Work</th>
            {role === "admin" && <th>Delete</th>}
          </tr>
        </thead>

        <tbody>
          {filteredRecords.map((record) => (
            <tr key={record.id}>

              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(record.id)}
                  onChange={() => toggleRow(record.id)}
                />
              </td>
              <td>{record.username}</td>

              <td>{record.login_time}</td>

              <td>{record.logout_time}</td>

              <td>{record.total_hours}</td>

              <td>
                <textarea
                  placeholder="Enter daily work"
                  defaultValue={record.work_report || ""}
                  onBlur={(e) =>
                    updateWorkReport(
                      record.id,
                      e.target.value
                    )
                  }
                />
              </td>
              {role === "admin" && (
                <td>
                  <button
                    onClick={() => deleteAttendance(record.id)}
                    style={{
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      fontSize: "20px"
                    }}
                    title="Delete attendance"
                  >
                    🗑️
                  </button>
                </td>
              )}

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}
