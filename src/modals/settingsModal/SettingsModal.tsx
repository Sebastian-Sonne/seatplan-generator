import { useState } from "react";
import { useModal } from "../../context/ModalContext";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import { useDispatch } from "react-redux";

const SettingsModal = () => {
    const [settings, setSettings] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = () => {
        
    }

    const handleUpdate = (change: string) => {
        setSettings(change)
    }

    return (
            <div className="flex flex-col">

                <LanguageSwitcher />
                <ThemeSwitcher />
            </div>
    )
};

export const useSettingsModal = () => {
    const { showModal, hideModal } = useModal();

    return () => showModal({
        title: "Settings",
        component: <SettingsModal />,
        confirmText: "Save",
        cancelText: "Cancel",
        onCancel: hideModal
    });
};