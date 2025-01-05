import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { selectStudentIds } from "../../../state/slices/studentSlice";
import H4 from "../../headings/H4";
import H3 from "../../headings/H3";
import { setProcessStep } from "../../../state/slices/appSlice";
import PrimaryButton from "../../buttons/PrimaryButton";
import StudentList from "./StudentList";

const AddedStudentsArea = () => {
    const studentIds = useSelector((state: RootState) => selectStudentIds(state));
    const dispatch = useDispatch();

    const handleNextStep = () => {
        dispatch(setProcessStep(2));
    }

    return (
        <div className="w-full max-w-[600px] md:max-w-none mx-auto p-6 bg-card rounded-xl shadow-md">
            <H3 value="Added Students" />

            {studentIds.length !== 0 ? (
                <>
                    <div className="flex flex-row justify-between items-center">
                        <H4 value={`Total number of Students: ${studentIds.length}`} />

                        <PrimaryButton onClick={handleNextStep}>
                            Continue to next Step
                        </PrimaryButton>
                    </div>
                    
                    <StudentList />
                </>
            ) : (
                <H4 value="There are currently no students added." />
            )}
        </div>
    );
};
export default AddedStudentsArea;