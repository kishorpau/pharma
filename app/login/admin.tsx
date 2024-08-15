"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleCheckboxChange = (user) => {
    const isSelected = selectedUsers.some((u) => u.id === user.id);
    const newSelectedUsers = isSelected
      ? selectedUsers.filter((u) => u.id !== user.id)
      : [...selectedUsers, user];

    setSelectedUsers(newSelectedUsers);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch("/api/saveSelectedUsers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedUsers }),
      });
      if (!response.ok) {
        throw new Error("Error saving selected users");
      }
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error saving selected users:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-8 bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-700">
        Admin Dashboard
      </h1>
      <div className="space-y-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                className="form-checkbox h-6 w-6 text-teal-600"
                checked={selectedUsers.some((u) => u.id === user.id)}
                onChange={() => handleCheckboxChange(user)}
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-gray-600">{user.location}</p>
                <p className="text-gray-600">Certificate: {user.certificate}</p>
                <p className="text-gray-600">
                  Citizenship Image: {user.citizenshipimage}
                </p>
                <p className="text-gray-600">
                  Business Image: {user.businessimage}
                </p>
                <p className="text-gray-600">
                  Latitude: {user.latitude}, Longitude: {user.longitude}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button
        className="mt-6 bg-teal-600 text-white py-3 px-6 rounded-lg shadow hover:bg-teal-700 transition duration-300"
        onClick={handleSaveChanges}
      >
        Save Changes
      </Button>
    </div>
  );
};

export default AdminPage;
