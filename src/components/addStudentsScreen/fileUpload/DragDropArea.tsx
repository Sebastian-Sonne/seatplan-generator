import { useCallback } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { UploadIcon } from "../../icons/Icons";
import H4 from "../../headings/H4";
import H5 from "../../headings/H5";
import { useI18n } from "../../../hooks/useI18n";

interface DragAndDropAreaProps {
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
}
const DragAndDropArea: React.FC<DragAndDropAreaProps> = ({ setError, setFile }) => {
    const t = useI18n();

    const onDrop = useCallback(
        (acceptedFile: File[], fileRejections: FileRejection[]) => {
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
        },
        maxSize: 50 * 1024 * 1024,
        maxFiles: 1,
    });

    return (
        <div
            {...getRootProps()}
            className={`bg-background border-2 border-dashed rounded-xl p-6 cursor-pointer transition-colors ease-in-out
            ${isDragActive ? 'border-hover' : 'border-default'}`}
        >
            <input {...getInputProps()} />
            <div className="text-center">
                <div className="flex justify-center mb-2 w-full h-16">
                    <UploadIcon color="#419eaf" />
                </div>
                {isDragActive ? (
                    <p className="text-text-800">{t("screens.addStudents.upload.dndArea.onDrag")}</p>
                ) : (
                    <>
                        <H4 value={t("screens.addStudents.upload.dndArea.instruction")} />
                        <H5 value={t("screens.addStudents.upload.dndArea.format")} />
                    </>
                )}
            </div>
        </div>
    )
}
export default DragAndDropArea  