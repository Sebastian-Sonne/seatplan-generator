import { useI18n } from "../hooks/useI18n";

const SupportComponent = ({ errorMessage, error }: { errorMessage: string, error: Error }) => {
    const t = useI18n();
    return (
        <div className="text-text-muted ">
            <a className="text-default hover:text-hover" href={`mailto:support@seatplan.xyz?subject=Seatplan.xyz Error&body=${t("modals.error.mailToString")}\nErrorMSG: ${errorMessage} \nError: ${error}`}>
                {t("modals.error.supportString")}
            </a>
        </div>
    )
}
export default SupportComponent