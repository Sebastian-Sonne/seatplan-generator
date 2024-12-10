import { useDispatch } from "react-redux";
import { setProcessStep } from "../state/slices/appSlice";


const AddStudentsScreen = () => {
    const students: string[] = [];
    const dispatch = useDispatch();

    const handleNextStep = () => {
        dispatch(setProcessStep(2));
    }

    return (
        <div>
          <h2 className="text-xl font-bold mb-4">Step 1: Upload or Add Students</h2>
          <div className="flex gap-4 items-center">
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={() => console.log("Not Implemented")}
              className="border p-2 rounded"
            />
            <button
              onClick={() => console.log("Not Implemented")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Student Manually
            </button>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Student List:</h3>
            <ul className="list-disc pl-6">
              {students.map((student, idx) => (
                <li key={idx}>{student}</li>
              ))}
            </ul>
          </div>
          <button
            onClick={handleNextStep}
            className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Next Step
          </button>
        </div>
    )
}
export default AddStudentsScreen