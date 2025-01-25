import { useModal } from "../../context/ModalContext";
import { useI18n } from "../../hooks/useI18n";
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
    const t = useI18n();

    return () => showModal({
        title: t("modals.settings.heading"),
        component: <SettingsModal />,
        confirmText: t("common.done"),
        cancelText: t("common.escape"),
        onCancel: hideModal
    });
};