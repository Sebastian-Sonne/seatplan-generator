import { useDispatch } from "react-redux";
import { setProcessStep } from "../state/slices/appSlice";

const CreateClassroomScreen = () => {
    const desks: string[] = [];
    const dispatch = useDispatch();
    
    const handleNextStep = () => {
        dispatch(setProcessStep(3));
    }
    const handlePrevStep = () => {
        dispatch(setProcessStep(1));
    }

    return (
        <div>
          <h2 className="text-xl font-bold mb-4">Step 2: Create Classroom Layout</h2>
          <div className="flex gap-4 items-center mb-4">
            <label>
              Rows:
              <input
                type="number"
                value={0}
                onChange={(e) =>
                  //setGridSize({ ...gridSize, rows: +e.target.value })
                  console.log("not implemented")
                }
                className="ml-2 border p-1 w-16 rounded"
                min="1"
              />
            </label>
            <label>
              Columns:
              <input
                type="number"
                value={0}
                onChange={(e) =>
                    console.log("not implemented")
                  //setGridSize({ ...gridSize, cols: +e.target.value })
                }
                className="ml-2 border p-1 w-16 rounded"
                min="1"
              />
            </label>
            <button
              onClick={() => console.log("not implemented")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Create Grid
            </button>
          </div>

          {/* Grid */}
          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: `repeat(${0}, 1fr)`,
            }}
          >
            {desks.map((_, idx) => (
              <button
                key={idx}
                className="border h-16 flex justify-center items-center rounded bg-gray-100"
              >
                <span className="text-gray-500">+</span>
              </button>
            ))}
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