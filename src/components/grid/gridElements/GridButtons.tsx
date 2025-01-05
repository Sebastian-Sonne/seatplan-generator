import { AddIcon, RemoveIcon } from "../../icons/Icons"

export const AddButton = ({ onClick }: { onClick: () => void }) => {

    return (
        <button onClick={onClick}
            className="w-10 aspect-square p-2 hover:bg-green-600 transition-colors rounded-lg">
            <AddIcon />
        </button>
    )
}

export const RemoveButton = ({ onClick }: { onClick: () => void }) => {

    return (
        <button onClick={onClick}
            className="w-10 aspect-square p-2 hover:bg-error transition-colors rounded-lg">
            <RemoveIcon />
        </button>
    )
}