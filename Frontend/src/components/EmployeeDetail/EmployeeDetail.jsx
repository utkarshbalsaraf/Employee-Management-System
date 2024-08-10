import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

function EmployeeDetail() {
  const { id } = useParams();
  const employee = useSelector((state) =>
    state.employees.employees.find((emp) => emp._id === id)
  );

  const birthdateString = employee.birthdate;
  const birthdate = new Date(birthdateString);

  if (isNaN(birthdate.getTime())) {
    return <div>Invalid birthdate format: {birthdateString}</div>;
  }

  const formattedDate = birthdate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  if (!employee) {
    return <h1>Employee Not Found</h1>;
  }

  return (
    <>
      <div className="flex justify-center py-6 w-screen h-screen">
        <div className="flex flex-col  items-center w-3/5 h-fit p-5 bg-gray-900 rounded-lg">
          <h1 className="text-white text-4xl font-semibold my-2 ">
            Employee Details
          </h1>
          <div className="flex flex-wrap  gap-4 w-4/6 mt-3">
            <div className=" px-6 py-3 border border-gray-700 rounded-lg">
              <p className="text-white text-xl font-thin">Name</p>
              <p className="text-white text-3xl font-semibold">
                {employee.name}
              </p>
            </div>
            <div className="px-4 py-2 border border-gray-700 rounded-lg">
              <p className="text-white text-xl font-thin">Phone number</p>
              <p className="text-white text-3xl font-semibold">
                {employee.phoneno}
              </p>
            </div>
            <div className="px-4 py-2 border border-gray-700 rounded-lg">
              <p className="text-white text-xl font-thin">Email</p>
              <p className="text-white text-3xl font-semibold">
                {employee.email}
              </p>
            </div>
            <div className="px-4 py-2 border border-gray-700 rounded-lg">
              <p className="text-white text-xl font-thin">Department</p>
              <p className="text-white text-3xl font-semibold">
                {employee.department}
              </p>
            </div>
            <div className="px-4 py-2 border border-gray-700 rounded-lg">
              <p className="text-white text-xl font-thin">Education</p>
              <p className="text-white text-3xl font-semibold">
                {employee.education}
              </p>
            </div>
            <div className="px-4 py-2 border border-gray-700 rounded-lg">
              <p className="text-white text-xl font-thin">Birth Date</p>
              <p className="text-white text-3xl font-semibold">
                {formattedDate}
              </p>
            </div>
            <div className="px-4 py-2 border border-gray-700 rounded-lg">
              <p className="text-white text-xl font-thin">Address</p>
              <p className="text-white text-3xl font-semibold">
                <span>{employee.address.location}, </span>
                <span>{employee.address.city}, </span>
                <br />
                <span>{employee.address.state}, </span>
                <span>{employee.address.zipcode}</span>
              </p>
            </div>
          </div>
          <div className="my-8">
            <Link
              to={`/employee/${employee._id}/salary`}
              className="m-2 bg-blue-500 font-semibold text-lg hover:bg-blue-600 active:bg-blue-200 text-white shadow-md shadow-black px-3 py-1.5 rounded-lg"
            >
              Salary
            </Link>
            <Link to={`/employee/${employee._id}/attendance`} className=" m-2 bg-yellow-500 font-semibold text-lg hover:bg-yellow-600 active:bg-yellow-200 text-white shadow-md shadow-black px-3 py-1.5 rounded-lg">
              Attendance
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeDetail;
