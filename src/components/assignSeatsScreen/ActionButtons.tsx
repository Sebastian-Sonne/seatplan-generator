import { t } from "i18next"
import { clearAssignments } from "../../state/thunks/clearAssignments.thunk"
import { randAssignStudents } from "../../state/thunks/randAssignStudents.thunk"
import PrimaryButton from "../buttons/PrimaryButton"
import TertiaryButton from "../buttons/TertiaryButton"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../state/store"
import { selectAllStudent } from "../../state/slices/studentSlice"

const ActionButtons = () => {
    const dispatch = useDispatch<AppDispatch>();

    const students = useSelector(selectAllStudent);
    const allAssigned = students.every(student => student.isAssigned);

    return (
        <div className="flex flex-row justify-between">
            <PrimaryButton onClick={() => dispatch(randAssignStudents())} disabled={allAssigned} >
                {t("screens.assign.dnd.autoAssign")}
            </PrimaryButton>

            <TertiaryButton onClick={() => dispatch(clearAssignments())} >
                {t("screens.assign.dnd.clearAssign")}
            </TertiaryButton>
        </div>
    )
}
export default ActionButtons