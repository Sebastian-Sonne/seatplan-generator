import { useSelector, useDispatch } from "react-redux";
import { selectStudentById, removeStudent } from "../../../state/slices/studentSlice";
import H5 from "../../headings/H5";
import { RootState } from "../../../state/store";

export const StudentElement = ({ id }: { id: string }) => {
    const student = useSelector((state: RootState) => selectStudentById(state, id));
    const dispatch = useDispatch();

    const handleRemoveStudent = () => {
        dispatch(removeStudent(id));
    };

    return (
        <ListElement onClick={handleRemoveStudent} className="active:bg-error" >
            <H5 value={student.name} />

            <button className="text-error text-sm font-medium transition duration-200">
                Remove
            </button>
        </ListElement>
    );
}

export const ListElement = ({
    onClick,
    children,
    className = ""
}: {
    onClick: () => void,
    children: React.ReactNode,
    className?: string
}) => {

    return (
        <li onClick={onClick}
            className={`flex items-center justify-between px-3 py-2 shadow-md cursor-pointer rounded-lg bg-element hover:bg-element-hover transition-colors ${className}`}>
            {children}
        </li>
    )
}
export default ListElement