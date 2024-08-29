import React, { useState, useEffect } from "react";
import { CiChat2 } from "react-icons/ci";
import Navbar from "./components/Navbar";
import { CiSearch } from "react-icons/ci";
import NotCart from "./components/NotCart";
import Modal from "./components/Modal";
import AddForm from "./components/AddForm";
import DeletComponent from "./components/DeletComponent";
import ShowDetails from "./components/ShowDetails";

interface Palette {
  id: number;
  colorOne: string;
  colorTwo: string;
  name: string;
}

interface Note {
  id: string;
  title: string;
  details: string;
  productionDate: string;
  expirationDate: string;
  productionTime: string;
  expirationTime: string;
}

const paletteObjArrey: Palette[] = [
  {
    id: 1,
    colorOne: "#2C3E50",
    colorTwo: "#4C5B70",
    name: "navy-blue-palette",
  },
  { id: 2, colorOne: "#34495E", colorTwo: "#5D6D7E", name: "gray-palette" },
  { id: 3, colorOne: "#4E342E", colorTwo: "#6D4C41", name: "brown-palette" },
  {
    id: 4,
    colorOne: "#2E4053",
    colorTwo: "#34495E",
    name: "dark-blue-palette",
  },
];

const App: React.FC = () => {
  const [currentPalette, setCurrentPalette] = useState<Palette>(
    paletteObjArrey[0]
  );
  const [modal, setModal] = useState<boolean>(false);
  const [applicationStatus, setApplicationStatus] = useState<string>("");
  const [addId, setAddId] = useState<string>("");
  const [localData, setLocalData] = useState<Note[]>([]);

  // تابع برای بارگذاری داده‌ها از localStorage
  const loadLocalData = () => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setLocalData(JSON.parse(storedNotes));
    } else {
      setLocalData([]);
    }
  };

  useEffect(() => {
    loadLocalData();
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "notes") {
        loadLocalData();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [modal]);

  const handleAddFormSubmit = () => {
    loadLocalData();
  };

  // const deleteNote = (noteId: string) => {
  //   // داده‌های موجود در localStorage را دریافت می‌کند
  //   const storedNotes = localStorage.getItem("notes");
  //   if (storedNotes) {
  //     const notes: Note[] = JSON.parse(storedNotes);

  //     // فیلتر کردن نوت‌هایی که آیدی آنها با آیدی مورد نظر تطابق ندارد (حذف نوت با آیدی مشخص)
  //     const updatedNotes = notes.filter((note) => note.id !== noteId);

  //     // به‌روزرسانی localStorage با آرایه نوت‌های فیلتر شده
  //     localStorage.setItem("notes", JSON.stringify(updatedNotes));

  //     // به‌روزرسانی state برای نمایش نوت‌های به‌روزشده
  //     setLocalData(updatedNotes);
  //   }
  // };
  // console.log("addId", addId);
  // console.log("localData", localData);
  return (
    <div
      className="flex flex-col rtl font-iransans h-[100vh] w-full"
      style={{
        backgroundImage: `linear-gradient(${currentPalette.colorOne}, ${currentPalette.colorTwo})`,
      }}
    >
      <Navbar
        currentPalette={currentPalette}
        setCurrentPalette={setCurrentPalette}
        modal={modal}
        setModal={setModal}
        applicationStatus={applicationStatus}
        setApplicationStatus={setApplicationStatus}
      />
      <div
        className="flex flex-col gap-1 mt-20"
        style={{
          backgroundImage: `linear-gradient(${currentPalette.colorOne}, ${currentPalette.colorTwo})`,
        }}
      >
        <div className="flex w-full p-2">
          <div className="flex gap-2 mt-14 w-[90%] sm:w-[60%] md:w-[40%] mx-auto sm:mr-[5%] md:mr-[10%] items-center rounded-md p-2 bg-gray-400 text-white">
            <input
              className="outline-none border-none w-full bg-transparent placeholder:text-colors-myWhite"
              type="text"
              placeholder="سرچ کن"
            />
            <CiSearch className="text-colors-myWhite text-xl font-bold" />
          </div>
        </div>
        <div className="p-3">
          {localData.length === 0 ? (
            <div className="border rounded-lg p-3 flex justify-center border-yellow-500">
              <p className="text-center text-yellow-500  text-lg">
                هیچ نوتی نداریم، لطفاً وارد نمایید.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {localData.map((item) => (
                <NotCart
                  key={item.id}
                  title={item.title}
                  desc={item.details}
                  id={item.id}
                  productionDate={item.productionDate}
                  expirationDate={item.expirationDate}
                  productionTime={item.productionTime}
                  expirationTime={item.expirationTime}
                  applicationStatus={applicationStatus}
                  setApplicationStatus={setApplicationStatus}
                  setModal={setModal}
                  modal={modal}
                  addId={addId}
                  setAddId={setAddId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Modal
        applicationStatus={applicationStatus}
        setApplicationStatus={setApplicationStatus}
        isOpen={modal}
        onClose={() => {
          setModal(false);
          handleAddFormSubmit();
        }}
      >
        {applicationStatus === "addform" && (
          <AddForm setModal={setModal} modal={modal} />
        )}
        {applicationStatus === "deletcomponent" && (
          <DeletComponent
            addId={addId}
            localData={localData}
            setLocalData={setLocalData}
            setModal={setModal}
          />
        )}
        {applicationStatus === "showdetails" && (
          <ShowDetails
            note={localData.find((note) => note.id === addId)!}
            borderColor={currentPalette.colorOne}
            titleColor={currentPalette.colorTwo}
            detailColor={currentPalette.colorTwo}
            circleColor={currentPalette.colorOne}
            localData={localData}
            setLocalData={setLocalData} 
            setModal={setModal} 
          />
        )}
      </Modal>
    </div>
  );
};

export default App;
