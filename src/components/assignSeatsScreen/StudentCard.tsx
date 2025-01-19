import { useDispatch, useSelector } from "react-redux"
import { selectStudentById } from "../../state/slices/studentSlice"
import { RootState } from "../../state/store"
import H4 from "../headings/H4"
import { useDrag } from "react-dnd"
import { useEffect } from "react"
import { setIsDragging } from "../../state/slices/gridSlice"

const StudentCard = ({ id }: { id: string }) => {
    const student = useSelector((state: RootState) => selectStudentById(state, id));
    const dispatch = useDispatch();

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "STUDENT",
        item: { id, fromCoords: { row: null, col: null }, action: "set" },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }));

    useEffect(() => {
        dispatch(setIsDragging(isDragging));
    }, [isDragging])

    return (
        <>
            {!student.isAssigned && (
                <div
                    ref={drag}
                    className={`flex justify-center items-center px-4 py-2 my-2 bg-element hover:bg-element-hover transition-colors border border-border rounded-lg cursor-pointer select-none
                     ${isDragging && "border-default"}`}>
                    <H4 value={student.name} />
                </div>
            )}
        </>
    )
}
export default StudentCard