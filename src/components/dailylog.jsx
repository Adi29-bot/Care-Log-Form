import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Creatable from "react-select/creatable";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../images/logo.jpg";
import ScrollButton from "./scrollbutton";
import ServiceUser from "./intro";
import ParentsSection from "./parents-carer";
import MoodSection from "./moodsection";
import PersonalCareSection from "./personalcare";
import PadChangeSection from "./padchangesection";
import BehaviourSection from "./behaviour";
import NutritionSection from "./nutrition";
import MedicationSection from "./medicationsection";
import ActivitiesSection from "./activitiessection";
import ReportSection from "./reportsection";
import FeedbackSection from "./feedbacksection";
import OfficeUseSection from "./officeusesection";

const DailyLogForm = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      officeUseEntries: [{ clientName: "", clientSignature: "", clientDate: "", logName: "", logSignature: "", logDate: "" }],
      liquidEntries: [{ amount: "1" }],
    },
  });

  const [showSections, setShowSections] = useState({
    mood: false,
    care: false,
    bowel: false,
    urination: false,
    padChange: false,
    liquid: false,
    lunch: false,
    snacks: false,
    medicine: false,
    activities: false,
    incident: false,
  });

  const handleToggle = (section, show) => {
    setShowSections((prev) => ({ ...prev, [section]: show }));
  };

  const renderCheckboxes = (options, name, validationMessage, icons = []) => {
    const isAnyChecked = options.some((option) => watch(`${name}.${option}`));

    return (
      <div>
        <div className='row row-cols-1 row-cols-sm-3 row-cols-md-3 row-cols-lg-3 g-2'>
          {options.map((option, index) => (
            <div key={index} className='col d-flex align-items-center flex-nowrap'>
              <input className='form-check-input me-2 flex-shrink-0' type='checkbox' {...register(`${name}.${option}`)} id={`${name}-${index}`} />
              <label className='form-check-label' htmlFor={`${name}-${index}`} style={{ minWidth: "120px", whiteSpace: "nowrap" }}>
                {option}
                {icons[index] && <img src={icons[index]} alt='' style={{ width: "25px", height: "25px", marginRight: "5px" }} />}
              </label>
            </div>
          ))}
        </div>
        {!isAnyChecked && <span className='text-danger'>{validationMessage}</span>}
      </div>
    );
  };

  const renderSelect = (name, options, rules) => (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <div className='react-select-container'>
          <Creatable {...field} options={options} isClearable isSearchable />
        </div>
      )}
    />
  );

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
    sessionStorage.setItem("resetForm", "true");
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
        <div className='col-md-12'>
          <img src={logo} alt='Logo' width='160' className='img-fluid rounded mx-auto d-block float-end' style={{ maxHeight: "50px" }} />
        </div>
        <div className=' text-center'>
          <h2 style={{ marginBottom: "5px" }}>Daily Log Form</h2>
        </div>
      </div>

      <ServiceUser register={register} errors={errors} control={control} renderSelect={renderSelect} />
      <ParentsSection watch={watch} showSections={showSections} handleToggle={handleToggle} register={register} errors={errors} renderCheckboxes={renderCheckboxes} setValue={setValue} />
      <MoodSection register={register} errors={errors} />
      <PersonalCareSection register={register} errors={errors} showSections={showSections} handleToggle={handleToggle} renderCheckboxes={renderCheckboxes} />
      <PadChangeSection showSections={showSections} handleToggle={handleToggle} register={register} errors={errors} control={control} />
      <BehaviourSection watch={watch} register={register} errors={errors} renderCheckboxes={renderCheckboxes} setValue={setValue} />
      <NutritionSection watch={watch} showSections={showSections} handleToggle={handleToggle} renderSelect={renderSelect} register={register} errors={errors} control={control} setValue={setValue} />
      <MedicationSection showSections={showSections} handleToggle={handleToggle} register={register} errors={errors} control={control} />
      <ActivitiesSection showSections={showSections} handleToggle={handleToggle} register={register} watch={watch} errors={errors} setValue={setValue} />
      <ReportSection showSections={showSections} handleToggle={handleToggle} register={register} errors={errors} />
      <FeedbackSection watch={watch} register={register} errors={errors} setValue={setValue} />
      <OfficeUseSection register={register} errors={errors} control={control} />

      {/* Buttons to Save, Download, Print, and Reset */}
      <div className='mt-3 d-flex justify-content-center'>
        <button type='button' className='btn btn-primary' onClick={handleSave}>
          Save
        </button>
        <button type='button' className='ms-3 btn btn-secondary' onClick={handleReset}>
          New
        </button>
      </div>
      <ScrollButton />
    </form>
  );
};

export default DailyLogForm;
