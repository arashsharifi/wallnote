import React from "react";
import { CiChat2 } from "react-icons/ci";
import Navbar from "./components/Navbar";
import { CiSearch } from "react-icons/ci";
import NotCart from "./components/NotCart";
export default function App() {
  return (
    <div className="flex flex-col  rtl font-iransans">
      <Navbar />
      <div className="flex w-full p-2 mt-32 ">
        <div className="flex gap-2 bg-colors-myWhite w-[40%]   items-center rounded-md mr-[10%] p-2">
          <input
            className="outline-none border-none w-full"
            type="text"
            placeholder="سرچ کن "
          />
          <CiSearch />
        </div>
      </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  p-3 gap-4 ">
        <NotCart/>
        <NotCart/>
        <NotCart/>
        <NotCart/>
        <NotCart/>
        <NotCart/>
        </div>
    </div>
  );
}
