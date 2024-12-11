import { useSelector } from "react-redux";
import { RootState } from "../state/store";

const Progressbar = () => {
    const currentStep = useSelector((state: RootState) => state.app.step);

    return (
        <div className="flex justify-between mb-8">
            {["Upload Students", "Create Classroom", "Assign Seats"].map(
                (label, index) => (
                    <div
                        key={index}
                        className={`flex-1 text-center py-2 border-b-4 ${currentStep > index
                                ? "border-green-500 text-green-500"
                                : "border-gray-300 text-gray-500"
                            }`}
                    >
                        {label}
                    </div>
                )
            )}
        </div>
    )
}
export default Progressbar