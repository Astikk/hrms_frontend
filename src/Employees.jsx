import { useState, useEffect } from "react";
import api from "./api";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [employee_id, setEmployeeId] = useState("");
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    api.get("/employees/")
      .then(res => setEmployees(res.data))
      .catch(err => setError("Failed to fetch employees"))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    api.post("/employees/", { employee_id, full_name, email, department })
      .then(res => {
        setEmployees([...employees, res.data]);
        setEmployeeId(""); setFullName(""); setEmail(""); setDepartment("");
      })
      .catch(() => alert("Failed to add employee"));
  };

  const handleDelete = (id) => {
    api.delete(`/employees/${id}/`)
      .then(() => setEmployees(employees.filter(e => e.id !== id)))
      .catch(() => alert("Failed to delete employee"));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Employees</h2>
      <form onSubmit={handleAdd}>
        <input placeholder="Employee ID" value={employee_id} onChange={e => setEmployeeId(e.target.value)} required />
        <input placeholder="Full Name" value={full_name} onChange={e => setFullName(e.target.value)} required />
        <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input placeholder="Department" value={department} onChange={e => setDepartment(e.target.value)} required />
        <button type="submit">Add Employee</button>
      </form>
      <ul>
        {employees.map(emp => (
          <li key={emp.id}>
            {emp.full_name} - {emp.department} ({emp.email})
            <button onClick={() => handleDelete(emp.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
