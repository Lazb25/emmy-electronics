import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function HomePage({ searchQuery, selectedCategory, setSelectedCategory }) {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Smartphones", "Laptops", "Audio", "Gaming", "Cameras"];

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
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

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* --- HERO SECTION (Always Visible) --- */}
      <div className="relative h-64 lg:h-96 bg-gray-900 rounded-[40px] mb-12 overflow-hidden flex items-center px-8 lg:px-20 text-white shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200" 
          alt="Tech Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-20 max-w-xl">
          <span className="bg-blue-600 text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-6 inline-block">
            Emmy Electronics Exclusive
          </span>
          <h1 className="text-4xl lg:text-7xl font-black leading-tight tracking-tighter">
            Smart Tech. <br /> <span className="text-blue-400">Better Living.</span>
          </h1>
          <p className="text-gray-300 mt-6 text-sm lg:text-lg font-medium max-w-sm hidden md:block">
            Discover the latest in high-performance gadgets and premium electronics.
          </p>
          <button className="mt-8 bg-white text-gray-900 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95">
            Explore Collection
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* --- SIDEBAR CATEGORIES --- */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-[28px] shadow-sm border border-gray-100 sticky top-28 overflow-hidden">
            <h2 className="bg-gray-50 px-6 py-5 font-black text-gray-900 text-[10px] uppercase tracking-widest border-b">Categories</h2>
            <ul className="p-2 space-y-1">
              {categories.map(cat => (
                <li 
                  key={cat} 
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-4 rounded-2xl cursor-pointer transition-all flex justify-between items-center group ${
                    selectedCategory === cat 
                      ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-200" 
                      : "text-gray-500 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  <span className="text-sm">{cat}</span>
                  <span className="text-[10px] opacity-30 group-hover:translate-x-1 transition-transform">▶</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* --- PRODUCT GRID AREA --- */}
        <div className="flex-1">
          <div className="mb-10 border-b border-gray-100 pb-6 flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
                {selectedCategory}
              </h2>
              <p className="text-gray-400 text-xs font-bold mt-1">SHOWING {filteredProducts.length} PRODUCTS</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <div key={product.id} className="group bg-white rounded-3xl p-5 border border-gray-100 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500">
                <div className="relative h-56 bg-gray-50 rounded-2xl mb-5 flex items-center justify-center p-8 group-hover:bg-white transition-colors">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="max-w-full max-h-full object-contain drop-shadow-2xl group-hover:scale-110 transition duration-500" 
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-black shadow-sm">
                    ⭐ {product.rating}
                  </div>
                </div>
                
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">{product.category}</p>
                <h3 className="font-bold text-gray-800 text-lg leading-tight mb-4 group-hover:text-blue-600 transition">{product.name}</h3>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <span className="text-2xl font-black text-gray-900">${product.price}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-gray-900 text-white w-12 h-12 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all active:scale-90 shadow-lg"
                  >
                    <span className="text-xl">+</span>
                  </button>
                </div>
                <Link to={`/product/${product.id}`} className="block text-center mt-4 text-[10px] font-black text-gray-300 hover:text-blue-600 uppercase tracking-widest">
                  View Specifications
                </Link>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="py-32 text-center bg-white rounded-[40px] border-2 border-dashed border-gray-100">
              <div className="text-5xl mb-4 text-gray-200">🔎</div>
              <p className="text-gray-400 font-bold">No results found in "{selectedCategory}"</p>
              <button 
                onClick={() => {setSelectedCategory("All");}} 
                className="mt-4 text-blue-600 font-black text-sm hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;