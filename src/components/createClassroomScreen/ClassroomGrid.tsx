import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import GridElement from "./GridElement";

interface ClassroomGridProps {
    isDisabled?: boolean
}

const ClassroomGrid: React.FC<ClassroomGridProps> = ({ isDisabled }) => {
    const deskSetup = useSelector((state: RootState) => state.grid.deskSetup);

    return (
        <div className="grid  gap-2"
            style={{ gridTemplateColumns: `repeat(${deskSetup[0]?.length || 1}, minmax(0, 1fr))` }}>
            {deskSetup.map((deskRow, rowIndex) =>
                deskRow.map((_, colIndex) => (
                    <GridElement row={rowIndex} col={colIndex} isDisabled={isDisabled} />
                ))
            )}
        </div>
    )
}
export default ClassroomGrid