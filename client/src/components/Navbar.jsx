import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gray-100 shadow-md">
      <span className="text-xl font-bold">Logo</span>
      <div className="flex gap-4">
        <Link to="/request-leave">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-black transition-all duration-300 ease-in-out">
            Login
          </button>
        </Link>
        <Link to="/request-leave">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-black transition-all duration-300 ease-in-out">
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
