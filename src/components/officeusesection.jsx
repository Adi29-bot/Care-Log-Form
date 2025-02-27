import React from "react";
import { useFieldArray } from "react-hook-form";

const OfficeUseSection = ({ register, errors, control }) => {
  const { fields: staffFields, append: appendStaff, remove: removeStaff } = useFieldArray({ control, name: "officeUseEntries" });

  return (
    <div className='mt-3 border border-primary p-3 office-use'>
      <label className='mb-0 fw-bold text-primary'>
        <strong>For Office Use Only:</strong>
      </label>
      <div className='row'>
        {staffFields.map((staffEntry, staffIndex) => (
          <div key={staffEntry.id} className='col-md-4 mb-3'>
            <div className='border p-2'>
              <h5>Staff Working with the Client</h5>
              <div className='form-group'>
                <label>Print Full Name</label>
                <input type='text' className='form-control' {...register(`officeUseEntries.${staffIndex}.clientName`, { required: "Please enter staff name" })} />
                {errors.officeUseEntries?.[staffIndex]?.clientName && <span className='text-danger'>{errors.officeUseEntries[staffIndex].clientName.message}</span>}
              </div>
              <div className='form-group'>
                <label>Signature</label>
                <input type='text' className='form-control' {...register(`officeUseEntries.${staffIndex}.clientSignature`, { required: "Please enter staff signature" })} />
                {errors.officeUseEntries?.[staffIndex]?.clientSignature && <span className='text-danger'>{errors.officeUseEntries[staffIndex].clientSignature.message}</span>}
              </div>
              <div className='form-group'>
                <label>Date</label>
                <input type='date' className='form-control' {...register(`officeUseEntries.${staffIndex}.clientDate`, { required: "Please select a date" })} />
                {errors.officeUseEntries?.[staffIndex]?.clientDate && <span className='text-danger'>{errors.officeUseEntries[staffIndex].clientDate.message}</span>}
              </div>
              <h5 className='mt-1'>Daily Log Signed & Typed By</h5>
              <div className='form-group'>
                <label>Print Full Name</label>
                <input type='text' className='form-control' {...register(`officeUseEntries.${staffIndex}.logName`, { required: "Please enter a name" })} />
                {errors.officeUseEntries?.[staffIndex]?.logName && <span className='text-danger'>{errors.officeUseEntries[staffIndex].logName.message}</span>}
              </div>
              <div className='form-group'>
                <label>Signature</label>
                <input type='text' className='form-control' {...register(`officeUseEntries.${staffIndex}.logSignature`, { required: "Signature is required" })} />
                {errors.officeUseEntries?.[staffIndex]?.logSignature && <span className='text-danger'>{errors.officeUseEntries[staffIndex].logSignature.message}</span>}
              </div>
              <div className='form-group'>
                <label>Date</label>
                <input type='date' className='form-control' {...register(`officeUseEntries.${staffIndex}.logDate`, { required: "Please select a date" })} />
                {errors.officeUseEntries?.[staffIndex]?.logDate && <span className='text-danger'>{errors.officeUseEntries[staffIndex].logDate.message}</span>}
              </div>
              <button type='button' className='btn btn-danger btn-sm mt-2' onClick={() => removeStaff(staffIndex)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <button type='button' className='btn btn-secondary btn-sm' onClick={() => appendStaff({})}>
        Add Staff Entry
      </button>
    </div>
  );
};

export default OfficeUseSection;
