import React, { useState } from "react";
import { MdClose } from "react-icons/md";

const RequirementsField = ({
  label,
  placeholder,
  name,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const [courseRequirements, setCourseRequirements] = useState([]);

  const handleRequirementsAdd = () => {
    const requirementValue = getValues("requirement");
    if (requirementValue && !courseRequirements.includes(requirementValue)) {
      setCourseRequirements(...courseRequirements, requirementValue);
      setValue("requirement", "");
    }
  };

  const handleRequirementsDelete = (reqIndex) => {
    const updatedRequirements = courseRequirements.filter(
      (req, index) => index !== reqIndex
    );
    setCourseRequirements(updatedRequirements);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="requirement" className="label-style">
        {label} <sup className="text-pink-200">*</sup>
      </label>
      <input
        type="text"
        id={"requirement"}
        placeholder={placeholder}
        className="input-style"
        {...register("requirement")}
      />
      {errors[name] && <p className="input-error-style">{label} is required</p>}

      <button
        type="button"
        onClick={handleRequirementsAdd}
        className="font-semibold text-yellow-100 text-left mt-2"
      >
        Add
      </button>

      <div>
        {courseRequirements.length > 0 && (
          <ul className="mt-2 list-inside list-disc ">
            {courseRequirements.map((req, index) => (
              <li
                className="flex items-center gap-x-2 text-richblack-5 "
                key={index}
              >
                {req}
                <button
                  type="button"
                  className=" text-pure-greys-300 font-semibold"
                  onClick={() => handleRequirementsDelete(index)}
                >
                  <MdClose />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RequirementsField;
