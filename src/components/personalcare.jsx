import React, { useState } from "react";
import showerIcon from "../images/shower.svg";
import shaveIcon from "../images/shavingBrush.svg";
import dryerIcon from "../images/hair_dryer.svg";
import brushIcon from "../images/toothbrush.svg";
import clothesIcon from "../images/clothes.svg";
import hairCutIcon from "../images/barber_pole.svg";

const PersonalCareSection = ({ register, errors, showSections, handleToggle, renderCheckboxes }) => {
  const [timeFields, setTimeFields] = useState({
    bowelMovement: [],
    urination: [],
  });

  const addTimeField = (type) => {
    setTimeFields((prev) => ({
      ...prev,
      [type]: [...prev[type], ""],
    }));
  };

  const removeTimeField = (type, index) => {
    setTimeFields((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const handleRadioChange = (type, value) => {
    handleToggle(type, value);
    if (value === true && timeFields[type].length === 0) {
      addTimeField(type);
    }
  };

  return (
    <div className='mt-3 border border-primary p-3'>
      <div className='d-flex justify-content-start'>
        <label className='mb-0 fw-bold text-primary'>
          <strong>Personal Care:</strong>
        </label>
        <div className='ms-3'>
          <input type='radio' value='yes' {...register("personalCare", { required: "Please select an option" })} onChange={() => handleRadioChange("care", true)} />
          <label className='ms-1 me-3'>
            <strong>Yes</strong>
          </label>
          <input type='radio' value='no' {...register("personalCare", { required: "Please select an option" })} onChange={() => handleRadioChange("care", false)} />
          <label className='ms-1'>
            <strong>No</strong>
          </label>
          <span className='ms-3 text-muted'>(If yes, please specify which type of care performed)</span>
        </div>
      </div>
      {errors.personalCare && <span className='text-danger'>{errors.personalCare.message}</span>}

      {showSections.care && (
        <div className='mt-3 ms-3'>
          <label>
            <strong>Type of Care</strong>
          </label>
          <div className='row'>{renderCheckboxes(["Showering", "Shaving", "Hair Drying", "Brushing Teeth", "Clothes Changing", "Hair Cut"], "care", "At least one checkbox must be selected", [showerIcon, shaveIcon, dryerIcon, brushIcon, clothesIcon, hairCutIcon])}</div>
        </div>
      )}

      {/* Toilet Section */}
      <div className='row row-cols-1 row-cols-md-2'>
        {["bowelMovement", "urination"].map((type, index) => (
          <div className='col' key={index}>
            <div className='mt-3 border border-primary p-2'>
              <div className='d-flex flex-column flex-sm-row align-items-start align-items-sm-center flex-wrap'>
                <label className='form-label me-sm-3 mb-0'>
                  <strong>{type === "bowelMovement" ? "Opened Bowel Using Toilet" : "Urinated Using Toilet"}:</strong>
                </label>
                <div className='mb-2 mb-sm-0 d-flex flex-wrap'>
                  <input className='me-1' type='radio' {...register(type, { required: "Please select an option" })} value='yes' onChange={() => handleRadioChange(type, true)} id={`${type}-yes`} />
                  <label className='form-check-label me-2 text-nowrap' htmlFor={`${type}-yes`}>
                    <strong>Yes</strong>
                  </label>
                  <input className='me-1' type='radio' {...register(type, { required: "Please select an option" })} value='no' onChange={() => handleRadioChange(type, false)} id={`${type}-no`} />
                  <label className='form-check-label text-nowrap' htmlFor={`${type}-no`}>
                    <strong>No</strong>
                  </label>
                </div>
                {showSections[type] && (
                  <>
                    {timeFields[type].map((_, index) => (
                      <div key={index} className='d-flex align-items-center mt-2 mt-sm-0 flex-wrap'>
                        <label className='ms-2 me-1 mb-0 text-nowrap'>Time:</label>
                        <div className='col-auto'>
                          <input
                            type='time'
                            className={`form-control w-auto mb-2 ${errors[`${type}Time`] ? "is-invalid" : ""}`}
                            {...register(`${type}Time[${index}]`, {
                              required: "Time is required",
                              validate: (value) => value !== "" || "Time is required",
                            })}
                          />
                          {errors[`${type}Time`] && errors[`${type}Time`][index] && <span className='text-danger'>{errors[`${type}Time`][index].message}</span>}
                        </div>
                        <button type='button' className='btn btn-danger ms-2' style={{ marginTop: "-7px" }} onClick={() => removeTimeField(type, index)}>
                          Remove
                        </button>
                      </div>
                    ))}
                    <div className='add'>
                      <button type='button' className='btn btn-primary' onClick={() => addTimeField(type)}>
                        Add Time
                      </button>
                    </div>
                  </>
                )}
              </div>
              {errors[type] && <span className='text-danger'>{errors[type].message}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalCareSection;
