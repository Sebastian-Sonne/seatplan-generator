import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { selectStudentIds } from "../../../state/slices/studentSlice";
import H4 from "../../headings/H4";
import H3 from "../../headings/H3";
import StudentList from "./StudentList";
import { useI18n } from "../../../hooks/useI18n";

const AddedStudentsArea = () => {
    const studentIds = useSelector((state: RootState) => selectStudentIds(state));
    const t = useI18n();

    return (
        <div className="w-full mx-auto p-6 bg-card rounded-xl shadow-md">
            <H3 value={t("screens.addStudents.added.heading")} />

            {studentIds.length !== 0 ? (
                <div className="flex flex-col">
                    <H4 value={`${t("screens.addStudents.added.totalStudents")} ${studentIds.length}`} />
                    <StudentList />
                </div>
            ) : (
                <H4 value={t("screens.addStudents.added.noStudentsAddedMessage") + " " + t("screens.addStudents.added.note")} />
            )}
        </div>
    );
};
export default AddedStudentsArea;