import { ExcelIcon } from "../../icons/Icons"

interface FileItemProps {
    file: File;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
}
const FileItem: React.FC<FileItemProps> = ({file, setFile}) => {

    return (
        <li className="flex items-center justify-between mt-4 bg-element hover:bg-element-hover transition-colors rounded-lg">
            <div className="flex flex-row items-center gap-x-4 my-3 ml-3">
                <div className="h-10 aspect-square">
                    <ExcelIcon />
                </div>
                <span className="text-text font-semibold truncate">{file.name}</span>
            </div>

            <button
                className="text-error hover:bg-error hover:text-text p-5 rounded-lg text-sm transition-colors"
                onClick={() => setFile(null)}
            >
                Remove
            </button>
        </li>
    )
}
export default FileItem