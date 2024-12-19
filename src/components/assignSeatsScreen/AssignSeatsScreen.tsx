import { useDispatch, useSelector } from "react-redux";
import { setExport, setProcessStep } from "../../state/slices/appSlice";
import ClassroomGrid from "../createClassroomScreen/ClassroomGrid";
import { useEffect } from "react";
import { selectStudentIds } from "../../state/slices/studentSlice";
import { assignStudents, clearAssignments, } from "../../state/slices/gridSlice";
import H2 from "../headings/H2";
import GoBackButton from "../createClassroomScreen/buttons/GoBackButton";
import Container from "../Container";

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

    const handleExport = () => {
        dispatch(setExport(true));
    }
    return (
        <>
            <H2 value="Assign Students" />

            <Container layout="flex flex-col gap-4" >
                <ClassroomGrid disabled={true} />

                <div className="flex flex-row justify-end w-full">
                    <button
                        onClick={shuffleStudents}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors shadow-md">
                        Shuffle
                    </button>
                </div>
            </Container>

            <Container layout="flex flex-row justify-between">
                <GoBackButton onClick={handlePrevStep} />

                <button
                    onClick={handleExport}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-md">
                    Export
                </button>
            </Container>
        </>
    )
}
export default AssignSeatsScreen