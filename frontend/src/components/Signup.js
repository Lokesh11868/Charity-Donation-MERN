import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // To handle loading state
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
    try {
      const response = await axios.post("http://localhost:4000/signup", formData);
      setMessage("Signup successful! Redirecting to HomePage...");
      setTimeout(() => {
        history.push("/home"); // Redirect to login page after signup
      }, 2000); // 2-second delay for user feedback
    } catch (error) {
      setMessage(error.response?.data || "An error occurred during signup.");
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="signup-page">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <div className="innerdiv">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="innerdiv">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="innerdiv">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      {message && <p>{message}</p>}
      <p>
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;
