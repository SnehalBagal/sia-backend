import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function Leave() {
  const [leaves, setLeaves] = useState([]);

  const [formData, setFormData] = useState({
    leave_type: "",
    start_date: "",
    end_date: "",
    reason: ""
  });

  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get(
        "https://sia-backend-khcp.onrender.com/leaves/" + username
      );

      setLeaves(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log("LEAVE FETCH ERROR:", err.response?.data || err);
    }
  };

  const applyLeave = async () => {
    try {
      await axios.post(
        "https://sia-backend-khcp.onrender.com/apply-leave",
        {
          username: username,
          leave_type: formData.leave_type,
          start_date: formData.start_date,
          end_date: formData.end_date,
          reason: formData.reason
        }
      );

      alert("Leave applied successfully");

      setFormData({
        leave_type: "",
        start_date: "",
        end_date: "",
        reason: ""
      });

      fetchLeaves();
    } catch (err) {
      console.log("LEAVE APPLY ERROR:", err.response?.data || err);
      alert("Error applying leave");
    }
  };

  const updateStatus = async (leaveId, status) => {
    try {
      await axios.put(
        "https://sia-backend-khcp.onrender.com/leave/" +
          leaveId +
          "/status",
        {
          status: status
        }
      );

      alert("Leave " + status);
      fetchLeaves();
    } catch (err) {
      console.log("LEAVE STATUS ERROR:", err.response?.data || err);
      alert("Error updating leave");
    }
  };

  return (
    <div>
      <Sidebar />

      <div style={{ marginLeft: "240px", padding: "40px" }}>
        <h1>Leave Management</h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "350px",
            marginTop: "20px"
          }}
        >
          <select
            value={formData.leave_type}
            onChange={(e) =>
              setFormData({
                ...formData,
                leave_type: e.target.value
              })
            }
          >
            <option value="">Select Leave Type</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Paid Leave">Paid Leave</option>
            <option value="Emergency Leave">Emergency Leave</option>
          </select>

          <input
            type="date"
            value={formData.start_date}
            onChange={(e) =>
              setFormData({
                ...formData,
                start_date: e.target.value
              })
            }
          />

          <input
            type="date"
            value={formData.end_date}
            onChange={(e) =>
              setFormData({
                ...formData,
                end_date: e.target.value
              })
            }
          />

          <textarea
            placeholder="Reason"
            value={formData.reason}
            onChange={(e) =>
              setFormData({
                ...formData,
                reason: e.target.value
              })
            }
          />

          <button onClick={applyLeave} style={{ padding: "10px" }}>
            Apply Leave
          </button>
        </div>

        <table
          border="1"
          cellPadding="10"
          style={{
            marginTop: "40px",
            borderCollapse: "collapse",
            width: "100%"
          }}
        >
          <thead>
            <tr>
              <th>Employee</th>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Applied At</th>
              {role?.toLowerCase() === "admin" && <th>Action</th>}
            </tr>
          </thead>

          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.username}</td>
                <td>{leave.leave_type}</td>
                <td>{leave.start_date}</td>
                <td>{leave.end_date}</td>
                <td>{leave.reason}</td>
                <td>{leave.status}</td>
                <td>{leave.applied_at}</td>

                {role?.toLowerCase() === "admin" && (
                  <td>
                    {leave.status === "Pending" ? (
                      <>
                        <button
                          onClick={() => updateStatus(leave.id, "Approved")}
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => updateStatus(leave.id, "Rejected")}
                          style={{ marginLeft: "10px" }}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      leave.status
                    )}
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