import { I18nKeys } from "../types/i18n";

// Utility to recursively extract all nested keys
type NestedKeyOf<T, Prefix extends string = ""> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? `${Prefix}${K}` | NestedKeyOf<T[K], `${Prefix}${K}.`>
        : never;
    }[keyof T]
  : "";

// Extract nested keys from I18nKeys
export type TranslationKey = NestedKeyOf<I18nKeys>;
