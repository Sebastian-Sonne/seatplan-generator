import { useDispatch, useSelector } from "react-redux";
import { addDesk, removeDesk } from "../../state/slices/gridSlice";
import { RootState } from "../../state/store";
import { useState } from "react";

interface GridElementProps {
    row: number;
    col: number;
    isDisabled?: boolean;
}
const GridElement: React.FC<GridElementProps> = ({ row, col, isDisabled }) => {
    const deskState = useSelector((state: RootState) => state.grid.deskSetup[row][col]);
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch();

    const handleAddDeskClick = () => {
        dispatch(addDesk({ row: row, col: col }));
    }
    const handleRemoveDeskClick = () => {
        dispatch(removeDesk({ row: row, col: col }));
    }

    return (
        (deskState == -1 ? (
            <button
                onClick={handleAddDeskClick}
                disabled={isDisabled}
                className={`border h-16  flex justify-center items-center rounded bg-gray-100 ${isDisabled ? "" : "hover:bg-gray-200"}`}
            >
                <span className="text-gray-500">+</span>
            </button>
        ) : (
            <button
                onClick={handleRemoveDeskClick}
                disabled={isDisabled}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`border-2 border-gray-700 h-16 flex justify-center items-center rounded bg-gray-50 text-gray-500 ${isDisabled ? "" : "hover:text-white hover:bg-red-500"}  transition-all`}
            >
                <span>{isHovered ? "Remove" : "Desk"}</span>
            </button>
        ))

    )
}
export default GridElement