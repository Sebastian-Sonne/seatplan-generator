import PrimaryButton from "./PrimaryButton"

const SecondaryButton = ({ onClick, children, className = "" }: { onClick: () => void, children: React.ReactNode, className?: string }) => {

    return (
        <PrimaryButton 
        onClick={onClick}
        className={`border-2 border-default bg-transparent ${className}`}>
            {children}
        </PrimaryButton>
    )
}
export default SecondaryButton