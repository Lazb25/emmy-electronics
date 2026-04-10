import React from 'react';

function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! Emmy's team will get back to you soon.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Contact Text */}
        <div>
          <span className="text-blue-600 font-black text-[10px] tracking-[0.3em] uppercase mb-4 block">Get In Touch</span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tighter leading-tight">
            How can we <span className="text-blue-400">help you?</span>
          </h1>
          <p className="text-gray-500 text-lg mb-10 leading-relaxed font-medium">
            Have a question about a product or your order? Our team is available 24/7 to ensure your tech needs are met.
          </p>

          <div className="space-y-8">
            <div className="flex gap-6 items-center">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xl shadow-sm">📍</div>
              <div>
                <h4 className="font-black text-xs uppercase tracking-widest text-gray-400">Our HQ</h4>
                <p className="font-bold text-gray-800">123 Silicon Street, Kigali</p>
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-xl shadow-sm">✉️</div>
              <div>
                <h4 className="font-black text-xs uppercase tracking-widest text-gray-400">Email Us</h4>
                <p className="font-bold text-gray-800">hello@emmyelectronics.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 md:p-12 rounded-[32px] md:rounded-[48px] border border-gray-100 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Full Name</label>
                <input required type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Email Address</label>
                <input required type="email" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition" placeholder="john@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Message</label>
              <textarea required rows="5" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition resize-none" placeholder="What's on your mind?"></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all">
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default ContactPage;