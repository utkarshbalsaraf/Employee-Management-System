import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAttendance,
  fetchEmployees,
} from "../../features/employees/employeeSlice";
import { useParams } from "react-router-dom";

function AttendancePage() {
  const { id } = useParams();
  const employee = useSelector((state) =>
    state.employees.employees.find((emp) => emp._id === id)
  );
  const [present, setPresent] = useState(false);
  const [date, setDate] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const newAttendance = {
      date,
      present,
    };

    dispatch(addAttendance({ id, attendance: newAttendance }));
    setDate("");
    setPresent(false);
    dispatch(fetchEmployees());
  };

  if (!employee) {
    return <div className="text-white">Employee not Found</div>;
  }

  return (
    <div className="flex flex-col items-center  w-screen overflow-x-hidden h-fit bg-gray-950 ">
      <div className="flex flex-col items-center w-1/2 h-fit mt-10 mb-5 pb-2 bg-gray-900 rounded-lg   shadow-lg  shadow-black">
        <h1 className="text-white text-3xl pt-2 font-semibold my-1 ">
          Add Attendance
        </h1>
        <form onSubmit={handleSubmit} className="w-2/3">
          <div className="flex flex-col my-3">
            <label className="text-white text-lg ms-1 mb-1" htmlFor="date">
              Date
            </label>
            <input
              className="text-white bg-gray-950 p-2 shadow-md shadow-gray-950 px-4 rounded-lg "
              placeholder="Enter Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              type="date"
            />
          </div>
          <div className="flex gap-5 my-3 pt-2">
            <label className="text-white text-lg ms-1 mb-1" htmlFor="present">
              Present
            </label>
            <input
              className=" h-5 mt-1 w-5 appearance-auto"
              placeholder="Enter Amount"
              checked={present}
              onChange={(e) => setPresent(e.target.checked)}
              type="checkbox"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="m-2 bg-blue-500 font-semibold text-lg hover:bg-blue-600 active:bg-blue-200 text-white shadow-md shadow-black px-3 py-1.5 rounded-lg"
            >
              Add
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-white text-3xl font-semibold my-1 ">
          Attendance History
        </h1>
        <ul className="flex flex-col items-center text-white w-screen">
          <li className=" m-1 w-2/4 ">
            <div className="flex justify-around">
              <span className="flex font-semibold text-lg items-center justify-center w-1/2 ">
                Date
              </span>
              <span className="flex font-semibold text-lg items-center justify-center w-1/2">
                Present
              </span>
            </div>
          </li>
          {employee.presenty.map((att, index) => {
            const datestring = att.date;
            const attDate = new Date(datestring);
            const formattedDate = attDate.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            });
            return (
              <li className="w-2/4 " key={index}>
                <div className="flex p-2 cursor-pointer hover:bg-gray-800 border my-1 rounded-lg bg-gray-900 justify-around">
                  <span className="flex items-center justify-center w-1/2">
                    {formattedDate}
                  </span>
                  <span className="flex items-center justify-center w-1/2">
                    {att.present ? "Yes" : "No"}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default AttendancePage;
