import React from "react";
import { RxCross2 } from "react-icons/rx";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  applicationStatus: string;
  setApplicationStatus: React.Dispatch<React.SetStateAction<string>>;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children,applicationStatus,setApplicationStatus }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`bg-white rounded-lg shadow-lg p-4 w-full max-w-md mx-auto relative ${
          applicationStatus === "deletcomponent" ? "h-[300px]" : "h-[600px]"
        }`}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <RxCross2 className="text-2xl text-black" />
        </button>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
