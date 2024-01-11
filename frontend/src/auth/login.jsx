import React, { useState } from 'react';
import "./login.css"
import { useNavigate } from 'react-router-dom';
import { API } from '../constants/api';
import { useDispatch } from 'react-redux';
import Header from '../component/Header/header';
import axios from 'axios';


function LoginPage() {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const response = await axios.post(`${API}/api/auth/local`, formData);

      if (response.data) {
        const data = await response.data;
        console.log(data);
        const codeExp = parseInt(parseInt(new Date().getTime()) + (12 * 60 * 60 * 1000))
        const user = {
            username: data.user.username,
            jwt: data.jwt,
            tokenExpiration: codeExp,
            id: data.user.id,
        } 
        
        dispatch({
            type: 'LOGIN',
            payload: user
        })

        
        setError(null);
        navigate('/')
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError('An error occurred while logging in.');
    }
    setLoading(false)
  };

  
  return (
    <div className="outerfloat">
      <div className="floating1"></div>
      <div className="floating2"></div>
      <div className='loginform'>
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="identifier">Username:</label>
          <input
            type="text"
            id="identifier"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading?true:false}>{loading?'Loading...':'Login'}</button>
      </form>
      <div className="flex x-center space-between">
        <div>
          Don't have an account?
        </div>
        <div>
          <button onClick={()=>{navigate('/register', {replace: true})}} className='text-button'>Sign Up</button>
        </div>
      </div>
    </div>
    </div>
  );
}

const Login = () => {
  return(
    <div>
      <Header />
      <LoginPage />
    </div>
  )
}

export default Login;