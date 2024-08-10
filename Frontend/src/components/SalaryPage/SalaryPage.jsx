import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addSalary,
  fetchEmployees,
} from "../../features/employees/employeeSlice";

function SalaryPage() {
  const { id } = useParams();
  const employee = useSelector((state) =>
    state.employees.employees.find((emp) => emp._id === id)
  );
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSalary = {
      amount,
      date,
    };
    dispatch(addSalary({ id, salary: newSalary }));
    dispatch(fetchEmployees());
    setAmount("");
    setDate("");
  };
  if (!employee) {
    return <div>Employee not found</div>;
  }

  return (
    <>
      <div className="flex flex-col items-center  w-screen overflow-x-hidden h-fit bg-gray-950 ">
        <div className="flex flex-col items-center w-1/2 h-fit mt-10 mb-5 pb-2 bg-gray-900 rounded-lg shadow-lg shadow-black">
          <h1 className="text-white text-3xl pt-2 font-semibold my-1 ">
            Add Salary
          </h1>
          <form onSubmit={handleSubmit} className="w-2/3">
            <div className="flex gap-5">
              <div className="flex flex-col my-3">
                <label
                  className="text-white text-lg ms-1 mb-1"
                  htmlFor="amount"
                >
                  Amount
                </label>
                <input
                  className="text-white bg-gray-950 p-2 shadow-md shadow-gray-950 px-4 rounded-lg "
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  type="number"
                />
              </div>
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
            Salary History
          </h1>
          <ul className="flex flex-col items-center text-white w-screen">
            <li className=" m-1 w-2/3 ">
              <div className="flex justify-between">
                <span className="flex font-semibold text-lg items-center justify-center w-1/2 ">
                  Salary
                </span>
                <span className="flex font-semibold text-lg items-center justify-center w-1/2">
                  Date
                </span>
              </div>
            </li>
            {employee.salary.map((sal, index) => {
              const datestring = sal.date;
              const salDate = new Date(datestring);
              const formattedDate = salDate.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              });
              return (
                <li className="w-2/3 " key={index}>
                  <div className="flex p-2 cursor-pointer hover:bg-gray-800 border my-1 rounded-lg bg-gray-900 justify-between">
                    <span className="w-2/3  mx-2">{sal.amount}</span>
                    <span className="w-1/3">{formattedDate}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default SalaryPage;
