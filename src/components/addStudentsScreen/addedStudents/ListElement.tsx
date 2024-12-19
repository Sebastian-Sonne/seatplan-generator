import { useSelector, useDispatch } from "react-redux";
import { selectStudentById, removeStudent } from "../../../state/slices/studentSlice";
import H5 from "../../headings/H5";
import { RootState } from "../../../state/store";

const ListElement = ({ id: studentId }: { id: string }) => {
    const student = useSelector((state: RootState) => selectStudentById(state, studentId));
    const dispatch = useDispatch();

    const handleRemoveStudent = () => {
        dispatch(removeStudent(studentId));
    };

    return (
        <li className="flex items-center justify-between px-3 py-2 cursor-pointer bg-gray-50 rounded-lg shadow-sm hover:bg-red-50 transition duration-200">
            <H5 value={student.name} />

            <button
                onClick={handleRemoveStudent}
                className="text-red-500 hover:text-red-700 text-sm font-medium transition duration-200"
            >
                Remove
            </button>
        </li>
    );
};
export default ListElement