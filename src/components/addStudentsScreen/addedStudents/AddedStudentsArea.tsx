import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { selectStudentIds } from "../../../state/slices/studentSlice";
import H4 from "../../headings/H4";
import H3 from "../../headings/H3";
import { setProcessStep } from "../../../state/slices/appSlice";
import PrimaryButton from "../../buttons/PrimaryButton";
import StudentList from "./StudentList";
import { useI18n } from "../../../hooks/useI18n";
import { useModal } from "../../../context/ModalContext";

const AddedStudentsArea = () => {
    const studentIds = useSelector((state: RootState) => selectStudentIds(state));
    const dispatch = useDispatch();
    const t = useI18n();
    const { showModal, hideModal } = useModal();

    const continueWithoutStudents = () => {
            showModal({
                title: t("common.warning"),
                component: (
                    <div className="mb-2 text-text-muted" >
                        ÜBERSETZEN: Continue Without Students?
                    </div >
                ),
                cancelText: t("common.cancel"),
                confirmText: t("common.continueAnyways"),
                onConfirm: () => {
                    hideModal();
                    //! logic
                },
                onCancel: hideModal
            })
        }

    const handleNextStep = () => {
        if (studentIds.length === 0) {
            continueWithoutStudents();
        } else {
            dispatch(setProcessStep(2));
        }
    }

    return (
        <div className="w-full mx-auto p-6 bg-card rounded-xl shadow-md">
            <H3 value={t("screens.addStudents.added.heading")} />

            <div className="flex flex-row justify-between items-center">
                <H4 value={`${t("screens.addStudents.added.totalStudents")} ${studentIds.length}`} />

                <PrimaryButton onClick={handleNextStep}>
                    {t("screens.addStudents.added.continue")}
                </PrimaryButton>
            </div>
            {studentIds.length !== 0 ? (
                <StudentList />
            ) : (
                <H4 value={t("screens.addStudents.added.noStudentsAddedMessage")} />
            )}
        </div>
    );
};
export default AddedStudentsArea;