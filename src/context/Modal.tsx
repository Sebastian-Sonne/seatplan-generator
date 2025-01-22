import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import PrimaryButton from "../components/buttons/PrimaryButton";
import SecondaryButton from "../components/buttons/SecondaryButton";
import H2 from "../components/headings/H2";

interface ModalProps {
    title: string;
    component?: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, component, confirmText = "OK", cancelText, onConfirm, onCancel, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
                ref={modalRef}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-card m-4 p-6 rounded-2xl shadow-lg flex flex-col w-full lg:max-w-2xl"
            >
                <H2 value={title} className="mb-2" />
                <div className="mb-4">{component}</div>
                <div className="flex justify-end space-x-2">
                    {onCancel && <SecondaryButton onClick={onCancel}>{cancelText}</SecondaryButton>}
                    <PrimaryButton onClick={onConfirm || onClose}>{confirmText}</PrimaryButton>
                </div>
            </motion.div>
        </div>
    );
};

export default Modal;
