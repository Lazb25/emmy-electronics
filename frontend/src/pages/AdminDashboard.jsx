import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('inventory');
  
  // Form State for new products
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Smartphones',
    image: '',
    description: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch('https://emmy-backend.onrender.com/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products:", err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://emmy-backend.onrender.com/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Success! Gadget added to Emmy Electronics.");
        setShowForm(false); // Close the popup
        setFormData({ name: '', price: '', category: 'Smartphones', image: '', description: '' });
        fetchProducts(); // Refresh the table
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 flex-col md:flex-row font-sans">
      {/* SIDEBAR */}
      <div className="w-full md:w-64 bg-gray-950 text-white p-8 flex md:flex-col justify-between md:justify-start gap-4">
        <div className="mb-10">
          <h2 className="text-xl font-black tracking-tighter">EMMY</h2>
          <p className="text-[8px] font-bold text-blue-400 tracking-[0.3em] uppercase">Control Panel</p>
        </div>
        <nav className="flex md:flex-col gap-6">
          <button 
            onClick={() => setActiveTab('inventory')} 
            className={`text-[10px] font-black uppercase tracking-widest transition-colors ${activeTab === 'inventory' ? 'text-blue-400' : 'text-gray-500 hover:text-white'}`}
          >
            📦 Inventory
          </button>
          <button 
            onClick={() => setActiveTab('sales')} 
            className={`text-[10px] font-black uppercase tracking-widest transition-colors ${activeTab === 'sales' ? 'text-blue-400' : 'text-gray-500 hover:text-white'}`}
          >
            💰 Sales Data
          </button>
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-12 relative">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Store Management</h1>
            <p className="text-gray-400 font-bold text-xs tracking-widest mt-1">UPDATE YOUR STOCK LIVE</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all"
          >
            + New Gadget
          </button>
        </header>

        {/* INVENTORY TABLE */}
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">Product</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">Category</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">Price</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image} className="w-10 h-10 object-contain bg-gray-100 rounded-lg p-1" alt="" />
                      <span className="font-bold text-gray-800 text-sm">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-full tracking-widest border border-blue-100">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-black text-gray-950">${p.price}</td>
                  <td className="px-6 py-4">
                    <button className="text-[10px] font-black text-gray-300 hover:text-red-500 uppercase tracking-widest transition-colors">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ADD PRODUCT MODAL */}
        {showForm && (
          <div className="fixed inset-0 bg-gray-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xl rounded-[40px] p-8 md:p-12 shadow-2xl relative animate-in fade-in zoom-in duration-200">
              <button onClick={() => setShowForm(false)} className="absolute top-8 right-8 text-gray-300 hover:text-gray-950 text-2xl font-light">✕</button>
              
              <h2 className="text-3xl font-black text-gray-950 mb-2 uppercase tracking-tighter">Add to Store</h2>
              <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-8">This will go live immediately</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input required type="text" placeholder="Gadget Name" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl outline-none focus:ring-4 focus:ring-blue-500/5 transition font-medium" 
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                
                <div className="grid grid-cols-2 gap-4">
                  <input required type="number" placeholder="Price ($)" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl outline-none focus:ring-4 focus:ring-blue-500/5 transition font-medium" 
                    value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                  
                  <select className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl outline-none font-bold text-gray-400 text-sm appearance-none"
                    value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                    <option>Smartphones</option>
                    <option>Laptops</option>
                    <option>Audio</option>
                    <option>Gaming</option>
                    <option>Cameras</option>
                  </select>
                </div>

                <input required type="text" placeholder="Image URL" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl outline-none focus:ring-4 focus:ring-blue-500/5 transition font-medium" 
                  value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />

                <textarea placeholder="Product Description" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl outline-none focus:ring-4 focus:ring-blue-500/5 transition font-medium h-28 resize-none"
                  value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>

                <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all">
                  Publish Product
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;