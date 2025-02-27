import React from "react";
import { Controller } from "react-hook-form";
import Creatable from "react-select/creatable";

const ServiceUser = ({ register, errors, control, renderSelect }) => {
  return (
    <div className='intro-section>'>
      <div className='row'>
        <div className='col-md-6 intro-flex'>
          <label className='mb-0 fw-bold text-primary'>
            <strong>Service User</strong>
          </label>
          <Controller
            name='serviceUser'
            control={control}
            rules={{ required: "Service User is required" }}
            render={({ field }) => (
              <div className='react-select-container'>
                <Creatable
                  {...field}
                  options={[
                    { label: "Aditi", value: "Aditi" },
                    { label: "Todd", value: "Todd" },
                  ]}
                  isClearable
                  isSearchable
                />
              </div>
            )}
          />
          {errors.serviceUser && <span className='text-danger'>{errors.serviceUser.message}</span>}
        </div>

        <div className='col-md-6 intro-flex'>
          <label className='mb-0 fw-bold text-primary'>
            <strong>Staff Completing Form</strong>
          </label>
          <Controller
            name='staffCompleting'
            control={control}
            rules={{ required: "Staff Completing Form is required" }}
            render={({ field }) => (
              <div className='react-select-container'>
                <Creatable
                  {...field}
                  options={[
                    { label: "Abhishek", value: "Abhishek" },
                    { label: "Hamzah", value: "Hamzah" },
                  ]}
                  isClearable
                  isSearchable
                />
              </div>
            )}
          />
          {errors.staffCompleting && <span className='text-danger'>{errors.staffCompleting.message}</span>}
        </div>
      </div>

      <div className='row mt-3'>
        {["pickupTime", "arrivalTime", "dropoffTime"].map((time, index) => (
          <div className='col-md-4 intro-flex' key={index}>
            <label className='mb-0 fw-bold text-primary'>
              <strong>{time.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}</strong>
            </label>
            <input type='time' className='form-control border-primary' {...register(time, { required: `${time.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} is required` })} />
            {errors[time] && <span className='text-danger'>{errors[time].message}</span>}
          </div>
        ))}
      </div>

      <div className='row mt-3 col-print'>
        {["date", "collectedBy", "droppedOffBy"].map((field, index) => (
          <div className='col-md-4' key={index}>
            <label className='mb-0 fw-bold text-primary'>
              <strong>{field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}</strong>
            </label>
            {field === "date" ? (
              <input type='date' className='form-control border-primary' {...register(field, { required: `${field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} is required` })} />
            ) : (
              renderSelect(
                field,
                [
                  { label: "Abhishek", value: "Abhishek" },
                  { label: "Hamzah", value: "Hamzah" },
                ],
                { required: `${field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} is required` }
              )
            )}
            {errors[field] && <span className='text-danger'>{errors[field].message}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceUser;
