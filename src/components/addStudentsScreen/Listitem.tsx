import { useSelector } from "react-redux"
import { RootState } from "../../state/store"
import { selectStudentById } from "../../state/slices/studentSlice"

interface ListitemProps {
    id: string
}
const Listitem: React.FC<ListitemProps> = ({ id }) => {
    const student = useSelector((state: RootState) => selectStudentById(state, id).name)

    return (
        <li>{student}</li>
    )
}
export default Listitem