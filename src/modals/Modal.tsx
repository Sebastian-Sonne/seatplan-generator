import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import PrimaryButton from "../components/buttons/PrimaryButton";
import SecondaryButton from "../components/buttons/SecondaryButton";
import H1 from "../components/headings/H1";

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

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            onClose();
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
                ref={modalRef}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-card m-4 p-6 rounded-2xl shadow-lg flex flex-col w-full lg:max-w-2xl"
            >
                <H1 value={title} className="mb-4" />
                <div className="mb-4">{component}</div>
                <div className="flex justify-end space-x-2">
                    {onCancel && <SecondaryButton onClick={onCancel}>{cancelText}</SecondaryButton>}
                    <PrimaryButton onClick={onConfirm || onClose}>{confirmText}</PrimaryButton>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Modal;
