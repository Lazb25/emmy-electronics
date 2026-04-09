import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function HomePage({ searchQuery, selectedCategory, setSelectedCategory }) {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Smartphones", "Laptops", "Audio", "Gaming", "Cameras"];

  useEffect(() => {
    // Make sure this URL matches your Render backend URL!
    fetch('https://emmy-backend.onrender.com/api/products') 
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="p-20 text-center animate-pulse font-bold text-gray-400">Waking up server...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 md:py-8">
      
      {/* --- HERO SECTION --- */}
      <div className="relative h-48 md:h-80 lg:h-96 bg-gray-900 rounded-[24px] md:rounded-[40px] mb-8 md:mb-12 overflow-hidden flex items-center px-6 md:px-20 text-white shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200" 
          alt="Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-20 max-w-md">
          <h1 className="text-2xl md:text-5xl lg:text-7xl font-black leading-tight tracking-tighter">
            Smart Tech. <br /> <span className="text-blue-400">Better Living.</span>
          </h1>
          <button className="mt-4 md:mt-8 bg-white text-gray-900 px-6 py-2.5 md:px-10 md:py-4 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
            Shop Now
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
        
        {/* --- SIDEBAR / CATEGORY SCROLLER --- */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <h2 className="hidden lg:block bg-gray-50 px-6 py-4 font-black text-gray-900 text-[10px] uppercase tracking-widest border border-gray-100 rounded-t-[20px]">Categories</h2>
            {/* Scrollable list on mobile, vertical on desktop */}
            <ul className="flex lg:flex-col overflow-x-auto lg:overflow-visible p-1 lg:p-2 bg-white lg:border border-gray-100 lg:rounded-b-[20px] gap-2 lg:gap-1 no-scrollbar">
              {categories.map(cat => (
                <li 
                  key={cat} 
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-shrink-0 px-5 py-2.5 lg:rounded-xl rounded-full cursor-pointer transition-all text-xs md:text-sm font-bold ${
                    selectedCategory === cat 
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
                      : "bg-gray-50 lg:bg-transparent text-gray-500 hover:text-blue-600"
                  }`}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* --- PRODUCT GRID --- */}
        <div className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {filteredProducts.map(product => (
              <div key={product.id} className="group bg-white rounded-2xl md:rounded-3xl p-3 md:p-5 border border-gray-100 hover:shadow-xl transition-all">
                <div className="relative h-32 md:h-56 bg-gray-50 rounded-xl md:rounded-2xl mb-3 md:mb-5 flex items-center justify-center p-4">
                  <img 
                    src={product.image} 
                    alt="" 
                    className="max-w-full max-h-full object-contain drop-shadow-lg group-hover:scale-110 transition duration-500" 
                  />
                </div>
                
                <p className="text-[8px] md:text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">{product.category}</p>
                <h3 className="font-bold text-gray-800 text-xs md:text-lg leading-tight mb-2 md:mb-4 truncate">{product.name}</h3>
                
                <div className="flex items-center justify-between pt-2 md:pt-4 border-t border-gray-50">
                  <span className="text-sm md:text-2xl font-black text-gray-900">${product.price}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-gray-900 text-white w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all active:scale-90"
                  >
                    <span className="text-lg">+</span>
                  </button>
                </div>
                <Link to={`/product/${product.id}`} className="block text-center mt-3 text-[8px] md:text-[10px] font-black text-gray-300 hover:text-blue-600 uppercase tracking-widest">
                  Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;