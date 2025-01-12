import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import { useDrop } from "react-dnd";
import { selectStudentById } from "../../../state/slices/studentSlice";
import { swapStudents } from "../../../state/thunks/swapStudents.thunk";

const StudentDeskelement = ({ row, col }: { row: number, col: number }) => {
    const dispatch = useDispatch<AppDispatch>();
    const deskState = useSelector((state: RootState) => state.grid.deskSetup[row][col]);

    const { index, type } = useSelector((state: RootState) => state.grid.hoverState)
    const isActive = (index === row && type === "row") || (index === col && type === "col");

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "STUDENT",
        drop: (item: { id: string }) => handleDrop(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }))

    const handleDrop = ({ id }: { id: string }) => {
        dispatch(swapStudents({ row: row, col: col, id: id }));
    };

    return (
        <div
            ref={drop}
            className={`h-16 flex justify-center items-center rounded-md transition-all relative text-default bg-card border-2 border-default shadow-md 
                ${isActive && "!bg-background"}
                ${isOver && "border-hover"}`}
        >
            <StudentElement id={deskState.studentId} />
        </div>
    );
};
export default StudentDeskelement;

const StudentElement = ({ id }: { id: string | null }) => {
    const student = useSelector((state: RootState) => id ? selectStudentById(state, id) : null)

    return (
        <span className="font-semibold break-words overflow-hidden leading-tight">
            {student?.name || <span className="font-medium text-element-hover">NA</span>}
        </span>
    )
}