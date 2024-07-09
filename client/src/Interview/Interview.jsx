// import React, { useState, useEffect } from 'react';

// const SpeechToText = () => {
//   const [isListening, setIsListening] = useState(false);
//   const [transcript, setTranscript] = useState('');
//   const [recognition, setRecognition] = useState(null);

//   useEffect(() => {
//     // Check for speech recognition support
//     if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
//       alert('Your browser does not support speech recognition.');
//       return;
//     }

//     // Initialize speech recognition
//     const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
//     const newRecognition = new SpeechRecognition();
//     newRecognition.continuous = true;
//     newRecognition.interimResults = true;

//     // Handle results from speech recognition
//     newRecognition.onresult = (event) => {
//       let interimTranscript = '';
//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         const transcriptSegment = event.results[i][0].transcript;
//         if (event.results[i].isFinal) {
//           setTranscript((prev) => prev + transcriptSegment + ' ');
//         } else {
//           interimTranscript += transcriptSegment;
//         }
//       }
//       document.getElementById('interim').innerHTML = interimTranscript;
//     };

//     // Handle errors
//     newRecognition.onerror = (event) => {
//       console.error('Speech recognition error:', event.error);
//       // Display an alert to the user for better debugging
//       alert(`Speech recognition error: ${event.error}`);
//     };

//     // Save recognition instance
//     setRecognition(newRecognition);
//   }, []);

//   // Handle listening state changes
//   useEffect(() => {
//     if (recognition) {
//       if (isListening) {
//         try {
//           recognition.start();
//         } catch (error) {
//           console.error('Error starting recognition:', error);
//           alert(`Error starting recognition: ${error.message}`);
//         }
//       } else {
//         try {
//           recognition.stop();
//         } catch (error) {
//           console.error('Error stopping recognition:', error);
//           alert(`Error stopping recognition: ${error.message}`);
//         }
//       }
//     }
//   }, [isListening, recognition]);

//   // Toggle listening state
//   const toggleListening = () => {
//     setIsListening((prevState) => !prevState);
//   };

//   return (
//     <div>
//       <button onClick={toggleListening}>
//         {isListening ? 'Stop Listening' : 'Start Listening'}
//       </button>
//       <div>
//         <h3>Transcript:</h3>
//         <p>{transcript}</p>
//         <p id="interim" style={{ color: 'gray' }}></p>
//       </div>
//     </div>
//   );
// };

// export default SpeechToText;
