import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faStop } from "@fortawesome/free-solid-svg-icons";

const SpeechToText = ({ onTextChange }) => {
  const [isListening, setIsListening] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser.");
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      speechRecognition.stop();
      setIsListening(false);
      setSpeechRecognition(null);
    } else {
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-GB";

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .filter((result) => result.isFinal)
          .map((result) => result[0].transcript)
          .join(" ");

        if (transcript) {
          onTextChange(transcript);
        }
      };

      recognition.onerror = (event) => {
        console.error("Error occurred:", event.error);
      };

      recognition.onend = () => {
        setIsListening(false);
        setSpeechRecognition(null);
      };

      recognition.start();
      setIsListening(true);
      setSpeechRecognition(recognition);
    }
  };

  return (
    <button type='button' className='btn btn-primary mt-2' onClick={toggleListening}>
      <FontAwesomeIcon icon={isListening ? faStop : faMicrophone} />
    </button>
  );
};

export default SpeechToText;
