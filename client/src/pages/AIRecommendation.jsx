import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AIRecommendation() {
  const [formData, setFormData] =
    useState({
      name: "",
      department: "",
      skills: "",
      performanceScore: "",
      experience: "",
    });

  const [recommendation, setRecommendation] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Generate AI Recommendation
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token =
        localStorage.getItem("token");

      const res = await API.post(
        "/ai/recommend",
        {
          ...formData,
          skills:
            formData.skills.split(","),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRecommendation(
        res.data.recommendation
      );

      setLoading(false);
    } catch (error) {
      setLoading(false);

      alert(
        error.response.data.message
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="container center-card">
        <div
          style={{ width: "100%" }}
        >
          <div className="card">
            <h1>
              AI Employee Recommendation
            </h1>

            <form
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="name"
                placeholder="Employee Name"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                type="text"
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
              />

              <input
                type="text"
                name="skills"
                placeholder="Skills separated by comma"
                value={formData.skills}
                onChange={handleChange}
              />

              <input
                type="number"
                name="performanceScore"
                placeholder="Performance Score"
                value={
                  formData.performanceScore
                }
                onChange={handleChange}
              />

              <input
                type="number"
                name="experience"
                placeholder="Experience"
                value={
                  formData.experience
                }
                onChange={handleChange}
              />

              <button type="submit">
                Generate Recommendation
              </button>
            </form>
          </div>

          {loading && (
            <div className="card">
              <div className="loader"></div>

              <h3
                style={{
                  textAlign: "center",
                }}
              >
                Generating AI
                Recommendation...
              </h3>
            </div>
          )}

          {!recommendation &&
            !loading && (
              <div className="card">
                <h3>
                  Generate AI
                  feedback to view
                  employee insights.
                </h3>
              </div>
            )}

          {recommendation && (
            <div className="card">
              <h2>
                AI Recommendation
              </h2>

              <textarea
                value={recommendation}
                readOnly
              />

              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    recommendation
                  );

                  alert(
                    "Copied to Clipboard"
                  );
                }}
              >
                Copy Recommendation
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AIRecommendation;