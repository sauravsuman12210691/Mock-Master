import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
function Dashboard() {
  const [userName, setUserName] = useState('username');
  const navigate = useNavigate();

  useEffect(() => {
    const handle = async () => {
      const response = await fetch('http://localhost:3000/api/auth/dashboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
        },
      });

      const data = await response.json();
      console.log(data);
      setUserName(data.name);
    };

    handle();
  }, []);

  useEffect(() => {
    let token = localStorage.getItem('auth-token');
    console.log(token);
    if (token === null) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    navigate('/login');
  };

  return (
    <div>
      <Navbar  onLogout={handleLogout}/>
      <h1>Dashboard</h1>
      <h3>{userName}</h3>
      
    </div>
  );
}

export default Dashboard;
