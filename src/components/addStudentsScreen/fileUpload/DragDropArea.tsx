import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadIcon } from "../../icons/Icons";

interface DragAndDropAreaProps {
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
}
const DragAndDropArea: React.FC<DragAndDropAreaProps> = ({ setError, setFile }) => {

    const onDrop = useCallback(
        (acceptedFile: File[], fileRejections: any[]) => {
            setError(null);

            // Validate files
            if (fileRejections.length > 0) {
                const message = fileRejections[0].errors[0].message || 'File upload error';
                setError(message);
                return;
            }

            // Add files to the list
            setFile(acceptedFile[0]);
        }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ['.xlsx'],
            "application/vnd.ms-excel": ['xls']
        },
        maxSize: 50 * 1024 * 1024,
        maxFiles: 1,
    });

    return (
        <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-6 cursor-pointer transition duration-200 ease-in-out 
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}`}
        >
            <input {...getInputProps()} />
            <div className="text-center">
                <div className="flex justify-center mb-2 w-full h-16">
                    <UploadIcon />
                </div>
                {isDragActive ? (
                    <p className="text-blue-600">Drop the files here...</p>
                ) : (
                    <>
                        <p className="text-gray-600 font-semibold text-lg">Choose a file or drag & drop it here</p>
                        <p className="text-gray-400 font-normal text-md">.xlsx and .xls formats, max 50MB</p>
                    </>
                )}
            </div>
        </div>
    )
}
export default DragAndDropArea  