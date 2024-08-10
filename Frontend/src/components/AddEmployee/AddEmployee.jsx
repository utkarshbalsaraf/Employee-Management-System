import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addEmployee } from "../../features/employees/employeeSlice";

function AddEmployee() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [department, setDepartment] = useState("");
  const [education, setEducation] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const newEmployee = {
        name,
        email,
        phoneno,
        department,
        education,
        birthdate,
        address: {
          location,
          city,
          state,
          zipcode,
        },
      };
      dispatch(addEmployee(newEmployee));
      navigate("/");
    } catch (error) {
      console.error("error in handleSubmit :", error);
    }
  };

  return (
    <>
      <div className="flex justify-center  w-screen overflow-x-hidden h-fit bg-gray-950 ">
        <div className="flex flex-col items-center w-1/2 h-fit my-10  bg-gray-900 rounded-lg   shadow-lg  shadow-black">
          <h1 className="text-white text-3xl my-3 font-semibold">
            Add New Employee
          </h1>
          <form onSubmit={handleSubmit} className="w-2/3" action="submit">
            <div className="flex flex-col my-3">
              <label className="text-white text-lg ms-1 mb-1" htmlFor="name">
                Name
              </label>
              <input
                className="text-white bg-gray-950 p-2 shadow-md shadow-gray-950 px-4 rounded-lg "
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                type="text"
              />
            </div>
            <div className="flex flex-col my-3">
              <label className="text-white text-lg ms-1 mb-1" htmlFor="email">
                Email
              </label>
              <input
                className="text-white bg-gray-950 p-2 shadow-md shadow-gray-950 px-4 rounded-lg "
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
              />
            </div>
            <div className="flex flex-col my-3">
              <label className="text-white text-lg ms-1 mb-1" htmlFor="phoneno">
                Phone Number
              </label>
              <input
                className="text-white bg-gray-950 p-2 shadow-md shadow-gray-950 px-4 rounded-lg "
                placeholder="Enter Phone Number"
                value={phoneno}
                onChange={(e) => setPhoneno(e.target.value)}
                required
                type="number"
              />
            </div>
            <div className="flex flex-col my-3">
              <label
                className="text-white text-lg ms-1 mb-1"
                htmlFor="department"
              >
                Department
              </label>
              <input
                className="text-white bg-gray-950 p-2 shadow-md shadow-gray-950 px-4 rounded-lg "
                placeholder="Enter Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
                type="text"
              />
            </div>
            <div className="flex flex-col my-3">
              <label
                className="text-white text-lg ms-1 mb-1"
                htmlFor="education"
              >
                Education
              </label>
              <input
                className="text-white bg-gray-950 p-2 shadow-md shadow-gray-950 px-4 rounded-lg "
                placeholder="Enter Education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                required
                type="text"
              />
            </div>
            <div className="flex flex-col my-3">
              <label
                className="text-white text-lg ms-1 mb-1"
                htmlFor="birthdate"
              >
                Birth Date
              </label>
              <input
                className="text-white bg-gray-950 p-2 shadow-md shadow-gray-950 px-4 rounded-lg "
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
                type="date"
              />
            </div>
            <div className="flex flex-col my-3">
              <label className="text-white text-lg ms-1 mb-1" htmlFor="address">
                Address
              </label>
              <input
                className="text-white bg-gray-950 p-2 shadow-md shadow-gray-950 px-4 rounded-lg "
                placeholder="Enter Address"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                type="text"
              />
            </div>
            <div className="flex flex-col my-3">
              <label className="text-white text-lg ms-1 mb-1" htmlFor="city">
                City
              </label>
              <input
                className="text-white bg-gray-950 p-2 shadow-md shadow-gray-950 px-4 rounded-lg "
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                type="text"
              />
            </div>
            <div className="flex flex-col my-3">
              <label className="text-white text-lg ms-1 mb-1" htmlFor="state">
                State
              </label>
              <input
                className="text-white bg-gray-950 p-2 shadow-md shadow-gray-950 px-4 rounded-lg "
                placeholder="Enter State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                type="text"
              />
            </div>
            <div className="flex flex-col my-3">
              <label className="text-white text-lg ms-1 mb-1" htmlFor="zipcode">
                Zipcode
              </label>
              <input
                className="text-white bg-gray-950 p-2 shadow-md shadow-gray-950 px-4 rounded-lg "
                placeholder="Enter Zipcode"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                required
                type="number"
              />
            </div>

            <div className="flex justify-center my-5">
              <button
                type="submit"
                className="bg-blue-500 font-semibold text-lg hover:bg-blue-600 active:bg-blue-200 text-white shadow-md shadow-black px-3 py-1.5 rounded-lg"
              >
                Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddEmployee;
