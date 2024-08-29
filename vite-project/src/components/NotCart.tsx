import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import { RiEdit2Fill } from "react-icons/ri";
import jalaali from "jalaali-js";

interface NotCartProps {
  title: string;
  desc: string;
  modal: boolean;
  id: string;
  setModal: (open: boolean) => void;
  productionDate: string;
  expirationDate: string;
  expirationTime: string;
  productionTime: string;
  applicationStatus: string;
  setApplicationStatus: React.Dispatch<React.SetStateAction<string>>;
  addId: string;
  setAddId: React.Dispatch<React.SetStateAction<string>>;
}

const NotCart: React.FC<NotCartProps> = ({
  title,
  desc,
  productionDate,
  expirationDate,
  modal,
  setModal,
  applicationStatus,
  setApplicationStatus,
  addId,
  setAddId,
  expirationTime,
  productionTime,
  id,
}) => {
  const toGregorian = (jalaliDate: string) => {
    const [year, month, day] = jalaliDate.split("/").map(Number);
    const gregorianDate = jalaali.toGregorian(year, month, day);
    return new Date(gregorianDate.gy, gregorianDate.gm - 1, gregorianDate.gd);
  };

  const toDateTime = (jalaliDate: string, time: string) => {
    const date = toGregorian(jalaliDate);
    const [hours, minutes] = time.split(":").map(Number);
    date.setHours(hours, minutes);
    return date;
  };

  const isExpired = (expirationDate: string, expirationTime: string) => {
    const now = new Date();
    const expirationDateTime = toDateTime(expirationDate, expirationTime);
    return now > expirationDateTime;
  };

  const [year, month, day] = productionDate.split("/").map(Number);
  const gregorianDate = jalaali.toGregorian(year, month, day);
  const date = new Date(
    gregorianDate.gy,
    gregorianDate.gm - 1,
    gregorianDate.gd
  );

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("fa-IR", options);
  const formattedDate = formatter.format(date);

  const [year2, month2, day2] = expirationDate.split("/").map(Number);
  const gregorianDate2 = jalaali.toGregorian(year2, month2, day2);
  const date2 = new Date(
    gregorianDate2.gy,
    gregorianDate2.gm - 1,
    gregorianDate2.gd
  );
  const formatter2 = new Intl.DateTimeFormat("fa-IR", options);
  const formattedDate2 = formatter2.format(date2);

  const parts = formattedDate.split(" ");
  const dayName = parts[0]; // روز هفته
  const dayOfMonth = parts[1]; // روز ماه
  const monthName = parts[2]; // نام ماه
  const yearStr = parts[3]; // سال

  const parts2 = formattedDate2.split(" ");
  const dayName2 = parts2[0]; // روز هفته
  const dayOfMonth2 = parts2[1]; // روز ماه
  const monthName2 = parts2[2]; // نام ماه
  const yearStr2 = parts2[3]; // سال

  const expired = isExpired(expirationDate, expirationTime);

  return (
    <div
      className={`w-full rounded-md flex flex-col gap-2 justify-center p-4 ${
        expired
          ? "border-3 border-red-600 bg-red-100"
          : "bg-slate-100 border-3 border-transparent"
      }`}
    >
      <div className="flex p-3">
        <p className="font-bold text-xl text-black text-start truncate">
          {title}
        </p>
      </div>
      <div className="flex p-3">
        <p className="text-gray-400 text-start line-clamp-2">{desc}</p>
      </div>
      <p
        onClick={() => {
          setApplicationStatus("showdetails");
          setModal(true);
          setAddId(id);
        }}
        className="text-gray-600 font-bold duration-200 hover:underline cursor-pointer"
      >
        جزئیات بیشتر
      </p>
      <div className="w-full flex flex-col gap-2 p-2 justify-between items-center">
        <div className="flex items-center gap-2 self-start">
          <p className="text-[14px] text-gray-500">شروع:</p>
          <p className="text-[14px] text-gray-500">{dayName}</p>
          <p className="text-[14px] text-gray-500">{dayOfMonth}</p>
          <p className="text-[14px] text-gray-500">{monthName}</p>
          <p className="text-[14px] text-gray-500">{yearStr}</p>
        </div>
        <div className="flex items-center gap-2 self-start">
          <p className="text-[14px] text-gray-500">انقضا:</p>
          <p className="text-[14px] text-gray-500 ">
            {expired ? (
              <p className="underline text-red-600">منقضی</p>
            ) : (
              `${dayName2} ${dayOfMonth2} ${monthName2} ${yearStr2}`
            )}
          </p>
        </div>
        <div
          onClick={() => {
            setApplicationStatus("deletcomponent");
            setModal(true);
            setAddId(id);
          }}
          className="flex gap-2 self-end bg-red-600 rounded-md hover:shadow-black w-14 h-8 items-center justify-center cursor-pointer"
        >
          <IoTrashOutline className="text-colors-myWhite text-lg " />
        </div>
      </div>
    </div>
  );
};

export default NotCart;
