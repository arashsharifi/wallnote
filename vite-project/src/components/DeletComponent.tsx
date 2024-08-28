import React, { useState } from "react";
import { Note } from "./App"; // فرض کنید Note در App.tsx تعریف شده باشد
interface DeletComponentProps {
  addId: string;
  localData: Note[];
  setLocalData: React.Dispatch<React.SetStateAction<Note[]>>;
  setModal: (open: boolean) => void;
}

const DeletComponent: React.FC<DeletComponentProps> = ({
  addId,
  localData,
  setLocalData,
  setModal
}) => {
  const handleDelete = (id: string) => {
    console.log(id);
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      const notes: Note[] = JSON.parse(storedNotes);

      const updatedNotes = notes.filter((note) => note.id !== id);

      localStorage.setItem("notes", JSON.stringify(updatedNotes));

      setLocalData(updatedNotes);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 mt-14">
      <div className="flex flex-col items-center p-4 bg-gray-100 rounded-md shadow-md">
        <p className="text-lg font-semibold mb-4">
          آیا برای پاک کردن این نوت مطمئن هستید؟
        </p>
        <div className=" w-[90%] mx-auto flex justify-evenly">
          <button
            onClick={() => {
              handleDelete(addId)
              setModal(false)
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            بله
          </button>
          <button
            onClick={() => console.log("tt")}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 ml-6"
          >
            خیر
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletComponent;
