import { useDispatch, useSelector } from "react-redux";
import { addCol, addRow, removeCol, removeRow } from "../../state/slices/gridSlice";
import ClassroomGrid from "./ClassroomGrid";
import { setProcessStep } from "../../state/slices/appSlice";
import AddButton from "./buttons/AddButton";
import RemoveButton from "./buttons/RemoveButton";
import { RootState } from "../../state/store";
import { selectStudentIds } from "../../state/slices/studentSlice";
import CreateButton from "./buttons/CreateButtons";
import GoBackButton from "./buttons/GoBackButton";

const CreateClassroomScreen = () => {
  const numberOfDesks = useSelector((state: RootState) => state.grid.numberOfDesks);
  const numberOfStudents = useSelector(selectStudentIds).length;
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
          <div className="flex flex-row justify-between items-center">
            <div>
              <h2 className="text-gray-600 font-semibold">Number of Tables: {numberOfDesks}</h2>
              <h2 className="text-gray-600 font-semibold">Number of Students: {numberOfStudents}</h2>
            </div>

            <div className="flex flex-row gap-2">
              <GoBackButton handleClick={handlePrevStep} />
              <CreateButton />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
export default CreateClassroomScreen