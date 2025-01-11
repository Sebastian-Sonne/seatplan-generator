import { useDispatch, useSelector } from "react-redux";
import { setExport, setProcessStep, setShuffled } from "../../state/slices/appSlice";
import ClassroomGrid from "../grid/ClassroomGrid";
import { selectStudentIds } from "../../state/slices/studentSlice";
import { assignRandomStudents, clearAssignments } from "../../state/slices/gridSlice";
import Container from "../Container";
import { RootState } from "../../state/store";
import SecondaryButton from "../buttons/SecondaryButton";
import PrimaryButton from "../buttons/PrimaryButton";
import TertiaryButton from "../buttons/TertiaryButton";
import StudentList from "./StudentList";

const AssignSeatsScreen = () => {
    const dispatch = useDispatch();
    const studentIds = useSelector(selectStudentIds);
    const shuffled = useSelector((state: RootState) => state.app.shuffled);

    const shuffleStudents = () => {
        console.error("TO BE IMPLEMENTED")
        /**
         dispatch(clearAssignments())
         dispatch(assignRandomStudents(studentIds));
         if (!shuffled) dispatch(setShuffled(true));
         
         */
    }

    const handlePrevStep = () => {
        dispatch(setProcessStep(2));
    }

    const handleExport = () => {
        dispatch(setExport(true));
    }
    return (
        <>
            <Container className="relative">
                <StudentList />
            </Container>

            <Container className="flex flex-col gap-4" >
                <ClassroomGrid disabled={true} />

                <div className="flex flex-row justify-end w-full">
                    <PrimaryButton onClick={shuffleStudents} >
                        Shuffle
                    </PrimaryButton>
                </div>
            </Container>

            <Container className="flex flex-row justify-between">
                <TertiaryButton onClick={handlePrevStep} >
                    Go Back
                </TertiaryButton>

                <SecondaryButton onClick={handleExport} >
                    Export
                </SecondaryButton>
            </Container>
        </>
    )
}
export default AssignSeatsScreen