
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Header = () => {
  const token = useSelector((s) => s.token.value);
  const activeClass = "bg-blue-500 text-white px-4 py-2 rounded-full";

  return (
    <header className="bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex space-x-4 mx-auto">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition duration-300 hover:bg-gray-800 hover:text-white px-4 py-2 rounded-full ${
                isActive ? activeClass : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `transition duration-300 hover:bg-gray-800 hover:text-white px-4 py-2 rounded-full ${
                isActive ? activeClass : ""
              }`
            }
          >
            Register
          </NavLink>
          {token ? (
            <NavLink
              to="/admin/manage-product"
              className={({ isActive }) =>
                `transition duration-300 hover:bg-gray-800 hover:text-white px-4 py-2 rounded-full ${
                  isActive ? activeClass : ""
                }`
              }
            >
              Admin
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `transition duration-300 hover:bg-gray-800 hover:text-white px-4 py-2 rounded-full ${
                  isActive ? activeClass : ""
                }`
              }
            >
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
