import Tooltip from "../../buttons/ToolTip"
import { AddIcon, RemoveIcon, SelectIcon } from "../../icons/Icons"

export const AddButton = ({ onClick, toolTipText = "" }: { onClick: () => void, toolTipText?: string }) => {

    return (
        <Tooltip text={toolTipText} >
            <button onClick={onClick}
                className="w-10 aspect-square p-2 hover:bg-success transition-colors rounded-lg">
                <AddIcon />
            </button>
        </Tooltip>
    )
}

export const RemoveButton = ({ onClick, toolTipText = "" }: { onClick: () => void, toolTipText?: string }) => {

    return (
        <Tooltip text={toolTipText} >
            <button onClick={onClick}
                className="w-10 aspect-square p-2 hover:bg-error transition-colors rounded-lg">
                <RemoveIcon />
            </button>
        </Tooltip>
    )
}

export const MassSelectButton = ({ onClick, toolTipText = "" }: { onClick: () => void, toolTipText?: string }) => {
    return (
        <Tooltip text={toolTipText} >
            <button onClick={onClick}
                className="w-10 aspect-square p-2 hover:bg-hover active:bg-active transition-colors rounded-lg">
                <SelectIcon color="#419eaf" />
            </button>
        </Tooltip>
    )
}

export const PlaceholderButton = () => {
    return (
        <button className="w-10 aspect-square p-2 rounded-lg">
        </button>
    )
}