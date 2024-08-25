import React from "react";
import { FaCircleHalfStroke } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
export default function Navbar() {
  return (
    <div className="flex min-w-full justify-between items-center p-3 bg-indigo-900 shadow-custom shadow-black fixed">
      <div className="flex p-2 items-center">
        <div className="flex gap-4 p-2">
          <div className="bg-blue-300 rounded-full p-3 flex items-center justify-center cursor-pointer duration-200  hover:shadow-xl hover:shadow-black">
            <FaPlus className="text-colors-myWhite" />
          </div>
          <div className="bg-blue-300 rounded-full p-3 flex items-center justify-center cursor-pointer duration-200  hover:shadow-xl hover:shadow-black">
            <FaCircleHalfStroke className="text-colors-myWhite" />
          </div>
        </div>
      </div>
      <p className="font-bold italic text-colors-myWhite text-2xl ml-8">
        نکته‌نامه
      </p>
    </div>
  );
}
