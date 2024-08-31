import React, { useState } from "react";
import jalaali from "jalaali-js";
import { Note } from "./App"; // Assume Note is defined in App.tsx
import { FaRegSave } from "react-icons/fa";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";

import "react-datepicker/dist/react-datepicker.css";
interface ShowDetailsProps {
  note: Note;
  borderColor: string;
  titleColor: string;
  detailColor: string;
  circleColor: string;
  localData: Note[];
  setLocalData: React.Dispatch<React.SetStateAction<Note[]>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowDetails: React.FC<ShowDetailsProps> = ({
  note,
  borderColor,
  titleColor,
  detailColor,
  circleColor,
  localData,
  setLocalData,
  setModal,
}) => {
  const { title, details, productionDate, expirationDate, productionTime, expirationTime, id } = note;

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [editedDetails, setEditedDetails] = useState(details);

  const handleTitleDoubleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };

  const handleDetailsClick = () => {
    setIsEditingDetails(true);
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedDetails(e.target.value);
  };

  const handleDetailsBlur = () => {
    setIsEditingDetails(false);
  };

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

  const formattedTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes);
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat("fa-IR", options).format(date);
  };

  const isExpired = (expirationDate: string, expirationTime: string) => {
    const now = new Date();
    const expirationDateTime = toDateTime(expirationDate, expirationTime);
    return now > expirationDateTime;
  };

  const saveChanges = (id: string) => {
    const updatedData = localData.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          title: editedTitle,
          details: editedDetails,
        };
      } else {
        return item;
      }
    });

    setLocalData(updatedData);
    localStorage.setItem('notes', JSON.stringify(updatedData));
    setModal(false);
  };

  const statusBackgroundColor = isExpired(expirationDate, expirationTime) ? '#F70000' : titleColor;

  return (
    <div className="flex w-full h-full flex-col p-1 ">
      <div className="w-full flex justify-between items-center p-2 mb-2">
        {/* <div
          style={{ backgroundColor: titleColor }}
          className="flex justify-center items-center rounded-md w-8 h-6 duration-200 hover:scale-110 cursor-pointer"
        >
          <RxDoubleArrowRight className="text-colors-myWhite" />
        </div> */}
        <div
          style={{ backgroundColor: titleColor }}
          className="bg-gray-600 flex justify-center items-center rounded-md w-12 h-8 duration-200 hover:scale-110 cursor-pointer"
          onClick={() => saveChanges(id)}
        >
          <FaRegSave className="text-colors-myWhite" />
        </div>
        {/* <div
          style={{ backgroundColor: titleColor }}
          className="bg-gray-600 flex justify-center items-center rounded-md w-8 h-6 duration-200 hover:scale-110 cursor-pointer"
        >
          <RxDoubleArrowLeft className="text-colors-myWhite" />
        </div> */}
      </div>
      <div
        style={{ backgroundColor: titleColor }}
        className="w-full p-4 rounded-lg shadow-lg h-[70vh] sm:h-[70vh]  lg:h-[80vh] 2xl:h-[50vh]"
      >
        <div
          className="bg-white p-3 rounded-lg border-l-8 shadow-md flex flex-col gap-3 relative h-full"
          style={{ borderColor: borderColor }}
        >
          <div className="flex w-full justify-start items-center p-3">
            <p
              className="text-2xl font-bold"
              style={{ color: titleColor }}
            >
              عنوان:
            </p>
          </div>
          {isEditingTitle ? (
            <input
              type="text"
              value={editedTitle}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              className="text-2xl font-bold mb-2 p-1 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              style={{ color: titleColor }}
              autoFocus
            />
          ) : (
            <h2
              className="text-2xl font-bold mb-2 cursor-pointer"
              style={{ color: titleColor }}
              onDoubleClick={handleTitleDoubleClick}
            >
              {editedTitle}
            </h2>
          )}
          <div className="flex w-full justify-start items-center p-3">
            <p
              className="font-bold"
              style={{ color: detailColor }}
            >
              جزئیات:
            </p>
          </div>
          {isEditingDetails ? (
            <textarea
              value={editedDetails}
              onChange={handleDetailsChange}
              onBlur={handleDetailsBlur}
              className="text-gray-800 mb-4 max-w-md overflow-y-auto text-justify leading-relaxed indent-8 px-4 py-2 bg-white rounded-lg shadow-inner outline-none border-b-2 border-gray-300 focus:border-blue-500"
              style={{
                maxHeight: "150px",
                lineHeight: "1.75",
                fontSize: "16px",
              }}
              autoFocus
            />
          ) : (
            <p
              className="text-gray-800 mb-4 max-w-md overflow-y-auto text-justify leading-relaxed indent-8 px-4 py-2 bg-white rounded-lg shadow-inner cursor-pointer"
              style={{
                maxHeight: "150px",
                lineHeight: "1.75",
                fontSize: "16px",
              }}
              onClick={handleDetailsClick}
            >
              {editedDetails}
            </p>
          )}
          <div className="flex flex-col gap-3 mt-2 mr-2 absolute bottom-3 w-[90%]">
            <span
              style={{ backgroundColor: statusBackgroundColor }}
              className="text-colors-myWhite text-md font-bold rounded-full p-4"
            >
              {isExpired(expirationDate, expirationTime) ? 'منقضی' : `پایان: ${formattedDate(expirationDate)} ساعت: ${formattedTime(expirationTime)}`}
            </span>
            <span
              style={{ backgroundColor: titleColor }}
              className="text-colors-myWhite text-md font-bold rounded-full p-4"
            >
              شروع: {formattedDate(productionDate)} ساعت: {formattedTime(productionTime)}
            </span>
          </div>
          <div
            className="absolute top-0 left-0 mt-2 ml-2 w-8 h-8 rounded-full shadow-md"
            style={{ backgroundColor: circleColor }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
