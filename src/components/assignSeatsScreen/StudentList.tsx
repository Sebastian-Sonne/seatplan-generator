import { useDispatch, useSelector } from "react-redux";
import H2 from "../headings/H2"
import StudentCard from "./StudentCard"
import { selectAllStudent, selectStudentIds } from "../../state/slices/studentSlice";
import { useRef, useState, useEffect } from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import { randAssignStudents } from "../../state/thunks/randAssignStudents.thunk";
import { AppDispatch } from "../../state/store";
import TertiaryButton from "../buttons/TertiaryButton";
import { clearAssignments } from "../../state/thunks/clearAssignments.thunk";
import H4 from "../headings/H4";
import { useI18n } from "../../hooks/useI18n";

const StudentList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const studentIds = useSelector(selectStudentIds);

    const students = useSelector(selectAllStudent);
    const allAssigned = students.every(student => student.isAssigned);

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    const t = useI18n();

    //overflow shadow if applicable
    useEffect(() => {
        const checkOverflow = () => {
            const scrollContainer = scrollContainerRef.current;
            if (scrollContainer) {
                setIsOverflowing(scrollContainer.scrollWidth > scrollContainer.clientWidth);
            }
        };

        checkOverflow();
        window.addEventListener("resize", checkOverflow);

        return () => {
            window.removeEventListener("resize", checkOverflow);
        };
    }, [studentIds]);

    //! implement toutorial mode, of what to do

    return (
        <>
            <H2 value={t("screens.assign.dnd.heading")} />
            <div className="relative px-2 mb-2 -mt-2 rounded-lg border border-transparent hover:border-border transition-colors">
                <div
                    ref={scrollContainerRef}
                    className="flex flex-row overflow-x-scroll gap-2"
                >
                    {studentIds.map((studendId, index) => (
                        <StudentCard key={`${studendId}-${index}`} id={studendId} />
                    ))}

                    {allAssigned && (
                        <div className="">
                            <H4 value={t("screens.assign.dnd.allAssigned")} />
                        </div>
                    )}
                </div>

                {/*overflow shadow if applicable*/}
                {(isOverflowing && !allAssigned) && (
                    <div className="absolute top-0 right-0 h-full w-6 bg-gradient-to-l from-background rounded-r-lg to-transparent pointer-events-none"></div>
                )}
            </div>

            <div className="flex flex-row justify-between">
                <PrimaryButton onClick={() => dispatch(randAssignStudents())} disabled={allAssigned} >
                    {t("screens.assign.dnd.autoAssign")}
                </PrimaryButton>

                <TertiaryButton onClick={() => dispatch(clearAssignments())} >
                    {t("screens.assign.dnd.clearAssign")}
                </TertiaryButton>
            </div>
        </>
    )
}
export default StudentList