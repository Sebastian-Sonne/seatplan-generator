import { useSettingsModal } from "../../modals/settingsModal/SettingsModal";
import { SettingsIcon} from "../icons/Icons";
import TertiaryButton from "./TertiaryButton";

const SettingsButton = () => {
    
    const showSettingsModal = useSettingsModal();

    return (
        <TertiaryButton onClick={showSettingsModal} className="h-10 aspect-square !p-1.5 !rounded-full">
            <SettingsIcon />
        </TertiaryButton>
    )
}
export default SettingsButton