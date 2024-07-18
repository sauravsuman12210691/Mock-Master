import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import R from './Results.module.css';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Navbar/Footer';

// Register the required components from Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

function Results() {
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleResult();
  }, []);

  const handleResult = async () => {
    try {
      const questionAnswer = JSON.parse(localStorage.getItem('question-answer')) || '';
      if (!questionAnswer) {
        throw new Error('Question and answer data not found in localStorage');
      }

      const response = await fetch("https://mock-master-9dhj.onrender.com/api/result/result", {
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
      console.error('Failed to fetch results:', err);
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

  if (loading) {
    return (
      <div className={R.loaderContainer}>
        <div className={R.loader}></div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className={R.container}>
        <center><h1 className={R.title}>Results</h1></center>
        <div className={R.scoreContainer}>
          <div className={R.pieChart}>
            <Pie data={pieData} />
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
