import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../features/employees/employeeSlice";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);
  const status = useSelector((state) => state.employees.status);
  const error = useSelector((state) => state.employees.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEmployees());
    }
  }, [status, dispatch, employees]);

  return (
    <>
      <div className="flex flex-1 flex-col items-center overflow-x-hidden  w-full bg-gray-950 h-screen">
        <h1 className="text-white font-semibold mt-2 text-xl">Employees</h1>
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>{error}</p>}
        {status === "succeeded" && (
          <ul className="flex flex-col items-center text-white w-screen">
            <li className=" m-1 w-2/3 ">
              <div className="flex justify-between">
                <span className="flex font-semibold text-lg items-center justify-center w-1/2 ">
                  Name
                </span>
                <span className="flex font-semibold text-lg items-center justify-center w-1/2">
                  Department
                </span>
              </div>
            </li>
            {employees.map((emp) => (
              <li className="w-2/3 " key={emp._id}>
                <Link to={`/employee/${emp._id}`}>
                  <div className="flex p-2 cursor-pointer hover:bg-gray-800 border my-1 rounded-lg bg-gray-900 justify-between">
                    <span className="w-2/3  mx-2">{emp.name}</span>
                    <span className="w-1/3">{emp.department}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default EmployeeList;
