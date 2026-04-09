import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar({ searchQuery, setSearchQuery }) {
  const { cart } = useCart();
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Top Bar - Hidden on very small screens to save space */}
      <div className="hidden sm:flex bg-blue-600 text-white text-[10px] py-2 px-6 justify-between font-bold tracking-widest">
        <span>EMMY ELECTRONICS OFFICIAL</span>
        <span>FREE DELIVERY OVER $500</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 md:h-20 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo and Cart - Row on mobile */}
        <div className="w-full md:w-auto flex items-center justify-between">
          <Link to="/" onClick={() => setSearchQuery("")} className="flex flex-col leading-none">
            <span className="text-xl md:text-2xl font-black text-gray-900 tracking-tighter">EMMY</span>
            <span className="text-[8px] font-bold text-blue-600 tracking-[0.3em]">ELECTRONICS</span>
          </Link>

          {/* Cart Icon - Visible only on mobile here */}
          <Link to="/cart" className="relative p-2 md:hidden">
            <span className="text-xl">🛒</span>
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black">
                {cart.length}
              </span>
            )}
          </Link>
        </div>

        {/* Search Bar - Full width on mobile */}
        <div className="w-full md:flex-1 md:max-w-xl relative">
          <input 
            type="text" 
            placeholder="Search gadgets..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              navigate('/');
            }}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-10 focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none font-medium text-sm"
          />
          <span className="absolute left-3.5 top-3.5 text-gray-400">🔍</span>
        </div>

        {/* Cart Icon - Hidden on mobile, visible on Desktop */}
        <Link to="/cart" className="hidden md:block relative p-2 hover:bg-gray-50 rounded-full transition">
          <span className="text-2xl">🛒</span>
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