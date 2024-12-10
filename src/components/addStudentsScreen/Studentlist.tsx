import { useSelector } from "react-redux"
import Listitem from "./Listitem"
import { selectStudentIds } from "../../state/slices/studentSlice"

const Studentlist = () => {
    const students = useSelector(selectStudentIds)

    return (
        <>
            <div className="mt-4">
                <h3 className="font-semibold mb-2">Student List:</h3>
                <ul className="list-disc pl-6">
                    {students.map((id) => (
                        <Listitem key={id} id={id}/>
                    ))}
                </ul>
            </div>
        </>
    )
}
export default Studentlist