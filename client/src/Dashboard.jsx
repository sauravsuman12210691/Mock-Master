import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

function Dashboard() {
  const [userName, setUserName] = useState('username');
  const navigate = useNavigate();
  const [profileFile, setProfileFile] = useState();

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

  const handlePost = (e) => {
    setProfileFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let formData = new FormData();
    formData.append("file", profileFile); // Use "file" as the field name
  
    try {
      const res = await fetch("http://localhost:3000/api/resume/upload", {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem('auth-token')
        },
        body: formData
      });
     
      const data = await res.json();
      console.log(data); 
    } catch (error) {
      console.error("Error uploading file:", error.message);
    }
  };
  
  return (
    <div>
      <Navbar onLogout={handleLogout}/>
      <h1>Dashboard</h1>
      <h3>{userName}</h3>
      <form onSubmit={handleSubmit} className="">
        <div className="">
          <label htmlFor="exampleFormControlFile1">Upload file (image or PDF)</label>
          <input
            onChange={handlePost}
            type="file"
            accept="image/*,application/pdf"
            id="exampleFormControlFile1"
            name="file" // Use "file" as the field name
          />
        </div>
        <button className="btn" type="submit">
          Upload
        </button>
      </form>
    </div>
  );
}

export default Dashboard;
