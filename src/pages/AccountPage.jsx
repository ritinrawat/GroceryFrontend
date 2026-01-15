import React, { useState, useEffect } from "react";
import { FiPackage, FiGift, FiShield, FiLogOut, FiShoppingBag, FiMapPin, FiChevronRight } from "react-icons/fi";
import Navbar from "../components/Navbar";
import HistoryCard from "../components/HistoryCard.jsx";
import OrderDetails from "../components/OrderDetails.jsx";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const [active, setActive] = useState("orders");
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getHistory = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://grocery-x2ds.onrender.com/payment/gethistory`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error("Error fetching order history:", err);
      setError("Unable to load orders right now");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(`https://grocery-x2ds.onrender.com/auth/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Logout failed");
      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate('/');
        window.location.reload();
      }
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  useEffect(() => {
    if (!token) navigate('/login');
    getHistory();
  }, [token]);

  const menuItems = [
    { id: "orders", label: "My Orders", icon: <FiPackage /> },
    { id: "gift", label: "E-Gift Cards", icon: <FiGift /> },
    { id: "privacy", label: "Account Privacy", icon: <FiShield /> },
    { id: "logout", label: "Logout", icon: <FiLogOut />, color: "text-red-500" },
  ];

  const userName = orders[0]?.sessionId?.name || "User";
  const userPhone = orders[0]?.sessionId?.number || "N/A";

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-6 md:py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <aside className="w-full lg:w-80 space-y-4">
            {/* User Profile Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#059363]/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-[#059363] rounded-2xl flex items-center justify-center text-white text-xl font-black mb-4 shadow-lg shadow-[#059363]/20">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-xl font-black text-gray-900 leading-tight">{userName}</h2>
                <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">+91 {userPhone}</p>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="bg-white rounded-3xl p-3 shadow-sm border border-gray-100">
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => item.id === "logout" ? logout() : setActive(item.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-200 group ${active === item.id && item.id !== "logout"
                        ? "bg-[#059363]/5 text-[#059363]"
                        : "text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`text-xl ${active === item.id && item.id !== "logout" ? "text-[#059363]" : item.color || "text-gray-400"}`}>
                          {item.icon}
                        </span>
                        <span className={`text-sm font-bold ${active === item.id && item.id !== "logout" ? "text-gray-900" : ""}`}>
                          {item.label}
                        </span>
                      </div>
                      <FiChevronRight className={`transition-transform duration-200 ${active === item.id ? "translate-x-1" : "opacity-0 group-hover:opacity-100"}`} />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content Area */}
          <section className="flex-grow">
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 min-h-[600px] overflow-hidden flex flex-col">

              {/* Content Header */}
              <div className="px-8 py-8 border-b border-gray-50 flex items-center justify-between bg-white sticky top-0 z-10">
                <div>
                  <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
                    {active === "orders" ? "My Orders" :
                      active === "gift" ? "E-Gift Cards" :
                        active === "privacy" ? "Privacy Policy" : ""}
                  </h1>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">
                    {active === "orders" ? `Total ${orders.length} orders found` : "Manage your account"}
                  </p>
                </div>
                {active === "orders" && orders.length > 1 && (
                  <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl text-xs font-bold text-gray-500 uppercase tracking-widest border border-gray-100">
                    <FiShoppingBag /> Recent First
                  </div>
                )}
              </div>

              {/* Dynamic Content */}
              <div className="p-4 md:p-8 flex-grow">
                {active === "orders" && (
                  <div className="space-y-4">
                    {loading ? (
                      <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                        <div className="w-12 h-12 bg-gray-100 rounded-full mb-4"></div>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading orders...</p>
                      </div>
                    ) : error ? (
                      <div className="text-center py-20">
                        <p className="text-red-500 font-bold">{error}</p>
                      </div>
                    ) : orders.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6 text-3xl text-gray-300">
                          <FiPackage />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 mb-2">No orders yet</h3>
                        <p className="text-gray-500 font-medium mb-8 max-w-xs">Looks like you haven't placed any orders. Start shopping now!</p>
                        <button onClick={() => navigate('/')} className="px-8 py-3 bg-[#059363] text-white rounded-2xl font-black shadow-lg shadow-[#059363]/20">
                          Start Shopping
                        </button>
                      </div>
                    ) : selectedOrder === null ? (
                      <div className="grid grid-cols-1 gap-4">
                        {orders.map((order, idx) => (
                          <div key={order._id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
                            <HistoryCard order={order} onClick={setSelectedOrder} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="animate-in fade-in zoom-in-95 duration-300">
                        <OrderDetails order={selectedOrder} onClose={() => setSelectedOrder(null)} />
                      </div>
                    )}
                  </div>
                )}

                {active === "gift" && (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 bg-yellow-50 rounded-3xl flex items-center justify-center mb-6 text-3xl text-yellow-500">
                      <FiGift />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-2">Coming Soon</h3>
                    <p className="text-gray-500 font-medium max-w-xs">E-gift cards are being prepared. You'll be able to send joy to your friends shortly!</p>
                  </div>
                )}

                {active === "privacy" && (
                  <div className="prose prose-sm max-w-none">
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 flex items-start gap-4">
                      <FiShield className="text-2xl text-blue-500 mt-1" />
                      <div>
                        <h4 className="font-black text-blue-900 uppercase tracking-tight mb-1">Your Privacy Matters</h4>
                        <p className="text-blue-700/80 font-medium text-xs leading-relaxed">We use state-of-the-art encryption to ensure your personal data and payment information are always secure.</p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <section>
                        <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Information We Collect</h3>
                        <p className="text-gray-600 font-medium leading-relaxed">Blinkit collects information related to your orders, location, and payment preferences to provide a seamless 10-minute delivery experience.</p>
                      </section>
                      <section>
                        <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Security Standards</h3>
                        <p className="text-gray-600 font-medium leading-relaxed">Our platform complies with international security standards and PCI-DSS for payment processing.</p>
                      </section>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default AccountPage;
