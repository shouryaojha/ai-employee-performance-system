import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Employees() {
  const [employees, setEmployees] = useState([]);

  const [searchDepartment, setSearchDepartment] =
    useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    skills: "",
    performanceScore: "",
    experience: "",
  });

  // Edit State
  const [editingEmployee, setEditingEmployee] =
    useState(null);

  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    department: "",
    skills: "",
    performanceScore: "",
    experience: "",
  });

  // Fetch Employees
  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");

      // Ranking System
      const sortedEmployees = res.data.sort(
        (a, b) =>
          b.performanceScore -
          a.performanceScore
      );

      setEmployees(sortedEmployees);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle Form Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add Employee
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      await API.post(
        "/employees",
        {
          ...formData,
          skills: formData.skills.split(","),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Employee Added");

      fetchEmployees();

      setFormData({
        name: "",
        email: "",
        department: "",
        skills: "",
        performanceScore: "",
        experience: "",
      });
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  // Search Employee
  const handleSearch = async () => {
    try {
      const res = await API.get(
        `/employees/search?department=${searchDepartment}`
      );

      const sortedEmployees = res.data.sort(
        (a, b) =>
          b.performanceScore -
          a.performanceScore
      );

      setEmployees(sortedEmployees);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Employee
  const deleteEmployee = async (id) => {
    try {
      const token =
        localStorage.getItem("token");

      await API.delete(
        `/employees/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Employee Deleted");

      fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  // Open Edit Modal
  const openEditModal = (emp) => {
    setEditingEmployee(emp);
    setEditFormData({
      name: emp.name,
      email: emp.email,
      department: emp.department,
      skills: emp.skills.join(", "),
      performanceScore: emp.performanceScore,
      experience: emp.experience,
    });
  };

  // Close Edit Modal
  const closeEditModal = () => {
    setEditingEmployee(null);
    setEditFormData({
      name: "",
      email: "",
      department: "",
      skills: "",
      performanceScore: "",
      experience: "",
    });
  };

  // Handle Edit Form Input
  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  // Update Employee
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      await API.put(
        `/employees/${editingEmployee._id}`,
        {
          ...editFormData,
          skills: editFormData.skills
            .split(",")
            .map((s) => s.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Employee Updated Successfully");

      closeEditModal();
      fetchEmployees();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to update employee"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        {/* Employee Form */}

        <div className="card">
          <h1>Employee Management</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
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
              value={formData.experience}
              onChange={handleChange}
            />

            <button type="submit">
              Add Employee
            </button>
          </form>
        </div>

        {/* Search */}

        <div className="card">
          <h2>Search by Department</h2>

          <input
            type="text"
            placeholder="Enter Department"
            value={searchDepartment}
            onChange={(e) =>
              setSearchDepartment(
                e.target.value
              )
            }
          />

          <button onClick={handleSearch}>
            Search
          </button>

          <button onClick={fetchEmployees}>
            Reset
          </button>
        </div>

        {/* Statistics */}

        <div className="card">
          <h2>Employee Statistics</h2>

          <h3>
            Total Employees:{" "}
            {employees.length}
          </h3>

          <h3>
            Average Performance Score:{" "}
            {employees.length > 0
              ? (
                  employees.reduce(
                    (acc, emp) =>
                      acc +
                      emp.performanceScore,
                    0
                  ) / employees.length
                ).toFixed(1)
              : 0}
          </h3>
        </div>

        {/* Employee List */}

        <div className="card">
          <h2>Employee Rankings</h2>

          {employees.length === 0 ? (
            <h3>No Employees Found</h3>
          ) : (
            employees.map(
              (emp, index) => (
                <div
                  key={emp._id}
                  className="card employee-card"
                >
                  <h3>
                    🏆 Rank #
                    {index + 1}
                  </h3>

                  <h2>{emp.name}</h2>

                  {emp.performanceScore >=
                    90 && (
                    <h4
                      style={{
                        color: "green",
                      }}
                    >
                      🏆 Top Performer
                    </h4>
                  )}

                  <p>
                    📧 Email:{" "}
                    {emp.email}
                  </p>

                  <p>
                    🏢 Department:{" "}
                    {emp.department}
                  </p>

                  <p>
                    💡 Skills:{" "}
                    {emp.skills.join(
                      ", "
                    )}
                  </p>

                  <p>
                    ⭐ Performance
                    Score:{" "}
                    {
                      emp.performanceScore
                    }
                  </p>

                  <p>
                    💼 Experience:{" "}
                    {emp.experience} years
                  </p>

                  <div className="employee-actions">
                    <button
                      className="edit-btn"
                      onClick={() =>
                        openEditModal(emp)
                      }
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteEmployee(
                          emp._id
                        )
                      }
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              )
            )
          )}
        </div>

        <Footer />
      </div>

      {/* Edit Modal */}
      {editingEmployee && (
        <div
          className="modal-overlay"
          onClick={closeEditModal}
        >
          <div
            className="modal-content"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <h2>Edit Employee</h2>

            <form onSubmit={handleUpdate}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleEditChange}
              />

              <label>Email</label>
              <input
                type="email"
                name="email"
                value={editFormData.email}
                onChange={handleEditChange}
              />

              <label>Department</label>
              <input
                type="text"
                name="department"
                value={
                  editFormData.department
                }
                onChange={handleEditChange}
              />

              <label>Skills (comma separated)</label>
              <input
                type="text"
                name="skills"
                value={editFormData.skills}
                onChange={handleEditChange}
              />

              <label>Performance Score</label>
              <input
                type="number"
                name="performanceScore"
                value={
                  editFormData.performanceScore
                }
                onChange={handleEditChange}
              />

              <label>Experience (years)</label>
              <input
                type="number"
                name="experience"
                value={
                  editFormData.experience
                }
                onChange={handleEditChange}
              />

              <div className="modal-actions">
                <button type="submit">
                  💾 Save Changes
                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeEditModal}
                >
                  ✖ Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Employees;