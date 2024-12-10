import { useDispatch } from "react-redux";
import { setProcessStep } from "../../state/slices/appSlice";
import UploadFile from "./UploadFile";
import Studentlist from "./Studentlist";

const AddStudentsScreen = () => {
  const dispatch = useDispatch();

  const handleNextStep = () => {
    dispatch(setProcessStep(2));
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Step 1: Upload or Add Students</h2>
      <div className="flex gap-4 items-center">
        <UploadFile />

        
      </div>

      <Studentlist />
      
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