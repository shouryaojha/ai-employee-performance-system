import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/signup", formData);

      alert("Signup Successful");

      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
  <div className="auth-container">
    <div className="auth-wrapper">
      <h2 className="auth-heading">
        AI Employee Analytics System
      </h2>

      <div className="auth-card">
        <h1>Signup</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />

        <button type="submit">
          Signup
        </button>
      </form>

      <div className="auth-link">
        <Link to="/">
          Already have an account? Login
        </Link>
      </div>
      </div>
    </div>
  </div>
);
}

export default Signup;