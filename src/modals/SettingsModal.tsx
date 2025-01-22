import { useModal } from "../context/ModalContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ThemeSwitcher from "../components/ThemeSwitcher";

const SettingsModal = () => {
    
    return (
        <>
            <LanguageSwitcher />
            <ThemeSwitcher />
        </>
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