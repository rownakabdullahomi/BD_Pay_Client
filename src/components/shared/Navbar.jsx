import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

import { FiLogIn, FiLogOut } from "react-icons/fi";
import { useAuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, userLogout } = useAuthContext();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.documentElement.setAttribute("data-theme", localTheme);
  }, [theme]);

  // Toggle Theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  const handleLogout = async () => {
    try {
      await userLogout();
      toast.success("Logout Successful!");
    } catch (error) {
      toast.error("Error logging out! " + error.message);
    }
  };

  const links = (
    <>
      <li>
        <NavLink to="/" className="">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className="">
          About Us
        </NavLink>
      </li>
    </>
  );

  // Toggle Menu
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div
      id="navbar"
      className="bg-base-100 shadow-md transition-all duration-300"
    >
      <div className="navbar px-4 lg:px-6 justify-between py-2">
        {/* Navbar Start */}
        <div className="flex items-center">
          <Link
            to="/"
            className="hidden lg:block normal-case text-3xl pt-1 font-extrabold italic tracking-tight relative group"
          >
            <div>
              <span className="text-success">BD</span>
              <span className="text-error">_Pay</span>
            </div>
          </Link>

          {/* Mobile Menu Dropdown */}
          <div className="dropdown">
            <button
              tabIndex={0}
              role="button"
              className="btn btn-outline btn-success btn-sm lg:hidden hover:!text-white"
              onClick={toggleDropdown}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            {dropdownOpen && (
              <ul className="menu dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-10">
                <li className="font-bold italic text-2xl my-2 mx-auto tracking-tight relative group">
                  <Link to="/">
                    <div>
                      <span className="text-success">BD</span>
                      <span className="text-error">_Pay</span>
                    </div>
                  </Link>
                </li>
                <div className="font-semibold text-error space-y-2">
                  {links}
                </div>
              </ul>
            )}
          </div>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal space-x-6 font-bold text-error">
            {links}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            className="btn btn-ghost btn-sm text-2xl "
            onClick={toggleTheme}
            title="Toggle Theme"
          >
            {theme === "light" ? (
              <FaMoon className="text-success transition-transform duration-300 hover:scale-110" />
            ) : (
              <FaSun className="text-error transition-transform duration-300 hover:scale-110" />
            )}
          </button>

          <div>
            {user && user?.email ? (
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-outline btn-error md:px-6 flex items-center gap-2 hover:!text-white transform hover:scale-105 transition duration-300"
              >
                <FiLogOut className="text-primary " size={18} /> Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="btn btn-sm btn-outline btn-success md:px-6 flex items-center gap-2 hover:!text-white transform hover:scale-105 transition duration-300"
              >
                <FiLogIn className="text-primary " size={18} /> Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
