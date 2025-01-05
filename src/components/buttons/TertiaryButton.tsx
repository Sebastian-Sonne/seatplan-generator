import PrimaryButton from "./PrimaryButton"

const TertiaryButton = ({
    onClick,
    children,
    className = ""
}: {
    onClick: () => void,
    children: React.ReactNode,
    className?: string
}) => {

    return (
        <PrimaryButton
            onClick={onClick}
            className={`border-2 border-default bg-transparent ${className}`}
        >
            {children}
        </PrimaryButton>
    )
}
export default TertiaryButton

