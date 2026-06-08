import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function Attendance() {

  const [filterName, setFilterName] = useState("");
    const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [records, setRecords] = useState([]);

  useEffect(() => {

    fetchAttendance();

  }, []);

  const fetchAttendance = async () => {

    try {

      const token = localStorage.getItem("token");

const username = localStorage.getItem("username");

const res = await axios.get(
  "https://sia-backend-production-4dcd.up.railway.app/attendance/" + username,
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
      "https://sia-backend-production-4dcd.up.railway.app/login-time/" +
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
      `https://sia-backend-production-4dcd.up.railway.app/logout-time/${username}`
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
    "https://sia-backend-production-4dcd.up.railway.app/attendance-work/${attendanceId}",
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
            <th>Employee</th>
            <th>Login Time</th>
            <th>Logout Time</th>
            <th>Total Hours</th>
            <th>Daily Work</th>
          </tr>
        </thead>

        <tbody>
          {filteredRecords.map((record) => (
            <tr key={record.id}>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}