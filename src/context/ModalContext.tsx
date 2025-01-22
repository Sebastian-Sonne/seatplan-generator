import React, { createContext, useContext, useState, ReactNode } from "react";
import Modal from "./Modal";

interface ModalOptions {
    title: string;
    component?: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}

interface ModalContextType {
    showModal: (options: ModalOptions) => void;
    hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [modalOptions, setModalOptions] = useState<ModalOptions | null>(null);

    const showModal = (options: ModalOptions) => setModalOptions(options);
    const hideModal = () => setModalOptions(null);

    return (
        <ModalContext.Provider value={{ showModal, hideModal }}>
            {children}
            {modalOptions && <Modal {...modalOptions} onClose={hideModal} />}
        </ModalContext.Provider>
    );
};