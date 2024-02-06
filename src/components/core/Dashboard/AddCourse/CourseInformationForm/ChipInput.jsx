import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";

const ChipInput = ({
  label,
  name,
  placeholder,
  register,
  errors,
  setvalue,
  getValues,
}) => {
  const [chips, setChips] = useState([]);
  const [editCourse, course] = useSelector((state) => state.addCourse);

  useEffect(() => {
    if (editCourse) {
      setChips(course?.tags);

      register(name, {
        required: true,
        validate: (value) => value.length > 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setvalue(name, chips);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chips]);

  const handleAddChip = (e) => {
    e.preventDefault();

    const chipValue = getValues("chip").trim;
    if (chipValue && !chips.includes(chipValue)) {
      setChips([...chips, chipValue]);
      setvalue("chip", "");
    }
  };

  const handleKeyDown = (e) => {
    //check if the key pressed is enter or ',' not
    if (e.key === "," || e.code === "Enter") {
      //add chips to the current array and clear current chip
      e.preventDefault();
      const chipValue = getValues("chip").trim;
      if (chipValue && !chips.includes(chipValue)) {
        setChips([...chips, chipValue]);
        setvalue("chip", "");
      }
    }
  };

  const handleDeleteChip = (chipIndex) => {
    const updatedChips = chips.filter((chip, index) => index !== chipIndex);
    setChips(updatedChips);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={"chip"} className="label-style">
        {label}
      </label>

      {/* Render the chips  */}
      <div className="flex flex-wrap gap-y-1 mb-2">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="flex items-center gap-x-2 bg-yellow-400 rounded-full px-2 py-1 text-sm text-richblack-5 m-1"
          >
            {chip}
            <button
              type="button"
              className="hover:outline outline-richblack-700 rounded-full"
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}
      </div>

      {/* Render input field for adding new chips  */}
      <input
        id={"chip"}
        type="text"
        placeholder={placeholder}
        className="input-style"
        onKeyDown={handleKeyDown}
        {...register("chip")}
      />

      <button
        type="button"
        className="font-semibold text-yellow-100 text-left mt-2"
        onClick={handleAddChip}
      >
        Add to list
      </button>

      {/* Render an error message if the chips input is empty */}
      {errors[name] && <p className="input-error-style">{label} is required</p>}
    </div>
  );
};

export default ChipInput;
