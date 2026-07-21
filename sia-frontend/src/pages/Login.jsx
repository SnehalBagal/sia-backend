
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import API from "../api";

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  

  const navigate = useNavigate();

  

  const login = async () => {

    try {

      const res = await axios.post(
        "https://sia-backend-khcp.onrender.com/login",
        {
          username,
          password
        }
      );

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("username", res.data.user);
      localStorage.setItem("role", res.data.role);

      console.log(res.data);

      localStorage.setItem(
        "token",
        res.data.access_token
      );
localStorage.setItem("username", res.data.user);
localStorage.setItem("role", res.data.role);


      alert("Login Successful");

      navigate("/dashboard");

    } catch (err) {

      console.log(err);

      alert("Login Failed");
    }
  };

  return (

    <div style={{ padding: "40px" }}>

      <h1>SIA Login</h1>

      <input
        placeholder="Username"
        onChange={(e) =>
          setUsername(e.target.value)
        }
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            login();
          }
        }}
      />

      <br /><br />

      <button onClick={login}>
        Login
      </button>

    </div>
  );
}
