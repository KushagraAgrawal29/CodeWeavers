import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BsListUl, BsFillCameraVideoFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import SubSectionModal from "./SubSectionModal";
import ConfirmationModal from "../../../../Common/ConfirmationModel";

const NestedView = () => {
  const { course } = useSelector((state) => state.addCourse);

  const [listOfSectionOpen, setListOfSectionOpen] = useState([]);

  const [confirmationModalData, setConfirmationModalData] = useState(null);
  const [addSubSectionData, setAddSubSectionData] = useState([]);
  const [editSubSectionData, setEditSubSectionData] = useState([]);
  const [viewSubSectionData, setViewSubSectionData] = useState([]);

  return (
    <div>
      <div className="bg-richblack-700 rounded-lg py-6 px-8">
        {course &&
          course?.sections.map((section) => (
            <div key={section.id}>
              <details open>
                {/* Section Header Content  */}
                <summary className="flex justify-between items-center cursor-pointer border-b-2 border-richblack-600 py-2">
                  <div className="flex items-center gap-x-3">
                    <BsListUl className="text-2xl text-richblack-50" />
                    <p className="text-2xl text-richblack-5">{section.title}</p>
                  </div>

                  <div className="flex items-center gap-x-3">
                    <button type="button">
                      <MdEdit />
                    </button>

                    <button>
                      <RiDeleteBin6Line className="text-xl text-richblack-300" />
                    </button>
                    <span className="text-richblack-300 font-medium">|</span>

                    <div>
                      {listOfSectionOpen.includes(section._id) ? (
                        <AiFillCaretDown className="text-xl text-richblack-300" />
                      ) : (
                        <AiFillCaretRight className="text-xl text-richblack-300" />
                      )}
                    </div>
                  </div>
                </summary>

                {/* Section data - render all section data  */}

                <div className="px-6 pb-4">
                  {section.subSection.map((subSection) => (
                    <div
                      key={subSection._id}
                      className="flex justify-between items-center cursor-pointer gap-x-3 border-b-2 border-richblack-600 py-2"
                    >
                      <div className="flex items-center gap-x-3 py-2">
                        <BsFillCameraVideoFill />
                        <p className="text-richblack-50 font-semibold">
                          {subSection.title}
                        </p>
                      </div>

                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-x-3"
                      >
                        <button type="button">
                          <MdEdit />
                        </button>

                        <button>
                          <RiDeleteBin6Line />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* button to add new lecture  */}
                  <button
                    type="button"
                    className="mt-3 flex items-center gap-x-1 text-yellow-50"
                  >
                    <FaPlus />
                    <p>Add lecture</p>
                  </button>
                </div>
              </details>
            </div>
          ))}
      </div>

      {/* Display modal for add, edit and view a subSection  */}
      {addSubSectionData && (
        <SubSectionModal
          modalData={addSubSectionData}
          setModalData={setAddSubSectionData}
          addMode={true}
        />
      )}
      {editSubSectionData && (
        <SubSectionModal
          modalData={editSubSectionData}
          setModalData={setEditSubSectionData}
          editMode={true}
        />
      )}
      {viewSubSectionData && (
        <SubSectionModal
          modalData={viewSubSectionData}
          setModalData={setViewSubSectionData}
          viewMode={true}
        />
      )}

      {/* Confirmation Modal  */}
      {confirmationModalData && (
        <ConfirmationModal modalData={confirmationModalData} />
      )}
    </div>
  );
};

export default NestedView;
