import { useDispatch } from "react-redux";
import { addCol, addRow, removeCol, removeRow } from "../../state/slices/gridSlice";
import ClassroomGrid from "./ClassroomGrid";
import { setProcessStep } from "../../state/slices/appSlice";
import AddButton from "./buttons/AddButton";
import RemoveButton from "./buttons/RemoveButton";

const CreateClassroomScreen = () => {
  const dispatch = useDispatch();

  const handleNextStep = () => {
    dispatch(setProcessStep(3));
  }
  const handlePrevStep = () => {
    dispatch(setProcessStep(1));
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create Classroom Layout</h2>
      

      <div className="p-5 bg-white rounded-2xl shadow-md">
        <div className="flex flex-col gap-2">

          <div className="flex flex-row justify-end items-end gap-2">
            <h3 className="text-gray-600 font-semibold">Columns:</h3>
            <RemoveButton onClick={() => dispatch(removeCol())} />
            <AddButton onClick={() => dispatch(addCol())} />
          </div>

          <div className="flex flex-row gap-2">
            <div className="flex flex-col justify-end gap-2 w-36">
              <h3 className="text-gray-600 font-semibold">Rows:</h3>
              <RemoveButton onClick={() => dispatch(removeRow())} />
              <AddButton onClick={() => dispatch(addRow())} />
            </div>

            <div className="w-full">
              <ClassroomGrid />
            </div>
          </div>


        </div>


      </div>



      <button
        onClick={handleNextStep}
        className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Next Step
      </button>
      <button
        onClick={handlePrevStep}
        className="mt-6 ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Previous Step
      </button>
    </div>
  )
}
export default CreateClassroomScreen