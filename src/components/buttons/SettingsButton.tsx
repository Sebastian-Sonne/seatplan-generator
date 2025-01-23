import { useSettingsModal } from "../../modals/settingsModal/SettingsModal";
import { SunIcon } from "../icons/Icons";
import TertiaryButton from "./TertiaryButton";

const SettingsButton = () => {
    
    const showSettingsModal = useSettingsModal();

    return (
        <TertiaryButton onClick={showSettingsModal} className="h-10 aspect-square !p-2 !rounded-full">
            <SunIcon />
        </TertiaryButton>
    )
}
export default SettingsButton