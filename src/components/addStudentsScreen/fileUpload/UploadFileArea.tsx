import { useState } from "react";
import UploadedFiles from "./UploadedFile";
import DragAndDropArea from "./DragDropArea";
import H3 from "../../headings/H3";

const FileUploadArea = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="w-full max-w-[600px] mx-auto p-6 bg-card rounded-xl shadow-md">
      <H3 value="Upload file:" />

      <DragAndDropArea setError={setError} setFile={setFile} />

      {error && <p className="text-error text-sm mt-3">{error}</p>}

      {file && <UploadedFiles file={file} setFile={setFile} setError={setError} />}
    </div>
  );
};
export default FileUploadArea;