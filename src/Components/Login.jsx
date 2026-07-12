import React, { useState } from "react";
import './Login.css';
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all the required fields");
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      console.log(data);

     
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("category", data.user.category);
      localStorage.setItem("hostel", data.user.hostel);
     
      if (data.user.role === "admin") navigate("/admin");
      else if (data.user.role === "worker") navigate("/worker");
      else navigate("/history");

    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <div className="email-wrapper">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="login-btn">Login</button>

        <div className="Registeration-link">
          Not registered yet? <span><a href="/register">Click to register</a></span>
        </div>
      </form>
    </div>
  );
}

export default Login;
