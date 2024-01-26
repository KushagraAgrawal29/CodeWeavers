import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModel from "../../Common/ConfirmationModel";
import { logout } from "../../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const modalData = {
    text1: "Are you sure?",
    text2: "You will be logged out of your account",
    btn1Text: "Logout",
    btn2Text: "Cancel",
    btn1Handler: () => logout(token, dispatch, navigate),
    btn2Handler: () => setIsModalOpen(false),
    closeModalHandler: () => setIsModalOpen(false),
  };

  return (
    <div className="bg-richblack-800">
      <div className="flex flex-col w-fit md:min-w-[220px] min-h-[calc(100vh-3.5rem)] border-r border-richblack-700 py-10">
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            if (link.type && link.type !== user?.accountType) return null;
            return <SidebarLink key={link.id} data={link} />;
          })}
        </div>

        <div className="mx-auto my-6 h-[1px] w-10/12 bg-richblack-700"></div>

        <div>
          <SidebarLink
            data={{
              name: "Settings",
              path: "/dashboard/settings",
              icon: "VscSettingsGear",
            }}
          />
        </div>

        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex gap-x-2 items-center text-sm font-medium px-3 md:px-8 py-2 text-richblack-300"
          >
            <VscSignOut className="text-lg" />
            <span className="hidden md:block">Logout</span>
          </button>
        </div>

        {isModalOpen && <ConfirmationModel modalData={modalData} />}
      </div>
    </div>
  );
};

export default Sidebar;
