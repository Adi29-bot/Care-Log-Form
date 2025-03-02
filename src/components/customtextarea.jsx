import React, { useEffect, useState } from "react";
import SpeechToText from "./voiceinput";

const CustomTextarea = ({ register, setValue, watch, fieldName, errors, placeholder }) => {
  const [text, setText] = useState(watch(fieldName) || "");

  useEffect(() => {
    setText(watch(fieldName) || "");
  }, [watch(fieldName)]);

  const handleSpeechInput = (speechText) => {
    if (!speechText.trim()) return;

    setText(speechText); // Keeps previous input intact and appends new speech
    setValue(fieldName, speechText);
  };

  const handleTextChange = (e) => {
    const value = e.target.value;
    setText(value);
    setValue(fieldName, value);
  };

  useEffect(() => {
    const updatePrintTextareas = () => {
      document.querySelectorAll(".print-textarea").forEach((printDiv) => {
        const textarea = printDiv.previousElementSibling;
        printDiv.innerText = textarea.value.trim() ? textarea.value : "No notes provided";
      });
    };

    window.addEventListener("beforeprint", updatePrintTextareas);
    return () => window.removeEventListener("beforeprint", updatePrintTextareas);
  }, []);

  return (
    <div className='mt-3'>
      <textarea
        className='form-control border-primary d-print-none page-break'
        placeholder={placeholder}
        {...register(fieldName, { required: "Details are required" })}
        value={text}
        onChange={handleTextChange}
        style={{
          resize: "none",
          overflow: "visible",
          whiteSpace: "pre-wrap",
          height: "150px",
        }}
      />
      <div className='print-textarea d-none d-print-block'>{text || "No notes provided"}</div>

      <SpeechToText className='mt-3' onTextChange={handleSpeechInput} />
      {errors[fieldName] && <span className='text-danger'>{errors[fieldName].message}</span>}
    </div>
  );
};

export default CustomTextarea;
