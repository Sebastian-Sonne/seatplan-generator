import { useDispatch } from "react-redux";
import { setProcessStep } from "../../state/slices/appSlice";

const AssignSeatsScreen = () => {
    const desks: string[] = [];
    const assignedSeats: string[] = [];

    const dispatch = useDispatch();

    const handlePrevStep = () => {
        dispatch(setProcessStep(2));
    }
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Assign Students</h2>
            <button
                onClick={() => console.log("not implemented")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Shuffle and Assign Students
            </button>
            <div
                className="grid gap-2 mt-4"
                style={{
                    gridTemplateColumns: `repeat(${0}, 1fr)`,
                }}
            >
                {desks.map((_, idx) => (
                    <div
                        key={idx}
                        className="border h-16 flex justify-center items-center rounded bg-gray-100"
                    >
                        {assignedSeats[idx] || ""}
                    </div>
                ))}
            </div>

            <button
                onClick={handlePrevStep}
                className="mt-6 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
                Previous Step
            </button>
        </div>
    )
}
export default AssignSeatsScreen