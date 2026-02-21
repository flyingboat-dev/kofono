import { Dropdown, type DropdownOption } from "@/components/dropdown";
import { useFormContext } from "@/context/helpers";
import { useTranslator } from "@/i18n";
import { i18nLanguages } from "@/i18n/type";

export function LanguageSelector() {
    const { store, setLocale } = useFormContext();
    const t = useTranslator();

    const options: DropdownOption[] = [];
    const supportedLanguages = Object.keys(store.schema?.$translations || {});
    if (!supportedLanguages.length) {
        supportedLanguages.push("en");
    }
    for (const [value, _] of Object.entries(i18nLanguages)) {
        if (!supportedLanguages.includes(value)) {
            continue;
        }
        options.push({
            label: t(`language.${value}`),
            value,
        });
    }

    return (
        <Dropdown
            class="w-40"
            value={store.locale}
            onChange={(v) => setLocale(v.value)}
            options={options}
        />
    );
}
