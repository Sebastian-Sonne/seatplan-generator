import { motion } from "framer-motion";

const LoadingSpinner = () => {
    return (
        <div className="flex flex-col gap-2 justify-center items-center">
            <motion.div
                className="w-10 h-10 border-4 border-default border-t-transparent rounded-full animate-spin"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />

            <h3 className="text-text text-center font-bold">
                Loading app components... 
                <p className="text-text-muted-extra font-semibold">
                This might take a while depending on your internet connection
                </p>
            </h3>
        </div>
    )
}
export default LoadingSpinner