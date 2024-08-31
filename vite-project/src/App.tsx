import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import Navbar from "./components/Navbar";
import NotCart from "./components/NotCart";
import Modal from "./components/Modal";
// import AddForm from "./components/AddForm";
import DeletComponent from "./components/DeletComponent";
import ShowDetails from "./components/ShowDetails";
import {
  DragDropContext,
  Draggable,
  DroppableProvided,
  DropResult,
} from "react-beautiful-dnd";
import StrictModeDroppable from "./components/StrictModeDroppable";
import AddFormV2 from "./components/AddFormV2";



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

const paletteObjArray: Palette[] = [
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
    paletteObjArray[0]
  );
  const [modal, setModal] = useState<boolean>(false);
  const [applicationStatus, setApplicationStatus] = useState<string>("");
  const [addId, setAddId] = useState<string>("");
  const [localData, setLocalData] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  const reorder = (array: Note[], fromIndex: number, toIndex: number): Note[] => {
    const newArr = [...array];
    const [movedItem] = newArr.splice(fromIndex, 1);
    newArr.splice(toIndex, 0, movedItem);
    return newArr;
  };

  const move = (
    source: { index: number; droppableId: string },
    destination: { index: number; droppableId: string },
    items: Note[]
  ): Note[] => {
    const itemsClone = [...items];
    const [removedItem] = itemsClone.splice(source.index, 1);
    itemsClone.splice(destination.index, 0, removedItem);
    return itemsClone;
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const reorderedItems = reorder(
        localData,
        source.index,
        destination.index
      );
      setLocalData(reorderedItems);
    } else {
      const movedItems = move(source, destination, localData);
      setLocalData(movedItems);
    }
  };


  const filteredData = localData.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="flex flex-col rtl font-iransans min-h-[100vh]  w-full"
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
        className="flex flex-col gap-1 mt-20 w-full h-full"
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CiSearch className="text-colors-myWhite text-xl font-bold" />
          </div>
        </div>
        <div className="p-3 w-full h-full">
          {filteredData.length === 0 ? (
            <div className="border rounded-lg p-3 flex justify-center border-yellow-500">
              <p className="text-center text-yellow-500 text-lg">
                هیچ نوتی نداریم، لطفاً وارد نمایید.
              </p>
            </div>
          ) : (
            <div className="w-full h-full  mx-auto ">
              <DragDropContext onDragEnd={onDragEnd}>
                <StrictModeDroppable droppableId="fields" type="FIELD">
                  {(provided: DroppableProvided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                    >
                      {filteredData.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided: DraggableProvided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <NotCart
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
                                provided={provided}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </StrictModeDroppable>
              </DragDropContext>
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
          setAddId("");
        }}
      >
        {applicationStatus === "addform" && (
          // <AddForm setModal={setModal} modal={modal} addId={addId} />
          <AddFormV2 setModal={setModal} modal={modal} addId={addId}/>
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
