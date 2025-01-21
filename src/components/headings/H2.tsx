const H2 = ({ value: value, className }: { value: string, className?: string }) => {
    return (
        <h2 className={`text-xl font-bold mb-4 text-text ${className}`}>{value}</h2>
    )
}
export default H2