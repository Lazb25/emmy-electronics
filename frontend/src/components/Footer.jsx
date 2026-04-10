import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-950 text-white pt-16 pb-8 px-4 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-800 pb-12">
        <div className="col-span-1">
          <Link to="/" className="flex flex-col leading-none mb-6">
            <span className="text-2xl font-black tracking-tighter uppercase">Emmy</span>
            <span className="text-[8px] font-bold text-blue-400 tracking-[0.3em] uppercase">Electronics</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">The hub for Kigali's premium gadgets. Experience tech like never before.</p>
        </div>
        
        {/* Navigation columns remain the same... */}
        <div>
          <h4 className="font-black text-[10px] uppercase tracking-widest mb-6 text-gray-500">Quick Shop</h4>
          <ul className="space-y-4 text-sm font-bold">
            <li><Link to="/" className="hover:text-blue-400 transition">All Products</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400 transition">Support</Link></li>
          </ul>
        </div>
        {/* ... */}
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.5em]">
          © 2026 EMMY ELECTRONICS • PREMIUM GADGETS
        </p>
        
        {/* THE HIDDEN DOOR */}
        <Link to="/admin" className="text-[9px] text-gray-800 hover:text-blue-900 font-bold uppercase tracking-widest transition-colors">
          Staff Hub
        </Link>
      </div>
    </footer>
  );
}

export default Footer;