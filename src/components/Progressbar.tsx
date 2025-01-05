import { useSelector } from "react-redux";
import { RootState } from "../state/store";

const Progressbar = () => {
    const currentStep = useSelector((state: RootState) => state.app.step);

    return (
        <div className="flex justify-between -mt-4">
            {["Upload Students", "Create Classroom", "Assign Seats"].map(
                (label, index) => (
                    <div
                        key={index}
                        className={`flex-1 text-center py-2 border-b-4 ${currentStep == index + 1
                            ? "text-default font-semibold"
                            : "text-text-400"
                            } ${currentStep > index
                                ? "border-default"
                                : "border-background"
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