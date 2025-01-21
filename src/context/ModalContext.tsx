import React, { createContext, useContext, useState, ReactNode } from "react";
import Modal from "./Modal";

interface ModalContextType {
    showModal: (title: string, message: React.ReactNode, onConfirm?: () => void) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Custom hook to use modal
export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};

// Provider component
export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [modalMessage, setModalMessage] = useState<React.ReactNode | null>(null);
    const [modalTitle, setModalTitle] = useState<string | null>(null);
    const [onConfirm, setOnConfirm] = useState<(() => void) | undefined>();

    // Show modal function
    const showModal = (title: string, message: React.ReactNode, onConfirmCallback?: () => void) => {
        setModalMessage(message);
        setModalTitle(title)
        setOnConfirm(() => onConfirmCallback);
    };

    // Hide modal function
    const hideModal = () => {
        setModalMessage(null);
        if (onConfirm) onConfirm(); // Call callback if exists
    };

    return (
        <ModalContext.Provider value={{ showModal }}>
            {children}
            {modalMessage && modalTitle && <Modal title={modalTitle} message={modalMessage} onClose={hideModal} />}
        </ModalContext.Provider>
    );
};
