import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../Common/IconBtn";
import { IoAddCircleOutline } from "react-icons/io5";
import NestedView from "./NestedView";
import { useSelector } from "react-redux";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

const CourseBuilderForm = () => {
  const [loading, setLoading] = useState(false);
  const [editCourseId, setEditCourseId] = useState(null);

  const { course } = useSelector((state) => state.addCourse);

  const {
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const handleCancelEditSection = () => {
    setEditCourseId(null);
    setValue("sectionName", "");
  };

  return (
    <div className=" bg-richblack-800 rounded-md p-6 border border-richblack-700 space-y-8">
      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>

      <form className="space-y-4">
        <div className="flex flex-col">
          <label className="label-style" htmlFor="sectionName">
            Section Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            type="text"
            placeholder="Add a section to build course"
            id="sectionName"
            disabled={loading}
            className="input-style"
            {...register("sectionName", { required: true })}
          />
          {errors.sectionName && (
            <p className="input-error-style">Section name is required</p>
          )}
        </div>

        {/* Create Section Button  */}
        <div className="flex items-end gap-x-4">
          <IconBtn
            type="submit"
            text={editCourseId ? "Edit Course Name" : "Course Name"}
            outline={true}
            disabled={loading}
          >
            <IoAddCircleOutline size={20} className="text-yellow-50" />
          </IconBtn>

          {editCourseId && (
            <button
              type="button"
              onClick={handleCancelEditSection}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Nested View  */}
      {course && course.sections.length > 0 && <NestedView />}

      {/* Back and Next Button  */}
      <div className="flex justify-end gap-x-3">
        <button
          type="button"
          disabled={loading}
          className={
            "flex cursor-pointer items-center gap-x-2  py-2 px-5 rounded-md bg-richblack-300 text-richblack-900 font-semibold hover:scale-95 transition-all duration-200"
          }
        >
          <MdNavigateBefore />
          Back
        </button>
        <IconBtn type="button" text="Next" disabled={loading}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
