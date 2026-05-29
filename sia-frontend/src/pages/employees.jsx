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
  joining_date: ""
});

  useEffect(() => {

    fetchEmployees();

  }, []);

  const fetchEmployees = async () => {

    try {

      const res = await axios.get(
        "http://192.168.0.105:8000/employees"
      );

      setEmployees(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  const createEmployee = async () => {

    try {

      const token = localStorage.getItem("token");

await axios.post(
  "http://192.168.0.105:8000/employees",
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

      console.log(err);

    }
  };
  const makeInactive = async (employeeId) => {

  try {

    const token = localStorage.getItem("token");

    await axios.put(
      `http://192.168.0.105:8000/employees/${employeeId}/inactive`,
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

const updateEmployee = async () => {

  const token = localStorage.getItem("token");

  const dataToSend = {
    ...formData,
    password: formData.password || "nochange"
  };
  console.log(dataToSend);
  await axios.put(
    `http://192.168.0.105:8000/employees/${editingId}`,
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

  if (!confirm("Are you sure you want to delete this employee?")) {
    return;
  }

  const token = localStorage.getItem("token");

  await axios.delete(
    `http://192.168.0.105:8000/employees/${employeeId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  alert("Employee deleted");

  fetchEmployees();
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
              <th>Status</th>
              <th>Action</th>
              
            </tr>

          </thead>

          <tbody>

            {
              employees.map((employee) => (

                <tr key={employee.id}>

                  <td>{employee.full_name}</td>
                  
                  <td>{employee.username}</td>

                  <td>{employee.email}</td>

                  <td>{employee.role}</td>

                  <td>{employee.department}</td>

                  <td>{employee.designation}</td>

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
      joining_date: employee.joining_date
    });
  }}
>
  Edit
</button>

<button
  onClick={() => deleteEmployee(employee.id)}
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