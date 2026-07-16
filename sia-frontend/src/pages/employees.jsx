import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function Employees() {

  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
  full_name: "",
  username: "",
  password: "",
  email: "",
  role: "",
  department: "",
  designation: "",
  joining_date: "",
  leaving_date: ""  
});

  useEffect(() => {

    fetchEmployees();

  }, []);

  const fetchEmployees = async () => {
  try {
    const res = await axios.get(
      "https://https://sia-backend-khcp.onrender.com/all-employees"
    );

    console.log("EMPLOYEES DATA:", res.data);
    setEmployees(Array.isArray(res.data) ? res.data : []);

  } catch (err) {
    console.log("FETCH EMPLOYEES ERROR:", err.response?.data || err);
  }
};

  const createEmployee = async () => {

    try {

      const token = localStorage.getItem("token");

     await axios.post(
  "https://https://sia-backend-khcp.onrender.com/employees",
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

      alert("Employee Created");

      fetchEmployees();

    } catch (err) {
  console.log("CREATE EMPLOYEE ERROR:", err.response?.data || err);
  alert(JSON.stringify(err.response?.data || err.message));
}
  };
  const makeInactive = async (employeeId) => {

  try {

    const token = localStorage.getItem("token");

    const url =
      "https://https://sia-backend-khcp.onrender.com/employees/" +
      employeeId +
      "/inactive";

    await axios.put(
      url,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Employee marked inactive");

    fetchEmployees();

  } catch (err) {

    console.log(err);

    alert("Error marking employee inactive");

  }
};

const makeActive = async (employeeId) => {

  try {

    const token = localStorage.getItem("token");

    const url =
      "https://https://sia-backend-khcp.onrender.com/employees/" +
      employeeId +
      "/active";

    await axios.put(
      url,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Employee marked active");

    fetchEmployees();

  } catch (err) {

    console.log(err);

    alert("Error marking employee active");
  }
};


const updateEmployee = async () => {

  const token = localStorage.getItem("token");

  const dataToSend = {
    ...formData,
    password: formData.password || "nochange"
  };
  console.log(dataToSend);
  await axios.put(
    `https://https://sia-backend-khcp.onrender.com/employees/${editingId}`,
    dataToSend,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  alert("Employee updated");

  setEditingId(null);

  fetchEmployees();
};  

const deleteEmployee = async (employeeId) => {

  if (!confirm("Delete employee?")) {
    return;
  }

  const token = localStorage.getItem("token");

  const url =
    "https://https://sia-backend-khcp.onrender.com/employees/" +
    employeeId;

  await axios.delete(
    url,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  alert("Employee deleted");

  await fetchEmployees();
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

        <h1>Employees</h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "300px",
            marginTop: "20px"
          }}
        >

          <input
            placeholder="Full Name"
            value={formData.full_name}
            onChange={(e) =>
              setFormData({
                ...formData,
                full_name: e.target.value
              })
            }
          />

          <input
            placeholder="Username"
             value={formData.username || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                username: e.target.value
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
             value={formData.password || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value
              })
            }
          />

          <input
            placeholder="Role"
            value={formData.role || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                role: e.target.value
              })
            }
          />

          <input
            placeholder="Department"
             value={formData.department || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                department: e.target.value
              })
            }
          />

          <input
            placeholder="Designation"
             value={formData.designation || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                designation: e.target.value
              })
            }
          />

          <input
            type="date"
             value={formData.joining_date || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                joining_date: e.target.value
              })
            }
          />

          <input
  type="date"
  value={formData.leaving_date || ""}
  onChange={(e) =>
    setFormData({
      ...formData,
      leaving_date: e.target.value
    })
  }
/>

          <input
  placeholder="Email"
  value={formData.email || ""}
  onChange={(e) =>
    setFormData({
      ...formData,
      email: e.target.value
    })
  }
/>

          <button
  onClick={editingId ? updateEmployee : createEmployee}
  style={{ padding: "10px" }}
>
  {editingId ? "Update Employee" : "Create Employee"}
</button>


                   

        </div>

        <table
          border="1"
          cellPadding="10"
          style={{
            marginTop: "40px",
            borderCollapse: "collapse"
          }}
        >

          <thead>

            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Joining Date</th>
              <th>Leaving Date</th>
              <th>Status</th>
              
            </tr>

          </thead>

          <tbody>

            {
  Array.isArray(employees) &&
  employees.map((employee) => (

                <tr key={employee.id}>

                  <td>{employee.full_name}</td>
                  
                  <td>{employee.username}</td>

                  <td>{employee.email}</td>

                  <td>{employee.role}</td>

                  <td>{employee.department}</td>

                  <td>{employee.designation}</td>

                  <td>{employee.joining_date}</td>
                  
                  <td>{employee.leaving_date || "-"}</td>

                  <td>{employee.status}</td>

                  <td>

                  <button
  onClick={() => {
    setEditingId(employee.id);

    setFormData({
      full_name: employee.full_name,
      username: employee.username,
      password: "",
      email: employee.email,
      role: employee.role,
      department: employee.department,
      designation: employee.designation,
      joining_date: employee.joining_date,
      leaving_date: employee.leaving_date || ""
    });
  }}
  style={{
    width: "80px",
    padding: "8px"
  }}

  
>
  Edit
</button>

<button
  onClick={() => deleteEmployee(employee.id)}
  style={{
    width: "80px",
    padding: "8px"
  }}

>
  Delete
</button>

  

</td>

                  <td>

  {
    employee.status === "Active" ? (

      <button
        onClick={() =>
          makeInactive(employee.id)
        }
      >
        Make Inactive
      </button>

    ) : (

      <button
        onClick={() =>
          makeActive(employee.id)
        }
      >
        Make Active
      </button>

      

    )

    
  }

</td>

                </tr>
              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  );
}
