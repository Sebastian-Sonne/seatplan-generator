import { useState } from "react";
import UploadedFiles from "./UploadedFile";
import DragAndDropArea from "./DragDropArea";
import H3 from "../../headings/H3";
import { useI18n } from "../../../hooks/useI18n";

const FileUploadArea = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const t = useI18n();

  return (
    <div className="w-full mx-auto p-6 bg-card rounded-xl shadow-md">
      <H3 value={t("screens.addStudents.upload.heading")} />

      <DragAndDropArea setError={setError} setFile={setFile} />

      {error && <p className="text-error text-sm mt-3">{error}</p>}

      {file && <UploadedFiles file={file} setFile={setFile} setError={setError} />}
    </div>
  );
};
export default FileUploadArea;