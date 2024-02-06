import React, { useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import UploadFile from "../UploadFile";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../Common/IconBtn";

const SubSectionModal = ({
  modalData,
  setModalData,
  addMode = false,
  editMode = false,
  viewMode = false,
}) => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const modalDiv = useRef(null);

  return (
    <div className="fixed !mt-0 inset-0 grid overflow-auto place-items-center bg-white bg-opacity-10 backdrop-blur-sm z-10">
      <div
        className="my-10 w-11/12 max-w-[700px] rounded-lg bg-richblack-800 border border-richblack-400"
        ref={modalDiv}
      >
        {/* Modal Header  */}
        <div className="flex justify-between items-center bg-richblack-700 p-5 rounded-t-lg">
          <p className="text-xl font-semibold text-richblack-5">
            {addMode && "Adding"} {editMode && "Editing"}{" "}
            {viewMode && "Viewing"} Lecture
          </p>
          <button>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>

        {/* Modal Form   */}

        <form>
          <UploadFile
            label="lecture video"
            name="lectureVideo"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            video={true}
            durationTime={"lectureDuration"}
            editData={editMode ? modalData.videoUrl : null}
            viewData={viewMode ? modalData.videoUrl : null}
          />

          <div className="flex flex-col">
            <label htmlFor="lectureTitle" className="label-style">
              Lecture Title <sup className="text-pink-200">*</sup>
            </label>

            <input
              id="lectureTitle"
              className="input-style"
              disabled={viewMode || loading}
              placeholder="Enter lecture title"
              {...register("lectureTitle", { required: true })}
            />
            {errors.lectureTitle && (
              <p className="input-error-style">Lecture title is required</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="lectureDesc" className="label-style">
              Lecture Description <sup className="text-pink-200">*</sup>
            </label>

            <textarea
              id="lectureDesc"
              placeholder="Enter lecture description"
              className="input-style"
              disabled={viewMode || loading}
              {...register("lectureDesc", { required: true })}
            />
            {errors.lectureDesc && (
              <p className="input-error-style">
                Lecture description is required
              </p>
            )}
          </div>

          {!viewMode && (
            <div className="flex justify-end">
              <IconBtn
                type="submit"
                disabled={loading}
                text={
                  loading ? "Loading..." : editMode ? "Save Changes" : "Save"
                }
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
