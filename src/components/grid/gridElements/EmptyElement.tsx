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
            className={`h-16 flex justify-center items-center rounded-md border-2 border-border transition-all relative bg-element text-text-muted-extra 
                ${isActive && "!bg-element-hover"}
                ${!disabled && "hover:bg-element-hover hover:text-default hover:border-default"}`}>
            {disabled ? "" : "+"}
        </button>
    )
}
export default EmptyElement