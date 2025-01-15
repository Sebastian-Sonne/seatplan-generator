import { useSelector } from "react-redux";
import DeskElement from "./gridElements/Deskelement";
import EmptyElement, { DisabledEmptyElement } from "./gridElements/EmptyElement";
import StudentDeskelement from "./gridElements/StudentDeskelement";
import { RootState } from "../../state/store";

interface GridElementProps {
    row: number;
    col: number;
    disabled?: boolean;
}
const GridElement: React.FC<GridElementProps> = ({ row, col, disabled = false }) => {
    const deskState = useSelector((state: RootState) => state.grid.deskSetup[row][col]);
    
    return disabled ? (
        <>
            {deskState.deskState === -1 ? (
                <DisabledEmptyElement row={row} col={col} />
            ) : (
                <StudentDeskelement row={row} col={col} />
            )}
        </>
    ) : (
        <>
            {deskState.deskState === -1 ? (
                <EmptyElement row={row} col={col} />
            ) : (
                <DeskElement row={row} col={col} disabled={disabled} />
            )}
        </>
    )
};
export default GridElement;