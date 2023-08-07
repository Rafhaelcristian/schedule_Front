import { ReactNode } from "react";

interface ModalProps {
  toggleModal: () => void;
  children: ReactNode;
  blockClosing?: boolean;
}

export const Modal = ({ children, toggleModal, blockClosing }: ModalProps) => {
  return (
    <div>
      {children}
      <button type="button" onClick={toggleModal}>
        X
      </button>
    </div>
  );
};
