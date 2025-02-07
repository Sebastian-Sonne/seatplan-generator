import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingbarProps {
    onComplete: () => void;
    speed: number;
}

const Loadingbar: React.FC<LoadingbarProps> = ({ onComplete, speed }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let p = 0;
        const interval = setInterval(() => {
            if (p < 10) {
                p += 1;
            } else if (p < 100) {
                p += Math.floor(Math.random() * 10) + 1;
            }
            setProgress(Math.min(p, 100));

            if (p >= 100) {
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [speed]);

    return (
        <div className="w-full bg-background rounded-full h-2.5 overflow-hidden">
            <motion.div
                className="bg-default h-2.5 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeInOut", duration: speed / 1000 }}
                onAnimationComplete={() => progress === 100 && onComplete()}
            />
        </div>
    );
};

export default Loadingbar;