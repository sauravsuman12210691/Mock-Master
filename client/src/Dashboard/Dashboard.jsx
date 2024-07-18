import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Navbar/Footer';
import D from './Dashboard.module.css';
import '../Alert/SweetAlert.css';
import picture from '/mockinterview.png';

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
      const response = await fetch('https://mock-master-9dhj.onrender.com/api/auth/dashboard', {
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
    // Show SweetAlert2 message upon successful logout
    Swal.fire({
      icon: 'success',
      title: 'Logout Successful!',
      text: 'You have been logged out successfully.',
      confirmButtonColor: '#4a90e2',
      timer: 3000,
      timerProgressBar: true,
    }).then(() => {
      navigate('/login'); // Redirect to login page after alert closes
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('file', profileFile);

    try {
      const res = await fetch('https://mock-master-9dhj.onrender.com/api/resume/uploadPdfToText', {
        method: 'POST',
        headers: {
          'auth-token': localStorage.getItem('auth-token'),
        },
        body: formData,
      });

      const data = await res.json();


      if (data.filePath) {
        localStorage.setItem("filePath", data.filePath)

        const atsResponse = await fetch('https://mock-master-9dhj.onrender.com/api/ats/getResume', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token'),
          },
          body: JSON.stringify({ name: data.filePath, jobtitle: inputTwoValue, resumeName: data.fileName }),
        });

        const atsData = await atsResponse.json();

        // Show SweetAlert2 message upon successful submission
        Swal.fire({
          icon: 'success',
          title: '<strong>Submission Successful!</strong>',
          html: '<p>Your form has been successfully submitted.</p>',
          showConfirmButton: true,
          confirmButtonColor: '#4a90e2',
          timer: 3000,
          timerProgressBar: true,
          customClass: {
            popup: 'swal-popup',
            title: 'swal-title',
            content: 'swal-content',
            confirmButton: 'swal-confirm-button',
          }
        }).then(() => {
          navigate('/Ats', { state: { score: atsData.score } });
        });
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
      <Footer />
    </div>
  );
}

export default Dashboard;
