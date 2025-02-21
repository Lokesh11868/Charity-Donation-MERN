import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Login() {
  const [loginType, setLoginType] = useState(""); // To determine login type (admin/user)
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(""); // To display success/error messages
  const history = useHistory();

  const adminCredentials = {
    email: "vignesh05@123",
    password: "vignesh123",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const submitCredential = async (e) => {
    e.preventDefault();

    if (loginType === "admin") {
      // Admin login logic
      if (
        credentials.email === adminCredentials.email &&
        credentials.password === adminCredentials.password
      ) {
        localStorage.setItem("user", JSON.stringify(credentials));
        setMessage("Admin login successful!");
        history.push("/admin"); // Redirect to admin page
      } else {
        setMessage("Invalid admin credentials.");
      }
    } else if (loginType === "user") {
      // User login logic
      try {
        const response = await fetch("http://localhost:4000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("user", JSON.stringify(data.user)); // Assuming the response contains user data
          setMessage("User login successful!");
          history.push("/home"); // Redirect to homepage on successful login
        } else {
          setMessage(data.message || "Invalid login credentials.");
        }
      } catch (error) {
        setMessage("An error occurred during login.");
        console.error(error);
      }
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <div>
        <button onClick={() => setLoginType("admin")}>Admin Login</button>
        <button onClick={() => setLoginType("user")}>User Login</button>
      </div >

      {loginType && (
        <p className="mentionlogin">{loginType === "admin" ? "Admin" : "User"}</p>
      )}

      {loginType && (
        <form onSubmit={submitCredential}>
          <div className="insidediv">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="insidediv">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
