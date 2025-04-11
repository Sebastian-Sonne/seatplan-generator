import { useDispatch } from "react-redux";
import { useI18n } from "../../../hooks/useI18n";
import PrimaryButton from "../../buttons/PrimaryButton";
import Container from "../../Container";
import { setProcessStep } from "../../../state/slices/appSlice";

const Continue = () => {
    const t = useI18n();
    const dispatch = useDispatch();

    const handleContinue = () => {
        dispatch(setProcessStep(2));
    }

    return (
        <Container className="flex justify-end border-2 border-default">
            <PrimaryButton onClick={handleContinue}>
                {t("screens.addStudents.added.continue")}
            </PrimaryButton>
        </Container>
    );
}
export default Continue;