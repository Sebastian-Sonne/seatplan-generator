
interface CreateButtonProps {
    onClick: () => void;
}
const CreateButton: React.FC<CreateButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Create Classroom
        </button>
    )
}
export default CreateButton