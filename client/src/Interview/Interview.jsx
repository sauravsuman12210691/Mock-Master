import React, { useState, useEffect } from "react";
import I from "./Interview.module.css";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Navbar/Footer";
const SpeechToText = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    navigate("/login");
  };
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [questionArray, setQuestionArray] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [questionstr,setQuestionStr]= useState('')

  useEffect(() => {
    // Check for speech recognition support
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    // Initialize speech recognition
    const SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition;
    const newRecognition = new SpeechRecognition();
    newRecognition.continuous = true;
    newRecognition.interimResults = true;

    // Handle results from speech recognition
    newRecognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptSegment = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + transcriptSegment + " ");
        } else {
          interimTranscript += transcriptSegment;
        }
      }
      document.getElementById("interim").value = interimTranscript;
    };

    // Handle errors
    newRecognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert(`Speech recognition error: ${event.error}`);
    };

    // Save recognition instance
    setRecognition(newRecognition);
  }, []);

  // Handle Interview question
  const handleQuestion = async () => {
    try {
      setLoading(true);
      const filePath = localStorage.getItem("filePath"); // Correct key
      if (!filePath) {
        throw new Error("File path not found in localStorage");
      }

      const response = await fetch(
        "http://localhost:3000/api/mock-interview/get-questionArray",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: filePath }), // Use the retrieved file path
        }
      );

      const data = await response.json();
      setQuestionArray(data.questionsArray);
      const jsonString = JSON.stringify(data.questionsArray);
      setQuestionStr(jsonString )
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setMessage(`Fetching questions failed: ${error.message}`);
    }
  };
  const handleSubmitResponse = ()=>{

    localStorage.removeItem('filePath')
    localStorage.setItem("question",questionstr)
    localStorage.setItem("answer",transcript)
    navigate('/result')
    
    

  }
  useEffect(()=>{
    handleQuestion();

  },[])
  // Handle listening state changes
  useEffect(() => {
    if (recognition) {
      if (isListening) {
        try {
          recognition.start();
        } catch (error) {
          console.error("Error starting recognition:", error);
          alert(`Error starting recognition: ${error.message}`);
        }
      } else {
        try {
          recognition.stop();
        } catch (error) {
          console.error("Error stopping recognition:", error);
          alert(`Error stopping recognition: ${error.message}`);
        }
      }
    }
  }, [isListening, recognition]);

  // Toggle listening state
  const toggleListening = () => {
    setIsListening((prevState) => !prevState);
  };

  return (
    <div>
      <Navbar onLogout={handleLogout} className="Navbar" />
      {/* <button onClick={handleQuestion}>handleQuestion</button> */}
      {/* <img className={I.bg2} src="/bg2.png" alt="" /> */}
      <img className={I.bg1} src="/bg1.png" alt="" />
      {/* <img className={I.bg3} src="/bg3.png" alt="" /> */}

      <div className="ques">
        <center>
          {" "}
          <h1>INTERVIEW QUESTIONS</h1>
        </center>
        {loading ? (
          <div className={I.loader_container}>
            <div className={I.loader}></div>
          </div>
        ) : (
          <div>
            <ul className={I.questionbdr}>
              {questionArray.map((q, index) => (
                <div className="container">
                  <li key={index}>
                    <strong className={I.Qtype}>{q.type}:</strong> {q.question}
                  </li>
                </div>
              ))}
            </ul>
            <div className={I.contoller}>
              <div className={I.mic}>
                {isListening ? (
                  <img
                    className={I.micoff}
                    onClick={toggleListening}
                    src="/micoff.png"
                  />
                ) : (
                  <img
                    className={I.micon}
                    onClick={toggleListening}
                    src="/mic.png"
                  />
                )}
                <button className="btn btn-outline-warning" onClick={handleSubmitResponse}> submit response</button>
              </div>

            </div>
             <div className="response">
             <h3>Your Response:</h3>
             <p className={I.response}>{transcript}</p>
             </div>
            {message && <p>{message}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeechToText;
