import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";

const UploadFile = ({
  label,
  name,
  errors,
  video = false,
  editData = null,
  viewData = null,
}) => {
  const [previewSource, setPreviewSource] = useState(
    editData || viewData || null
  );
  const videoRef = useRef(null);

  const { isDragActive, getInputProps, getRootProps } = useDropzone({});

  return (
    <div className="flex flex-col">
      <label className="label-style" htmlFor="requirement">
        {label} <sup className="text-pink-200">*</sup>
      </label>

      <div
        className={`flex justify-center items-center cursor-pointer rounded-md min-h-[250px] border-2 border-dotted border-richblack-500
        ${isDragActive ? "bg-richblack-600" : "bg-richblack-700"}`}
      >
        {previewSource ? (
          <div className="flex flex-col p-6">
            {video ? (
              <video ref={videoRef} src={previewSource}></video>
            ) : (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-course"
              />
            )}

            {!viewData && (
              <button
                type="button"
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div {...getRootProps()}>
            <input {...getInputProps()} />

            <div>
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>

            <p>
              Drag and drop a {video ? "video" : "image"} , or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> file
            </p>

            <ul className="mt-10 flex justify-between gap-x-12 text-center text-xs text-richblack-200 list-disc">
              <li>Aspect ratio 16.9</li>
              <li>Recommeded size 1024x576</li>
            </ul>
          </div>
        )}
      </div>

      {errors.message && (
        <p className="input-error-style">{label} is required</p>
      )}
    </div>
  );
};

export default UploadFile;
