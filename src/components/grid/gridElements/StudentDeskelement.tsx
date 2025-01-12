import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import { useDrop } from "react-dnd";
import { selectStudentById } from "../../../state/slices/studentSlice";
import { swapStudents } from "../../../state/thunks/swapStudents.thunk";
import { useEffect } from "react";
import { DndState, setIsOver } from "../../../state/slices/gridSlice";

const StudentDeskelement = ({ row, col }: { row: number, col: number }) => {
    const dispatch = useDispatch<AppDispatch>();
    const deskState = useSelector((state: RootState) => state.grid.deskSetup[row][col]);
    const dndState = useSelector((state: RootState) => state.grid.dndState);

    const { index, type } = useSelector((state: RootState) => state.grid.hoverState)
    const isActive = (index === row && type === "row") || (index === col && type === "col");

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "STUDENT",
        drop: (item: { id: string }) => handleDrop(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }))

    useEffect(() => {
        dispatch(setIsOver(isOver))
    }, [isOver])

    const handleDrop = ({ id }: { id: string }) => {
        dispatch(swapStudents({ row: row, col: col, id: id }));
    };

    return (
        <div
            ref={drop}
            className={`h-16 flex justify-center items-center rounded-md transition-all relative text-default bg-element border-2 border-default shadow-md 
                ${isActive && "!bg-background"}
                ${isOver && "shadow-success border-success bg-element-hover"}
                ${dndState.isDragging && !dndState.isOver && "bg-element-hover shadow-md shadow-default"}
                ${deskState.studentId && isOver && "shadow-warning border-warning"}`}
        >
            <StudentElement id={deskState.studentId} dndState={dndState} />
        </div>
    );
};
export default StudentDeskelement;

const StudentElement = ({ id, dndState }: { id: string | null, dndState: DndState }) => {
    const student = useSelector((state: RootState) => id ? selectStudentById(state, id) : null)

    return (
        <span className="font-semibold break-words overflow-hidden leading-tight">
            {student?.name || <span className={`font-semibold text-element-hover transition-colors ${dndState.isDragging && "text-text-muted-extra"}`}>{dndState.isDragging ? "Drop Here" : "NA"}</span>}
        </span>
    )
}