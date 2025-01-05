
interface GoBackButtonProps {
    onClick: () => void;
}
const GoBackButton: React.FC<GoBackButtonProps> = ({ onClick }) => {

    return (
        <button
            onClick={onClick}
            className="text-text font-semibold px-4 py-2 rounded-lg border-2 border-default hover:bg-default active:bg-active transition-colors">
            Go Back
        </button>
    )
}
export default GoBackButton