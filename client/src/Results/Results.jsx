import React, { useEffect, useState } from 'react';
import R from './Results.module.css';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Navbar/Footer';

function Results() {
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

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
      
      // Assuming data contains score and feedback
      setScore(data.score);
      setFeedback(data.tip);
      
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Set loading to false once the fetch is complete
    }
  };

  if (loading) {
    return <div> <div className={R.loader_container}>
    <div className={R.loader}></div>
  </div></div>; // Show loader while data is being fetched
  }

  return (
    <div>
      <Navbar/>
     <center><h1>Results</h1></center>
     <div className="container">
     <p className='text-primary'>Score: {score}</p>
     <p className='text-primary'>Feedback: {feedback}</p>
     </div>
      
    </div>
  );
}

export default Results;
