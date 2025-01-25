import { useModal } from "../../context/ModalContext";
import LanguageSettings from "./LanguageSettings";
import ThemeSettings from "./ThemeSettings";

const SettingsModal = () => {

    return (
        <div className="flex flex-col pl-1">

            <ThemeSettings />

            <LanguageSettings />
        </div>
    )
};

export const useSettingsModal = () => {
    const { showModal, hideModal } = useModal();

    return () => showModal({
        title: "Settings",
        component: <SettingsModal />,
        confirmText: "Done",
        cancelText: "Escape",
        onCancel: hideModal
    });
};