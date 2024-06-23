import React, { useState, useEffect } from 'react';

const UserForm = ({ addUser, updateUser, editingUser, setEditingUser }) => {
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    if (editingUser) {
      setUser(editingUser);
    } else {
      setUser({ name: '', email: '' });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      updateUser(user);
    } else {
      addUser(user);
    }
    setUser({ name: '', email: '' });
    setEditingUser(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={user.name} onChange={handleChange} placeholder="Name" required />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required />
      </div>
      <button type="submit" className={editingUser ? 'edit-button' : 'add-button'}>
        {editingUser ? 'Update' : 'Add'}
      </button>
      {editingUser && <button type="button" onClick={() => setEditingUser(null)}>Cancel</button>}
    </form>
  );
};

export default UserForm;