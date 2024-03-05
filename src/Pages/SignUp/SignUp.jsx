import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { FaUser } from "react-icons/fa";
import { MdMarkunread } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

import { useNavigate } from 'react-router-dom'; 
import './Signup.css'; 
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
   
      const response = await axios.post('http://localhost:4391/signup', formData);
      console.log(response.data);
      navigate('/login');

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input">
            <span><FaUser /></span>
            <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="input">
            <span><MdMarkunread /></span>
            <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="input">
            <span><RiLockPasswordFill /></span>
            <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
          </div>
          
        </div>
        <button type="submit" className="signup-submit">Sign Up</button>
      </form>
      <p className="login-link">Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default SignUp;
