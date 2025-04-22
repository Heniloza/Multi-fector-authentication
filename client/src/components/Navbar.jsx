import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { checkAuth, setMfaVerified } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { SiFusionauth } from "react-icons/si";

function Navbar({ isLoggedIn, user, handleLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const firstLetter = user?.username?.charAt(0).toUpperCase();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropDown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <nav className="w-full h-20 flex justify-between items-center px-8">
      <div className="flex justify-center items-center gap-2 text-2xl">
        <SiFusionauth className="text-blue-500 font-extrabold text-4xl" />
        <Link className="text-black font-extrabold" to="/">
          DevAuth
        </Link>
      </div>
      <div>
        {!isLoggedIn ? (
          <div
            onClick={() => navigate("/signin")}
            className="p-2 border-2 rounded-2xl px-6 flex justify-center items-center gap-2"
          >
            <span>Login</span>
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
