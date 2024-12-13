import { useDispatch } from "react-redux";
import { addDesk } from "../../state/slices/gridSlice";
import DeskElement from "./Deskelement";
import { useDeskState } from "../../hooks/useDeskState";
import DeskButton from "./buttons/DeskButton";

interface GridElementProps {
    row: number;
    col: number;
    disabled?: boolean;
}

const GridElement: React.FC<GridElementProps> = ({ row, col, disabled = false }) => {
    const dispatch = useDispatch();
    const { deskState } = useDeskState(row, col);

    const handleAddDesk = () => dispatch(addDesk({ row, col }));

    return deskState?.deskState === -1 ? (
        <DeskButton
            onClick={handleAddDesk}
            disabled={disabled}
            hoverStyle="hover:bg-gray-200"
            baseStyle="bg-gray-100 text-gray-500"
        >
            <span>{disabled ? "" : "+"}</span>
        </DeskButton>
    ) : (
        <DeskElement row={row} col={col} disabled={disabled} />
    );
};

export default GridElement;
