import {
  Link,
  useNavigate,
} from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const userName =
    localStorage.getItem("userName");

  const logout = () => {
    const confirmLogout =
      window.confirm(
        "Are you sure you want to logout?"
      );

    if (!confirmLogout) return;

    localStorage.removeItem("token");

    localStorage.removeItem(
      "userName"
    );

    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <h2>
          AI Employee Analytics
          System
        </h2>
      </div>

      <div className="navbar-center">
        <Link
          to="/dashboard"
          className="nav-link"
        >
          Dashboard
        </Link>

        <Link
          to="/employees"
          className="nav-link"
        >
          Employees
        </Link>

        <Link
          to="/recommendation"
          className="nav-link"
        >
          AI Recommendation
        </Link>
      </div>

      <div className="navbar-right">
        {userName && (
          <span className="welcome-text">
            Hey, {userName} 👋
          </span>
        )}

        <button onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;