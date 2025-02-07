import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import { selectStudentById } from "../../../state/slices/studentSlice";
import { swapStudents } from "../../../state/thunks/swapStudents.thunk";
import { useEffect } from "react";
import { Coordinates, DndState, setIsDragging, setIsLocked, setIsOver } from "../../../state/slices/gridSlice";
import { assignStudent } from "../../../state/thunks/assingStudent.thunk";
import { useI18n } from "../../../hooks/useI18n";
import { useDrag, useDrop } from "react-dnd";
import { LockIcon, LockOpenIcon } from "lucide-react";

const StudentDeskelement = ({ row, col }: { row: number, col: number }) => {
    const dispatch = useDispatch<AppDispatch>();
    const deskState = useSelector((state: RootState) => state.grid.deskSetup[row][col]);
    const isLocked = useSelector((state: RootState) => state.grid.deskSetup[row][col].isLocked);
    const dndState = useSelector((state: RootState) => state.grid.dndState);

    const { index, type } = useSelector((state: RootState) => state.grid.hoverState)
    const isActive = (index === row && type === "row") || (index === col && type === "col");

    //handle dnd drop
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "STUDENT",
        drop: (item: { id: string, fromCoords: Coordinates, action: string }) => handleDrop({ ...item }),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }));

    const handleDrop = ({ id, fromCoords, action }: { id: string, fromCoords: Coordinates, action: string }) => {
        if (action === "set") {
            dispatch(assignStudent({ id, coords: { row, col } }));
        } else if (action === "swap") {
            dispatch(swapStudents({ fromCoords: fromCoords, toCoords: { row, col } }))
        } else {
            throw new Error("Unkown action. Please check the FAQ for solutions.")
        }
    };

    //handle dnd drag
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "STUDENT",
        item: { id: null, fromCoords: { row: row, col: col }, action: "swap" },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const dragDropRef = (node: HTMLDivElement | null) => {
        if (deskState.studentId && !isLocked) {
            drag(node);
        }
        if (!isLocked) {
            drop(node);
        }
    }

    //update global dnd state for ui update
    useEffect(() => {
        if (!isDragging) {
            dispatch(setIsOver(isOver))
        }
    }, [isOver])

    useEffect(() => {
        dispatch(setIsDragging(isDragging))
    }, [isDragging]);

    return (
        <div ref={dragDropRef} className={getClassNames({ isActive, isOver, dndState, deskState, isDragging, isLocked })} >
            <StudentElement id={deskState.studentId} dndState={dndState} isLocked={isLocked} />

            <LockButton row={row} col={col} />
        </div>
    );
};
export default StudentDeskelement;

const StudentElement = ({ id, dndState, isLocked }: { id: string | null; dndState: DndState, isLocked: boolean }) => {
    const student = useSelector((state: RootState) => (id ? selectStudentById(state, id) : null));
    const t = useI18n();

    return (
        <span className="font-semibold break-words overflow-hidden leading-tight select-none">
            {student?.name || (
                <span className={`font-semibold text-element-hover transition-colors ${dndState.isDragging && !isLocked && "text-text-muted-extra"}`}>
                    {t(dndState.isDragging && !isLocked ? "screens.assign.dnd.dropHere" : "common.na")}
                </span>
            )}
        </span>
    );
};

const LockButton = ({ row, col }: { row: number, col: number }) => {
    const dispatch = useDispatch();
    const isLocked = useSelector((state: RootState) => state.grid.deskSetup[row][col].isLocked);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        dispatch(setIsLocked({ row, col, isLocked: !isLocked }));
    }

    return (
        <div className={`absolute bottom-0 right-0 pr-0.5 -my-0.5 text-text-muted-extra ${isLocked ? "!text-error bg-opacity-30" : "hover:text-success"} transition-colors`}>
            <button onClick={handleClick} className="pt-3 pl-3">
                {isLocked ? (
                    <LockIcon size={16} strokeWidth={3} color="currentcolor" />
                ) : (
                    <LockOpenIcon size={16} strokeWidth={3} color="currentcolor" />
                )}
            </button>
        </div>
    )
}

//util function for desk element classnames
const getClassNames = ({ isActive, isOver, dndState, deskState, isDragging, isLocked }: any) =>
    `relative h-16 flex justify-center items-center rounded-md transition-all text-default bg-element border-2 border-default shadow-md 
    ${isActive && "!bg-background"}
    ${isOver && !isLocked && "shadow-success border-success bg-element-hover"}
    ${dndState.isDragging && !dndState.isOver && !isLocked && "bg-element-hover shadow-md shadow-default"}
    ${deskState.studentId && isOver && "shadow-warning !border-warning"}
    ${deskState.studentId ? "cursor-pointer" : "cursor-default"}
    ${isDragging && "opacity-15"}
    ${isLocked && "!border-border"}`;