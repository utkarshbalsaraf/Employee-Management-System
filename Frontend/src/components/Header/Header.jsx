import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="flex items-center bg-gray-900 px-10 py-2 w-full top-0 z-10">
        <div className="logo text-white mx-2 text-2xl">EMS</div>
        <nav className="flex justify-around mx-4  w-1/5 font-semibold text-white">
          <NavLink
            to={"/"}
            className={({ isActive }) => `cursor-pointer
              ${isActive ? "text-blue-400" : "text-white hover:text-blue-200"}`}
          >
            Home
          </NavLink>
          <NavLink
            to={"/add-employee"}
            className={({ isActive }) => `cursor-pointer
              ${isActive ? "text-blue-400" : "text-white hover:text-blue-200"}`}
          >
            Add Employee
          </NavLink>
        </nav>
      </header>
    </>
  );
};

export default Header;
