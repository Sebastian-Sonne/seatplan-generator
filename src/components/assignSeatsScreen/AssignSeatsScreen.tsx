import { useDispatch, } from "react-redux";
import { setExport, setProcessStep } from "../../state/slices/appSlice";
import ClassroomGrid from "../grid/ClassroomGrid";
import Container from "../Container";
import SecondaryButton from "../buttons/SecondaryButton";
import PrimaryButton from "../buttons/PrimaryButton";
import TertiaryButton from "../buttons/TertiaryButton";
import StudentList from "./StudentList";

const AssignSeatsScreen = () => {
    const dispatch = useDispatch();

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
                    <PrimaryButton onClick={() => console.log("not implmenetd")} >
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