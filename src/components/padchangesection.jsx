import React from "react";
import { useFieldArray } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const PadChangeSection = ({ showSections, handleToggle, register, errors, control }) => {
  const { fields: padFields, append: appendPad, remove: removePad } = useFieldArray({ control, name: "padChangeEntries" });

  return (
    <div className='mt-3 border border-primary p-3'>
      <div className='d-flex justify-content-start'>
        <label className='mb-0 fw-bold text-primary'>
          <strong>Pad Change: </strong>
        </label>
        <div className='ms-3'>
          <input
            type='radio'
            value='yes'
            {...register("padChangeReport", { required: "Please select an option" })}
            onChange={() => {
              handleToggle("padChange", true);
              if (padFields.length === 0) {
                appendPad({ type: "wet", time: "" });
              }
            }}
          />
          <label className='ms-1 me-3'>
            <strong>Yes</strong>
          </label>
          <input type='radio' value='no' {...register("padChangeReport", { required: "Please select an option" })} onChange={() => handleToggle("padChange", false)} />
          <label className='ms-1'>
            <strong>No</strong>
          </label>
          <span className='ms-3 text-muted'>(If yes, select type and mention time)</span>
        </div>
      </div>
      {errors.padChangeReport && <span className='text-danger'>{errors.padChangeReport.message}</span>}

      {showSections.padChange && (
        <div className='mt-3  table-responsive'>
          <table className='table table-bordered table-striped table-info ' style={{ tableLayout: "fixed", width: "50%" }}>
            <thead className='text-center table-dark align-middle'>
              <tr>
                <th style={{ width: "180px" }}>Type</th>
                <th style={{ width: "200px" }}>Time</th>
                <th style={{ width: "80px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {padFields.map((entry, index) => (
                <tr key={entry.id}>
                  <td>
                    <select className='form-control' {...register(`padChangeEntries.${index}.type`, { required: "Type is required" })}>
                      <option value='wet'>Wet</option>
                      <option value='dry'>Dry</option>
                      <option value='soiled'>Soiled</option>
                    </select>
                    {errors.padChangeEntries?.[index]?.type && <span className='text-danger'>{errors.padChangeEntries[index].type.message}</span>}
                  </td>
                  <td>
                    <input type='time' className='form-control' {...register(`padChangeEntries.${index}.time`, { required: "Time is required" })} />
                    {errors.padChangeEntries?.[index]?.time && <span className='text-danger'>{errors.padChangeEntries[index].time.message}</span>}
                  </td>
                  <td className='text-center d-flex justify-content-center' style={{ padding: "25px" }}>
                    <button type='button' className='btn btn-danger btn-sm' onClick={() => removePad(index)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type='button' className='btn btn-secondary btn-sm' style={{ backgroundColor: "darkblue" }} onClick={() => appendPad({})}>
            <FontAwesomeIcon icon={faCirclePlus} style={{ color: "white" }} />
          </button>
        </div>
      )}
    </div>
  );
};

export default PadChangeSection;
