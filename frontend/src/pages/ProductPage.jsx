import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your Render URL
    fetch(`https://emmy-backend.onrender.com/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-20 text-center font-black text-gray-300 animate-pulse">LOADING DETAILS...</div>;
  if (!product) return <div className="p-20 text-center font-black">PRODUCT NOT FOUND</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-16">
      {/* Back Button - Clean for Mobile */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-[10px] font-black tracking-widest text-gray-400 hover:text-blue-600 mb-6 transition"
      >
        ← BACK TO SHOP
      </button>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-20">
        
        {/* --- LEFT: PRODUCT IMAGE --- */}
        <div className="flex-1">
          <div className="bg-white rounded-[32px] md:rounded-[48px] p-8 md:p-16 border border-gray-100 shadow-sm flex items-center justify-center relative overflow-hidden group">
            {/* Background Decorative Circle */}
            <div className="absolute w-64 h-64 bg-blue-50 rounded-full -bottom-20 -right-20 transition-transform group-hover:scale-150 duration-700"></div>
            
            <img 
              src={product.image} 
              alt={product.name} 
              className="relative z-10 w-full max-h-[300px] md:max-h-[500px] object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* --- RIGHT: PRODUCT INFO --- */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="mb-6 md:mb-10">
            <span className="bg-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg inline-block mb-4">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight tracking-tighter">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mt-4 text-sm font-bold text-gray-400">
              <span className="text-yellow-500">★ ★ ★ ★ ☆</span>
              <span>(4.8/5 Customer Rating)</span>
            </div>
          </div>

          <p className="text-gray-500 leading-relaxed md:text-lg mb-8 md:mb-12 font-medium">
            {product.description || "Experience the pinnacle of engineering with the latest from Emmy Electronics. Designed for performance and style, this device redefines what's possible in the modern tech landscape."}
          </p>

          {/* Pricing and Action Section */}
          <div className="bg-gray-50 rounded-[32px] p-6 md:p-10 border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Price</p>
                <p className="text-3xl md:text-5xl font-black text-gray-900">${product.price}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-green-500 uppercase tracking-widest mb-1">Status</p>
                <p className="text-sm font-bold text-gray-800 italic">In Stock & Ready</p>
              </div>
            </div>

            <button 
              onClick={() => addToCart(product)}
              className="w-full bg-blue-600 text-white py-5 md:py-6 rounded-2xl font-black shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-[0.97] flex items-center justify-center gap-3"
            >
              <span className="text-xl">🛒</span>
              ADD TO COLLECTION
            </button>
          </div>

          {/* Key Features Icons - Hidden on small mobile to save vertical space */}
          <div className="hidden md:flex gap-8 mt-12">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">🛡️</div>
              <span className="text-[10px] font-black text-gray-400 uppercase">2yr Warranty</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">🚚</div>
              <span className="text-[10px] font-black text-gray-400 uppercase">Fast Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">♻️</div>
              <span className="text-[10px] font-black text-gray-400 uppercase">Easy Returns</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductPage;