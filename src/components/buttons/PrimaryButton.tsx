
const PrimaryButton = ({
    onClick,
    children,
    className = ""
}: {
    onClick: () => void,
    children: React.ReactNode,
    className?: string
}) => {

    return (
        <button
            className={`bg-default hover:bg-hover active:bg-active text-text font-semibold px-4 py-2 rounded-lg shadow-md transition-colors ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
export default PrimaryButton