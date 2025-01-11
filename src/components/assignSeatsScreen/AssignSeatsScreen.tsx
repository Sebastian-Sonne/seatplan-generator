import { useDispatch, } from "react-redux";
import { setExport, setProcessStep } from "../../state/slices/appSlice";
import ClassroomGrid from "../grid/ClassroomGrid";
import Container from "../Container";
import SecondaryButton from "../buttons/SecondaryButton";
import PrimaryButton from "../buttons/PrimaryButton";
import TertiaryButton from "../buttons/TertiaryButton";
import StudentList from "./StudentList";
import { AppDispatch } from "../../state/store";
import { shuffleAssignedStudents } from "../../state/thunks/shuffleAssignedStudents.thunk";

const AssignSeatsScreen = () => {
    const dispatch = useDispatch<AppDispatch>();

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
                    <PrimaryButton onClick={() => dispatch(shuffleAssignedStudents())} >
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