import { useDeskState } from "../../hooks/useDeskState";
import DeskElement from "./gridElements/Deskelement";
import EmptyElement from "./gridElements/EmptyElement";

interface GridElementProps {
    row: number;
    col: number;
    disabled?: boolean;
}
const GridElement: React.FC<GridElementProps> = ({ row, col, disabled = false }) => {
    const { deskState } = useDeskState(row, col);

    return deskState.deskState === -1 ? (
        <EmptyElement row={row} col={col} disabled={disabled} />
    ) : (
        <DeskElement row={row} col={col} disabled={disabled} />
    );
};
export default GridElement;