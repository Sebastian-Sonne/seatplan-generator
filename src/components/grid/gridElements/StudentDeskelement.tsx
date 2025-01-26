import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import { selectStudentById } from "../../../state/slices/studentSlice";
import { swapStudents } from "../../../state/thunks/swapStudents.thunk";
import { useEffect } from "react";
import { Coordinates, DndState, setIsDragging, setIsOver } from "../../../state/slices/gridSlice";
import { assignStudent } from "../../../state/thunks/assingStudent.thunk";
import { useI18n } from "../../../hooks/useI18n";
import { useDrag, useDrop } from "react-dnd";

const StudentDeskelement = ({ row, col }: { row: number, col: number }) => {
    const dispatch = useDispatch<AppDispatch>();
    const deskState = useSelector((state: RootState) => state.grid.deskSetup[row][col]);
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
        if (deskState.studentId) {
            drag(node);
        }
        drop(node);
    }

    //update global dnd state for ui update
    useEffect(() => {
        dispatch(setIsOver(isOver))
    }, [isOver])

    useEffect(() => {
        dispatch(setIsDragging(isDragging))
    }, [isDragging]);

    return (
        <div ref={dragDropRef} className={getClassNames({ isActive, isOver, dndState, deskState, isDragging })} >
            <StudentElement id={deskState.studentId} dndState={dndState} />
        </div>
    );
};
export default StudentDeskelement;

const StudentElement = ({ id, dndState }: { id: string | null; dndState: DndState }) => {
    const student = useSelector((state: RootState) => (id ? selectStudentById(state, id) : null));
    const t = useI18n();

    return (
        <span className="font-semibold break-words overflow-hidden leading-tight select-none">
            {student?.name || (
                <span className={`font-semibold text-element-hover transition-colors ${dndState.isDragging && "text-text-muted-extra"}`}>
                    {t(dndState.isDragging ? "screens.assign.dnd.dropHere" : "common.na")}
                </span>
            )}
        </span>
    );
};

//util function for desk element classnames
const getClassNames = ({ isActive, isOver, dndState, deskState, isDragging }: any) =>
    `h-16 flex justify-center items-center rounded-md transition-all relative text-default bg-element border-2 border-default shadow-md 
    ${isActive && "!bg-background"}
    ${isOver && "shadow-success border-success bg-element-hover"}
    ${dndState.isDragging && !dndState.isOver && "bg-element-hover shadow-md shadow-default"}
    ${deskState.studentId && isOver && "shadow-warning border-warning"}
    ${deskState.studentId ? "cursor-pointer" : "cursor-default"}
    ${isDragging && "opacity-15"}`;