import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import ConfirmationModel from "../../../Common/ConfirmationModel";
import { deleteCurrentUser } from "../../../../services/operations/settingsServices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const modalData = {
    text1: "Are you Sure?",
    text2: "Your Account will be deleted permanantly",
    btn1Text: "Delete",
    btn2Text: "Cancel",
    btn1Handler: () => deleteCurrentUser(token, dispatch, navigate),
    btn2Handler: () => setIsModalOpen(false),
    closeModalHandler: () => setIsModalOpen(false),
  };
  return (
    <div className=" mt-7 rounded-md border border-pink-700 bg-pink-900 p-8 px-5 md:px-12">
      <div className="flex gap-x-5">
        <div className="grid place-items-center aspect-square h-14 w-14  rounded-full bg-pink-700">
          <FiTrash2 className="text-3xl text-pink-200" />
        </div>

        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-richblack-5">
            Delete Account
          </h2>
          <div className="md:w-3/5 text-pink-200 space-y-1">
            <p>Would you like to delete your Account?</p>
            <p className="tracking-wider">
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the contained data associated with
              it.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="md:hidden tracking-wider w-fit cursor-pointer italic bg-pink-700 py-1 px-3 rounded-md text-pink-200"
          >
            I want to delete my account
          </button>
        </div>

        {isModalOpen && <ConfirmationModel modalData={modalData} />}
      </div>
    </div>
  );
};

export default DeleteAccount;
