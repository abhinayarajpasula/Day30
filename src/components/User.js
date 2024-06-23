import React from 'react';

const User = ({ user, setEditingUser, deleteUser }) => {
  return (
    <li>
      <div className="user-info">
        {user.name} ({user.email})
      </div>
      <div className="user-actions">
        <button onClick={() => setEditingUser(user)} className="edit-button">Edit</button>
        <button onClick={() => deleteUser(user.id)} className="delete-button">Delete</button>
      </div>
    </li>
  );
};

export default User;