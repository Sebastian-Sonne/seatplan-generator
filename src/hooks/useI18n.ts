import { useTranslation } from "react-i18next";
import { TranslationKey } from "../service/nestedKeyOf.service";

export const useI18n = () => {
  const { t } = useTranslation();
  return (key: TranslationKey) => t(key);
};
