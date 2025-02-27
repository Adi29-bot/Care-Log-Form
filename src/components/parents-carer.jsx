import React from "react";
import CustomTextarea from "./customtextarea";

const ParentsSection = ({ watch, showSections, handleToggle, register, errors, setValue, renderCheckboxes }) => {
  return (
    <div className='mt-3 border border-primary p-3'>
      <div className='d-flex justify-content-start'>
        <label className='mb-0 fw-bold text-primary'>
          <strong>Anything to Report from Parents/Carer: </strong>
        </label>
        <div className='ms-3'>
          <input type='radio' value='yes' {...register("reportFromParents", { required: "Please select an option" })} onChange={() => handleToggle("mood", true)} />
          <label className='ms-1 me-3'>
            <strong>Yes</strong>
          </label>
          <input type='radio' value='no' {...register("reportFromParents", { required: "Please select an option" })} onChange={() => handleToggle("mood", false)} />
          <label className='ms-1 '>
            <strong>No</strong>
          </label>
          <span className='ms-3 text-muted '>(If yes, please specify)</span>
        </div>
      </div>
      {errors.reportFromParents && <span className='text-danger'>{errors.reportFromParents.message}</span>}

      {showSections.mood && (
        <div className='mt-3 ms-3'>
          <label>
            <strong>Mood</strong>
          </label>
          <div className='row'>{renderCheckboxes(["Settled Mood", "Un-Settled Mood", "Agitated", "Positive Behaviour", "Negative Behaviour", "Aggressive", "Good Sleep", "Not a Good Sleep", "Have Breakfast", "No Breakfast", "Cooperative", "Non-Cooperative"], "mood", "At least one checkbox must be selected")}</div>
          {errors.mood && <span className='text-danger'>{errors.mood.message}</span>}
        </div>
      )}
      <CustomTextarea watch={watch} register={register} setValue={setValue} fieldName='moodDetails' errors={errors} placeholder={"Anything additional to report"} />
    </div>
  );
};

export default ParentsSection;
