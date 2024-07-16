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
  const [answerArray, setAnswerArray] = useState([]);
  const [index, setIndex] = useState(0);

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
          setTranscript(transcriptSegment);
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
      
     
      setLoading(false);
    } catch (error) {
      setLoading(false);
     
    }
  };
//handle revew
const handleAnswer = ()=>{
  let jsonString = JSON.stringify(answerArray);

  // Remove curly braces
  jsonString = jsonString.replace(/[{}]/g, '');
  
  // Remove double quotes
  jsonString = jsonString.replace(/"/g, '');
  
  // Format the string (optional)
  jsonString = jsonString.replace(/,/g, ', ');
  // const val = JSON.stringify(answerArray)
  localStorage.setItem("question-answer",jsonString);
  navigate("/result")
}
  const handleSubmitResponse = () => {
   
      const newQuestionAnswer = {
        question: questionArray[index].question,
        answer: transcript,
      };
      setAnswerArray((prevArray) => [...prevArray, newQuestionAnswer]);
      let idx = index;
      setIndex(++idx);

      console.log(answerArray);
    
  };
  useEffect(() => {
    handleQuestion();
  }, []);
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
if(loading){
return(<>
    <Navbar onLogout={handleLogout} className="Navbar" />
  <div className={I.loader_container}>
            <div className={I.loader}></div>
          </div>
          </>
)
}else{
  return (
    <div>
      <Navbar onLogout={handleLogout} className="Navbar" />
      {/* <button onClick={handleQuestion}>handleQuestion</button> */}
      {/* <img className={I.bg2} src="/bg2.png" alt="" /> */}
      <img className={I.bg1} src="/bg1.png" alt="" />
      {/* <img className={I.bg3} src="/bg3.png" alt="" /> */}

      <div className="ques">
        <center>
          <h1>INTERVIEW QUESTIONS</h1>
        </center>
          <div>
            {
             ( questionArray.length > 0 && index < questionArray.length  )?<ul className={I.questionbdr}>
             <h1>{questionArray[index].question}</h1>
             <button
                  className="btn btn-outline-warning"
                  onClick={handleSubmitResponse}
                >
                  {" "}
                  submit response
                </button>

           </ul> :<button
                  className="btn btn-outline-warning"
                  onClick={handleAnswer}
                >
                  {" "}
                  submit answer
                </button>
            }
           {/* {questionArray.length > 0 && index < questionArray.length && (
  <ul className={I.questionbdr}>
    <h1>{questionArray[index].question}</h1>
  </ul>
)} */}


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
                
              </div>
            </div>
            <div className="response">
              <h3>Your Response:</h3>
              <p className={I.response}>{transcript}</p>
            </div>
          
          </div>
        
      </div>
    </div>
  );
};
}

export default SpeechToText;
