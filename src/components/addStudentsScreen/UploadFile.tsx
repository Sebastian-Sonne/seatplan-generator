import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { addStudents } from "../../state/slices/studentSlice";
import * as XLSX from "xlsx";
import { useCallback, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { ExcelIcon, UploadIcon } from "../icons/Icons";
import { setProcessStep } from "../../state/slices/appSlice";

const FileUploadArea = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = () => {
    handleFileUpload();

    if (!error) {
      dispatch(setProcessStep(2));
    }
  }

  const handleFileUpload = () => {
    if (!file) {
      console.log("No file selected");
      setError("Please upload a file to continue.")
      return;
    }

    if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
      setError("Please upload a valid Excel file.")
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result;
      if (typeof data === "string" || data instanceof ArrayBuffer) {
        try {
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const rows: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          const extractedNames = rows
            .map((row) => row[0])
            .filter((name) => name);

          const studentEntities = extractedNames.map((name) => ({
            id: nanoid(),
            name,
          }));
          dispatch(addStudents(studentEntities));
        } catch (error) {
          console.error("Error processing Excel file:", error);
          setError("There was an error processing the file.");
        }
      }
    };
    reader.readAsArrayBuffer(file);
  }

  return (
    <div className="w-full max-w-[600px] mx-auto p-6 bg-white rounded-xl shadow-md">

      {/* Drag and Drop Area */}
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

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

      {/* Uploaded Files */}
      {file && (
        <ul className="space-y-4">
          <li className="flex items-center justify-between mt-2 p-3 bg-gray-100 rounded-lg">
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


          <div className="flex flex-row justify-end">
            <button
              onClick={handleSubmit}
              className="text-white font-semibold bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition-colors">
              Submit
            </button>
          </div>
        </ul>
      )}
    </div>
  );
};
export default FileUploadArea;