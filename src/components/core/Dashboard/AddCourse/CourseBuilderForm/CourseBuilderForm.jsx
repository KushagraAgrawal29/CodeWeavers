import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../Common/IconBtn";
import { IoAddCircleOutline } from "react-icons/io5";
import NestedView from "./NestedView";
import { useDispatch, useSelector } from "react-redux";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/sectionSubSectionServices";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/addCourseSlice";
import toast from "react-hot-toast";

const CourseBuilderForm = () => {
  const [loading, setLoading] = useState(false);
  const [editSectionId, setEditSectionId] = useState(null);

  const { course } = useSelector((state) => state.addCourse);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCreateSection = async (data) => {
    setLoading(true);

    let result = null;

    if (editSectionId) {
      //edit section

      const formData = new FormData();

      formData.append("sectionId", editSectionId);
      formData.append("title", data.sectionName);
      formData.append("courseId", course._id);

      result = await updateSection(formData, token);
    } else {
      //create section

      const formData = new FormData();

      formData.append("title", data.sectionName);
      formData.append("courseId", course._id);
      result = await createSection(formData, token);
    }

    if (result) {
      dispatch(setCourse(result));
      setEditSectionId(null);
      setValue("sectionName", "");
    }
    setLoading(false);
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (sectionId === editSectionId) {
      handleCancelEditSection();
      return;
    }
    setEditSectionId(sectionId);
    setValue("sectionName", sectionName);
  };

  const handleCancelEditSection = () => {
    setEditSectionId(null);
    setValue("sectionName", "");
  };

  const handleGoBack = () => {
    dispatch(setEditCourse(true));
    dispatch(setStep(1));
  };

  const handleGoToNext = () => {
    if (course.sections.length === 0) {
      toast.error("Please add atleast one section");
      return;
    }

    if (course.sections.some((section) => section.subSections.length === 0)) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }

    dispatch(setStep(3));
  };

  return (
    <div className=" bg-richblack-800 rounded-md p-6 border border-richblack-700 space-y-8">
      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>

      <form className="space-y-4" onSubmit={handleSubmit(handleCreateSection)}>
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
            text={editSectionId ? "Edit Course Name" : "Course Name"}
            outline={true}
            disabled={loading}
          >
            <IoAddCircleOutline size={20} className="text-yellow-50" />
          </IconBtn>

          {editSectionId && (
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
      {course && course.sections.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      {/* Back and Next Button  */}
      <div className="flex justify-end gap-x-3">
        <button
          type="button"
          onClick={handleGoBack}
          disabled={loading}
          className={
            "flex cursor-pointer items-center gap-x-2  py-2 px-5 rounded-md bg-richblack-300 text-richblack-900 font-semibold hover:scale-95 transition-all duration-200"
          }
        >
          <MdNavigateBefore />
          Back
        </button>
        <IconBtn
          type="button"
          text="Next"
          disabled={loading}
          onClickHandler={handleGoToNext}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
