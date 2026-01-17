import { useState } from "react";
import Employees from "./Employees";
import Attendance from "./Attendance";

function App() {
  const [page, setPage] = useState("employees");

  return (
    <div>
      <nav>
        <button onClick={() => setPage("employees")}>Employees</button>
        <button onClick={() => setPage("attendance")}>Attendance</button>
      </nav>
      {page === "employees" ? <Employees /> : <Attendance />}
    </div>
  );
}

export default App;
