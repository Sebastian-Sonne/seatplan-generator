import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { removeAll, selectStudentIds } from "../../../state/slices/studentSlice";
import H4 from "../../headings/H4";
import H3 from "../../headings/H3";
import ListElement from "./ListElement";
import { setProcessStep } from "../../../state/slices/appSlice";

const AddedStudentsArea = () => {
    const INITIAL_STUDENT_COUNT = 10;
    const studentIds = useSelector((state: RootState) => selectStudentIds(state));
    const [showAll, setShowAll] = useState(false); // Control whether all students are shown
    const dispatch = useDispatch();

    const displayedStudentIds = showAll ? studentIds : studentIds.slice(0, INITIAL_STUDENT_COUNT);

    const handleRemoveAll = () => {
        if (confirm("Do you really want to remove all students? This action cannot be undone.")) {
            dispatch(removeAll())
            setShowAll(false)
        }
    }

    const handleNextStep = () => {
        dispatch(setProcessStep(2))
    }

    return (
        <div className="w-full max-w-[600px] md:max-w-none mx-auto p-6 bg-white rounded-xl shadow-md">
            <H3 value="Added Students" />

            {studentIds.length !== 0 ? (
                <>
                    <div className="flex flex-row justify-between items-center">
                        <H4 value={`Total number of Students: ${studentIds.length}`} />

                        <button
                            onClick={handleNextStep}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                            Continue to next Step
                        </button>
                    </div>
                    <ul className="space-y-2 mt-4">
                        {displayedStudentIds.map((studentId) => (
                            <ListElement key={studentId} id={studentId} />
                        ))}

                        {studentIds.length > INITIAL_STUDENT_COUNT && !showAll ? (
                            <li
                                onClick={() => setShowAll(true)}
                                className="flex items-center justify-between px-3 py-2 cursor-pointer bg-gray-50 rounded-lg shadow-sm hover:bg-green-50 transition duration-200">
                                <H4 value="Show all students" />
                            </li>
                        ) : (
                            <li
                                onClick={handleRemoveAll}
                                className="flex items-center justify-end px-3 py-2 cursor-pointer bg-gray-50 rounded-lg shadow-sm hover:bg-red-50 transition duration-200">

                                <button className="text-red-500 hover:text-red-700 text-sm font-medium transition duration-200">
                                    Remove all
                                </button>
                            </li>
                        )}
                    </ul>
                </>
            ) : (
                <H4 value="There are currently no students added." />
            )}
        </div>
    );
};
export default AddedStudentsArea;