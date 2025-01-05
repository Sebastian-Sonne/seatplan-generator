
interface CreateButtonProps {
    onClick: () => void;
}
const CreateButton: React.FC<CreateButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="bg-primary text-text-900 font-semibold px-4 py-2 rounded-lg hover:bg-secondary shadow-md transition-colors">
            Create Classroom
        </button>
    )
}
export default CreateButton