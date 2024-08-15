"use client";

import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import UserCard from "./UserCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomePage = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const fetchSelectedUsers = async () => {
      try {
        const response = await fetch("/api/selectedUsers"); // Corrected API endpoint
        const data = await response.json();
        setSelectedUsers(data);
      } catch (error) {
        console.error("Error fetching selected users:", error);
      }
    };

    fetchSelectedUsers();
  }, []);

  return (
    <div className="bg-gradient-to-r from-emerald-400 to-sky-500 min-h-screen py-12">
      <div className="relative max-w-6xl mx-auto p-10 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="absolute top-4 right-4 flex space-x-4">
          <Link href="/shopform">
            <Button className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
              Set a Shop
            </Button>
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            Welcome to Med-Easy
          </h1>
          <p className="text-lg text-gray-600">
            Your trusted partner for health and wellness.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
