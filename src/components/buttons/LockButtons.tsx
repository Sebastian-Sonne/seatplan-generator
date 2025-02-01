import { Info, LockIcon, LockOpenIcon } from "lucide-react"
import SecondaryButton from "./SecondaryButton"
import { useDispatch } from "react-redux";
import { setAllIsLocked } from "../../state/slices/gridSlice";
import Tooltip from "./ToolTip";
import { useI18n } from "../../hooks/useI18n";

export const LockAllButton = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setAllIsLocked(true));
    }
    return (
        <SecondaryButton onClick={handleClick}>
            <LockIcon size={16} strokeWidth={3} color="currentcolor" />
        </SecondaryButton>
    )
}

export const UnlockAllButton = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setAllIsLocked(false));
    }
    return (
        <SecondaryButton onClick={handleClick}>
            <LockOpenIcon size={16} strokeWidth={3} color="currentcolor" />
        </SecondaryButton>

    )
}

export const LockInfoButton = () => {
    const t = useI18n();
    return (
        <Tooltip text={t("screens.assign.lockedInfoText")}>
            <div className="flex justify-center items-center h-full text-text-muted-extra font-semibold">
                <Info size={24} strokeWidth={2} color="currentcolor" />
            </div>
        </Tooltip>
    )
}