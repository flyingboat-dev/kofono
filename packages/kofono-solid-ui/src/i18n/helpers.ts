import { isObjectLiteral } from "@flyingboat/kofono";
import * as i18n from "@solid-primitives/i18n";
import { createResource } from "solid-js";
import { useFormContext } from "@/context";
import { dictionaries } from "@/i18n/index";
import type { Dictionary, Locale, Translator } from "@/i18n/type";

export async function fetchDictionary(locale: Locale): Promise<Dictionary> {
    const { store } = useFormContext();

    if (!dictionaries[locale]) {
        console.warn(`Locale ${locale} not found, using default 'en'`);
        locale = "en"; // fallback
    }

    let dict = dictionaries[locale]; // load default dictionary
    if (
        store.schema?.$translations &&
        isObjectLiteral(store.schema?.$translations[store.locale])
    ) {
        dict = {
            // merge with loaded schema translations if exists
            ...dict,
            ...(store.schema.$translations[store.locale] as object),
        };
    }
    return i18n.flatten(dict);
}

/**
 * Should be used inside FormProvider
 */
export function useTranslator(): Translator {
    const { store } = useFormContext();
    const [dict] = createResource(
        () => store.locale as Locale,
        fetchDictionary,
    );
    const t = i18n.translator(dict, i18n.resolveTemplate);
    // the purpose of this wrapper is to make sure we return a string
    // even if the translation is not found or the translator is not loaded yet
    return (path: string, args: any): string => {
        if (t) {
            // @ts-expect-error
            return t!(path, args) ?? path;
        }
        console.error("translator not loaded");
        return path;
    };
}
