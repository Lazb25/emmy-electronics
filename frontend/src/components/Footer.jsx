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
        <div>
          <h4 className="font-black text-[10px] uppercase tracking-widest mb-6 text-gray-500">Links</h4>
          <ul className="space-y-4 text-sm font-bold">
            <li><Link to="/" className="hover:text-blue-400 transition">Shop All</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400 transition">Contact Us</Link></li>
            <li><Link to="/cart" className="hover:text-blue-400 transition">My Cart</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-black text-[10px] uppercase tracking-widest mb-6 text-gray-500">Categories</h4>
          <ul className="space-y-4 text-sm font-bold text-gray-400">
            <li>Laptops</li>
            <li>Smartphones</li>
            <li>Audio Gear</li>
          </ul>
        </div>
        <div>
          <h4 className="font-black text-[10px] uppercase tracking-widest mb-6 text-gray-500">Visit Us</h4>
          <address className="not-italic text-sm text-gray-400 space-y-4 font-bold">
            <p>📍 Kigali, Rwanda</p>
            <p>📧 support@emmy.com</p>
          </address>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 text-center md:text-left">
        <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.5em]">
          © 2026 EMMY ELECTRONICS • PREMIUM GADGETS
        </p>
      </div>
    </footer>
  );
}

export default Footer;