import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDeskState } from "../../../hooks/useDeskState";
import { removeDesk } from "../../../state/slices/gridSlice";
import { RootState } from "../../../state/store";
import { useI18n } from "../../../hooks/useI18n";

interface DeskElementProps {
    row: number;
    col: number;
    disabled?: boolean;
}
const DeskElement: React.FC<DeskElementProps> = ({ row, col, disabled = false }) => {
    const dispatch = useDispatch();
    const t = useI18n();
    const { student } = useDeskState(row, col);
    const [isHovered, setIsHovered] = useState(false);

    const { index, type } = useSelector((state: RootState) => state.grid.hoverState)
    const isActive = (index === row && type === "row") || (index === col && type === "col");

    const handleRemoveDesk = () => dispatch(removeDesk({ row, col }));

    return (
        <button
            onClick={handleRemoveDesk}
            disabled={disabled}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`h-16 flex justify-center items-center rounded-md transition-all relative text-default bg-card border-2 border-default shadow-md 
                ${isActive && "!bg-background"}
                ${!disabled && "hover:text-text hover:bg-error hover:border-error"}`}
        >
            <span className="font-semibold break-words overflow-hidden leading-tight">
                {!disabled ? (isHovered ? t("common.remove") : t("components.grid.desk")) : student?.name || ""}
            </span>
        </button>
    );
};
export default DeskElement;