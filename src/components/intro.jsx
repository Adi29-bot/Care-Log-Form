import React from "react";
import { Controller } from "react-hook-form";
import Creatable from "react-select/creatable";

const ServiceUser = ({ register, errors, control, renderSelect }) => {
  const staffOptions = [
    { label: "Abhishek Ghadge", value: "Abhishek Ghadge" },
    { label: "Abdul Daim", value: "Abdul Daim" },
    { label: "Abbas Alnahari", value: "Abbas Alnahari" },
    { label: "Abdulbaki Hamed", value: "Abdulbaki Hamed" },
    { label: "Adeeb Latif", value: "Adeeb Latif" },
    { label: "Amie Smith", value: "Amie Smith" },
    { label: "Amina Adam", value: "Amina Adam" },
    { label: "Ammar Abdulrazaq", value: "Ammar Abdulrazaq" },
    { label: "Daniel Edwards", value: "Daniel Edwards" },
    { label: "Dawn Amphlett", value: "Dawn Amphlett" },
    { label: "Hamza Razaq", value: "Hamza Razaq" },
    { label: "Imaran Hamed", value: "Imaran Hamed" },
    { label: "Ishwaq Said", value: "Ishwaq Said" },
    { label: "Mohamad Abdulrazaq", value: "Mohamad Abdulrazaq" },
    { label: "Mohammad Harkal", value: "Mohammad Harkal" },
    { label: "Mueen Zaid", value: "Mueen Zaid" },
    { label: "Saad Qamar", value: "Saad Qamar" },
    { label: "Sajid Rehman", value: "Sajid Rehman" },
    { label: "Sami Yasin", value: "Sami Yasin" },
    { label: "Shahid Mahmu", value: "Shahid Mahmu" },
    { label: "Sharon Blatchford", value: "Sharon Blatchford" },
    { label: "Sumaiya Abdulghani", value: "Sumaiya Abdulghani" },
    { label: "Waleed Faid", value: "Waleed Faid" },
    { label: "Jodie Henry", value: "Jodie Henry" },
  ].sort((a, b) => a.label.localeCompare(b.label));

  const clientOptions = [
    { label: "Joab Groves", value: "Joab Groves" },
    { label: "Lucas Hill", value: "Lucas Hill" },
    { label: "Callum Nicholls", value: "Callum Nicholls" },
    { label: "Adam Jackson", value: "Adam Jackson" },
    { label: "Luke Checketts", value: "Luke Checketts" },
    { label: "Matthew Lloyd", value: "Matthew Lloyd" },
    { label: "Ilyas Mohammed", value: "Ilyas Mohammed" },
    { label: "Korben Neale", value: "Korben Neale" },
    { label: "Kashif Hussain", value: "Kashif Hussain" },
    { label: "Shamas Haider", value: "Shamas Haider" },
    { label: "Rahees Mahmood", value: "Rahees Mahmood" },
    { label: "Ayesha Mahmood", value: "Ayesha Mahmood" },
    { label: "Asaad Alnahari", value: "Asaad Alnahari" },
    { label: "Jack Collier", value: "Jack Collier" },
    { label: "Todd Williams", value: "Todd Williams" },
    { label: "Kieran McDonald", value: "Kieran McDonald" },
    { label: "Hamza Sharif", value: "Hamza Sharif" },
    { label: "Ethan Payne", value: "Ethan Payne" },
    { label: "Asad Murad", value: "Asad Murad" },
    { label: "Tariq Yehai", value: "Tariq Yehai" },
    { label: "Ammar Kayani", value: "Ammar Kayani" },
    { label: "Callum Moore", value: "Callum Moore" },
    { label: "Gary Cubberley", value: "Gary Cubberley" },
    { label: "Abigal Nicholls", value: "Abigal Nicholls" },
    { label: "Ben Epstein", value: "Ben Epstein" },
    { label: "Joey Turner", value: "Joey Turner" },
    { label: "Harmon Hayer", value: "Harmon Hayer" },
    { label: "Hamda Safa", value: "Hamda Safa" },
    { label: "Ellie Chambers", value: "Ellie Chambers" },
  ].sort((a, b) => a.label.localeCompare(b.label));
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
                <Creatable {...field} options={clientOptions} isClearable isSearchable />
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
                <Creatable {...field} options={staffOptions} isClearable isSearchable />
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
            {field === "date" ? <input type='date' className='form-control border-primary' {...register(field, { required: `${field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} is required` })} /> : renderSelect(field, staffOptions, { required: `${field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} is required` })}
            {errors[field] && <span className='text-danger'>{errors[field].message}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceUser;
