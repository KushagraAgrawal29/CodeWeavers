import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RatingStars from "../../../Common/RatingStars";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from "../../../../slices/cartSlice";

const CartCourses = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      {cartItems.map((course, index) => (
        <div
          key={course._id}
          className={`flex flex-col md:flex-row items-start justify-between flex-wrap w-full gap-6
                ${
                  index !== cartItems.length - 1 &&
                  "border-b border-b-richblack-400 pb-6"
                } ${index !== 0 && "mt-6"}`}
        >
          <div
            className="flex flex-1 gap-4 lg:flex-row cursor-pointer"
            onClick={() => navigate(`/course/${course._id}`)}
          >
            <img
              src={course?.thumbnail}
              alt={course?.title}
              className=" h-[80px] md:h-[148px] w-[100px] md:w-[220px] rounded-lg object-cover"
            />
            <div className="">
              <h2 className="text-lg font-medium text-richblack-5">
                {course?.title}
              </h2>
              <p className="text-sm text-richblack-300">
                {course?.category?.name}
              </p>

              <div className="flex flex-col gap-2 mt-1">
                <div className="flex gap-2 items-center">
                  <p className="text-yellow-5">{course?.averageRating}</p>
                  <RatingStars rating={course?.averageRating} starSize={20} />
                </div>

                <div className="text-richblack-400">
                  {course?.reviews.length} Ratings
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-x-5 md:flex-col items-center md:items-end md:gap-y-2">
              <div
                onClick={() => dispatch(removeFromCart(course._id))}
                className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-3 text-pink-200"
              >
                <RiDeleteBin6Line />
                <span>Remove</span>
              </div>
              <p className="md:mb-6 text-3xl font-medium text-yellow-100">
                ₹ {course?.price}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartCourses;
