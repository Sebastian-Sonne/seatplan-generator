import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { addStudents } from "../../state/slices/studentSlice";
import * as XLSX from "xlsx";

const UploadFile = () => {
  const dispatch = useDispatch();
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) {
      console.log("No file selected");
      alert("No file selected");
      return;
    }
    if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
      alert("Please upload a valid Excel file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result;

      if (typeof data === "string" || data instanceof ArrayBuffer) {
        const workbook = XLSX.read(data, { type: "array" });
        console.log(workbook)
        const sheetName = workbook.SheetNames[0]; // Assuming first sheet
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
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="border p-2 rounded"
      />
      <button
        onClick={() => console.log("Not Implemented")}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Student Manually
      </button>
    </> 
  );
};

export default UploadFile;
