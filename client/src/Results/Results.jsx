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
      const response = await fetch("http://localhost:3000/api/result/result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: localStorage.getItem("question"),
          answer: localStorage.getItem("answer")
        }),
      });

      const data = await response.json();
      console.log(data);
      
      setScore(data.score);
      setFeedback(data.tip);
      
    } catch (err) {
      console.log(err);
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
        hoverBackgroundColor: ['#059669', '#d1d5db']
      }
    ]
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
            <button className={R.feedbackButton}>Provide More Feedback</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Results;
