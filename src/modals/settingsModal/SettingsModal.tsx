import { useModal } from "../../context/ModalContext";
import ThemeSettings from "./ThemeSettings";

const SettingsModal = () => {
    
    return (
        <div className="flex flex-col pl-1">

            <ThemeSettings />

            {/** //! Language Settings */}
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