import React, { useState } from "react";

interface DeletComponentProps {
  noteId: string;

}

const DeletComponent: React.FC<DeletComponentProps> = () => {
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const handleDelete = () => {
    console.log("yesss");
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {confirmDelete ? (
        <div className="flex flex-col items-center p-4 bg-gray-100 rounded-md shadow-md">
          <p className="text-lg font-semibold mb-4">
            آیا برای پاک کردن این نوت مطمئن هستید؟
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              بله
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
            >
              خیر
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center p-4 bg-gray-100 rounded-md shadow-md">
          <p className="text-lg font-semibold mb-4">
            آیا مطمئنید که می‌خواهید این نوت را حذف کنید؟
          </p>
          <button
            onClick={() => setConfirmDelete(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            حذف
          </button>
          <button
            className="px-4 py-2 mt-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          >
            لغو
          </button>
        </div>
      )}
    </div>
  );
};

export default DeletComponent;
