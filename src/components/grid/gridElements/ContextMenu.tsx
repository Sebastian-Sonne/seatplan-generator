import { useDispatch } from "react-redux";
import { add, remove, set } from "../../../state/slices/gridSlice";
import { AddButton, MassSelectButton, PlaceholderButton, RemoveButton } from "./GridButtons";

interface ContextMenuProps {
    type: "row" | "col"; //refers to the orientation of the context menu
    index: number
}
const ContextMenu: React.FC<ContextMenuProps> = ({ type, index }) => {
    const dispatch = useDispatch();

    //row/col switched, because type refers to orientation of context menu, and is therefore opposite of the represeted row/col
    const handleDeleteCurrent = () => {
        dispatch(remove({ type: type === "row" ? "col" : "row", index: index }))
    }

    const handleAddPrev = () => {
        dispatch(add({ type: type === "row" ? "col" : "row", index: index }))
    }

    const handleAddNext = () => {
        dispatch(add({ type: type === "row" ? "col" : "row", index: index + 1 }))
    }

    const hanldeSelect = () => {
        dispatch(set({ type: type === "row" ? "col" : "row", index: index }))
    }

    return (
        <>
            {/*Placeholder Structure to provide fitting shadow */}
            <div className={`absolute flex ${type === "row" ? "flex-col min-w-[calc(100%+16px)] -top-20" : "flex-row items-center sm:right-full -left-12 z-50"}`}>
                <div className="flex justify-center ">
                    <div className={`bg-element hover:bg-element-hover ${type === "row" ? "rounded-t-lg" : "rounded-l-lg"} shadow-md`}>
                        <PlaceholderButton />

                    </div>
                </div>
                <div className={`flex ${type === "row" ? "flex-row justify-between" : "flex-col"} rounded-lg shadow-md`}>
                    <PlaceholderButton />
                    <PlaceholderButton />
                    <PlaceholderButton />
                </div>
            </div>

            {/*Actual Context Menu */}
            <div className={`absolute flex ${type === "row" ? "flex-col min-w-[calc(100%+16px)] -top-20" : "flex-row items-center sm:right-full -left-12 z-50"} `}>
                <div className="flex justify-center ">
                    <div className={`bg-element hover:bg-element-hover ${type === "row" ? "rounded-t-lg" : "rounded-l-lg"}`}>
                        <MassSelectButton onClick={hanldeSelect} toolTipText={`Select/Deselct this ${type}`}/>
                    </div>
                </div>
                <div className={`flex ${type === "row" ? "flex-row justify-between" : "flex-col"} bg-element hover:bg-element-hover rounded-lg`}>
                    <AddButton onClick={handleAddPrev} toolTipText={`Insert a new ${type}`} />
                    <RemoveButton onClick={handleDeleteCurrent} toolTipText={`Remove this ${type}`}/>
                    <AddButton onClick={handleAddNext} toolTipText={`Insert a new ${type}`}/>
                </div>
            </div>
        </>
    )
}
export default ContextMenu
