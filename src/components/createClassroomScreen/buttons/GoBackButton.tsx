
interface GoBackButtonProps {
    handleClick: () => void;
}
const GoBackButton: React.FC<GoBackButtonProps> = ({ handleClick }) => {

    return (
        <button
            onClick={handleClick}
            className="bg-gray-300 text-white px-4 py-2 rounded hover:bg-gray-400">
            Go Back
        </button>
    )
}
export default GoBackButton