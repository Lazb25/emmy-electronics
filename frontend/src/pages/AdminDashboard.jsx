import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', price: '', category: 'Smartphones', image: '', description: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch('https://emmy-backend.onrender.com/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Fetch error:", err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Attempting to publish:", formData);

    try {
      const response = await fetch('https://emmy-backend.onrender.com/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("🚀 Product Published Successfully!");
        setShowForm(false);
        setFormData({ name: '', price: '', category: 'Smartphones', image: '', description: '' });
        fetchProducts(); 
      } else {
        const errorData = await response.json();
        alert("❌ Server Error: " + errorData.message);
      }
    } catch (error) {
      console.error("Connection error:", error);
      alert("❌ Could not connect to the server. Check your internet or backend status.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-950 text-white p-8">
        <h2 className="text-xl font-black tracking-tighter mb-2">EMMY</h2>
        <p className="text-[8px] font-bold text-blue-400 tracking-[0.3em] uppercase mb-10">Admin Center</p>
        <nav className="space-y-4">
          <div className="text-blue-400 text-[10px] font-black uppercase tracking-widest">📦 Inventory</div>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black text-gray-900 uppercase">Store Stock</h1>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all"
          >
            + Add Product
          </button>
        </div>

        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-[10px] font-black uppercase text-gray-400">
              <tr>
                <th className="px-6 py-4">Item</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map(p => (
                <tr key={p._id} className="text-sm font-bold text-gray-700">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img src={p.image} className="w-8 h-8 object-contain" alt="" />
                    {p.name}
                  </td>
                  <td className="px-6 py-4 font-black">${p.price}</td>
                  <td className="px-6 py-4 text-blue-500 uppercase text-[10px] tracking-widest">{p.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl relative">
              <button onClick={() => setShowForm(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black">✕</button>
              <h2 className="text-2xl font-black mb-6 uppercase">New Product</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input required type="text" placeholder="Name" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none" 
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input required type="number" placeholder="Price" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none" 
                  value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                <select className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-gray-400"
                  value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option>Smartphones</option><option>Laptops</option><option>Audio</option><option>Gaming</option>
                </select>
                <input required type="text" placeholder="Image URL" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none" 
                  value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
                <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-black uppercase text-xs tracking-widest">Publish Product</button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;