import { useDispatch, useSelector } from "react-redux";
import { useDeskState } from "../../../hooks/useDeskState";
import { assignStudent } from "../../../state/slices/gridSlice";
import { AppDispatch, RootState } from "../../../state/store";
import { useDrop } from "react-dnd";
import { selectStudentById, setIsAssigned } from "../../../state/slices/studentSlice";
import { swapStudents } from "../../../state/thunks/swapStudentsThunk";

interface DeskElementProps {
    row: number;
    col: number;
    disabled?: boolean;
}
const StudentDeskelement: React.FC<DeskElementProps> = ({ row, col }) => {
    const dispatch = useDispatch<AppDispatch>();
    const deskState = useSelector((state: RootState) => state.grid.deskSetup[row][col]);
    const student = useSelector((state: RootState) =>
        deskState?.studentId ? selectStudentById(state, deskState.studentId) : null
    );

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
        dispatch(swapStudents({ row: row, col: col, id: id }))
    };


    return (
        <div
            ref={drop}
            className={`h-16 flex justify-center items-center rounded-md transition-all relative text-default bg-card border-2 border-default shadow-md 
                ${isActive && "!bg-background"}
                ${isOver && "border-hover"}`}
        >
            <span className="font-semibold break-words overflow-hidden leading-tight">
                {student?.name || <span className="font-medium text-gray-700">No Assignment</span>}
            </span>
        </div>
    );
};
export default StudentDeskelement;