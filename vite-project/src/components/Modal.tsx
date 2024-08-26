import React from "react";
import { RxCross2 } from "react-icons/rx";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-1 w-full max-w-md h-[600px] mx-auto relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 bg-red-500"
          onClick={onClose}
        >
        <RxCross2 className="text-2xl text-black"/>
        </button>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
