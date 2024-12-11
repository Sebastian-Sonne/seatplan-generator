interface RemoveButtonProps {
    onClick: () => void;
}
const RemoveButton: React.FC<RemoveButtonProps> = ({ onClick }) => {

    return (
        <button
            onClick={onClick}
            className="bg-gray-300 w-[120px] text-white px-4 py-2 rounded hover:bg-gray-400">-</button>
    )
}
export default RemoveButton