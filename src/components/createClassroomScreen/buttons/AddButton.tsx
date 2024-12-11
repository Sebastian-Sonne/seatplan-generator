interface AddButtonProps {
    onClick: () => void;
}
const AddButton: React.FC<AddButtonProps> = ({onClick}) => {

    return (
        <button
                onClick={onClick}
                className="bg-green-500 w-[120px] text-white px-4 py-2 rounded hover:bg-green-600">+</button>
    )
}
export default AddButton