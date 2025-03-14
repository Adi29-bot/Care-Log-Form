import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Creatable from "react-select/creatable";
import CustomTextarea from "./customtextarea";

const ActivityEvidence = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm();
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

  const activityOptions = [
    { label: "Energizer ⚡️", value: "energizer" },
    { label: "Arts & Craft 🎨", value: "artsAndCraft" },
    { label: "Outings 🏞️", value: "outings" },
    { label: "Swimming 🏊‍♂️", value: "swimming" },
    { label: "Bowling 🎳", value: "bowling" },
    { label: "Sports Hall 🏟️", value: "sportsHall" },
    { label: "Onsite 📍", value: "onsite" },
    { label: "GYM 🏋️‍♂️", value: "gym" },
    { label: "Cooking 🍳", value: "cooking" },
    { label: "Trampoline 🤸‍♂️", value: "trampoline" },
    { label: "Sports 🏀", value: "sports" },
    { label: "Film 🎬", value: "film" },
    { label: "Themed Topic 💡", value: "themedTopic" },
    { label: "Music 🎵", value: "music" },
    { label: "Sensory Room 🧘", value: "sensoryRoom" },
    { label: "TV/Main Area 📺", value: "tvMainArea" },
    { label: "Offsite/Onsite 🚌", value: "offsiteOnsite" },
    { label: "Park 🌳", value: "park" },
  ].sort((a, b) => a.label.localeCompare(b.label));

  const learningOptions = [
    { name: "Communication 🗣️", value: "communication" },
    { name: "Participation 🎉", value: "participation" },
    { name: "Socialising 🤝", value: "socialising" },
    { name: "Following Instructions 📝", value: "followingInstructions" },
    { name: "Good Listening 👂", value: "goodListening" },
    { name: "Having Fun 😃", value: "havingFun" },
    { name: "Engaging 🤩", value: "engaging" },
    { name: "Showing Interest 👀", value: "showingInterest" },
  ];

  const [photo, setPhoto] = useState(null);
  const videoRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
        setIsCameraActive(false); // Stop camera if browsing
        if (videoRef.current && videoRef.current.srcObject) {
          videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const takePicture = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      setPhoto(dataUrl);
      setIsCameraActive(false);
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const handleResetPhoto = () => {
    setPhoto(null);
    setIsTakingPhoto(false);
    stopCamera();
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
    console.log({ ...data, photo });
  };

  return (
    <div className='container-fluid mt-3 mb-3'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row align-items-center'>
          <div className=' text-center'>
            <h2 style={{ marginBottom: "5px" }}>Activity Evidence Sheet</h2>
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
            <label htmlFor='activity' className='form-label mb-0 fw-bold text-primary'>
              <strong>Activity</strong>
            </label>
            <Controller
              name='activity'
              control={control}
              rules={{ required: "Activity is required" }}
              render={({ field }) => (
                <div className='react-select-container'>
                  <Creatable
                    {...field}
                    isClearable
                    isSearchable
                    options={activityOptions}
                    onCreateOption={(label) => {
                      setValue("activity", { value: label, label });
                    }}
                  />
                </div>
              )}
            />
            {errors.activity && <div className='invalid-feedback'>{errors.activity.message}</div>}
          </div>
        </div>

        <div className='row mb-3'>
          <div className='col-md-6'>
            <label htmlFor='date' className='form-label mb-0 fw-bold text-primary'>
              <strong>Date</strong>
            </label>
            <input type='date' className={`form-control border-primary ${errors.date ? "is-invalid" : ""}`} id='date' {...register("date", { required: "Date is required" })} />
            {errors.date && <div className='invalid-feedback'>{errors.date.message}</div>}
          </div>
          <div className='col-md-6'>
            <label htmlFor='time' className='form-label mb-0 fw-bold text-primary'>
              <strong>Time</strong>
            </label>
            <input type='time' className={`form-control border-primary ${errors.time ? "is-invalid" : ""}`} id='time' {...register("time", { required: "Time is required" })} />
            {errors.time && <div className='invalid-feedback'>{errors.time.message}</div>}
          </div>
        </div>

        <div className='mb-3'>
          <label className='form-label mb-0 fw-bold text-primary'>
            <strong>Photo</strong>
          </label>
          <div className='border rounded p-3' style={{ position: "relative", width: "100%", height: "200px" }}>
            {photo ? (
              <img src={photo} alt='Activity Photo' className='img-fluid' style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }} />
            ) : (
              <div className='text-center' style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span>No photo selected</span>
              </div>
            )}
            <div className='position-absolute bottom-0 start-50 translate-middle-x mb-2'>
              {isTakingPhoto ? (
                <>
                  <button type='button' className='btn btn-sm btn-primary me-2' onClick={takePicture}>
                    Take Picture
                  </button>
                  <button type='button' className='btn btn-sm btn-secondary' onClick={stopCamera}>
                    Stop Camera
                  </button>
                </>
              ) : (
                <>
                  <button type='button' className='btn btn-sm btn-outline-primary me-2' onClick={startCamera}>
                    Take Photo
                  </button>
                  <input type='file' className='d-none' id='photo' accept='image/*' onChange={handlePhotoChange} />
                  <label htmlFor='photo' className='btn btn-sm btn-outline-primary'>
                    Upload Photo
                  </label>
                </>
              )}
              {photo && (
                <button type='button' className='btn btn-sm btn-danger' onClick={handleResetPhoto}>
                  Take Again
                </button>
              )}
            </div>
          </div>
        </div>

        <div className='mb-3'>
          <label htmlFor='explanation' className='form-label mb-0 fw-bold text-primary'>
            <strong>Explanation</strong>
          </label>
          <CustomTextarea watch={watch} register={register} setValue={setValue} fieldName={"explanation"} errors={errors} placeholder={"Explanation..."} />
        </div>

        <div className='mb-3'>
          <label className='form-label mb-0 fw-bold text-primary'>
            {" "}
            <strong>Learning from activity</strong>
          </label>
          <div className='row'>
            {learningOptions.map((option) => (
              <div className='col-md-4' key={option.value}>
                <div className='form-check'>
                  <input type='checkbox' className='form-check-input' id={`learning-${option.value}`} value={option.value} {...register("learning")} />
                  <label className='form-check-label' htmlFor={`learning-${option.value}`}>
                    {option.name}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='row mb-3'>
          <div className='col-md-6'>
            <label htmlFor='staffName' className='form-label mb-0 fw-bold text-primary'>
              <strong>Staff Name</strong>
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
          <div className='col-md-6'>
            <label htmlFor='signature' className='form-label mb-0 fw-bold text-primary'>
              <strong>Signature</strong>
            </label>
            <input type='text' className={`form-control border-primary ${errors.signature ? "is-invalid" : ""}`} id='signature' {...register("signature", { required: "Signature is required" })} />
            {errors.signature && <div className='invalid-feedback'>{errors.signature.message}</div>}
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

export default ActivityEvidence;
