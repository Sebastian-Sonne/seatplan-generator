
const HeaderElement = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex justify-center items-center hover:bg-gray-100 text-gray-500 font-semibold py-1 px-1.5 rounded-md border cursor-pointer transition-colors">
            {children}
        </div>
    )
}
export default HeaderElement