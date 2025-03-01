import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faStop } from "@fortawesome/free-solid-svg-icons";

const SpeechToText = ({ onTextChange }) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const lastTranscript = useRef("");
  const isManuallyStopped = useRef(false);

  const mobileAndTabletCheck = () => {
    return /android|ipad|iphone|ipod|blackberry|iemobile|opera mini|windows phone/i.test(navigator.userAgent);
  };

  const isMobileOrTablet = mobileAndTabletCheck();

  useEffect(() => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    isManuallyStopped.current = false;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = !isMobileOrTablet;
    recognition.interimResults = true;
    recognition.lang = "en-GB";

    recognition.onresult = (event) => {
      let interimTranscripts = "";
      let finalTranscripts = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscripts += event.results[i][0].transcript;
        } else {
          interimTranscripts += event.results[i][0].transcript;
        }
      }

      if (finalTranscripts) {
        lastTranscript.current = finalTranscripts;
        onTextChange(finalTranscripts);
        if (!isMobileOrTablet) {
          recognition.stop();
        }
      } else if (interimTranscripts) {
        lastTranscript.current = interimTranscripts;
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      alert("An error occurred during speech recognition. Please try again.");
    };

    recognition.onend = () => {
      if (!isManuallyStopped.current) {
        recognition.start();
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const stopListening = () => {
    isManuallyStopped.current = true;
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  return (
    <button type='button' className='btn btn-primary mt-2' onClick={isListening ? stopListening : startListening} aria-label={isListening ? "Stop listening" : "Start listening"}>
      <FontAwesomeIcon icon={isListening ? faStop : faMicrophone} />
    </button>
  );
};

export default SpeechToText;
