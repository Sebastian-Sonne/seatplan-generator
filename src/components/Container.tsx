
interface ContainerProps {
    children: React.ReactNode
    layout: string
}
const Container: React.FC<ContainerProps> = ({children, layout}) => {
    return (
        <div className={`${layout} p-5 mb-4 bg-card rounded-2xl`}>
            {children}
        </div>
    )
}
export default Container