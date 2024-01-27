import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../Common/IconBtn";
import { FiUpload } from "react-icons/fi";
import { GrInProgress } from "react-icons/gr";
import { changeAvatar } from "../../../../services/operations/settingsServices";
import { useNavigate } from "react-router-dom";

const ChangeProfilePicture = () => {
  const [previewSource, setPreviewSource] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      setPreviewSource(fileReader.result);
    };
  };

  const handleFileUpload = async () => {
    const formData = new FormData();

    formData.append("file", imageFile);
    await changeAvatar(token, formData, setLoading, dispatch, navigate);
  };

  return (
    <div className="flex items-center justify-between rounded-md border border-richblack-700 bg-richblack-800 p-8 px-2 md:px-12">
      <div className="flex gap-x-4 items-center">
        <div>
          <img
            src={previewSource || user?.avatar}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[60px] md:w-[78px] rounded-full object-cover"
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-richblack-5">
            Change Profile Picture
          </h2>
          <div className="flex gap-x-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/jpeg, image/gif image/jpg image/png"
            />

            <button
              onClick={handleClick}
              disabled={loading}
              className={` bg-richblack-600 text-richblack-50 py-2 px-5 font-semibold rounded-md
            ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              Select
            </button>

            <IconBtn
              text={loading ? "Uploading...." : "Upload"}
              onClickHandler={handleFileUpload}
              disabled={loading}
            >
              {!loading ? (
                <FiUpload className="text-lg text-richblack-900" />
              ) : (
                <GrInProgress className="text-lg text-richblack-900" />
              )}
            </IconBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfilePicture;
