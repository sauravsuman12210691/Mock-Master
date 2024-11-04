import React, { useEffect, useState } from 'react';
import { useNavigate,Link } from "react-router-dom";
import Swal from 'sweetalert2'; // Import SweetAlert2
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import R from './Results.module.css';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Navbar/Footer';

// Register the required components from Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

function Results() {
  const navigate = useNavigate()
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMassege, setError] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('auth-token')== null){
      navigate('/login'); 
    }
    handleResult();
  }, []);

  const handleResult = async () => {
    try {
      const questionAnswer = JSON.parse(localStorage.getItem('question-answer')) || '';
      if (!questionAnswer) {
        throw new Error('Question and answer data not found in localStorage');
      }

      const response = await fetch("http://localhost:3000/api/result/result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || '',
        },
        body: JSON.stringify({ questionAnswer }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      // Ensure data exists before accessing its properties
      if (result && result.data) {
        setScore(result.data.score);
        setFeedback(result.data.feedback);
      } else {
        console.error('Response data is not in expected format:', result);
      }
    } catch (err) {
      setError(true)
      console.error('Failed to fetch results:');
    } finally {
      setLoading(false);
    }
  };

  const pieData = {
    labels: ['Score', 'Remaining'],
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor: ['#34d399', '#e5e7eb'],
        hoverBackgroundColor: ['#059669', '#d1d5db'],
      },
    ],
  };
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

  if (loading) {
    return (
      <div className={R.loaderContainer}>
        <div className={R.loader}></div>
      </div>
    );
  }
  
if(errorMassege){
  return(
    <>
       <Navbar onLogout={handleLogout} />
    <div className={R.errorContainer}>
    <h1>Please Take Interview </h1>
  
    <h2>No Data Found</h2>
    <Link to="/dashboard">
    <button className='btn btn-outline-primary' >Go to dashboard</button></Link>
    
    </div>
    </>
  )
}
  return (
    <div>
   <Navbar onLogout={handleLogout} />
      <div className={R.container}>
        <center><h1 className={R.title}>Results</h1></center>
        <div className={R.scoreContainer}>
          <div className={R.pieChart}>
            <Pie data={pieData} />
          </div>
          <div className={R.Score}>
            <h1>SCORE</h1>
            <h2>{score}</h2>
          </div>
          <div className={R.feedbackCard}>
            <h2 className={R.feedbackTitle}>Feedback</h2>
            <p className={R.feedbackText}>{feedback}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Results;
