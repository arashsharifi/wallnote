import React, { useState } from "react";
import { CiChat2 } from "react-icons/ci";
import Navbar from "./components/Navbar";
import { CiSearch } from "react-icons/ci";
import NotCart from "./components/NotCart";
import Modal from "./components/Modal";

interface Palette {
  id: number;
  colorOne: string;
  colorTwo: string;
  name: string;
}

const paletteObjArrey: Palette[] = [
  { id: 1, colorOne: "#2C3E50", colorTwo: "#4C5B70", name: "navy-blue-palette" }, 
  { id: 2, colorOne: "#34495E", colorTwo: "#5D6D7E", name: "gray-palette" },      
  { id: 3, colorOne: "#4E342E", colorTwo: "#6D4C41", name: "brown-palette" },      
  { id: 4, colorOne: "#2E4053", colorTwo: "#34495E", name: "dark-blue-palette" },  
];
const App: React.FC = () => {
  const [currentPalette, setCurrentPalette] = useState<Palette>(
    paletteObjArrey[0]
  );
  const [modal, setModal] = useState<boolean>(true); 

  const dummyData = [
    {
      title: "لورم ایپسوم ۱",
      desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ.",
      time: "2024-07-16",
    },
    {
      title: "لورم ایپسوم ۲",
      desc: "لورم ایپسوم از زمان‌های قدیم به عنوان متن استاندارد صنعت چاپ استفاده می‌شده است.",
      time: "2024-07-17",
    },
    {
      title: "لورم ایپسوم ۳",
      desc: "لورم ایپسوم به عنوان یک متن ساختگی در صنعت چاپ مورد استفاده قرار می‌گیرد.",
      time: "2024-07-18",
    },
    {
      title: "لورم ایپسوم ۴",
      desc: "لورم ایپسوم در چاپ و نشر به عنوان متن نمونه و بی‌معنی برای پر کردن فضا استفاده می‌شود.",
      time: "2024-07-19",
    },
    {
      title: "لورم ایپسوم ۵",
      desc: "لورم ایپسوم به عنوان یک متن ساختگی و بی‌معنی در صنعت چاپ و نشر مورد استفاده قرار می‌گیرد.",
      time: "2024-07-20",
    }
  
  ];

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
      />
      <div
        className="flex flex-col gap-1 mt-20"
        style={{
          backgroundImage: `linear-gradient(${currentPalette.colorOne}, ${currentPalette.colorTwo})`,
        }}
      >
        <div className="flex w-full p-2">
          <div className="flex gap-2 mt-14  w-[90%] sm:w-[60%] md:w-[40%] mx-auto sm:mr-[5%] md:mr-[10%] items-center rounded-md p-2 bg-gray-400 text-white ">
            <input
              className="outline-none border-none w-full bg-transparent placeholder:text-colors-myWhite"
              type="text"
              placeholder="سرچ کن"
            />
            <CiSearch className="text-colors-myWhite text-xl font-bold" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-3 gap-4">
        {dummyData.map((item, index) => (
            <NotCart key={index} title={item.title} desc={item.desc} time={item.time} />
          ))}
        </div>
      </div>
      <Modal isOpen={modal} onClose={() => setModal(false)}>
        <p className="text-lg">این یک مودال است!</p>
      </Modal>
    </div>
  );
};

export default App;
