import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      const res = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);

localStorage.setItem(
  "userName",
  res.data.user.name
);

      alert("Login Successful");

      navigate("/dashboard");
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
        <h1>Login</h1>

      <form onSubmit={handleSubmit}>
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
          Login
        </button>
      </form>

      <div className="auth-link">
        <Link to="/signup">
          Don't have an account? Signup
        </Link>
      </div>
      </div>
    </div>
  </div>
);
}

export default Login;