const H1 = ({value, className}: {value: string, className?: string }) => {
    return (
        <h1 className={`text-2xl font-bold text-text ${className}`}>{value}</h1>
    )
}
export default H1