"use client";
import { useEffect, useState } from "react";
import { Home, Box, ShoppingCart, Heart, User, Loader } from "lucide-react";
import ChatBox from "./ChatBox";

const Navbar = ({ params }) => {
  const { userId } = params;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const response = await fetch(`/api/${userId}`);
          const data = await response.json();
          console.log("Fetched data:", data);
          setUser(data);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };

      fetchUser();
    }
  }, [userId]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin text-teal-600" size={32} />
      </div>
    );
  }

  // Construct the Google Maps URL with place, zoom, and key parameters
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&q=${user.latitude},${user.longitude}&zoom=19`;

  return (
    <>
      <nav className="flex justify-between items-center mb-6 bg-teal-600 p-4 rounded-md">
        <div className="flex items-center space-x-2 text-white">
          <Home className="text-white" size={28} />
          <h1 className="text-2xl font-bold">{user?.name}</h1>
        </div>
        <ul className="flex space-x-4 text-white">
          <li>
            <a
              href="/products"
              className="flex items-center space-x-1 hover:text-gray-300"
            >
              <Box size={20} />
              <span>Products</span>
            </a>
          </li>
          <li>
            <a
              href="/cart"
              className="flex items-center space-x-1 hover:text-gray-300"
            >
              <ShoppingCart size={20} />
              <span>Cart</span>
            </a>
          </li>
          <li>
            <a
              href="/wishlist"
              className="flex items-center space-x-1 hover:text-gray-300"
            >
              <Heart size={20} />
              <span>Wishlist</span>
            </a>
          </li>
          <li>
            <a
              href="/profile"
              className="flex items-center space-x-1 hover:text-gray-300"
            >
              <User size={20} />
              <span>Profile</span>
            </a>
          </li>
        </ul>
      </nav>
      <div className="fixed bottom-4 left-14 ">
        <iframe
          src={googleMapsUrl}
          width="800"
          height="500"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="fixed bottom-4 right-4 z-50">
        <ChatBox user={user?.name} />
      </div>
    </>
  );
};

export default Navbar;
