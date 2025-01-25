import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { useState } from "react";
import { selectStudentIds, removeAll } from "../../../state/slices/studentSlice";
import H4 from "../../headings/H4";
import ListElement, { StudentElement } from "./ListElements";
import { useI18n } from "../../../hooks/useI18n";
import { useModal } from "../../../context/ModalContext";

const StudentList = () => {
    const [showAll, setShowAll] = useState(false);
    const studentIds = useSelector((state: RootState) => selectStudentIds(state));

    const { showModal, hideModal } = useModal();

    const INITIAL_STUDENT_COUNT = 10;//num of students show initially
    const displayedStudentIds = showAll ? studentIds : studentIds.slice(0, INITIAL_STUDENT_COUNT);

    const dispatch = useDispatch();
    const t = useI18n();

    const handleRemoveAll = () => {
        showModal({
            title: t("common.warning"),
            component: (
                <div className="mb-2 text-text-muted" >
                    {t("errors.removeAllStudents")}
                </div >
            ),
            cancelText: t("common.cancel"),
            confirmText: t("common.continueAnyways"),
            onConfirm: () => {
                hideModal();
                dispatch(removeAll());
                setShowAll(false);
            },
            onCancel: hideModal
        })
    }

    return (
        <ul className="space-y-2 mt-4">
            {displayedStudentIds.map((studentId) => (
                <StudentElement key={studentId} id={studentId} />
            ))}

            {studentIds.length > INITIAL_STUDENT_COUNT && !showAll ? (
                <ListElement onClick={() => setShowAll(true)}>
                    <H4 value={t("screens.addStudents.added.showAll")} />
                </ListElement>
            ) : (
                <ListElement onClick={handleRemoveAll} className="hover:bg-error hover:text-text text-error !justify-end">
                    <button className="text-sm font-medium transition-colors">
                        {t("screens.addStudents.added.removeAll")}
                    </button>
                </ListElement>
            )}
        </ul>
    )
}
export default StudentList