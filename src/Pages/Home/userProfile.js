import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dash.css';

import { useNavigate } from 'react-router-dom';


const UserProfile = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4391/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error:', error.response.data);
      }
    };

    fetchUserProfile();
  }, []);

  const handleBack = () => {
    navigate('/Home');
  }

  return (
    <div className="user-profile-container"> 
      <h1 className="user-profile-heading">User Profile</h1>
      {userDetails && (
        <div className="user-details"> 
          <p><span>Name:</span> {userDetails.name}</p> 
          <p><span>Email:</span> {userDetails.email}</p> 
          <p><span>Password:</span> {userDetails.password}</p> 
        </div>
      )}

      <div>
        <button onClick={handleBack} className='back-btn'>Back</button>
      </div>
    </div>
  );
};

export default UserProfile;
