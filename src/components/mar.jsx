import React, { useState, useRef, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Creatable from "react-select/creatable";

const MAR = () => {
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
    { label: "Hamza Abdul Rrazaq", value: "Hamza Abdul Rrazaq" },
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

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      medications: [{ date: "", time: "", medication: "", dose: "", signature1: "", signature2: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "medications",
  });

  const handleSave = () => {
    handleSubmit((data) => {
      localStorage.setItem("dailyLogFormData", JSON.stringify(data));
      window.print();
    })();
  };

  const handleReset = () => {
    reset();
    localStorage.removeItem("dailyLogFormData");
  };

  useEffect(() => {
    const resetFlag = sessionStorage.getItem("resetForm");

    if (resetFlag === "true") {
      handleReset();
      sessionStorage.removeItem("resetForm"); // Clear the flag
    } else {
      const savedData = localStorage.getItem("dailyLogFormData");
      if (savedData) {
        try {
          reset(JSON.parse(savedData));
        } catch (error) {
          console.error("Error parsing saved data:", error);
          localStorage.removeItem("dailyLogFormData");
        }
      }
    }
  }, [reset]);

  window.onbeforeunload = (event) => {
    sessionStorage.setItem("resetForm", "true"); // Set the reset flag
    const e = event || window.event;
    e.preventDefault();
    if (e) {
      e.returnValue = "";
    }
    return "";
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className='container mt-4 mb-4'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row align-items-center'>
          <div className=' text-center'>
            <h2 style={{ marginBottom: "5px" }}>Medication Administering Recording Form</h2>
          </div>
        </div>
        <div className='row mt-2 mb-3'>
          <div className='col-md-6'>
            <label htmlFor='youngPersonName' className='form-label mb-0 fw-bold text-primary'>
              <strong>Young Person's Name</strong>
            </label>

            <Controller
              name='youngPersonName'
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <div className='react-select-container'>
                  <Creatable
                    {...field}
                    isClearable
                    isSearchable
                    options={clientOptions}
                    onCreateOption={(label) => {
                      setValue("youngPersonName", { value: label, label });
                    }}
                  />
                </div>
              )}
            />
            {errors.youngPersonName && <div className='invalid-feedback'>{errors.youngPersonName.message}</div>}
          </div>
          <div className='col-md-6'>
            <label htmlFor='medication' className='form-label mb-0 fw-bold text-primary'>
              <strong>Medication</strong>
            </label>
            <input type='text' {...register("medication", { required: "Medication is required" })} className={`form-control border-primary ${errors.medication ? "is-invalid" : ""}`} />
            {errors.medication && <div className='invalid-feedback'>{errors.medication.message}</div>}
          </div>
        </div>

        <p className='text-muted text-center'>Always two workers must be present to administer medications. The medication must always be in a named pack with pharmacy label</p>

        {fields.map((field, index) => (
          <div key={field.id} className='mb-3 border border-primary p-3'>
            <div className='row'>
              <div className='col-md-6'>
                <label htmlFor={`medicationDetails[${index}].date`} className='form-label mb-0 fw-bold text-primary'>
                  <strong>Date</strong>
                </label>
                <input type='date' {...register(`medicationDetails[${index}].date`, { required: "Date is required" })} className={`form-control border-primary ${errors.medicationDetails?.[index]?.date ? "is-invalid" : ""}`} />
                {errors.medicationDetails?.[index]?.date && <div className='invalid-feedback'>{errors.medicationDetails[index].date.message}</div>}
              </div>
              <div className='col-md-6'>
                <label htmlFor={`medicationDetails[${index}].time`} className='form-label mb-0 fw-bold text-primary'>
                  <strong>Time</strong>
                </label>
                <input type='time' {...register(`medicationDetails[${index}].time`, { required: "Time is required" })} className={`form-control border-primary ${errors.medicationDetails?.[index]?.time ? "is-invalid" : ""}`} />
                {errors.medicationDetails?.[index]?.time && <div className='invalid-feedback'>{errors.medicationDetails[index].time.message}</div>}
              </div>
            </div>
            <div className='row mt-1'>
              <div className='col-md-6'>
                <label htmlFor={`medicationDetails[${index}].medication`} className='form-label mb-0 fw-bold text-primary'>
                  <strong>Medication</strong>
                </label>
                <input
                  type='text'
                  {...register(`medicationDetails[${index}].medication`, {
                    required: "Medication is required",
                  })}
                  className={`form-control border-primary ${errors.medicationDetails?.[index]?.medication ? "is-invalid" : ""}`}
                />
                {errors.medicationDetails?.[index]?.medication && <div className='invalid-feedback'>{errors.medicationDetails[index].medication.message}</div>}
              </div>
              <div className='col-md-6'>
                <label htmlFor={`medicationDetails[${index}].dose`} className='form-label mb-0 fw-bold text-primary'>
                  <strong>Dose</strong>
                </label>
                <input type='text' {...register(`medicationDetails[${index}].dose`, { required: "Dose is required" })} className={`form-control border-primary ${errors.medicationDetails?.[index]?.dose ? "is-invalid" : ""}`} />
                {errors.medicationDetails?.[index]?.dose && <div className='invalid-feedback'>{errors.medicationDetails[index].dose.message}</div>}
              </div>
            </div>
            <div className='row mt-1'>
              <div className='col-md-6'>
                <label htmlFor={`medicationDetails[${index}].signature1`} className='form-label mb-0 fw-bold text-primary'>
                  <strong>Signature 1</strong>
                </label>
                <input
                  type='text'
                  {...register(`medicationDetails[${index}].signature1`, {
                    required: "Signature 1 is required",
                  })}
                  className={`form-control border-primary ${errors.medicationDetails?.[index]?.signature1 ? "is-invalid" : ""}`}
                />
                {errors.medicationDetails?.[index]?.signature1 && <div className='invalid-feedback'>{errors.medicationDetails[index].signature1.message}</div>}
              </div>
              <div className='col-md-6'>
                <label htmlFor={`medicationDetails[${index}].signature2`} className='form-label mb-0 fw-bold text-primary'>
                  <strong>Signature 2</strong>
                </label>
                <input
                  type='text'
                  {...register(`medicationDetails[${index}].signature2`, {
                    required: "Signature 2 is required",
                  })}
                  className={`form-control border-primary ${errors.medicationDetails?.[index]?.signature2 ? "is-invalid" : ""}`}
                />
                {errors.medicationDetails?.[index]?.signature2 && <div className='invalid-feedback'>{errors.medicationDetails[index].signature2.message}</div>}
              </div>
            </div>

            <button type='button' className='btn btn-danger mt-2' onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        ))}

        <button type='button' className='btn btn-primary' onClick={() => append({})}>
          Add Medication Entry
        </button>

        <div className='mt-3 d-flex justify-content-center'>
          <button type='button' className='btn btn-success ' onClick={handleSave}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default MAR;
