import { useEffect, useState } from "react"

interface LoadingbarProps {
    onComplete: () => void;
    speed: number;
}
const Loadingbar: React.FC<LoadingbarProps> = ({onComplete, speed}) => {
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPercent((p) => {
                if (p < 10) {
                    return p + 1;
                } else if (p < 100) {
                    return p + Math.floor(Math.random() * 10) + 1;
                } else {
                    clearInterval(interval);
                    onComplete();
                    return 0;
                }
            });
        }, speed);

        return () => clearInterval(interval);
    }, [onComplete, speed]);

    return (
        <div className="w-full bg-background rounded-full h-2.5">
            <div className="bg-default h-2.5 rounded-full" style={{ width: `${percent}%` }}></div>
        </div>
    )
}
export default Loadingbar