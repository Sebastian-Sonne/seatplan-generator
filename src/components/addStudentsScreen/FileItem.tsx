import { ExcelIcon } from "../icons/Icons"

interface FileItemProps {
    file: File;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
}
const FileItem: React.FC<FileItemProps> = ({file, setFile}) => {

    return (
        <li className="flex items-center justify-between mt-4 p-3 bg-gray-100 rounded-lg">
            <div className="flex flex-row items-center gap-4">
                <div className="h-10 aspect-square">
                    <ExcelIcon />
                </div>
                <span className="text-gray-700 font-semibold truncate">{file.name}</span>
            </div>

            <button
                className="text-red-500 hover:text-red-700 text-sm"
                onClick={() => setFile(null)}
            >
                Remove
            </button>
        </li>
    )
}
export default FileItem