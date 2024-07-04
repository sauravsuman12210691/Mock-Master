import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [userName, setUserName] = useState('username')
  useEffect(() => {
    handle()
    
  },[])
  useEffect(()=>{
    let token = localStorage.getItem('auth-token')
    console.log(token)
    if (token === null) {
      navigate('/login')
    }
  })
  const navigate = useNavigate();
  const handle = async (e) => {
    const response = await fetch('http://localhost:3000/api/auth/dashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      }

    });

    const data = await response.json();
    console.log(data)

  }
  const handleLogout = () => {
    localStorage.removeItem('auth-token');
  }

  return (
    <div>
      <h1>hiiiiiiiiiii</h1>
        <h3>{userName}</h3>
        <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Dashboard
