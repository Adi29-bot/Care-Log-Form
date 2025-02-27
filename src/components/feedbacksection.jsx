import React from "react";
import CustomTextarea from "./customtextarea";

const FeedbackSection = ({ watch, register, errors, setValue }) => {
  return (
    <div className='mt-3 border border-primary p-3'>
      <div className='d-flex justify-content-start'>
        <label className='mb-0 fw-bold text-primary'>
          <strong>Feedback to Parents/Carer:</strong>
        </label>
        <div className='ms-2 d-flex align-items-center'>
          <input type='radio' value='yes' {...register("feedbackToParents", { required: "Please select an option" })} />
          <label className='ms-1 me-3'>
            <strong>Yes</strong>
          </label>
          <input type='radio' value='no' {...register("feedbackToParents", { required: "Please select an option" })} />
          <label className='ms-1'>
            <strong>No</strong>
          </label>
        </div>
      </div>
      {errors.feedbackToParents && <span className='text-danger'>{errors.feedbackToParents.message}</span>}
      <div className='mt-3'>
        <CustomTextarea watch={watch} register={register} setValue={setValue} fieldName='additionalComments' errors={errors} placeholder={"Any Additional Comments (Any other Observations, Incidents or Notes)"} />
      </div>
    </div>
  );
};

export default FeedbackSection;
