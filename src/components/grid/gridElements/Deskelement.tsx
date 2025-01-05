import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDeskState } from "../../../hooks/useDeskState";
import { removeDesk } from "../../../state/slices/gridSlice";
import { RootState } from "../../../state/store";

interface DeskElementProps {
    row: number;
    col: number;
    disabled?: boolean;
}
const DeskElement: React.FC<DeskElementProps> = ({ row, col, disabled = false }) => {
    const dispatch = useDispatch();
    const { student } = useDeskState(row, col);
    const [isHovered, setIsHovered] = useState(false);

    const {index, type} = useSelector((state: RootState) => state.grid.hoverState)
    const isActive = (index === row && type === "row") || (index === col && type === "col");

    const handleRemoveDesk = () => dispatch(removeDesk({ row, col }));

    return (
        <button
            onClick={handleRemoveDesk}
            disabled={disabled}
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
            className={`h-16 flex justify-center items-center rounded-md transition-all relative bg-card border-2 border-primary shadow-md 
                ${isActive && "!bg-background"}
                ${!disabled && "hover:text-text-100 hover:bg-error"}`}
        >
            <span className="font-semibold text-primary break-words overflow-hidden leading-none">
                {!disabled ? (isHovered ? "Remove" : "Desk") : student?.name || ""}
            </span>
        </button>
    );
};
export default DeskElement;