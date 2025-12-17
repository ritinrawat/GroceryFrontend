import React, { useState, useEffect } from "react";
import { FaBox, FaGift, FaLock, FaUser } from "react-icons/fa";
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
  const getHistory = async () => {
    setLoading(true);
    setError("");
    console.log("Fetching order history...");
    try {
      const response = await fetch(
        "https://grocery-x2ds.onrender.com/payment/gethistory",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      setOrders(data.orders || []);
      console.log("Fetched orders:", data.orders);
    } catch (err) {
      console.log("Error fetching cart items:", err);
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
        window.location.reload();
      
      }
    } catch (error) {
      console.log("Logout Error:", error);
    }
  };
  const navigate = useNavigate();
  const handleLogout=()=>{
   navigate('/')
   logout()
  }

  // Fetch on mount
  useEffect(() => {
    getHistory();
  }, []);

  const menuItems = [
    { id: "orders", label: "My Orders", icon: <FaBox /> },
    { id: "gift", label: "E-Gift Cards", icon: <FaGift /> },
    { id: "privacy", label: "Account privacy and policy", icon: <FaLock /> },
    { id: "logout", label: "Logout", icon: <FaUser /> },
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10">
        <div className="bg-white shadow-md rounded-xl flex flex-col md:flex-row w-11/12 md:w-4/5 max-w-5xl overflow-visible">

          {/* Sidebar */}
          <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 p-4 md:p-6">

            {/* User Info */}
            <div className="text-center mb-6 space-y-1">
              <p className="text-gray-800 text-base font-semibold tracking-wide">
                {orders[0]?.sessionId?.name}
              </p>
              <p className="text-gray-500 text-sm font-medium">
                +91 {orders[0]?.sessionId?.number}
              </p>
            </div>

            {/* Sidebar Menu */}
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActive(item.id)}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition ${
                      active === item.id
                        ? "bg-gray-100 text-green-600 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-2/3 p-4 md:p-8">

            {active === "orders" && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Order History</h2>

                {loading && <p className="text-gray-500">Loading your orders...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {!loading && orders.length === 0 && (
                  <p className="text-gray-600">No orders found.</p>
                )}

                {!loading &&
                  orders.length > 0 &&
                  selectedOrder === null &&
                  orders.map((order) => (
                    <HistoryCard
                      key={order._id}
                      order={order}
                      onClick={setSelectedOrder}
                    />
                  ))}

                {/* Show popup only when clicked */}
                {selectedOrder && (
                  <OrderDetails
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                  />
                )}
              </div>
            )}

            {active === "gift" && (
              <h2 className="text-gray-700 text-lg font-medium">
                E-Gift card section coming soon.
              </h2>
            )}

            {active === "privacy" && (
              <div>
                <h2 className="text-gray-700 text-lg font-medium">
                  Account privacy and policy.
                </h2>
                <small className="text-gray-500">
                  We i.e. "Blink Commerce Private Limited", are committed to
                  protecting the privacy and security of your personal
                  information. Your privacy is important to us...
                </small>
              </div>
            )}

            {active === "logout" && (
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
