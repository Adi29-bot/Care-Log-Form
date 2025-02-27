import React from "react";

const PersonalCareSection = ({ register, errors, showSections, handleToggle, renderCheckboxes }) => {
  return (
    <div className='mt-3 border border-primary p-3'>
      <div className='d-flex justify-content-start'>
        <label className='mb-0 fw-bold text-primary'>
          <strong>Personal Care:</strong>
        </label>
        <div className='ms-3'>
          <input type='radio' value='yes' {...register("personalCare", { required: "Please select an option" })} onChange={() => handleToggle("care", true)} />
          <label className='ms-1 me-3'>
            <strong>Yes</strong>
          </label>
          <input type='radio' value='no' {...register("personalCare", { required: "Please select an option" })} onChange={() => handleToggle("care", false)} />
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
          <div className='row'>{renderCheckboxes(["Showering🚿", "Shaving🪒", "Hair Drying💇‍♀️", "Brushing Teeth🦷", "Clothes Changing👕", "Hair Cut✂️"], "care", "At least one checkbox must be selected")}</div>
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
                  <input type='radio' {...register(type, { required: "Please select an option" })} value='yes' onChange={() => handleToggle(type, true)} id={`${type}-yes`} />
                  <label className='form-check-label me-2 text-nowrap' htmlFor={`${type}-yes`}>
                    <strong>Yes</strong>
                  </label>
                  <input type='radio' {...register(type, { required: "Please select an option" })} value='no' onChange={() => handleToggle(type, false)} id={`${type}-no`} />
                  <label className='form-check-label text-nowrap' htmlFor={`${type}-no`}>
                    <strong>No</strong>
                  </label>
                </div>
                {showSections[type] && (
                  <div className='d-flex align-items-center mt-2 mt-sm-0 flex-wrap'>
                    <label className='ms-2 me-1 mb-0 text-nowrap'>Time:</label>
                    <div className='col-12 col-sm-auto'>
                      <input
                        type='time'
                        className={`form-control w-100 w-sm-auto ${errors[`${type}Time`] ? "is-invalid" : ""}`}
                        {...register(`${type}Time`, {
                          required: "Time is required",
                          validate: (value) => value !== "" || "Time is required",
                        })}
                      />
                      {errors[`${type}Time`] && <span className='text-danger'>{errors[`${type}Time`].message}</span>}
                    </div>
                  </div>
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
