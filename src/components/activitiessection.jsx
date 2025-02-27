import React from "react";
import CustomTextarea from "./customtextarea";

const ActivitiesSection = ({ showSections, handleToggle, register, watch, errors, setValue }) => {
  const renderCheckboxesWithDropdown = (options, name) => {
    return options.map((option, index) => (
      <div key={index} className='form-check d-flex flex-column flex-sm-row align-items-start align-items-sm-center mb-2'>
        <div className='d-flex align-items-center'>
          <input type='checkbox' className='form-check-input me-2' id={`${name}.${option}`} {...register(`${name}.${option}.checked`)} />
          <label className='form-check-label text-nowrap' htmlFor={`${name}.${option}`}>
            {option}
          </label>
        </div>

        {watch(`${name}.${option}.checked`) && (
          <div className='ms-0 ms-sm-3 mt-2 mt-sm-0 w-100 w-sm-auto'>
            <select
              className='form-select'
              id={`${name}.${option}.engagement`}
              {...register(`${name}.${option}.engagement`, {
                validate: {
                  engagementRequired: (value) => value !== "" || "Engagement level is required.",
                },
              })}
              style={{ maxWidth: "250px", minWidth: "100%" }}
            >
              <option value=''>Select Engagement Level</option>
              <option value='Fully Engaged'>Fully Engaged</option>
              <option value='Partially Engaged'>Partially Engaged</option>
              <option value='Not Engaged'>Not Engaged</option>
              <option value='Refused to Engage'>Refused to Engage</option>
              <option value='Fully Enjoyed'>Fully Enjoyed</option>
              <option value='Partially Enjoyed'>Partially Enjoyed</option>
              <option value='Not Enjoyed'>Not Enjoyed</option>
              <option value='Happy'>Happy</option>
              <option value='Not Happy'>Not Happy</option>
            </select>
            {errors[name] && errors[name][option] && errors[name][option].engagement && <span className='text-danger'>{errors[name][option].engagement.message}</span>}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className='mt-3 border rounded border-primary p-3 activities-section' style={{ backgroundColor: "#f8f9fa" }}>
      <div className='d-flex justify-content-start'>
        <label className='mb-0 fw-bold text-primary'>
          <strong>Activities:</strong>
        </label>
        <div className='ms-2'>
          <input type='radio' value='yes' className='ms-2' {...register("activitiesParticipated", { required: "Please select an option" })} onChange={() => handleToggle("activities", true)} />
          <label className='ms-1 me-3'>
            <strong>Yes</strong>
          </label>
          <input type='radio' value='no' {...register("activitiesParticipated", { required: "Please select an option" })} onChange={() => handleToggle("activities", false)} />
          <label className='ms-1'>
            <strong>No</strong>
          </label>
          <span className=' ms-3 text-muted'>(If yes please tick activity and engagement)</span>
        </div>
      </div>

      {errors.activitiesParticipated && <span className='text-danger'>{errors.activitiesParticipated.message}</span>}
      {showSections.activities && (
        <div className='mt-3'>
          <div className='row'>
            {["morning", "afternoon"].map((time, index) => (
              <div className='col-md-6 mb-3' key={index}>
                <div className='card p-3 shadow'>
                  <h5 className='card-title text-info'>{time.charAt(0).toUpperCase() + time.slice(1)} Activity</h5>
                  {renderCheckboxesWithDropdown(["Energizer⚡️", "Arts & Craft🎨", "Outings🏞️", "Swimming🏊‍♂️", "Bowling🎳", "Sports Hall🏟️", "Onsite📍", "GYM🏋️‍♂️", "Cooking🍳", "Trampoline🤸‍♂️", "Sports🏀", "Film🎬", "Themed Topic💡", "Music🎵", "Sensory Room🧘", "TV/Main Area📺", "Offsite/Onsite🚌", "Park🌳"], `activities.${time}`)}
                  {errors[`activities.${time}`] && <span className='text-danger'>{errors[`activities.${time}`].message}</span>}
                  {watch("activitiesParticipated") === "yes" && !Object.keys(watch(`activities.${time}`)).some((option) => watch(`activities.${time}.${option}.checked`)) && <span className='text-danger'>At least one activity must be selected.</span>}

                  {watch("activitiesParticipated") === "yes" && Object.keys(watch(`activities.${time}`)).some((option) => watch(`activities.${time}.${option}.checked`) && !watch(`activities.${time}.${option}.engagement`)) && <span className='text-danger'>Engagement level is required for selected activities.</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <CustomTextarea watch={watch} register={register} setValue={setValue} fieldName='activitiesDetails' errors={errors} placeholder={'Please mention detail of Participated Activity "Or" Any Reason If Refused'} />
    </div>
  );
};

export default ActivitiesSection;
