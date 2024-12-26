import { useState } from "react";
import { useDispatch } from "react-redux";
import { useDeskState } from "../../../hooks/useDeskState";
import { removeDesk } from "../../../state/slices/gridSlice";

interface DeskElementProps {
    row: number;
    col: number;
    disabled?: boolean;
}
const DeskElement: React.FC<DeskElementProps> = ({ row, col, disabled = false }) => {
    const dispatch = useDispatch();
    const { student } = useDeskState(row, col);
    const [isHovered, setIsHovered] = useState(false);

    const handleRemoveDesk = () => dispatch(removeDesk({ row, col }));

    return (
        <button
            onClick={handleRemoveDesk}
            disabled={disabled}
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
            className={`border-2 border-gray-700 h-16 flex justify-center items-center rounded 
                        bg-gray-50 text-gray-500 transition-all
                        ${disabled ? "" : "hover:text-white hover:bg-red-500"}`}
        >
            <span className="font-semibold text-gray-600">
                {!disabled ? (isHovered ? "Remove" : "Desk") : student?.name || ""}
            </span>
        </button>
    );
};

export default DeskElement;
