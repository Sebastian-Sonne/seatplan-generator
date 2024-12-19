import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { selectStudentById, selectStudentIds } from "../../../state/slices/studentSlice";
import H4 from "../../headings/H4";
import H3 from "../../headings/H3";

const AddedStudentsArea = () => {
    const studentIds = useSelector((state: RootState) => selectStudentIds(state));
    
    return (
        <div className="w-full max-w-[600px] md:max-w-none mx-auto p-6 bg-white rounded-xl shadow-md">
            <H3 value="Added Students:"/>

            {studentIds.length !== 0 ? (
                <div>
                    <ul>
                        {studentIds.map((studentId, _) => (
                            <ListElement key={studentId} id={studentId}/>
                        ))}
                    </ul>
                </div>
            ) : (
                <H4 value="There are currently no students added." />
            )}
        </div>
    );
};
export default AddedStudentsArea;

const ListElement = ({id: studentId} : {id: string}) => {
    const student = useSelector((state: RootState) => selectStudentById(state, studentId))

    return (
        <li>
            <H4 value={student.name} />
        </li>
    )
}