import { useDispatch, useSelector } from "react-redux";
import { setExport, setProcessStep } from "../../state/slices/appSlice";
import ClassroomGrid from "../grid/ClassroomGrid";
import { useEffect } from "react";
import { selectStudentIds } from "../../state/slices/studentSlice";
import { assignRandomStudents, clearAssignments } from "../../state/slices/gridSlice";
import Container from "../Container";
import { RootState } from "../../state/store";
import SecondaryButton from "../buttons/SecondaryButton";
import PrimaryButton from "../buttons/PrimaryButton";

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
            <Container layout="flex flex-col gap-4" >
                <ClassroomGrid disabled={true} />

                <div className="flex flex-row justify-end w-full">
                    <PrimaryButton onClick={shuffleStudents} >
                        Shuffle
                    </PrimaryButton>
                </div>
            </Container>

            <Container layout="flex flex-row justify-between">
                <SecondaryButton onClick={handlePrevStep} >
                    Go Back
                </SecondaryButton>

                <PrimaryButton onClick={handleExport} >
                    Export
                </PrimaryButton>
            </Container>
        </>
    )
}
export default AssignSeatsScreen