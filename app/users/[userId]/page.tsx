// components/Navbar.tsx
"use client";
import { useEffect, useState } from "react";
import { Home, Box, ShoppingCart, Heart, User, Loader } from "lucide-react";
import ChatBox from "./ChatBox";

// Main component
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d679.5690717133009!2d85.30722704718677!3d27.695908663631624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18519ef0465d%3A0x9b7b09e4b5a7c6c7!2sPrakash%20Pharmacia%20Pvt.Ltd.!5e0!3m2!1sen!2snp!4v1722719050037!5m2!1sen!2snp"
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
