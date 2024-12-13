import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeDesk } from "../../state/slices/gridSlice";
import { useDeskState } from "../../hooks/useDeskState";

interface DeskElementProps {
    row: number;
    col: number;
    editable?: boolean;
}

const DeskElement: React.FC<DeskElementProps> = ({ row, col, editable = false }) => {
    const dispatch = useDispatch();
    const { student } = useDeskState(row, col);
    const [isHovered, setIsHovered] = useState(false);

    const handleRemoveDesk = () => dispatch(removeDesk({ row, col }));

    return (
        <button
            onClick={handleRemoveDesk}
            disabled={editable}
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
            className={`border-2 border-gray-700 h-16 flex justify-center items-center rounded 
                        bg-gray-50 text-gray-500 transition-all
                        ${editable ? "" : "hover:text-white hover:bg-red-500"}`}
        >
            {/* Dynamic button text based on isHovered */}
            <span>
                {editable ? (isHovered ? "Remove" : "Desk") : student?.name || ""}
            </span>
        </button>
    );
};

export default DeskElement;
