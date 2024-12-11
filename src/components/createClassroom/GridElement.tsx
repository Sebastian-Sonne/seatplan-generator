import { useDispatch, useSelector } from "react-redux";
import { addDesk, removeDesk } from "../../state/slices/gridSlice";
import { RootState } from "../../state/store";

interface GridElementProps {
    row: number;
    col: number;
}
const GridElement: React.FC<GridElementProps> = ({ row, col }) => {
    const deskState = useSelector((state: RootState) => state.grid.deskSetup[row][col])
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
                className="border h-16  flex justify-center items-center rounded bg-gray-100 hover:bg-gray-200"
            >
                <span className="text-gray-500">+</span>
            </button>
        ) : (
            <button
                onClick={handleRemoveDeskClick}
                className="border-2 border-gray-700 h-16  flex justify-center items-center rounded bg-gray-50 hover:bg-gray-100"
            >
                <span className="text-gray-500">Desk</span>
            </button>
        ))

    )
}
export default GridElement