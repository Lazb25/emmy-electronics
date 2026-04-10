import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function HomePage({ searchQuery, selectedCategory, setSelectedCategory }) {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const productGridRef = useRef(null);

  const categories = ["All", "Smartphones", "Laptops", "Audio", "Gaming", "Cameras"];

  useEffect(() => {
    fetch('https://emmy-backend.onrender.com/api/products') 
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const scrollToProducts = () => {
    productGridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="p-20 text-center animate-pulse font-black text-gray-300">WAKING UP SERVER...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 md:py-8">
      
      {/* HERO SECTION */}
      <div className="bg-white border border-gray-100 rounded-[32px] md:rounded-[50px] mb-12 md:mb-16 shadow-sm overflow-hidden">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between px-6 py-10 md:px-20 md:py-20 gap-10">
          <div className="max-w-xl text-center md:text-left flex flex-col items-center md:items-start">
            <span className="inline-block px-4 py-1.5 mb-4 text-[10px] font-black tracking-[0.3em] text-blue-600 bg-blue-50 rounded-full">
              RWANDA'S TECH HUB
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-950 leading-tight tracking-tighter mb-6">
              Premium Tech. <br /> <span className="text-blue-600">Delivered.</span>
            </h1>
            <p className="text-gray-600 text-sm md:text-lg mb-10 max-w-md font-medium leading-relaxed">
              Shop the latest genuine laptops, iPhones, and modern audio gear. Quality guaranteed, right here in Kigali.
            </p>
            <button 
              onClick={scrollToProducts}
              className="bg-gray-950 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg active:scale-[0.98]"
            >
              Shop All Gadgets →
            </button>
          </div>

          <div className="relative w-full max-w-[500px] flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-50 blur-[80px] rounded-full scale-110"></div>
            <img 
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=1000" 
              alt="Tech Lineup" 
              className="relative z-10 w-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* PRODUCT LAYOUT */}
      <div ref={productGridRef} className="flex flex-col lg:flex-row gap-10 scroll-mt-24">
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <h2 className="hidden lg:block font-black text-gray-400 text-[10px] uppercase tracking-[0.3em] mb-6 ml-2">Shop By Category</h2>
            <ul className="flex lg:flex-col overflow-x-auto lg:overflow-visible p-1 lg:p-0 gap-2 lg:gap-3 no-scrollbar">
              {categories.map(cat => (
                <li 
                  key={cat} 
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-shrink-0 px-6 py-3 lg:rounded-2xl rounded-full cursor-pointer transition-all text-xs font-black uppercase tracking-widest ${
                    selectedCategory === cat ? "bg-blue-600 text-white shadow-lg" : "bg-white text-gray-400 border border-gray-100"
                  }`}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {filteredProducts.map(product => (
              <div key={product.id} className="group bg-white rounded-[32px] p-5 border border-gray-50 hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 flex flex-col">
                <Link to={`/product/${product.id}`} className="relative h-40 md:h-60 bg-gray-50 rounded-[24px] mb-6 flex items-center justify-center p-6 overflow-hidden">
                  <img src={product.image} alt="" className="max-w-full max-h-full object-contain drop-shadow-xl group-hover:scale-110 transition duration-700" />
                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 text-[10px] font-black px-4 py-2 rounded-full shadow-xl transition-all translate-y-4 group-hover:translate-y-0 uppercase tracking-widest">View Details</span>
                  </div>
                </Link>

                <Link to={`/product/${product.id}`}>
                  <h3 className="font-bold text-gray-800 text-sm md:text-xl tracking-tight mb-4 truncate px-2 hover:text-blue-600">{product.name}</h3>
                </Link>

                <div className="mt-auto flex items-center justify-between px-2 pb-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Price</span>
                    <span className="text-lg md:text-3xl font-black text-gray-900 tracking-tighter">${product.price}</span>
                  </div>
                  <button onClick={() => addToCart(product)} className="bg-gray-900 text-white w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all active:scale-90">+</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;