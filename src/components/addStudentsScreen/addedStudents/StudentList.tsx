import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { useState } from "react";
import { selectStudentIds, removeAll } from "../../../state/slices/studentSlice";
import H4 from "../../headings/H4";
import ListElement, { StudentElement } from "./ListElements";

const StudentList = () => {
    const INITIAL_STUDENT_COUNT = 10;
    const studentIds = useSelector((state: RootState) => selectStudentIds(state));
    const [showAll, setShowAll] = useState(false); // Control whether all students are shown
    const dispatch = useDispatch();

    const displayedStudentIds = showAll ? studentIds : studentIds.slice(0, INITIAL_STUDENT_COUNT);

    const handleRemoveAll = () => {
        if (confirm("Do you really want to remove all students? This action cannot be undone.")) {
            dispatch(removeAll())
            setShowAll(false)
        }
    }

    return (
        <ul className="space-y-2 mt-4">
            {displayedStudentIds.map((studentId) => (
                <StudentElement key={studentId} id={studentId} />
            ))}

            {studentIds.length > INITIAL_STUDENT_COUNT && !showAll ? (
                <ListElement onClick={() => setShowAll(true)}>
                    <H4 value="Show all students" />
                </ListElement>
            ) : (
                <ListElement onClick={handleRemoveAll} className="hover:bg-error hover:text-text text-error !justify-end">
                    <button className="text-sm font-medium transition-colors">
                        Remove all
                    </button>
                </ListElement>
            )}
        </ul>
    )
}
export default StudentList