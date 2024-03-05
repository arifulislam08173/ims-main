import React, { useState } from 'react';
import './LogInSignup.css';
import { MdMarkunread } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const LoginSignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      alert('Please enter both email and password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4391/login', { email, password });
      const { token } = response.data;

      // Store token
      localStorage.setItem('token', token);

      console.log('Login successfully! Token:', token);
      navigate('/home');
    } catch (error) {
      console.error('Error:', error.response.data);
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className='container'>
      <div className="header">
        <div className="text">Login</div>
        <div className="uderline-login"></div>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input">
            <span><MdMarkunread /></span>
            <input
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input">
            <span><RiLockPasswordFill /></span>
            <input
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <p className="forgotPassword">Forgot Password? <span>Click Here</span></p>

        <button type="submit" className="submit">Login</button>
        <p className="createAccount">Don't have an account? <span onClick={handleSignUpClick}>Sign Up</span></p>
      </form>
    </div>
  );
};

export default LoginSignUp;
