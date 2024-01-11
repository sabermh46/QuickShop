import React, { useState } from 'react';
import "./login.css"
import { useNavigate } from 'react-router-dom';
import { API } from '../constants/api';
import { useDispatch } from 'react-redux';
import axios from 'axios'
import Header from '../component/Header/header';


function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
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
        const response = await axios.post(`${API}/api/auth/local/register`, formData);
  
        // Handle success.
        if(response.data){
        }
        
        console.log('Well done!');
        console.log(response);
        navigate('/login')
      } catch (error) {
        // Handle error.
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx.
          setError(error.response.data)
        } else if (error.request) {
          // The request was made but no response was received.
          setError('No response received from the server.');
        } else {
          // Something happened in setting up the request that triggered an Error.
          setError('Error setting up the request:' + error.message);
        }
      }
    setLoading(false)
  };

  return (
    <div className="outerfloat">
      <div className="floating1"></div>
      <div className="floating2"></div>
        <div className='loginform'>
        <h2>Sign Up!</h2>
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
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
          <button type="submit" disabled={loading?true:false}>{loading?'Loading...':'Sign Up'}</button>
        </form>
        <div className="flex x-center space-between">
          <div>
            Already have an account?
          </div>
          <div>
            <button onClick={()=>{navigate('/login', {replace: true})}} className='text-button'>Login here</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const RegisterPage = ()=> {
  return(
    <div>
      <Header />
      <Register />
    </div>
  )
}

export default RegisterPage;