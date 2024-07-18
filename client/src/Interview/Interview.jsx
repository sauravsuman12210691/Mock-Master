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
  const [loading, setLoading] = useState(false);
  const [answerArray, setAnswerArray] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition;
    const newRecognition = new SpeechRecognition();
    newRecognition.continuous = true;
    newRecognition.interimResults = true;

    newRecognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptSegment = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript((prevTranscript) => prevTranscript + transcriptSegment);
        } else {
          interimTranscript += transcriptSegment;
        }
      }
      document.getElementById("interim").value = interimTranscript;
    };

    newRecognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert(`Speech recognition error: ${event.error}`);
    };

    setRecognition(newRecognition);
  }, []);

  const handleQuestion = async () => {
    try {
      setLoading(true);
            const fileName= localStorage.getItem("fileName");

      if (!filePath) {
        throw new Error("File path not found in localStorage");
      }

      const response = await fetch(
        "https://mock-master-9dhj.onrender.com/api/mock-interview/get-questionArray",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: fileName }),
        }
      );

      const data = await response.json();
      if (data && data.questionsArray) {
        setQuestionArray(data.questionsArray);
      } else {
        console.error("Response data is not in expected format:", data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      setLoading(false);
    }
  };

  const handleAnswer = async () => {
    const jsonString = JSON.stringify(answerArray);
    localStorage.setItem("question-answer", jsonString);

    try {
      const response = await fetch("https://mock-master-9dhj.onrender.com/api/result/result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || '',
        },
        body: JSON.stringify({
          questionAnswer: answerArray,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      if (result && result.data) {
        localStorage.setItem("score", result.data.score);
        localStorage.setItem("feedback", result.data.feedback);
      } else {
        console.error('Response data is not in expected format:', result);
      }

      navigate("/result");
    } catch (err) {
      console.error('Failed to fetch results:', err);
    }
  };

  const handleSubmitResponse = () => {
    if (index < questionArray.length) {
      const newQuestionAnswer = {
        question: questionArray[index].question,
        answer: transcript,
      };
      setAnswerArray((prevArray) => [...prevArray, newQuestionAnswer]);
      setIndex(index + 1);
      setTranscript("");
    }
  };

  useEffect(() => {
    handleQuestion();
  }, []);

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

  const toggleListening = () => {
    setIsListening((prevState) => !prevState);
  };

  if (loading) {
    return (
      <>
        <Navbar onLogout={handleLogout} className="Navbar" />
        <div className={I.loader_container}>
          <div className={I.loader}></div>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <Navbar onLogout={handleLogout} className="Navbar" />
        <img className={I.bg1} src="/bg1.png" alt="" />

        <div className="ques">
          <center>
            <h1>INTERVIEW QUESTIONS</h1>
          </center>
          <div>
            {questionArray.length > 0 && index < questionArray.length ? (
              <ul className={I.questionbdr}>
                <h1>{questionArray[index].question}</h1>
                <button
                  className="btn btn-outline-warning"
                  onClick={handleSubmitResponse}
                >
                  Submit Response
                </button>
              </ul>
            ) : (
              <button
                className="btn btn-outline-warning"
                onClick={handleAnswer}
              >
                Submit Answers
              </button>
            )}

            <div className={I.contoller}>
              <div className={I.mic}>
                {isListening ? (
                  <img
                    className={I.micoff}
                    onClick={toggleListening}
                    src="/micoff.png"
                    alt="Microphone Off"
                  />
                ) : (
                  <img
                    className={I.micon}
                    onClick={toggleListening}
                    src="/mic.png"
                    alt="Microphone On"
                  />
                )}
              </div>
            </div>
            <div className="response">
              <h3>Your Response:</h3>
              <p className={I.response}>{transcript}</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};

export default SpeechToText;
