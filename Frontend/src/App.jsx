import { Navigate, Route, Routes } from "react-router-dom";
import EmployeeList from "./components/EmployeeList/EmployeeList";
import Header from "./components/Header/Header";
import AddEmployee from "./components/AddEmployee/AddEmployee";
import EmployeeDetail from "./components/EmployeeDetail/EmployeeDetail";

function App() {
  return (
    <>
      <div className="flex flex-col h-screen w-screen bg-gray-950 overflow-y-auto">
        <Header />
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/employee/:id" element={<EmployeeDetail />} />
          <Route path="*" element={<Navigate to="/add-employee" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
