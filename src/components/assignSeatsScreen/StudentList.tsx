import { useDispatch, useSelector } from "react-redux";
import H2 from "../headings/H2"
import StudentCard from "./StudentCard"
import { selectAllStudent, selectStudentIds } from "../../state/slices/studentSlice";
import { useRef } from "react";
import { AppDispatch, RootState } from "../../state/store";
import H4 from "../headings/H4";
import { useI18n } from "../../hooks/useI18n";
import { useDrop } from "react-dnd";
import { Coordinates } from "../../state/slices/gridSlice";
import { unAssignStudent } from "../../state/thunks/unassignStudent.thunk";
import useOverflowCheck from "../../hooks/useOverflowCheck";
import ActionButtons from "./ActionButtons";

const StudentList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const studentIds = useSelector(selectStudentIds);
    const dndState = useSelector((state: RootState) => state.grid.dndState);

    const students = useSelector(selectAllStudent);
    const allAssigned = students.every(student => student.isAssigned);

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const isOverflowing = useOverflowCheck(scrollContainerRef, [studentIds]);

    const t = useI18n();

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "STUDENT",
        drop: (item: { fromCoords: Coordinates }) => handleDrop({ ...item }),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }));

    const handleDrop = ({ fromCoords }: { fromCoords: Coordinates }) => {
        dispatch(unAssignStudent({ coords: { row: fromCoords.row, col: fromCoords.col } }));
    };

    return (
        <>
            <H2 value={t("screens.assign.dnd.heading")} />
            <div
                ref={drop}
                className={`relative px-2 mb-2 -mt-2 rounded-lg border-2 border-transparent hover:border-border 
                    ${isOver && "!border-warning shadow-md shadow-warning"} 
                    ${dndState.isDragging && !isOver && "!border-border"}
                    transition-all`}
            >
                <div
                    ref={scrollContainerRef}
                    className={`flex flex-row overflow-x-scroll gap-2 ${dndState.isDragging && "opacity-10"} transition-all`}
                >
                    {studentIds.map((studendId, index) => (
                        <StudentCard key={`${studendId}-${index}`} id={studendId} />
                    ))}

                    {allAssigned && (
                        <div className="">
                            <H4 value={t("screens.assign.dnd.allAssigned")} />
                        </div>
                    )}

                </div>

                {dndState.isDragging && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <H4 value={isOver ? "Drop here... " : "Unassign Student"} />
                    </div>
                )}

                {/*overflow shadow if applicable*/}
                {(isOverflowing && !allAssigned) && (
                    <div className="absolute top-0 right-0 h-full w-6 bg-gradient-to-l from-background rounded-r-lg to-transparent pointer-events-none"></div>
                )}
            </div>

            <ActionButtons />
        </>
    )
}
export default StudentList