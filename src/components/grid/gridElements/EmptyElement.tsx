import { useDispatch } from "react-redux";
import { addDesk } from "../../../state/slices/gridSlice";

interface EmptyElementProps {
    row: number;
    col: number;
    disabled?: boolean;
}
const EmptyElement: React.FC<EmptyElementProps> = ({ disabled, row, col }) => {
    const dispatch = useDispatch()

    const handleAddDesk = () => dispatch(addDesk({ row, col }));

    return (
        <button
            onClick={handleAddDesk}
            disabled={disabled}
            className={`h-16 flex justify-center items-center rounded-md border transition-all relative bg-gray-100 text-gray-500 ${disabled ? "" : "hover:bg-gray-200"}`}>
            {disabled ? "" : "+"}
        </button>
    )
}
export default EmptyElement