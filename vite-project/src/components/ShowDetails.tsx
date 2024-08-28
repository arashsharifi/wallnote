import React from "react";
import jalaali from "jalaali-js";
import { Note } from "./App"; // فرض کنید Note در App.tsx تعریف شده باشد
interface ShowDetailsProps {
  note: Note;
}

const ShowDetails: React.FC<ShowDetailsProps> = ({ note }) => {
  const { title, details, productionDate, expirationDate } = note;
  console.log("show");
  // تبدیل تاریخ شمسی به میلادی
  const toGregorian = (jalaliDate: string) => {
    const [year, month, day] = jalaliDate.split("/").map(Number);
    const gregorianDate = jalaali.toGregorian(year, month, day);
    return new Date(gregorianDate.gy, gregorianDate.gm - 1, gregorianDate.gd);
  };

  const formattedDate = (jalaliDate: string) => {
    const date = toGregorian(jalaliDate);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("fa-IR", options).format(date);
  };

  return (
    <div className="w-full bg-yellow-100 p-4 rounded-lg shadow-lg h-[70vh]">
      <div className="bg-white p-3 rounded-lg border-l-8 border-yellow-500 shadow-md flex flex-col gap-3 relative h-full">
        <div className=" flex w-full justify-start items-center p-3">
          <p className="text-2xl font-bold  text-yellow-700"> عنوان:</p>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-yellow-700">{title}</h2>
        <div className=" flex w-full justify-start items-center p-3">
          <p className=" font-bold  text-yellow-700"> جزئیات :</p>
        </div>
        <p
          className="text-gray-800 mb-4 max-w-md overflow-y-auto text-justify leading-relaxed indent-8 px-4 py-2 bg-white rounded-lg shadow-inner"
          style={{ maxHeight: "150px", lineHeight: "1.75", fontSize: "16px" }}
        >
          {details}
        </p>
        <div className=" flex flex-col gap-3 mt-2 mr-2  absolute bottom-3 w-[90%]">
          <span className="bg-yellow-300 text-yellow-800 text-xs font-bold rounded-full p-2 ">
            شروع: {formattedDate(productionDate)}
          </span>
          <span className="bg-yellow-300 text-yellow-800 text-xs font-bold rounded-full p-2 ">
            پایان: {formattedDate(expirationDate)}
          </span>
        </div>
        <div className="absolute top-0 left-0 mt-2 ml-2 w-8 h-8 bg-yellow-500 rounded-full shadow-md"></div>
      </div>
    </div>
  );
};

export default ShowDetails;
