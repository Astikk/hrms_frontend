import { useState, useEffect } from "react";
import api from "./api";

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [employee, setEmployee] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("P");

  useEffect(() => {
    // Fetch all attendance
    api.get("/attendance/").then(res => setAttendance(res.data));
    // Fetch employees for the dropdown
    api.get("/employees/").then(res => setEmployees(res.data));
    setLoading(false);
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    api.post("/attendance/", { employee, date, status })
      .then(res => setAttendance([...attendance, res.data]))
      .catch(() => alert("Failed to mark attendance"));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Attendance</h2>
      <form onSubmit={handleAdd}>
        <select value={employee} onChange={e => setEmployee(e.target.value)} required>
          <option value="">Select Employee</option>
          {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.full_name}</option>)}
        </select>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="P">Present</option>
          <option value="A">Absent</option>
        </select>
        <button type="submit">Mark Attendance</button>
      </form>

      <h3>Records</h3>
      <ul>
        {attendance.map(a => (
          <li key={a.id}>
            {console.log(a)}
            {a.employee.full_name} - {a.date} ({a.status})
          </li>
        ))}
      </ul>
    </div>
  );
}
