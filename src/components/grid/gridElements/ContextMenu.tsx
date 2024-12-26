import { useDispatch } from "react-redux";
import { add, remove } from "../../../state/slices/gridSlice";
import { AddButton, RemoveButton } from "./GridButtons";

interface ContextMenuProps {
    type: "row" | "col";
    index: number
}
const ContextMenu: React.FC<ContextMenuProps> = ({ type, index }) => {
    const dispatch = useDispatch();

    const handleDeleteCurrent = () => {
        dispatch(remove({ type: type === "row" ? "col" : "row", index: index }))
    }

    const handleAddPrev = () => {
        dispatch(add({ type: type === "row" ? "col" : "row", index: index }))
    }

    const handleAddNext = () => {
        dispatch(add({ type: type === "row" ? "col" : "row", index: index + 1 }))
    }

    return (
        <div className={`absolute flex bg-white rounded-lg shadow shadow-neutral-300
            ${type === "row" ? "flex-row justify-between items-center min-w-[calc(100%+16px)] -top-10"
            : "flex-col justify-between items-center -left-10"}`}
        >
            <AddButton onClick={handleAddPrev} />
            <RemoveButton onClick={handleDeleteCurrent} />
            <AddButton onClick={handleAddNext} />
        </div>
    )
}
export default ContextMenu
