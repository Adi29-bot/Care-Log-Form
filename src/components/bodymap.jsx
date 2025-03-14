import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Creatable from "react-select/creatable";
import Front from "../images/front.jpg";
import Back from "../images/back.jpg";
import CustomTextarea from "./customtextarea";

const BodyMap = () => {
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
  } = useForm();

  const [bodyMarks, setBodyMarks] = useState({
    front: [],
    back: [],
  });

  const handleBodyClick = (event, bodyPart) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setBodyMarks((prevMarks) => ({
      ...prevMarks,
      [bodyPart]: [...prevMarks[bodyPart], { x, y }],
    }));
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

  const onSubmit = (data) => {
    console.log({ ...data, bodyMarks });
  };

  return (
    <div className='container-fluid mt-4'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row align-items-center'>
          <div className=' text-center'>
            <h2 style={{ marginBottom: "5px" }}>Body Map Form</h2>
          </div>
        </div>
        <div className='row mb-3'>
          <div className='col-md-6'>
            <label htmlFor='name' className='form-label mb-0 fw-bold text-primary'>
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
            {errors.name && <div className='invalid-feedback'>{errors.name.message}</div>}
          </div>
          <div className='col-md-6'>
            <label htmlFor='date' className='form-label mb-0 fw-bold text-primary'>
              <strong>Date</strong>
            </label>
            <input type='date' className={`form-control border-primary ${errors.date ? "is-invalid" : ""}`} id='date' {...register("date", { required: "Date is required" })} />
            {errors.date && <div className='invalid-feedback'>{errors.date.message}</div>}
          </div>
        </div>

        <div className='row mb-3'>
          <div className='col-md-6'>
            <label htmlFor='front-body' className='form-label mb-0 fw-bold text-primary'>
              <strong>Front Body</strong>
            </label>
            <div
              style={{
                position: "relative",
                border: "1px solid #ccc",
                width: "200px",
                height: "400px",
              }}
              onClick={(e) => handleBodyClick(e, "front")}
            >
              {/* Replace with your front body image */}
              <img src={Front} alt='Front Body' style={{ width: "100%", height: "100%" }} />
              {bodyMarks.front.map((mark, index) => (
                <span
                  key={index}
                  style={{
                    position: "absolute",
                    left: mark.x - 5,
                    top: mark.y - 5,
                    fontSize: "20px",
                    color: "red",
                  }}
                >
                  x
                </span>
              ))}
            </div>
          </div>
          <div className='col-md-6'>
            <label htmlFor='front-body' className='form-label mb-0 fw-bold text-primary'>
              <strong>Back Body</strong>
            </label>
            <div
              style={{
                position: "relative",
                border: "1px solid #ccc",
                width: "200px",
                height: "400px",
              }}
              onClick={(e) => handleBodyClick(e, "back")}
            >
              {/* Replace with your back body image */}
              <img src={Back} alt='Back Body' style={{ width: "100%", height: "100%" }} />
              {bodyMarks.back.map((mark, index) => (
                <span
                  key={index}
                  style={{
                    position: "absolute",
                    left: mark.x - 5,
                    top: mark.y - 5,
                    fontSize: "20px",
                    color: "red",
                  }}
                >
                  x
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className='mb-3'>
          <label htmlFor='injuryDescription' className='form-label mb-0 fw-bold text-primary'>
            <strong>Injury Description</strong>
          </label>
          <CustomTextarea watch={watch} register={register} setValue={setValue} fieldName={"injury"} errors={errors} placeholder={"Describe the Injury..."} />
        </div>

        <div className='row mb-3'>
          <div className='col-md-4'>
            <label htmlFor='staffName' className='form-label mb-0 fw-bold text-primary'>
              <strong>Staff Print Name</strong>
            </label>
            <Controller
              name='staffName'
              control={control}
              rules={{ required: "Staff Name is required" }}
              render={({ field }) => (
                <div className='react-select-container'>
                  <Creatable
                    {...field}
                    isClearable
                    isSearchable
                    options={staffOptions}
                    onCreateOption={(label) => {
                      setValue("staffName", { value: label, label });
                    }}
                  />
                </div>
              )}
            />
            {errors.staffName && <div className='invalid-feedback'>{errors.staffName.message}</div>}
          </div>
          <div className='col-md-4'>
            <label htmlFor='staffSignature' className='form-label mb-0 fw-bold text-primary'>
              <strong>Staff Signature</strong>
            </label>
            <input
              type='text'
              className={`form-control border-primary ${errors.staffSignature ? "is-invalid" : ""}`}
              id='staffSignature'
              {...register("staffSignature", {
                required: "Staff Signature is required",
              })}
            />
            {errors.staffSignature && <div className='invalid-feedback'>{errors.staffSignature.message}</div>}
          </div>
          <div className='col-md-4'>
            <label htmlFor='staffDate' className='form-label mb-0 fw-bold text-primary'>
              <strong>Date</strong>
            </label>
            <input type='date' className={`form-control border-primary ${errors.staffDate ? "is-invalid" : ""}`} id='staffDate' {...register("staffDate", { required: "Date is required" })} />
            {errors.staffDate && <div className='invalid-feedback'>{errors.staffDate.message}</div>}
          </div>
        </div>

        <div className='row mb-3'>
          <div className='col-md-4'>
            <label htmlFor='parentName' className='form-label mb-0 fw-bold text-primary'>
              <strong>Parents/Carers Print Name</strong>
            </label>
            <input
              type='text'
              className={`form-control border-primary ${errors.parentName ? "is-invalid" : ""}`}
              id='parentName'
              {...register("parentName", {
                required: "Parent/Carer Name is required",
              })}
            />
            {errors.parentName && <div className='invalid-feedback'>{errors.parentName.message}</div>}
          </div>
          <div className='col-md-4'>
            <label htmlFor='parentSignature' className='form-label mb-0 fw-bold text-primary'>
              <strong>Staff Signature</strong>
            </label>
            <input
              type='text'
              className={`form-control border-primary ${errors.parentSignature ? "is-invalid" : ""}`}
              id='parentSignature'
              {...register("parentSignature", {
                required: "Staff Signature is required",
              })}
            />
            {errors.parentSignature && <div className='invalid-feedback'>{errors.parentSignature.message}</div>}
          </div>
          <div className='col-md-4'>
            <label htmlFor='parentDate' className='form-label mb-0 fw-bold text-primary'>
              <strong>Date</strong>
            </label>
            <input type='date' className={`form-control border-primary ${errors.parentDate ? "is-invalid" : ""}`} id='parentDate' {...register("parentDate", { required: "Date is required" })} />
            {errors.parentDate && <div className='invalid-feedback'>{errors.parentDate.message}</div>}
          </div>
        </div>

        <div className='mt-3 d-flex justify-content-center'>
          <button type='button' className='btn btn-primary ' onClick={handleSave}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default BodyMap;
