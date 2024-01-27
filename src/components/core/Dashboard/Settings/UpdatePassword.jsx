import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../Common/IconBtn";
import { changePassword } from "../../../../services/operations/settingsServices";
import { useDispatch, useSelector } from "react-redux";

const UpdatePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitChangePassForm = async (formData) => {
    await changePassword(token, formData, setLoading, dispatch, navigate);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitChangePassForm)}>
        <div className="my-5 rounded-md border border-richblack-700 bg-richblack-800 p-8 px-12">
          <h1 className="text-richblack-5 font-semibold text-lg mb-6">
            Password
          </h1>

          <div className="flex flex-col lg:flex-row gap-5">
            <div className="relative flex flex-col gap-x-2 w-full">
              <label htmlFor="oldPassword" className="label-style">
                Current Passowrd <sup className="text-pink-200">*</sup>
              </label>
              <input
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter Current Password"
                type={showOldPassword ? "text" : "password"}
                className="input !pr-12"
                {...register("oldPassword", {
                  required: {
                    value: true,
                    message: "Please enter your New Pasword",
                  },
                  minLength: {
                    value: 6,
                    message: "Invalid password",
                  },
                })}
              />

              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] cursor-pointer"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>

              {errors.oldPassword && (
                <p className="input-error-style">
                  {errors.oldPassword?.message}
                </p>
              )}
            </div>

            <div className="relative flex flex-col gap-x-2 w-full">
              <label htmlFor="oldPassword" className="label-style">
                New Passowrd <sup className="text-pink-200">*</sup>
              </label>
              <input
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                type={showNewPassword ? "text" : "password"}
                className="input !pr-12"
                {...register("newPassword", {
                  required: {
                    value: true,
                    message: "Please enter your New Pasword",
                  },
                  minLength: {
                    value: 6,
                    message: "Password length must be atleast 6",
                  },
                })}
              />

              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>

              {errors.newPassword && (
                <p className="input-error-style">
                  {errors.newPassword?.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => navigate("/dashboard/my-profile")}
            className={`rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50
          ${loading ? "cursor-not-allowed" : "cursor-pointer"}
          `}
          >
            Cancel
          </button>

          <IconBtn
            type={"submit"}
            disabled={loading}
            customClasses={`${loading}`}
            text={loading ? "Updating..." : "Update"}
          />
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
