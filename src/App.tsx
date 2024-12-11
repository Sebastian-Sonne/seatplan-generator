import AddStudentsScreen from "./components/addStudentsScreen/AddStudentsScreen";
import CreateClassroomScreen from "./components/createClassroom/CreateClassroomScreen";
import AssignSeatsScreen from "./components/AssignSeatsScreen";
import Progressbar from "./components/Progressbar";
import { useSelector } from "react-redux";
import { RootState } from "./state/store";
import { ProcessSteps } from "./state/slices/appSlice";

const App = () => {
  const step = useSelector((state: RootState) => state.app.step);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-gray-50 mt-5 rounded-3xl shadow-md">
      <Progressbar />

      {step === ProcessSteps.STEP_ONE && (
        <AddStudentsScreen />
      )}

      {step === ProcessSteps.STEP_TWO && (
        <CreateClassroomScreen />
      )}

      {step === ProcessSteps.STEP_THREE && (
        <AssignSeatsScreen />
      )}
    </div>
  );
};

export default App;
