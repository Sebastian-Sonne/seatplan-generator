
interface GoBackButtonProps {
    onClick: () => void;
}
const GoBackButton: React.FC<GoBackButtonProps> = ({ onClick }) => {

    return (
        <button
            onClick={onClick}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500">
            Go Back
        </button>
    )
}
export default GoBackButton