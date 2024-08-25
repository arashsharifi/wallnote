import React, { useState } from "react";
import { FaCircleHalfStroke } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

interface Palette {
  id: number;
  colorOne: string;
  colorTwo: string;
  name: string;
}

interface NavbarProps {
  currentPalette: Palette;
  setCurrentPalette: (palette: Palette) => void;
}

const paletteObjArrey: Palette[] = [
    { id: 1, colorOne: "#2C3E50", colorTwo: "#4C5B70", name: "navy-blue-palette" }, 
    { id: 2, colorOne: "#34495E", colorTwo: "#5D6D7E", name: "gray-palette" },      
    { id: 3, colorOne: "#4E342E", colorTwo: "#6D4C41", name: "brown-palette" },      
    { id: 4, colorOne: "#2E4053", colorTwo: "#34495E", name: "dark-blue-palette" },  
  ];

const Navbar: React.FC<NavbarProps> = ({
  currentPalette,
  setCurrentPalette,
}) => {
  const [onPalette, setOnPalette] = useState<boolean>(false);

  const handlePalette = (item: Palette) => {
    setCurrentPalette(item);
    setOnPalette(false);
  };

  return (
    <div
      style={{ backgroundColor: `${currentPalette.colorOne}` }}
      className="flex min-w-full justify-between items-center p-3 shadow-custom shadow-black fixed"
    >
      <div className="flex gap-3 p-2 w-[70%] items-center">
        <div
          className="bg-blue-300 w-12 h-12 rounded-full p-3 flex items-center justify-center cursor-pointer duration-200 hover:shadow-xl hover:shadow-black"
          onClick={() => console.log("sdfsd")}
        >
          <FaPlus className="text-colors-myWhite" />
        </div>
        <div
          className="bg-blue-300 w-12 h-12 rounded-full p-3 flex items-center justify-center cursor-pointer duration-200 hover:shadow-xl hover:shadow-black"
          onClick={() => setOnPalette((prevState) => !prevState)}
        >
          <FaCircleHalfStroke className="text-colors-myWhite" />
        </div>

        <div
          className={`flex p-3 gap-2 rounded-full bg-gray-300 transition-opacity duration-500 ${
            onPalette ? "opacity-100 z-10" : "opacity-0 z-[-1]"
          }`}
        >
          {paletteObjArrey.map((item) => (
            <p
              key={item.id}
              style={{ backgroundColor: item.colorOne }}
              className="w-6 h-6 rounded-full duration-200 scale-90 hover:scale-100 cursor-pointer"
              onClick={() => handlePalette(item)}
            ></p>
          ))}
        </div>
      </div>
      <p className="font-bold italic text-colors-myWhite text-2xl ml-8">
        نکته‌نامه
      </p>
    </div>
  );
};

export default Navbar;
