import { useDispatch, useSelector } from "react-redux";
import { addDesk } from "../../../state/slices/gridSlice";
import { RootState } from "../../../state/store";

interface EmptyElementProps {
    row: number;
    col: number;
    disabled?: boolean;
}
const EmptyElement: React.FC<EmptyElementProps> = ({ disabled, row, col }) => {
    const dispatch = useDispatch();
    const {index, type} = useSelector((state: RootState) => state.grid.hoverState);
    const isActive = (index === row && type === "row") || (index === col && type === "col");

    const handleAddDesk = () => dispatch(addDesk({ row, col }));

    return (
        <button
            onClick={handleAddDesk}
            disabled={disabled}
            className={`h-16 flex justify-center items-center rounded-md border border-text-300 transition-all relative bg-card text-text-300 
                ${isActive && "!bg-background"}
                ${!disabled && "hover:bg-primary"}`}>
            {disabled ? "" : "+"}
        </button>
    )
}
export default EmptyElement