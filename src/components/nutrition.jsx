import React from "react";
import { useFieldArray } from "react-hook-form";
import CustomTextarea from "./customtextarea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const NutritionSection = ({ watch, showSections, handleToggle, renderSelect, register, errors, control, setValue }) => {
  const { fields: liquidFields, append: appendLiquid, remove: removeLiquid } = useFieldArray({ control, name: "liquidIntakeEntries" });
  const { fields: snackFields, append: appendSnack, remove: removeSnack } = useFieldArray({ control, name: "snackEntries" });

  return (
    <>
      <label className='mt-3 form-label'>
        <strong>Nutrition Log</strong>
      </label>

      {/* Liquid Section */}
      <div className='mt-3 border border-primary p-3'>
        <div className='mt-2 d-flex justify-content-start'>
          <label className='mb-0 fw-bold text-primary'>
            <strong>Any Liquid:</strong>
          </label>
          <div className='ms-3'>
            <input
              type='radio'
              value='yes'
              {...register("liquidIntake", { required: "Please select an option" })}
              onChange={() => {
                handleToggle("liquid", true);
                if (liquidFields.length === 0) {
                  appendLiquid({ type: "water", amount: 1, unit: "", time: "" });
                }
              }}
            />
            <label className='ms-1 me-3'>
              <strong>Yes</strong>
            </label>
            <input type='radio' value='no' {...register("liquidIntake", { required: "Please select an option" })} onChange={() => handleToggle("liquid", false)} />
            <label className='ms-1'>
              <strong>No</strong>
            </label>
            <span className='ms-3 text-muted'>(If yes, please select type and mention amount of liquid and time)</span>
          </div>
        </div>
        {errors.liquidIntake && <span className='text-danger'>{errors.liquidIntake.message}</span>}

        {showSections.liquid && (
          <div className='mt-3 table-responsive'>
            <table className='table table-bordered table-striped table-info ' style={{ tableLayout: "fixed", width: "60%" }}>
              <thead className='text-center table-dark align-middle'>
                <tr>
                  <th style={{ width: "150px" }}>Liquid Type</th>
                  <th style={{ width: "100px" }}>Amount</th>
                  <th style={{ width: "200px" }}>Unit</th>
                  <th style={{ width: "200px" }}>Time</th>
                  <th style={{ width: "80px" }}>Actions</th>
                </tr>
              </thead>
              <tbody className='table-group-divider'>
                {liquidFields.map((entry, index) => (
                  <tr key={entry.id}>
                    <td>
                      <select className='form-control' {...register(`liquidEntries.${index}.type`, { required: "Liquid Type is required" })}>
                        <option value='water'>Water</option>
                        <option value='juice'>Juice</option>
                        <option value='other'>Any Other</option>
                      </select>
                      {errors.liquidEntries?.[index]?.type && <span className='text-danger'>{errors.liquidEntries[index].type.message}</span>}
                    </td>
                    <td>
                      <input
                        type='number'
                        className='form-control'
                        min={1}
                        {...register(`liquidEntries.${index}.amount`, {
                          required: "Amount is required",
                          min: { value: 1, message: "Amount must be greater than 0" },
                        })}
                      />
                      {errors.liquidEntries?.[index]?.amount && <span className='text-danger'>{errors.liquidEntries[index].amount.message}</span>}
                    </td>

                    <td>
                      {renderSelect(
                        `liquidEntries.${index}.unit`,
                        [
                          { value: "ml", label: "ml" },
                          { value: "litres", label: "Litres" },
                          { value: "cup", label: "Cup" },
                        ],
                        { required: "Unit is required" }
                      )}
                      {errors.liquidEntries?.[index]?.unit && <span className='text-danger'>{errors.liquidEntries[index].unit.message}</span>}
                    </td>
                    <td>
                      <input type='time' className='form-control' {...register(`liquidEntries.${index}.time`, { required: "Time is required" })} />
                      {errors.liquidEntries?.[index]?.time && <span className='text-danger'>{errors.liquidEntries[index].time.message}</span>}
                    </td>
                    <td className='text-center d-flex justify-content-center' style={{ padding: "25px" }}>
                      <button type='button' className='btn btn-danger btn-sm' onClick={() => removeLiquid(index)}>
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type='button' className='btn btn-secondary btn-sm' style={{ backgroundColor: "darkblue" }} onClick={() => appendLiquid({})}>
              <FontAwesomeIcon icon={faCirclePlus} style={{ color: "white" }} />
            </button>
          </div>
        )}
      </div>

      {/* Lunch Section */}
      <div className='mt-3 border border-primary p-3'>
        <div className='d-flex justiffy-content-start'>
          <label className='mb-0 fw-bold text-primary'>
            <strong>Lunch:</strong>
          </label>
          <div className='ms-3'>
            <input type='radio' value='yes' {...register("lunchIntake", { required: "Please select an option" })} onChange={() => handleToggle("lunch", true)} />
            <label className='ms-1 me-3'>
              <strong>Yes</strong>
            </label>
            <input type='radio' value='no' {...register("lunchIntake", { required: "Please select an option" })} onChange={() => handleToggle("lunch", false)} />
            <label className='ms-1'>
              <strong>No</strong>
            </label>
            <span className='ms-3 text-muted'>(If yes, please selct amount eaten and and explain what was in lunch)</span>
          </div>
        </div>
        {errors.lunchIntake && <span className='text-danger'>{errors.lunchIntake.message}</span>}

        {showSections.lunch && (
          <div className='mt-3'>
            <div className='row g-1 align-items-start'>
              <div className='col-md-4 d-flex flex-column'>
                <label className='form-label'>
                  <strong>Amount Eaten</strong>
                </label>
                <div className='d-flex flex-wrap align-items-center gap-3'>
                  {["fully", "partially", "none"].map((amount, index) => (
                    <div className='form-check' key={index}>
                      <input className='form-check-input' type='radio' value={amount} {...register("lunchAmount", { required: "Please select amount eaten" })} />
                      <label className='form-check-label'>{amount.charAt(0).toUpperCase() + amount.slice(1)} Eaten</label>
                    </div>
                  ))}
                </div>
                {errors.lunchAmount && <span className='text-danger'>{errors.lunchAmount.message}</span>}
              </div>
              <div className='col-md-4 d-flex flex-column'>
                <label className='form-label'>
                  <strong>Brought From</strong>
                </label>
                <div className='d-flex flex-wrap align-items-center gap-3'>
                  {["home", "takeaway"].map((source, index) => (
                    <div className='form-check' key={index}>
                      <input className='form-check-input' type='radio' value={source} {...register("lunchFrom", { required: "Please select where lunch was brought from" })} />
                      <label className='form-check-label'>{source.charAt(0).toUpperCase() + source.slice(1)}</label>
                    </div>
                  ))}
                </div>
                {errors.lunchFrom && <span className='text-danger'>{errors.lunchFrom.message}</span>}
              </div>
              <div className='col-md-2'>
                <label className='form-label'>
                  <strong>Time</strong>
                </label>
                <input type='time' className='form-control' style={{ width: "auto" }} {...register("lunchTime", { required: "Time is required" })} />
                {errors.lunchTime && <span className='text-danger'>{errors.lunchTime.message}</span>}
              </div>
            </div>

            <div className='row mt-3'>
              <div className='col-12'>
                <CustomTextarea watch={watch} register={register} setValue={setValue} fieldName='lunchDetails' errors={errors} placeholder={'Detail of the Lunch/Meal "Or" Reason if Refused'} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Snacks Section */}
      <div className='mt-3 border border-primary p-3'>
        <div className='d-flex justify-content-start'>
          <label className='mb-0 fw-bold text-primary'>
            <strong>Any Snacks:</strong>
          </label>
          <div className='ms-3'>
            <input
              type='radio'
              value='yes'
              {...register("snacksIntake", { required: "Please select an option" })}
              onChange={() => {
                handleToggle("snacks", true);
                if (snackFields.length === 0) {
                  appendSnack({ name: "", time: "" });
                }
              }}
            />
            <label className='ms-1 me-3'>
              <strong>Yes</strong>
            </label>
            <input type='radio' value='no' {...register("snacksIntake", { required: "Please select an option" })} onChange={() => handleToggle("snacks", false)} />
            <label className='ms-1'>
              <strong>No</strong>
            </label>
            <span className='ms-3 text-muted'>(If yes, please write name of the snack and time)</span>
          </div>
        </div>
        {errors.snacksIntake && <span className='text-danger'>{errors.snacksIntake.message}</span>}

        {showSections.snacks && (
          <div className='mt-3 table-responsive'>
            <table className='table table-bordered table-striped table-info ' style={{ tableLayout: "fixed", width: "45%" }}>
              <thead className='text-center table-dark align-middle'>
                <tr>
                  <th style={{ width: "250px" }}>Name of the Snack</th>
                  <th style={{ width: "200px" }}>Time</th>
                  <th style={{ width: "80px" }}>Actions</th>
                </tr>
              </thead>
              <tbody className='table-group-divider'>
                {snackFields.map((entry, index) => (
                  <tr key={entry.id}>
                    <td>
                      {renderSelect(
                        `snackEntries.${index}.name`,
                        [
                          { value: "apple", label: "Apple" },
                          { value: "banana", label: "Banana" },
                          { value: "cookies", label: "Cookies" },
                        ],
                        { required: "Snack name is required" }
                      )}
                      {errors.snackEntries?.[index]?.name && <span className='text-danger'>{errors.snackEntries[index].name.message}</span>}
                    </td>
                    <td>
                      <input type='time' className='form-control' {...register(`snackEntries.${index}.time`, { required: "Time is required" })} />
                      {errors.snackEntries?.[index]?.time && <span className='text-danger'>{errors.snackEntries[index].time.message}</span>}
                    </td>
                    <td className='text-center d-flex justify-content-center' style={{ padding: "25px" }}>
                      <button type='button' className='btn btn-danger btn-sm' onClick={() => removeSnack(index)}>
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type='button' className='btn btn-secondary btn-sm' style={{ backgroundColor: "darkblue" }} onClick={() => appendSnack({})}>
              <FontAwesomeIcon icon={faCirclePlus} style={{ color: "white" }} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default NutritionSection;
