
interface CreateButtonProps {
    onClick: () => void;
}
const CreateButton: React.FC<CreateButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="bg-default hover:bg-hover active:bg-active text-text font-semibold px-4 py-2 rounded-lg shadow-md transition-colors">
            Create Classroom
        </button>
    )
}
export default CreateButton