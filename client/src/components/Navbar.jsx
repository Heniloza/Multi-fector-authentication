import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

function Navbar({ isLoggedIn, user, handleLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const firstLetter = user?.username?.charAt(0).toUpperCase();
  console.log(user);

  const toggleDropDown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="w-full h-20 flex justify-between items-center px-8">
      <div>
        <Link to="/">DevAuth</Link>
      </div>
      <div>
        {!isLoggedIn ? (
          <div className="p-2 border-2 rounded-2xl px-6 flex justify-center items-center gap-2">
            <Link to="/signin">Login</Link>
            <div className="mt-1">
              <FaArrowRightLong />
            </div>
          </div>
        ) : (
          <div className="relative  inline-block">
            <div
              onClick={toggleDropDown}
              className="w-10 h-10 rounded-full flex justify-center items-center bg-black text-white cursor-pointer"
            >
              {firstLetter}
            </div>
            {dropdownOpen && (
              <div className="absolute  right-4 mt-2 bg-white text-black p-2 rounded shadow z-10">
                <button
                  onClick={() => {
                    handleLogout();
                    closeDropdown();
                  }}
                  className="block px-4 py-2"
                >
                  Logout
                </button>
                <Link
                  onClick={closeDropdown}
                  to="/profile"
                  className="block px-4 py-2"
                >
                  Profile
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
