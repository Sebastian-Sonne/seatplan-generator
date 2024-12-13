import { useDispatch, useSelector } from "react-redux";
import { setProcessStep } from "../../state/slices/appSlice";
import ClassroomGrid from "../createClassroomScreen/ClassroomGrid";
import { useEffect } from "react";
import { selectStudentIds } from "../../state/slices/studentSlice";
import { assignStudents, clearAssignments, } from "../../state/slices/gridSlice";

const AssignSeatsScreen = () => {
    const dispatch = useDispatch();
    const studentIds = useSelector(selectStudentIds);

    useEffect(() => {
        shuffleStudents();
    }, [])

    const shuffleStudents = () => {
        dispatch(clearAssignments())
        dispatch(assignStudents(studentIds));
    }

    const handlePrevStep = () => {
        dispatch(setProcessStep(2));
    }
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Assign Students</h2>

            <div className="mb-5">
                <button
                    onClick={shuffleStudents}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 shadow-md">Shuffle</button>
            </div>

            <div className="p-5 bg-white rounded-2xl shadow-md">
                <ClassroomGrid editable={false} />
            </div>

            <button
                onClick={handlePrevStep}
                className="mt-6 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
                Previous Step
            </button>
        </div>
    )
}
export default AssignSeatsScreen