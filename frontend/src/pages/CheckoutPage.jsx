import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle'); // 'idle', 'pending', 'success'

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const handleSimulatedPayment = (e) => {
    e.preventDefault();
    if (!phoneNumber) return alert("Please enter your MTN number");
    
    setLoading(true);
    setPaymentStatus('pending');

    // Simulate the network delay and the time it takes to approve on a phone
    setTimeout(() => {
      setLoading(false);
      setPaymentStatus('success');

      // Final cleanup: clear cart and redirect after showing success message
      setTimeout(() => {
        clearCart();
        navigate('/');
      }, 3500);
    }, 4000); // 4 second "processing" time
  };

  if (cart.length === 0 && paymentStatus !== 'success') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-black text-gray-900 mb-4">Your cart is empty</h2>
        <button onClick={() => navigate('/')} className="text-blue-600 font-bold hover:underline">
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* --- LEFT: PAYMENT SECTION --- */}
        <div className="flex-1">
          <h1 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">CHECKOUT</h1>
          
          <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm transition-all duration-500">
            
            {paymentStatus === 'success' ? (
              <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                  Check
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-2">Order Confirmed!</h2>
                <p className="text-gray-500">Payment received via MTN Mobile Money.</p>
                <p className="text-sm text-gray-400 mt-4 italic font-medium">Redirecting you to the home page...</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center font-black text-xs shadow-inner">
                    MTN
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-gray-800">Mobile Money</h2>
                    <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Secure Gateway Integration</p>
                  </div>
                </div>

                {paymentStatus === 'pending' ? (
                  <div className="py-10 text-center">
                    <div className="relative w-16 h-16 mx-auto mb-6">
                      <div className="absolute inset-0 border-4 border-yellow-100 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-yellow-500 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Awaiting Approval</h3>
                    <p className="text-sm text-gray-500 max-w-xs mx-auto">
                      Please check your phone for the <strong>*182#</strong> prompt to authorize the payment.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSimulatedPayment} className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                        Phone Number for Payment
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="e.g. 25078XXXXXXX"
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold text-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>

                    <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
                      <p className="text-xs text-blue-800 leading-relaxed font-semibold">
                        Info: The payment request will be sent immediately to your MTN number. Ensure your SIM is active and you have sufficient balance.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-[0.98] disabled:bg-gray-200"
                    >
                      {loading ? "REQUESTING PROMPT..." : `PAY $${totalAmount} NOW`}
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>

        {/* --- RIGHT: ORDER SUMMARY --- */}
        <div className="lg:w-96">
          <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-xl shadow-blue-900/5 sticky top-24">
            <h2 className="text-xl font-black text-gray-900 mb-6">Order Details</h2>
            
            <div className="space-y-4 mb-8 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="w-14 h-14 bg-gray-50 rounded-xl flex-shrink-0 p-2 border border-gray-100">
                    <img src={item.image} alt="" className="w-full h-full object-contain drop-shadow-sm" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800 truncate">{item.name}</p>
                    <p className="text-xs font-bold text-blue-600">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-100 pt-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">Grand Total</span>
                <span className="text-3xl font-black text-gray-900">${totalAmount}</span>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-gray-300">
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">End-to-End Encryption</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CheckoutPage;