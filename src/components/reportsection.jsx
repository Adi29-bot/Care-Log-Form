import React from "react";

const ReportSection = ({ showSections, handleToggle, register, errors }) => {
  return (
    <div className='mt-3 border border-primary p-3'>
      <div className='d-flex justify-content-start'>
        <label className='mb-0 fw-bold text-primary'>
          <strong>Incident Reports:</strong>
        </label>
        <div className='ms-3'>
          <input type='radio' value='yes' {...register("incidentReport", { required: "Please select an option" })} onChange={() => handleToggle("incident", true)} />
          <label className='ms-1 me-3'>
            <strong>Yes</strong>
          </label>
          <input type='radio' value='no' {...register("incidentReport", { required: "Please select an option" })} onChange={() => handleToggle("incident", false)} />
          <label className='ms-1'>
            <strong>No</strong>
          </label>
          <span className='ms-3 text-muted'>(If yes, which incident form filled today: Please Specify)</span>
        </div>
      </div>
      {errors.incidentReport && <span className='text-danger'>{errors.incidentReport.message}</span>}

      {showSections.incident && (
        <div className='mt-3'>
          {["ABC Chart", "Incident Form", "Body Maps", "BRS (Behaviour Report Sheet)", "MAR (Medication Administration Record)"].map((report, index) => (
            <div key={index} className='d-flex align-items-center mb-2'>
              <label className='form-label me-2'>
                <strong>{report}</strong>
              </label>
              <div className='form-check form-check-inline me-3'>
                <input className='form-check-input' type='radio' value='yes' {...register(`reports.${report}`, { required: "Please select an option" })} />
                <label className='form-check-label'>Yes</label>
              </div>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type='radio' value='no' {...register(`reports.${report}`, { required: "Please select an option" })} />
                <label className='form-check-label'>No</label>
              </div>
              {errors.reports?.[report] && <span className='text-danger'>{errors.reports[report].message}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportSection;
