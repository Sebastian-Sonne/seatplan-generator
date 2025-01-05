
interface GoBackButtonProps {
    onClick: () => void;
}
const GoBackButton: React.FC<GoBackButtonProps> = ({ onClick }) => {

    return (
        <button
            onClick={onClick}
            className="text-text-900 font-semibold px-4 py-2 rounded-lg border-2 border-primary hover:bg-primary transition-colors">
            Go Back
        </button>
    )
}
export default GoBackButton