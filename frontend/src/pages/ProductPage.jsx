import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch individual product details from backend
    fetch(`https://emmy-backend.onrender.com/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (!product) return <h2 className="p-20 text-center font-bold">Product not found.</h2>;

  // Check current cart count for this item
  const countInCart = cart.filter(item => item.id === product.id).length;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Breadcrumb / Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="mb-6 flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-blue-600 transition"
        >
          ← BACK TO SHOPPING
        </button>

        <div className="bg-white rounded-[32px] shadow-xl shadow-blue-900/5 overflow-hidden border border-gray-100">
          <div className="flex flex-col lg:flex-row">
            
            {/* --- LEFT: IMAGE SECTION --- */}
            <div className="lg:w-1/2 bg-gray-50 p-12 flex items-center justify-center relative min-h-[500px]">
              {/* Image with specialized shadow for transparent PNGs */}
              <img
                src={product.image}
                alt={product.name}
                className="max-w-full max-h-[400px] object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-8 left-8">
                <span className="bg-white px-4 py-2 rounded-full text-[10px] font-black text-blue-600 shadow-sm border border-gray-100">
                  {product.category}
                </span>
              </div>
            </div>

            {/* --- RIGHT: PRODUCT INFO --- */}
            <div className="lg:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-4xl font-black text-gray-900 leading-tight">
                  {product.name}
                </h1>
                <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg font-bold text-sm">
                  ★ {product.rating || "4.8"}
                </div>
              </div>

              <p className="text-3xl font-black text-blue-600 mb-6">${product.price}</p>
              
              <div className="space-y-4 mb-8">
                <p className="text-gray-500 leading-relaxed">
                  {product.description || "The latest technology designed for high performance and durability. Experience next-gen features today."}
                </p>
                <div className="flex items-center gap-4">
                  <span className={`h-2.5 w-2.5 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`}></span>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {product.stock > 0 ? `${product.stock} Units Available` : "Out of Stock"}
                  </span>
                </div>
              </div>

              {/* Interaction Row */}
              <div className="flex flex-wrap gap-4 items-center">
                {/* Quantity Control */}
                <div className="flex items-center bg-gray-100 rounded-2xl p-1 border border-gray-200">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center font-bold hover:bg-white rounded-xl transition"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-black text-gray-700">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center font-bold hover:bg-white rounded-xl transition"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 min-w-[200px] bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:bg-gray-200"
                >
                  ADD TO CART
                </button>
              </div>

              {countInCart > 0 && (
                <p className="mt-4 text-center text-sm font-bold text-blue-600 bg-blue-50 py-2 rounded-xl">
                  {countInCart} items already in your basket
                </p>
              )}

              {/* Trust Features */}
              <div className="mt-12 pt-8 border-t border-gray-100 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-xs">🛡️</div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">1 Year Warranty</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-xs">🚚</div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Express Delivery</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;