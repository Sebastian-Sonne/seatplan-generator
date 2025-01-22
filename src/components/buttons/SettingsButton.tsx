import { SunIcon } from "../icons/Icons";
import TertiaryButton from "./TertiaryButton";
import { useSettingsModal } from "../../modals/SettingsModal";

const SettingsButton = () => {
    
    const showSettingsModal = useSettingsModal();

    return (
        <TertiaryButton onClick={showSettingsModal} className="h-10 aspect-square !p-2 !rounded-full">
            <SunIcon />
        </TertiaryButton>
    )
}
export default SettingsButton