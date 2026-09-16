import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const login = async () => {

    if (!username.trim() || !password) {
      alert("Please enter username and password");
      return;
    }

    try {

      const res = await axios.post(
        "https://sia-backend-khcp.onrender.com/login",
        {
          username: username.trim(),
          password
        }
      );

      // Make sure login response contains a token
      if (!res.data || !res.data.access_token) {
        alert("Login Failed");
        return;
      }

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("username", res.data.user);
      localStorage.setItem("role", res.data.role);

      await axios.post(
        `https://sia-backend-khcp.onrender.com/login-time/${res.data.user}`
      );

      console.log(res.data);

      alert("Login Successful");

      navigate("/dashboard");

    } catch (err) {

      console.log(err);

      // Clear any old login information
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");

      if (err.response) {
        alert(err.response.data?.detail || "Invalid username or password");
      } else {
        alert("Unable to connect to server");
      }
    }
  };

  return (

    <div style={{ padding: "40px" }}>

      <h1>SIA Login</h1>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      {/* Password + Eye Button */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px"
        }}
      >

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              login();
            }
          }}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            cursor: "pointer",
            padding: "5px 8px"
          }}
        >
          {showPassword ? "🙈" : "👁️"}
        </button>

      </div>

      <br />

      <button onClick={login}>
        Login
      </button>

    </div>
  );
}