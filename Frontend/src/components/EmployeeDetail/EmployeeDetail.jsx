import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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
      <div className="flex justify-center my-6 w-screen h-screen">
        <div className="flex flex-col items-center w-1/2 h-fit p-5 bg-gray-900 rounded-lg">
          <h1 className="text-white text-4xl font-semibold my-2 ">
            Employee Details
          </h1>
          <div className="flex flex-wrap w-full gap-4 px-20 mt-3">
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
          <div className=""></div>
        </div>
      </div>
    </>
  );
}

export default EmployeeDetail;
