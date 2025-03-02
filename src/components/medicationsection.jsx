import React from "react";
import { useFieldArray } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const MedicationSection = ({ showSections, handleToggle, register, errors, control }) => {
  const { fields: medicineFields, append: appendMedicine, remove: removeMedicine } = useFieldArray({ control, name: "medicineEntries" });

  return (
    <div className='mt-3 border border-primary p-3'>
      <div className='d-flex justify-content-start'>
        <label className='mb-0 fw-bold text-primary'>
          <strong>Medication:</strong>
        </label>
        <div className='ms-3'>
          <input
            type='radio'
            value='yes'
            {...register("medicineIntake", { required: "Please select an option" })}
            onChange={() => {
              handleToggle("medicine", true);
              if (medicineFields.length === 0) {
                appendMedicine({ name: "", dose: "", time: "", notes: "" });
              }
            }}
          />
          <label className='ms-1 me-3'>
            <strong>Yes</strong>
          </label>
          <input type='radio' value='no' {...register("medicineIntake", { required: "Please select an option" })} onChange={() => handleToggle("medicine", false)} />
          <label className='ms-1'>
            <strong>No</strong>
          </label>
          <span className='ms-3 text-muted'>(If yes, please provide the details below)</span>
        </div>
      </div>
      {errors.medicineIntake && <span className='text-danger'>{errors.medicineIntake.message}</span>}

      {showSections.medicine && (
        <div className='mt-3 table-responsive'>
          <table className='table table-bordered table-striped table-info ' style={{ tableLayout: "fixed", width: "100%" }}>
            <thead className='text-center table-dark align-middle'>
              <tr>
                <th style={{ width: "200px" }}>Name of the Medicine</th>
                <th style={{ width: "180px" }}>Dose Given</th>
                <th style={{ width: "180px" }}>Time</th>
                <th style={{ width: "280px" }}>Notes</th>
                <th style={{ width: "80px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicineFields.map((entry, index) => (
                <tr key={entry.id}>
                  <td>
                    <input type='text' className='form-control' {...register(`medicineEntries.${index}.name`, { required: "Medicine name is required" })} />
                    {errors.medicineEntries?.[index]?.name && <span className='text-danger'>{errors.medicineEntries[index].name.message}</span>}
                  </td>
                  <td>
                    <input type='text' className='form-control' {...register(`medicineEntries.${index}.dose`, { required: "Dose is required" })} />
                    {errors.medicineEntries?.[index]?.dose && <span className='text-danger'>{errors.medicineEntries[index].dose.message}</span>}
                  </td>
                  <td>
                    <input type='time' className='form-control' {...register(`medicineEntries.${index}.time`, { required: "Time is required" })} />
                    {errors.medicineEntries?.[index]?.time && <span className='text-danger'>{errors.medicineEntries[index].time.message}</span>}
                  </td>

                  <td>
                    <input type='text' className='form-control' {...register(`medicineEntries.${index}.notes`)} />
                  </td>

                  <td className='text-center d-flex justify-content-center' style={{ padding: "36px" }}>
                    <button type='button' className='btn btn-danger btn-sm' onClick={() => removeMedicine(index)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type='button' className='btn btn-secondary btn-sm' style={{ backgroundColor: "darkblue" }} onClick={() => appendMedicine({})}>
            <FontAwesomeIcon icon={faCirclePlus} style={{ color: "white" }} />
          </button>
        </div>
      )}
    </div>
  );
};

export default MedicationSection;
