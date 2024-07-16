import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Navbar/Footer';
import D from './Dashboard.module.css';
import picture from '/picture.jpeg';

function Dashboard() {
  const [userName, setUserName] = useState('username');
  const navigate = useNavigate();
  const [profileFile, setProfileFile] = useState(null);
  const [inputTwoValue, setInputTwoValue] = useState('');


  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfileFile(file);
  };

  const isSubmitDisabled = !profileFile || !inputTwoValue;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/api/auth/dashboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
        },
      });

      const data = await response.json();
      setUserName(data.name);
    };

    fetchData();
  }, []);

  useEffect(() => {
    let token = localStorage.getItem('auth-token');
    if (token === null) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('file', profileFile);

    try {
      const res = await fetch('http://localhost:3000/api/resume/uploadPdfToText', {
        method: 'POST',
        headers: {
          'auth-token': localStorage.getItem('auth-token'),
        },
        body: formData,
      });

      const data = await res.json();
      
      
      if (data.filePath) {
        localStorage.setItem("filePath",data.filePath)
        
        const atsResponse = await fetch('http://localhost:3000/api/ats/getResume', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token'),
        
          },
          body: JSON.stringify({ name:data.filePath, jobtitle: inputTwoValue ,resumeName:data.fileName}),
        });
console.log(data.fileName)
        const atsData = await atsResponse.json();
        navigate('/Ats', { state: { score: atsData.score} });
      }
    } catch (error) {
      console.error('Error uploading file:', error.message);
    }
  };

  return (
    
    <div>
      <Navbar onLogout={handleLogout} />
      <div className={D.dashboardcontainer}>
        <div className={D.leftcontent}>
          <h2 className={D.welcometext}>Hello, {userName}</h2>
          <h3 className={D.motivationaltext}>Chal dekhe tujhmein kitni hai angaar</h3>
          <form onSubmit={handleSubmit} className={D.uploadform}>
            <div className={D.formgroup}>
              <div className={D.inputfields}>
                <div
                  onClick={() => document.getElementById('fileInput').click()}
                  className={D.uploadlabel}
                >
                  {profileFile && profileFile.name ? profileFile.name : 'Click to upload file (Image or PDF)'}
                </div>
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  id="fileInput"
                  name="file"
                  className={D.fileinput}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <input
                  type="text"
                  placeholder="Enter Job Title"
                  className={D.addjobtitleinput}
                  value={inputTwoValue}
                  onChange={handleInputChange(setInputTwoValue)}
                />
              </div>
            </div>
            <button
              type="submit"
              className={D.submitbutton}
              disabled={isSubmitDisabled}
            >
              Submit
            </button>
          </form>
        </div>
        <div className={D.rightcontent}>
          <img src={picture} alt="Decorative" className={D.decorativeimage} />
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Dashboard;
