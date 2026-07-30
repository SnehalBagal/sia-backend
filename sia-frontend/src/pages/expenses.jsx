import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function Expenses() {

  const [expenses, setExpenses] = useState([]);

  const [expenseDate, setExpenseDate] = useState("");
  const [expenseType, setExpenseType] = useState("Travel");
  const [description, setDescription] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [totalKm, setTotalKm] = useState("");
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const username = localStorage.getItem("username");
  
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {

    const res = await axios.get(
      "https://sia-backend-khcp.onrender.com/expenses/" + username
    );

    setExpenses(Array.isArray(res.data) ? res.data : []);

  };

  const saveExpense = async () => {

    await axios.post(
      "https://sia-backend-khcp.onrender.com/expenses",
      {
        username,
        expense_date: expenseDate,
        expense_type: expenseType,
        description,
        from_location: fromLocation,
        to_location: toLocation,
        total_km: totalKm || null,
        amount,
        remarks
      }
    );

    alert("Expense Added");

    setExpenseDate("");
    setExpenseType("Travel");
    setDescription("");
    setFromLocation("");
    setToLocation("");
    setTotalKm("");
    setAmount("");
    setRemarks("");

    fetchExpenses();

  };

  const deleteExpense = async(id)=>{

    if(!window.confirm("Delete Expense?")) return;

    await axios.delete(
      "https://sia-backend-khcp.onrender.com/expenses/"+id
    );

    fetchExpenses();

  }


  const updateStatus = async (expenseId, status) => {
    try {
        await axios.put(
        `https://sia-backend-khcp.onrender.com/expenses/${expenseId}/status`,
        null,
        {
            params: {
            status: status
            }
        }
        );

        fetchExpenses();

    } catch (err) {
        console.log(err);
        alert("Failed to update status");
    }
    };



  return (

    <div>

      <Sidebar/>

      <div style={{marginLeft:"240px",padding:"40px"}}>

        <h1>Expenses</h1>

        <div style={{
          display:"flex",
          flexWrap:"wrap",
          gap:"10px"
        }}>

          <input
          type="date"
          value={expenseDate}
          onChange={(e)=>setExpenseDate(e.target.value)}
          />

          <select
          value={expenseType}
          onChange={(e)=>setExpenseType(e.target.value)}
          >

            <option>Travel</option>
            <option>Fuel</option>
            <option>Office Purchase</option>
            <option>Hotel</option>
            <option>Food</option>
            <option>Stationery</option>
            <option>Courier</option>
            <option>Internet</option>
            <option>Phone</option>
            <option>Meeting</option>
            <option>Other</option>

          </select>

          <input
          placeholder="Description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          />

          {expenseType==="Travel" && (

            <>

            <input
            placeholder="From"
            value={fromLocation}
            onChange={(e)=>setFromLocation(e.target.value)}
            />

            <input
            placeholder="To"
            value={toLocation}
            onChange={(e)=>setToLocation(e.target.value)}
            />

            <input
            placeholder="Total KM"
            value={totalKm}
            onChange={(e)=>setTotalKm(e.target.value)}
            />

            </>

          )}

          <input
          placeholder="Amount"
          value={amount}
          onChange={(e)=>setAmount(e.target.value)}
          />

          <input
          placeholder="Remarks"
          value={remarks}
          onChange={(e)=>setRemarks(e.target.value)}
          />

          <button onClick={saveExpense}>
            Add Expense
          </button>

        </div>

        <table
        border="1"
        cellPadding="10"
        style={{
          marginTop:"30px",
          borderCollapse:"collapse",
          width:"100%"
        }}>

          <thead>

            <tr>

              {role==="admin" && <th>Employee</th>}

              <th>Date</th>

              <th>Type</th>

              <th>Description</th>

              <th>From</th>

              <th>To</th>

              <th>KM</th>

              <th>Amount</th>

              <th>Status</th>

              {role === "Admin" && (
                <th>Action</th>
                )}

                <th>Delete</th>

            </tr>

          </thead>

          <tbody>

            {expenses.map((item)=>(

              <tr key={item.id}>

                {role==="admin" &&
                <td>{item.username}</td>}

                <td>{item.expense_date}</td>

                <td>{item.expense_type}</td>

                <td>{item.description}</td>

                <td>{item.from_location}</td>

                <td>{item.to_location}</td>

                <td>{item.total_km}</td>

                <td>{item.amount}</td>

                <td>{item.status}</td>

                {role === "Admin" && (
                    <td>
                        <button
                        onClick={() => updateStatus(item.id, "Approved")}
                        style={{ marginRight: "5px" }}
                        >
                        ✅
                        </button>

                        <button
                        onClick={() => updateStatus(item.id, "Rejected")}
                        >
                        ❌
                        </button>
                    </td>
                    )}

                <td>

                  <button
                  onClick={()=>deleteExpense(item.id)}
                  style={{
                    border:"none",
                    background:"transparent",
                    cursor:"pointer",
                    fontSize:"20px"
                  }}>

                    🗑️

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}