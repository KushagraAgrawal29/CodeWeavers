import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../Common/IconBtn";
import { updateProfile } from "../../../../services/operations/settingsServices";

const EditProfile = () => {
  const genders = [
    "Male",
    "Female",
    "Non-Binary",
    "Prefer not to say",
    "Other",
  ];
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmitProfileForm = async (formData) => {
    await updateProfile(token, formData, setLoading, dispatch, navigate);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitProfileForm)}>
        <div className="my-5 rounded-md border border-richblack-700 bg-richblack-800 py-8 px-5 md:px-12">
          <h1 className="text-lg mb-6 font-semibold text-richblack-5">
            Profile Information
          </h1>

          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col md:flex-row gap-5">
              <label className="w-full">
                <p className="label-style">
                  First Name <sup className="text-pink-200">*</sup>
                </p>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter First Name"
                  defaultValue={user?.firstName}
                  className="input-style"
                  {...register("firstName", { required: true })}
                />
                {errors.firstName && (
                  <p className="input-error-style">
                    Please Enter Your First Name
                  </p>
                )}
              </label>

              <label className="w-full">
                <p className="label-style">
                  Last Name <sup className="text-pink-200">*</sup>
                </p>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter Last Name"
                  defaultValue={user?.lastName}
                  className="input-style"
                  {...register("lastName", { required: true })}
                />
                {errors.lastName && (
                  <p className="input-error-style">
                    Please Enter Your Last Name
                  </p>
                )}
              </label>
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              <label className="w-full">
                <p className="label-style">
                  Date Of Birth <sup className="text-pink-200">*</sup>
                </p>
                <input
                  type="date"
                  name="dob"
                  max={new Date().toISOString().split("T")[0]}
                  placeholder="Enter Date Of Birth"
                  defaultValue={user?.profile?.dob?.split("T")[0]}
                  className="input-style"
                  {...register("dob", {
                    required: {
                      value: true,
                      message: "Please Enter Your Date Of Birth",
                    },
                    max: {
                      value: new Date().toISOString().split("T")[0],
                      message: "Date Of Birth Cannot in future",
                    },
                  })}
                />
                {errors.dob && (
                  <p className="input-error-style">{errors.dob.message}</p>
                )}
              </label>

              <label className="w-full">
                <p className="label-style">
                  Gender <sup className="text-pink-200">*</sup>
                </p>
                <select
                  type="text"
                  name="gender"
                  className="input-style"
                  defaultValue={user?.profile?.gender}
                  {...register("gender", { required: true })}
                >
                  {genders.map((gender, index) => (
                    <option
                      className="text-richblack-5"
                      key={index}
                      value={gender}
                    >
                      {gender}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              <label className="w-full">
                <p className="label-style">
                  Contact Number <sup className="text-pink-200">*</sup>
                </p>
                <input
                  type="tel"
                  name="contactNumber"
                  placeholder="Please Enter Your Contact Number"
                  defaultValue={user?.profile?.contactNumber}
                  className="input-style"
                  {...register("contactNumber", {
                    required: {
                      value: true,
                      message: "Please enter your Contact Number",
                    },
                    maxLength: {
                      value: 12,
                      message: "Invalid Contact Number",
                    },
                    minLength: {
                      value: 10,
                      message: "Invalid Contact Number",
                    },
                  })}
                />
                {errors.contactNumber && (
                  <p className="input-error-style">
                    {errors.contactNumber.message}
                  </p>
                )}
              </label>

              <label className="w-full">
                <p className="label-style">
                  About <sup className="text-pink-200">*</sup>
                </p>
                <input
                  type="text"
                  name="about"
                  placeholder="Enter Bio Details"
                  defaultValue={user?.profile?.about}
                  className="input-style"
                  {...register("about", { required: true })}
                />

                {errors.about && (
                  <p className="input-error-style">
                    Please enter your Bio Details
                  </p>
                )}
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => navigate("/dashboard/my-profile")}
            className={`rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50
          ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            Cancel
          </button>
          <IconBtn
            type={"submit"}
            disabled={loading}
            text={loading ? "Saving..." : "Save"}
          />
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
