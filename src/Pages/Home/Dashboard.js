import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './dash.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const [users, setUsers] = useState([]);
  const [searchUserList, setSearchUserList] = useState([]); 
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4391/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateUser = (user) => {
    setSelectedUser(user);
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:4391/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSearch = (value) => {
    // console.log(value)
    if (value.trim() === '') {
      fetchUsers();
    } else {
      const filteredUsers = users.filter(
        (user) =>
          user.Username.toLowerCase().includes(value.toLowerCase()) ||
          user.Email.toLowerCase().includes(value.toLowerCase())
      );

      // console.log(filteredUsers)
      setSearchUserList(filteredUsers);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    handleSearch(value);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div>
        <button onClick={logout} className="logout-btn">
          Logout
        </button>
        <button  onClick={handleProfileClick} className="profile-btn">
          Profile
        </button>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={handleChange}
          className="search-input"
        />
        <button onClick={() => handleSearch(searchTerm)} className="search-btn">
          Search
        </button>
      </div>
      <div className="card-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { (searchUserList.length > 0 ) ? searchUserList.map((user) => (
              <tr key={user.id}>
                <td>{user.Username}</td>
                <td>{user.Email}</td>
                <td>
                  <button onClick={() => updateUser(user)} className="update-btn">
                    Update
                  </button>
                  <button onClick={() => deleteUser(user.id)} className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            )): users.map((user) => (
              <tr key={user.id}>
                <td>{user.Username}</td>
                <td>{user.Email}</td>
                <td>
                  <button onClick={() => updateUser(user)} className="update-btn">
                    Update
                  </button>
                  <button onClick={() => deleteUser(user.id)} className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
      {selectedUser && (
        <div className="popup">
          <UpdateUserForm
            user={selectedUser}
            updateUser={() => {
              fetchUsers();
              setSelectedUser(null);
            }}
          />
        </div>
      )}
    </div>
  );
};

const UpdateUserForm = ({ user, updateUser }) => {
  const [name, setName] = useState(user.Username);
  const [email, setEmail] = useState(user.Email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = { name, email };
    try {
      await axios.put(`http://localhost:4391/users/${user.id}`, newData);
      updateUser();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    setName(user.Username);
    setEmail(user.Email);
    updateUser();
  };

  return (
    <div className="update-form">
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
        <button type="submit" className="update-btn">
          Update
        </button>
        <button type="button" onClick={handleCancel} className="cancel-btn">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
