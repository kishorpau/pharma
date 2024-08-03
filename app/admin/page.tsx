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
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6">Admin Page</h1>
      {users.map((user) => (
        <div key={user.id} className="flex items-center justify-between mb-4">
          <div>
            <input
              type="checkbox"
              checked={selectedUsers.some((u) => u.id === user.id)}
              onChange={() => handleCheckboxChange(user)}
            />
            <span className="ml-2">{user.name}</span>
          </div>
        </div>
      ))}
      <Button className="mt-4" onClick={handleSaveChanges}>
        Save Changes
      </Button>
    </div>
  );
};

export default AdminPage;
