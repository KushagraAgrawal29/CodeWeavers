import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import ChipInput from "./ChipInput";
import UploadFile from "../UploadFile";
import { useDispatch, useSelector } from "react-redux";
import RequirementsField from "./RequirementsField";
import IconBtn from "../../../../Common/IconBtn";
import { MdNavigateNext } from "react-icons/md";
import toast from "react-hot-toast";
import { addCourse } from "../../../../../services/operations/courseServices";
import { useNavigate } from "react-router-dom";

const CourseInformationForm = () => {
  const {
    regitser,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { course, editCourse } = useSelector((state) => state.addCourse);

  const [loading, setLoading] = useState();
  const [courseCategories, setCourseCategoires] = useState([]);

  const token = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isFormUpdated = () => {
    const currentValues = getValues();

    if (
      !(
        currentValues.courseTitle === course.title &&
        currentValues.courseDesc === course.description &&
        currentValues.coursePrice === course.price &&
        currentValues.courseCategory === course.category._id &&
        currentValues.courseBenefits === course.whatYouWillLearn &&
        currentValues.courseTags.toString() === course.tags.toString() &&
        currentValues.courseThumbnail === course.thumbnail &&
        currentValues.courseRequirements.toString() ===
          course.instruction.toString()
      )
    ) {
      return true;
    }
    return false;
  };

  const handleCourseEdit = async (data) => {
    const formData = new FormData();

    formData.append("courseId", course._id);

    if (data.courseTitle !== course.title) {
      formData.append("title", data.courseTitle);
    }

    if (data.courseDesc !== course.description) {
      formData.append("description", data.courseDesc);
    }

    if (data.coursePrice !== course.price) {
      formData.append("price", data.coursePrice);
    }

    if (data.courseCategory !== course.category._id) {
      formData.append("catetory", data.courseCategory);
    }

    if (data.courseBenefits !== course.whatYouWillLearn) {
      formData.append("whatYouWillLearn", data.courseBenefits);
    }

    if (data.courseTags.toString() !== course.tags.toString()) {
      formData.append("tags", JSON.stringify(data.courseTags));
    }

    if (data.courseThumbnail !== course.thumbnail) {
      formData.append("thumbnail", data.courseThumbnail);
    }

    if (data.courseRequirements.toString() !== course.instructions.toString()) {
      formData.append("instructions", JSON.stringify(data.courseRequirements));
    }

    setLoading(true);

    const result = await addCourse(formData,token,dispatch,navigate);
    if(result){
      
    }
  };

  const handleFormSubmit = async (data) => {
    if (editCourse) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form");
        return;
      }

      handleCourseEdit(data);

      //course requirements

      const formData = new FormData();
      formData.append("title", data.courseTitle);
      formData.append("description", data.courseDesc);
      formData.append("price", data.coursePrice);
      formData.append("category", data.courseCategory);
      formData.append("whatYouWillLearn", data.courseBenefits);
      formData.append("tags", JSON.stringify(data.courseTags));
      formData.append("thumbnail", data.thumbnail);
      formData.append("instructions", JSON.stringify(data.courseRequirements));

      setLoading(true);
    }
  };

  return (
    <div className="border rounded-md border-richblack-700 bg-richblack-800 py-6 px-3 md:px-6">
      <form className="space-y-8" onSubmit={handleSubmit(handleFormSubmit)}>
        {/* Course Title  */}
        <div className="flex flex-col">
          <label htmlFor="courseTitle" className="label-style">
            Course Title <sup className="text-pink-200">*</sup>
          </label>
          <input
            type="text"
            id="courseTitle"
            placeholder="Enter Course Title"
            className="input-style"
            {...regitser("courseTitle", { required: true })}
          />
          {errors.courseTitle && (
            <p className="input-error-style">Course Title is required</p>
          )}
        </div>

        {/* Course Short Description  */}
        <div className="flex flex-col">
          <label htmlFor="courseDesc" className="label-style">
            Course Short Description <sup className="text-pink-200">*</sup>
          </label>
          <textarea
            id="courseDesc"
            placeholder="Enter Short Description"
            className="input-style min-h-[130px] resize-x-none"
            {...regitser("courseDesc", { required: true })}
          />
          {errors.courseDesc && (
            <p className="input-error-style">Course Description is required</p>
          )}
        </div>

        {/* Course Price  */}
        <div className="flex flex-col">
          <label htmlFor="coursePrice" className="label-style">
            Course Course Price <sup className="text-pink-200">*</sup>
          </label>
          <div className="relative">
            <input
              type="number"
              id="coursePrice"
              placeholder="Enter Course Price"
              className="input-style !pl-12"
              {...regitser("coursePrice", {
                required: true,
                valueAsNumber: true,
                pattern: {
                  value: /^(0|[1-9]\d*)(\.\d+)?$/,
                },
              })}
            />
            <HiOutlineCurrencyRupee className="absolute top-1/2 -translate-y-1/2 text-2xl text-richblack-400 left-3" />
          </div>
          {errors.coursePrice && (
            <p className="input-error-style">Course Price is required</p>
          )}
        </div>

        {/* Course Categories  */}
        <div className="flex flex-col">
          <label htmlFor="courseCategory" className="label-style">
            Course Category <sup className="text-pink-200">*</sup>
          </label>
          <select
            id="coursecategory"
            defaultValue={""}
            className="input-style"
            {...regitser("courseCategory", { required: true })}
          >
            <option value={""} disabled>
              Choose a Category
            </option>
            {!loading &&
              courseCategories?.map((category, index) => (
                <option key={index} value={category._id}>
                  {category?.name}
                </option>
              ))}
          </select>
          {errors.courseCategory && (
            <p className="input-error-style">Course Category is required</p>
          )}
        </div>

        {/* Course Tags  */}
        <div>
          <ChipInput
            label={"Tags"}
            name={"courseTags"}
            placeholder={"Enter Tags and Press Enter"}
            regitser={regitser}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
          />
        </div>

        {/* Course Thumbnail  */}
        <div>
          <UploadFile
            label={"Course Thumbnail"}
            name={"courseThumbnail"}
            regitser={regitser}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            editData={editCourse ? course?.thumbnail : null}
          />
        </div>

        {/* Benefits of Course  */}
        <div className="flex flex-col">
          <label htmlFor="courseBenefits" className="label-style">
            Benefits Of the Course <sup className="text-pink-200">*</sup>
          </label>
          <textarea
            id="courseBenefits"
            placeholder="Enter Benefits of the course"
            className="input-style min-h-[130px] resize-x-none"
            {...regitser("courseBenefits", { required: true })}
          />
          {errors.courseBenefits && (
            <p className="input-error-style">
              Benefits of the course is required
            </p>
          )}
        </div>

        {/* Course Requirements/Instructions */}
        <RequirementsField
          label={"Requirements/Instructions"}
          name={"courseRequirements"}
          placeholder={"Add course requirements/instructions"}
          regitser={regitser}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        {/* Next Buttons  */}
        <div className="flex flex-col md:flex-row gap-5 md:gap-2 md:justify-end md:items-center">
          {editCourse && (
            <div>
              <button
                type="submit"
                disabled={loading}
                className={
                  "bg-richblack-300 py-2 px-5 rounded-md font-semibold text-richblack-900 disabled:cursor-not-allowed"
                }
              >
                Continue Without Saving
              </button>
            </div>
          )}

          <IconBtn
            type={"submit"}
            text={editCourse ? "Save Changes" : "Next"}
            disabled={loading}
          >
            <MdNavigateNext />
          </IconBtn>
        </div>
      </form>
    </div>
  );
};

export default CourseInformationForm;
