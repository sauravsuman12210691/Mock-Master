import React, { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Navbar/Footer';
import styles from './Ats.module.css';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import bg1 from '/bg1.png';


Chart.register(ArcElement, Tooltip, Legend);

const AtsResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const score = location.state?.score || 0;


  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    window.location.href = '/login';
  };

  const data = {
    labels: ['Your Score', 'Remaining'],
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  
  const handleNavigation= ()=>{
    navigate ('/interview');
  }
  return (
    <>
    <div>
      <Navbar onLogout={handleLogout} />
      <div className={styles.resultContainer}>
        <div className={styles.content}>
          <h2 className={styles.title}>Your ATS Score is:</h2>
          <div className={styles.chartContainer}>
            <Pie data={data} options={options} />
          </div>
          <div >
            <span className={styles.score}>{score}</span>
            <span className={styles.overall}>OVERALL</span>
          </div>
          <p className={styles.atsScoreText}>ATS SCORE</p>
          <p className={styles.startInterviewText}>Now, you can start your interview</p>
         <button className={styles.startInterviewButton} onClick={handleNavigation}>Go For AI Mock Test</button>
          <img src={bg1} alt="bg1" className={styles.bg1} />
          
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default AtsResult;
