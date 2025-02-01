import { motion } from "framer-motion";

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center">
            <motion.div
                className="w-10 h-10 border-4 border-default border-t-transparent rounded-full animate-spin"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
        </div>
    )
}
export default LoadingSpinner