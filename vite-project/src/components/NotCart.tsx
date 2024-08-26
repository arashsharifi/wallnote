import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import { RiEdit2Fill } from "react-icons/ri";

// تعریف نوع Props
interface NotCartProps {
  title: string;
  desc: string;
  productionDate: string;
}

export default function NotCart({ title, desc, productionDate }: NotCartProps) {
  const date = new Date(productionDate);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    calendar: "persian" as any,
  };

  const formatter = new Intl.DateTimeFormat("fa-IR", options);
  const formattedDate = formatter.format(date);

  const parts = formattedDate.split(" ");
  const year = parts[0];
  const monthName = parts[1];
  const day = parts[2];
  const dayName = parts[3];

  return (
    <div className="w-full bg-slate-100 rounded-md flex flex-col gap-2 justify-center p-4">
      <div className="flex p-3">
        <p className="font-bold text-xl text-black text-start">{title}</p>
      </div>
      <div className="flex p-3">
        <p className="text-gray-400 text-start">{desc}</p>
      </div>
      <p className="text-gray-600 font-bold duration-200 hover:underline cursor-pointer">
        جزئیات بیشتر
      </p>
      <div className="w-full flex p-2 justify-between items-center ">
        <div className="flex items-center gap-2">
          <p className="text-[14px] text-gray-500">{dayName}</p>
          <p className="text-[14px] text-gray-500">{day}</p>
          <p className="text-[14px] text-gray-500">{monthName}</p>
          <p className="text-[14px] text-gray-500">{year}</p>
        </div>
        <div className="flex gap-2">
          <IoTrashOutline className="text-red-600 text-lg" />
          <RiEdit2Fill className="text-slate-900 text-lg" />
        </div>
      </div>
    </div>
  );
}