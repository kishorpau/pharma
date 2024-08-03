// components/UserList.js
import React, { useState } from "react";

const users = [
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" },
  { id: 3, name: "User 3" },
];

const UserList = ({ onUserSelect }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleCheckboxChange = (user) => {
    const isSelected = selectedUsers.some((u) => u.id === user.id);
    const newSelectedUsers = isSelected
      ? selectedUsers.filter((u) => u.id !== user.id)
      : [...selectedUsers, user];

    setSelectedUsers(newSelectedUsers);
    onUserSelect(newSelectedUsers);
  };

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <input type="checkbox" onChange={() => handleCheckboxChange(user)} />
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;
