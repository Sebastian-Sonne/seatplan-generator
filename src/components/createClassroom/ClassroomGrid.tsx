import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import GridElement from "./GridElement";

const ClassroomGrid = () => {
    const deskSetup = useSelector((state: RootState) => state.grid.deskSetup);

    return (
        <div className="grid  gap-2"
            style={{ gridTemplateColumns: `repeat(${deskSetup[0]?.length || 1}, minmax(0, 1fr))` }}>
            {deskSetup.map((deskRow, rowIndex) =>
                deskRow.map((_, colIndex) => (
                    <GridElement row={rowIndex} col={colIndex} />
                ))
            )}
        </div>
    )
}
export default ClassroomGrid