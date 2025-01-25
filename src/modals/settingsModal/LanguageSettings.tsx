import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../state/slices/appSlice";
import { RootState } from "../../state/store";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import H3 from "../../components/headings/H3";



const LanguageSettings = () => {
    const [isOpen, setIsOpen] = useState(false);
    const systemLanguage = useSelector((state: RootState) => state.app.language);
    const dispatch = useDispatch();

    const languages = [
        { code: "en", label: "🇬🇧 English" },
        { code: "de", label: "🇩🇪 Deutsch" },
    ];

    return (
        <>
            <H3 value="Language" />
            <p className="text-text-muted-extra -mt-3 mb-2">
                Choose your prefered language. <a className="text-default" href="mailto:languageRequest@seatplan.xyz?subject=Language%20Request&body=Hello,%0D%0A%0D%0AI would like to request the following language: ">
                    Request a new language
                </a>

            </p>

            <div className="relative w-48">
                {/* Dropdown Trigger */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between w-full px-4 py-2 rounded-lg bg-element text-text shadow-sm border border-border hover:bg-element-hover transition"
                >
                    {languages.find((lang) => lang.code === systemLanguage)?.label}
                    <ChevronDown className={`w-5 h-5 transition ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.ul
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute w-full mt-2 bg-card rounded-lg shadow-lg border border-border overflow-hidden"
                        >
                            {languages.map((lang) => (
                                <li key={lang.code}>
                                    <button
                                        onClick={() => {
                                            dispatch(setLanguage(lang.code))
                                            setIsOpen(false);
                                        }}
                                        className="w-full px-4 py-2 text-left text-text hover:bg-hover transition"
                                    >
                                        {lang.label}
                                    </button>
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}
export default LanguageSettings