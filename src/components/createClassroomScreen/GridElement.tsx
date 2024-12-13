import { useDispatch } from "react-redux";
import { addDesk } from "../../state/slices/gridSlice";
import DeskElement from "./Deskelement";
import { useDeskState } from "../../hooks/useDeskState";
import DeskButton from "./buttons/Deskbutton";

interface GridElementProps {
    row: number;
    col: number;
    editable?: boolean;
}

const GridElement: React.FC<GridElementProps> = ({ row, col, editable = false }) => {
    const dispatch = useDispatch();
    const { deskState } = useDeskState(row, col);

    const handleAddDesk = () => dispatch(addDesk({ row, col }));

    return deskState?.deskState === -1 ? (
        <DeskButton
            onClick={handleAddDesk}
            disabled={editable}
            hoverStyle="hover:bg-gray-200"
            baseStyle="bg-gray-100 text-gray-500"
        >
            <span>+</span>
        </DeskButton>
    ) : (
        <DeskElement row={row} col={col} editable={editable} />
    );
};

export default GridElement;
