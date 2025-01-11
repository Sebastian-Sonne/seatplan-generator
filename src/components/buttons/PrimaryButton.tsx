
const PrimaryButton = ({
    onClick,
    children,
    className = "",
    disabled = false,
}: {
    onClick: () => void,
    children: React.ReactNode,
    className?: string,
    disabled?: boolean
}) => {

    return (
        <button
            className={`bg-default hover:bg-hover active:bg-active text-text font-semibold px-4 py-2 rounded-lg shadow-md transition-colors ${className} ${disabled && "bg-disabled"}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
export default PrimaryButton