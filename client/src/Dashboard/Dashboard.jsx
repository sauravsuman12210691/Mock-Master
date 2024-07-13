import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import  D from './Dashboard.module.css';
import Image from '/image.png';

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
    formData.append("file", profileFile);

    try {
      const res = await fetch("http://localhost:3000/api/resume/uploadPdfToText", {
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
      <Navbar onLogout={handleLogout} />
      <div className={D.dashboardcontainer}>
        <div className={D.leftcontent}>
          <h1 className={D.dashboardtitle}>Dashboard</h1>
          <h3 className={D.welcometext}>Hello, {userName}</h3>
          <form onSubmit={handleSubmit} className={D.uploadform}>
            <div className={D.formgroup}>
              <label htmlFor="fileInput" className={D.uploadlabel}>Click to upload file (Image or pdf)</label>
              <input
                onChange={handlePost}
                type="file"
                accept="application/pdf"
                id="fileInput"
                name="file" // Use "file" as the field name 
                className={D.fileinput}
              />
              {profileFile && profileFile.name && <p className={D.filename}>{profileFile.name}</p>}
            </div>
            <button className={D.uploadbutton} type="submit">
              Upload
            </button>
          </form>
          <input type="text" placeholder="Enter Job Title" className={D.addjobtitleinput} />
          <button className={D.addjobtitlebutton}>Submit</button>
        </div>
        <div className={D.rightcontent}>
          <img src={Image} alt="Decorative" className={D.decorativeimage} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;