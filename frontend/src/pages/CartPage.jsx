import React from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

function CartPage() {
  const { cart, removeFromCart, addToCart } = useCart();
  const navigate = useNavigate();

  // Group items by ID to show quantity (e.g., 2x iPhone instead of listing it twice)
  const groupedCart = cart.reduce((acc, item) => {
    const found = acc.find((i) => i.id === item.id);
    if (found) {
      found.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const shipping = 0; // You can change this to a value if needed
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h2 className="text-3xl font-black text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added any gadgets yet.</p>
        <Link 
          to="/" 
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition"
        >
          START SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-gray-900 mb-10 tracking-tight">SHOPPING CART</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* --- LEFT: ITEMS LIST --- */}
        <div className="flex-1 space-y-6">
          {groupedCart.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-6"
            >
              {/* Product Preview Image */}
              <div className="w-32 h-32 bg-gray-50 rounded-2xl flex items-center justify-center p-4 flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="max-w-full max-h-full object-contain drop-shadow-lg" 
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 text-center sm:text-left">
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">
                  {item.category}
                </p>
                <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                <p className="text-gray-400 text-sm mt-1 line-clamp-1">{item.description}</p>
              </div>

              {/* Quantity & Price */}
              <div className="flex flex-col items-center sm:items-end gap-2">
                <p className="text-2xl font-black text-gray-900">${item.price * item.quantity}</p>
                <div className="flex items-center bg-gray-50 rounded-lg border border-gray-100">
                  <button 
                    onClick={() => removeFromCart(cart.findIndex(i => i.id === item.id))}
                    className="px-3 py-1 hover:text-red-600 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-black text-gray-600">{item.quantity}</span>
                  <button 
                    onClick={() => addToCart(item)}
                    className="px-3 py-1 hover:text-blue-600 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- RIGHT: ORDER SUMMARY --- */}
        <div className="lg:w-96">
          <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-xl shadow-blue-900/5 sticky top-24">
            <h2 className="text-xl font-black text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm font-medium border-b border-gray-100 pb-6 mb-6">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="text-gray-900">${subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span className="text-green-600 font-bold">FREE</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-black text-gray-900">Total</span>
              <span className="text-3xl font-black text-blue-600">${total}</span>
            </div>

            <button 
              onClick={() => navigate("/checkout")}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 mb-4"
            >
              PROCEED TO CHECKOUT
            </button>

            <Link 
              to="/" 
              className="block text-center text-xs font-bold text-gray-400 hover:text-gray-600 uppercase tracking-widest transition"
            >
              Continue Shopping
            </Link>

            {/* Trust Badges */}
            <div className="mt-8 pt-6 border-t border-gray-50 flex justify-center gap-4 grayscale opacity-50">
               <span className="text-[10px] font-bold">SECURE PAYMENT</span>
               <span className="text-[10px] font-bold">|</span>
               <span className="text-[10px] font-bold">FAST DELIVERY</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CartPage;