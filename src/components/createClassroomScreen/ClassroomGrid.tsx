import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import GridElement from "./GridElement";

interface ClassroomGridProps {
    editable?: boolean;
}

const ClassroomGrid: React.FC<ClassroomGridProps> = ({ editable = false }) => {
    const deskSetup = useSelector((state: RootState) => state.grid.deskSetup);

    return (
        <div
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${deskSetup[0]?.length || 1}, minmax(0, 1fr))` }}
        >
            {deskSetup.map((row, rowIndex) =>
                row.map((_, colIndex) => (
                    <GridElement key={`${rowIndex}-${colIndex}`} row={rowIndex} col={colIndex} editable={editable} />
                ))
            )}
        </div>
    );
};

export default ClassroomGrid;
