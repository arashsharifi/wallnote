import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import { RiEdit2Fill } from "react-icons/ri";
import jalaali from "jalaali-js";

interface NotCartProps {
  title: string;
  desc: string;
  modal: boolean;
  id:string;
  setModal: (open: boolean) => void;
  productionDate: string;
  applicationStatus: string;
  setApplicationStatus: React.Dispatch<React.SetStateAction<string>>;
  addId:string;
  setAddId:React.Dispatch<React.SetStateAction<string>>
}

export default function NotCart({
  title,
  desc,
  productionDate,
  modal,
  setModal,
  applicationStatus,
  setApplicationStatus,
  addId,
  setAddId,
  id
}: NotCartProps) {
  const testTime = "1403/05/20";

  // تبدیل تاریخ شمسی به میلادی
  const [year, month, day] = productionDate.split("/").map(Number);
  const gregorianDate = jalaali.toGregorian(year, month, day);

  // استخراج اطلاعات تاریخ میلادی
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

  // اصلاح استخراج قسمت‌های تاریخ
  const parts = formattedDate.split(" ");
  const dayName = parts[0]; // روز هفته
  const dayOfMonth = parts[1]; // روز ماه
  const monthName = parts[2]; // نام ماه
  const yearStr = parts[3]; // سال

  return (
    <div className="w-full bg-slate-100 rounded-md flex flex-col gap-2 justify-center p-4">
      <div className="flex p-3">
        <p className="font-bold text-xl text-black text-start truncate">
          {title}
        </p>
      </div>
      <div className="flex p-3">
        <p className="text-gray-400 text-start line-clamp-2">{desc}</p>
      </div>
      <p onClick={()=>{
            setApplicationStatus('showdetails')
            setModal(true)
            setAddId(id)
          }} className="text-gray-600 font-bold duration-200 hover:underline cursor-pointer">
        جزئیات بیشتر
      </p>
      <div className="w-full flex p-2 justify-between items-center">
        <div className="flex items-center gap-2">
          <p className="text-[14px] text-gray-500">{dayName}</p>
          <p className="text-[14px] text-gray-500">{dayOfMonth}</p>
          <p className="text-[14px] text-gray-500">{monthName}</p>
          <p className="text-[14px] text-gray-500">{yearStr}</p>
        </div>
        <div className="flex gap-2">
          <IoTrashOutline
            onClick={() => {
              setApplicationStatus("deletcomponent")
              setModal(true)
              setAddId(id)
            }}
            className="text-red-600 text-lg cursor-pointer"
          />
          <RiEdit2Fill  className="text-slate-900 text-lg cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
