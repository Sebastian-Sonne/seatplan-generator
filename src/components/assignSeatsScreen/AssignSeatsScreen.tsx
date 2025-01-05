import { useDispatch, useSelector } from "react-redux";
import { setExport, setProcessStep } from "../../state/slices/appSlice";
import ClassroomGrid from "../grid/ClassroomGrid";
import { useEffect } from "react";
import { selectStudentIds } from "../../state/slices/studentSlice";
import { assignRandomStudents, clearAssignments } from "../../state/slices/gridSlice";
import H2 from "../headings/H2";
import GoBackButton from "../createClassroomScreen/buttons/GoBackButton";
import Container from "../Container";
import { RootState } from "../../state/store";
import ThemeSwitcher from "../ThemeSwitcher";

const AssignSeatsScreen = () => {
    const dispatch = useDispatch();
    const studentIds = useSelector(selectStudentIds);
    const shuffled = useSelector((state: RootState) => state.app.shuffled);

    useEffect(() => {
        if (!shuffled) {
            shuffleStudents();
        }
    }, [])

    const shuffleStudents = () => {
        dispatch(clearAssignments())
        dispatch(assignRandomStudents(studentIds));
    }

    const handlePrevStep = () => {
        dispatch(setProcessStep(2));
    }

    const handleExport = () => {
        dispatch(setExport(true));
    }
    return (
        <>
            <div className="flex flex-row justify-between items-center">
                <H2 value="Assign Students" />
                <ThemeSwitcher />
            </div>

            <Container layout="flex flex-col gap-4" >
                <ClassroomGrid disabled={true} />

                <div className="flex flex-row justify-end w-full">
                    <button
                        onClick={shuffleStudents}
                        className="bg-primary text-text-900 font-semibold px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
                        Shuffle
                    </button>
                </div>
            </Container>

            <Container layout="flex flex-row justify-between">
                <GoBackButton onClick={handlePrevStep} />

                <button
                    onClick={handleExport}
                    className="bg-primary text-text-900 font-semibold px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
                    Export
                </button>
            </Container>
        </>
    )
}
export default AssignSeatsScreen