import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useI18n } from "../hooks/useI18n";

const Progressbar = () => {
    const currentStep = useSelector((state: RootState) => state.app.step);
    const t = useI18n();

    const steps = [t("screens.addStudents.title"), t("screens.create.title"), t("screens.assign.title")];
    const progressPercentage = ((currentStep) / (steps.length)) * 100;

    return (
        <>
            <div className="flex justify-between">
                {steps.map((label, index) => (
                    <div key={index}
                        className={`flex-1 text-center ${currentStep == index + 1
                            ? "text-default font-semibold"
                            : "text-text-muted-extra"
                            }`}
                    >
                        {label}
                    </div>
                ))}
            </div>

            <div className="relative w-full h-2 bg-element rounded-full overflow-hidden">
                <div
                    className="absolute top-0 left-0 h-full bg-default transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
        </>
    );
}
export default Progressbar