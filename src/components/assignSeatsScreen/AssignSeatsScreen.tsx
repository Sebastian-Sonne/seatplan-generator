import { useDispatch } from "react-redux";
import { setProcessStep } from "../../state/slices/appSlice";
import ClassroomGrid from "../grid/ClassroomGrid";
import Container from "../Container";
import SecondaryButton from "../buttons/SecondaryButton";
import PrimaryButton from "../buttons/PrimaryButton";
import TertiaryButton from "../buttons/TertiaryButton";
import StudentList from "./StudentList";
import { AppDispatch } from "../../state/store";
import { shuffleAssignedStudents } from "../../state/thunks/shuffleAssignedStudents.thunk";
import { useI18n } from "../../hooks/useI18n";
import { useShareLinkModal } from "../../modals/ShareLinkModal";

const AssignSeatsScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const showShareModal = useShareLinkModal();
    const t = useI18n();

    const handlePrevStep = () => {
        dispatch(setProcessStep(2));
    }

    const handleExport = () => {
        showShareModal();
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
                        {t("screens.assign.shuffle")}
                    </PrimaryButton>
                </div>
            </Container>

            <Container className="flex flex-row justify-between">
                <TertiaryButton onClick={handlePrevStep} >
                    {t("common.goBack")}
                </TertiaryButton>

                <SecondaryButton onClick={handleExport} >
                    {t("common.export")}
                </SecondaryButton>
            </Container>
        </>
    )
}
export default AssignSeatsScreen