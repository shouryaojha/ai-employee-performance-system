import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="center-card">
        <div className="card">
          <h1>HR Dashboard</h1>

          <h3>
            🚀 Smart HR Analytics Dashboard
          </h3>

          <br />

          <p>
            Welcome to AI-Based Employee
            Performance Analytics &
            Recommendation System.
          </p>

          <br />

          <p>
            Manage employees, analyze
            performance, and generate
            AI-powered recommendations.
          </p>

          <br />

          <Link to="/employees">
            <button>
              Employee Management
            </button>
          </Link>

          <br />
          <br />

          <Link to="/recommendation">
            <button>
              AI Recommendation
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;