import React from "react";
import { motion } from "framer-motion";
import PrimaryButton from "../components/buttons/PrimaryButton";
import H2 from "../components/headings/H2";

interface ModalProps {
    title: string;
    message: React.ReactNode;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, message, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-element m-4 p-4 rounded-2xl shadow-lg flex flex-col w-full lg:max-w-2xl"
            >
                <H2 value={title} className="mb-0" />

                <p className="text-base text-text-muted font-medium mb-4">{message}</p>

                <PrimaryButton onClick={onClose}>
                    Continue
                </PrimaryButton>
            </motion.div>
        </div>
    );
};

export default Modal;
