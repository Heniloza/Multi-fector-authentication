import React from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";

function Home() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const handleLogout = () => {};

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} user={user} handleLogout={handleLogout} />
      <div className="flex-1 flex flex-col gap-8 justify-center items-center">
        <div className="flex flex-col gap-2 justify-center items-center">
          <h1 className="font-extrabold text-3xl tracking-wider">
            {isLoggedIn ? `Hello, ${user?.username}` : "Hello,Developer"}
          </h1>
          <h1 className="font-extrabold text-2xl tracking-widert">
            Welcome to our App
          </h1>
        </div>
        <div>
          <button className="px-6 py-2 bg-white text-black font-bold rounded-3xl border-2 hover:bg-pink-500 hover:text-white transition duration-500 border-black cursor-pointer">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
