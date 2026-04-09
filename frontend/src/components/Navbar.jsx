import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar({ searchQuery, setSearchQuery }) {
  const { cart } = useCart();
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Top Marketing Bar */}
      <div className="bg-blue-600 text-white text-[10px] py-2 px-6 flex justify-between font-bold tracking-widest">
        <span>OFFICIAL EMMY ELECTRONICS STORE</span>
        <span>FAST DELIVERY NATIONWIDE</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link to="/" onClick={() => setSearchQuery("")} className="flex flex-col leading-none">
          <span className="text-2xl font-black text-gray-900 tracking-tighter">EMMY</span>
          <span className="text-[9px] font-bold text-blue-600 tracking-[0.3em]">ELECTRONICS</span>
        </Link>

        {/* Search Bar Logic */}
        <div className="flex-1 max-w-xl relative group">
          <input 
            type="text" 
            placeholder="Search gadgets, laptops, phones..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              navigate('/'); // Ensure user is on home page when searching
            }}
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-6 pl-12 focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all font-medium text-sm"
          />
          <span className="absolute left-4 top-3.5 text-gray-400">🔍</span>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-3.5 text-[10px] font-black text-blue-600 hover:text-blue-800"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Cart Icon */}
        <Link to="/cart" className="relative p-2 hover:bg-gray-50 rounded-full transition">
          <span className="text-xl">🛒</span>
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black border-2 border-white">
              {cart.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;