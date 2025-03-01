import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faStop } from "@fortawesome/free-solid-svg-icons";

const SpeechToText = ({ onTextChange }) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const lastTranscript = useRef("");
  const isManuallyStopped = useRef(false); // Track manual stop
  const debounceTimeout = useRef(null); // For debouncing

  useEffect(() => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    isManuallyStopped.current = false; // Reset manual stop flag

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true; // Allow interim results for better responsiveness
    recognition.lang = "en-GB";

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(" ");

      // Only update if the transcript has changed
      if (transcript && transcript !== lastTranscript.current) {
        lastTranscript.current = transcript;

        // Clear the previous timeout if it exists
        if (debounceTimeout.current) {
          clearTimeout(debounceTimeout.current);
        }

        // Set a new timeout to update the text after a short delay
        debounceTimeout.current = setTimeout(() => {
          onTextChange(transcript); // Pass the new transcript to the parent
        }, 500); // Adjust the delay as needed
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      if (!isManuallyStopped.current) {
        recognition.start(); // Restart only if the user didn't manually stop it
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const stopListening = () => {
    isManuallyStopped.current = true; // Mark as manually stopped
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    // Clear the debounce timeout when stopping
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
  };

  return (
    <button type='button' className='btn btn-primary mt-2' onClick={isListening ? stopListening : startListening}>
      <FontAwesomeIcon icon={isListening ? faStop : faMicrophone} />
    </button>
  );
};

export default SpeechToText;
