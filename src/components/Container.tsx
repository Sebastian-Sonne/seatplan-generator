
interface ContainerProps {
    children: React.ReactNode
    className: string
}
const Container: React.FC<ContainerProps> = ({children, className}) => {
    return (
        <div className={`${className} p-5 mb-4 bg-card rounded-2xl shadow-md`}>
            {children}
        </div>
    )
}
export default Container