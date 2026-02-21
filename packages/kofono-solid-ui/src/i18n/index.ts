import { en } from "./en";
import { fr } from "./fr";

export * from "./helpers";
export * from "./type";

export const dictionaries = {
    en: en,
    fr: fr,
};

export type Language = keyof typeof dictionaries;
