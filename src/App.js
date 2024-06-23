import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addUser = (user) => {
    const newUser = { ...user, id: Date.now() }; // Generate a unique ID for new user
    setUsers([...users, newUser]);
  };

  const updateUser = async (user) => {
    console.log('Updating user:', user); // Debugging line
    try {
      // Check if user ID is greater than 10, assuming API has only 10 users
      if (user.id > 10) {
        // Simulate update for locally added users
        setUsers(users.map(u => (u.id === user.id ? user : u)));
      } else {
        // Update for API users
        const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
          name: user.name,
          email: user.email
        });
        console.log('Response from server:', response.data); // Debugging line
        setUsers(users.map(u => (u.id === user.id ? response.data : u)));
      }
      setEditingUser(null); // Clear editing state after update
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
      setUsers(users.filter(u => u.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      setUsers(users.filter(u => u.id !== userId)); // Remove user from state even if request fails
    }
  };

  return (
    <div className="App">
      <h1>User Management</h1>
      <UserForm addUser={addUser} updateUser={updateUser} editingUser={editingUser} setEditingUser={setEditingUser} />
      <UserList users={users} setEditingUser={setEditingUser} deleteUser={deleteUser} />
    </div>
  );
};

export default App;