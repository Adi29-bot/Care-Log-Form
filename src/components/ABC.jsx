import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Creatable from "react-select/creatable";
import CustomTextarea from "./customtextarea";

function ABC() {
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
      name: "",
      date: [""],
      time: [""],
      activity: [""],
      antecedent: [""],
      behavior: [""],
      consequence: [""],
      staffSignature: "",
    },
  });
  const [abcSections, setAbcSections] = useState([0]);

  const onSubmit = (data) => {
    console.log(data);
    reset();
    setAbcSections([0]);
  };

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

  const [showAdditionalStaff, setShowAdditionalStaff] = useState(false);
  const [additionalStaffValue, setAdditionalStaffValue] = useState("");

  const modifiedStaffOptions = [...staffOptions, { label: "Add another staff name", value: "add_staff" }];

  const handleStaffChange = (value) => {
    if (value === "add_staff") {
      setShowAdditionalStaff(true);
      setAdditionalStaffValue("");
    }
  };

  const handleRemoveAdditionalStaff = () => {
    setShowAdditionalStaff(false);
    setAdditionalStaffValue("");
  };

  const addSection = () => {
    setAbcSections([...abcSections, abcSections.length]);
  };

  const removeSection = (index) => {
    if (abcSections.length > 1) {
      setAbcSections(abcSections.filter((i) => i !== index));
    }
  };

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

  return (
    <form className='container-fluid mt-3 mb-3' id='myForm'>
      <div className='row align-items-center'>
        <div className=' text-center'>
          <h2 style={{ marginBottom: "5px" }}>ABC (Antecedent, Behavior, Consequence) Chart Form</h2>
        </div>
      </div>

      {/* Name Selection */}
      <div className='mb-3'>
        <label className='form-label mb-0 fw-bold text-primary'>
          <strong>Name</strong>
        </label>
        <Controller
          name='name'
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
                  setValue("name", { value: label, label });
                }}
              />
            </div>
          )}
        />
        {errors && errors.name && <div className='text-danger'>{errors.name.message}</div>}
      </div>

      {/* ABC Sections */}
      {abcSections.map((index) => (
        <div key={index} className='mb-4 border border-primary p-3'>
          {/* Date and Time */}
          <div className='row mb-3'>
            <span className='text-muted'>(Date/Time when the behavior occurred)</span>
            <div className='col-md-3'>
              <label htmlFor='date' className='form-label mb-0 fw-bold text-primary'>
                <strong>Date</strong>
              </label>
              <input type='date' {...register(`date[${index}]`, { required: "Date is required" })} className='form-control border-primary' />
              {errors && errors.date && errors.date[index] && <div className='text-danger'>{errors.date[index].message}</div>}
            </div>
            <div className='col-md-3'>
              <label className='form-label mb-0 fw-bold text-primary'>
                <strong>From</strong>
              </label>
              <input type='time' {...register(`from[${index}]`, { required: "Time is required" })} className='form-control border-primary' />
              {errors && errors.from && errors.from[index] && <div className='text-danger'>{errors.from[index].message}</div>}
            </div>
            <div className='col-md-3'>
              <label className='form-label mb-0 fw-bold text-primary'>
                <strong>To</strong>
              </label>
              <input type='time' {...register(`to[${index}]`, { required: "Time is required" })} className='form-control border-primary' />
              {errors && errors.to && errors.to[index] && <div className='text-danger'>{errors.to[index].message}</div>}
            </div>
          </div>

          {/* Activity */}
          <div className='mb-3'>
            <label className='form-label mb-0 fw-bold text-primary'>
              <strong>Activity</strong>
            </label>
            <span className='ms-2 text-muted'>(What activity was going on when the behavior occurred)</span>
            <CustomTextarea watch={watch} register={register} setValue={setValue} fieldName={`activity[${index}]`} errors={errors} placeholder={"Describe the activity..."} />
            {/* {errors && errors.activity && errors.activity[index] && <div className='text-danger'>{errors.activity[index].message}</div>} */}
          </div>

          {/* Antecedent */}
          <div className='mb-3'>
            <label className='form-label mb-0 fw-bold text-primary'>
              <strong>Antecedent</strong>
            </label>
            <span className='ms-2 text-muted'>(What happened right before the behavior that may have triggered the behavior)</span>
            <CustomTextarea watch={watch} register={register} setValue={setValue} fieldName={`antecedent[${index}]`} errors={errors} placeholder={"Describe the antecedent..."} />
            {/* {errors && errors.antecedent && errors.antecedent[index] && <div className='text-danger'>{errors.antecedent[index].message}</div>} */}
          </div>

          {/* Behavior */}
          <div className='mb-3'>
            <label className='form-label mb-0 fw-bold text-primary'>
              <strong>Behavior</strong>
            </label>
            <span className='ms-2 text-muted'>(What the behavior looked like)</span>
            <CustomTextarea watch={watch} register={register} setValue={setValue} fieldName={`behavior[${index}]`} errors={errors} placeholder={"Describe the behavior..."} />
            {/* {errors && errors.behavior && errors.behavior[index] && <div className='text-danger'>{errors.behavior[index].message}</div>} */}
          </div>

          {/* Consequence */}
          <div className='mb-3'>
            <label className='form-label mb-0 fw-bold text-primary'>
              <strong>Consequence</strong>
            </label>
            <span className='ms-2 text-muted'>(What happened after the behavior, or as a result of the behavior)</span>
            <CustomTextarea watch={watch} register={register} setValue={setValue} fieldName={`consequence[${index}]`} errors={errors} placeholder={"Describe the consequence..."} />
            {/* {errors && errors.consequence && errors.consequence[index] && <div className='text-danger'>{errors.consequence[index].message}</div>} */}
          </div>

          {/* Remove Button (if not the first section) */}
          {abcSections.length > 1 && (
            <button type='button' className='btn btn-danger btn-sm' onClick={() => removeSection(index)}>
              Remove
            </button>
          )}
        </div>
      ))}

      {/* Add Section Button */}
      <button type='button' className='btn btn-dark mb-3' onClick={addSection}>
        Add
      </button>

      {/* Staff Signature */}
      <div className='row'>
        <div className='col-md-6 intro-flex'>
          <label className='mb-0 fw-bold text-primary'>
            <strong>Staff To Sign</strong>
          </label>
          <Controller
            name='staffCompleting'
            control={control}
            rules={{ required: "Staff Completing Form is required" }}
            render={({ field }) => (
              <div className='react-select-container'>
                <Creatable
                  {...field}
                  options={modifiedStaffOptions}
                  isClearable
                  isSearchable
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption);
                    handleStaffChange(selectedOption?.value);
                  }}
                  onBlur={field.onBlur}
                  value={field.value}
                />
              </div>
            )}
          />
          {errors.staffCompleting && <span className='text-danger'>{errors.staffCompleting.message}</span>}
        </div>

        {showAdditionalStaff && (
          <div className='col-md-6 intro-flex'>
            <label className='mb-0 fw-bold text-primary'>
              <strong>Staff To Sign 2</strong>
            </label>
            <Controller
              name='additionalStaff'
              control={control}
              rules={{ required: "Staff Completing Form is required" }}
              render={({ field }) => (
                <div className='react-select-container'>
                  <Creatable
                    {...field}
                    options={staffOptions}
                    isClearable
                    isSearchable
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption);
                      setAdditionalStaffValue(selectedOption?.value);
                    }}
                  />
                </div>
              )}
            />
            <div className='text-danger' style={{ marginTop: "5px", cursor: "pointer" }} onClick={handleRemoveAdditionalStaff}>
              Remove Additional Staff
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className='mt-3 d-flex justify-content-center'>
        <button type='button' className='btn btn-primary ' onClick={handleSave}>
          Save
        </button>
      </div>
    </form>
  );
}

export default ABC;
