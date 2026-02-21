import type { Form } from "@flyingboat/kofono";
import { Show, Suspense } from "solid-js";
import { unwrap } from "solid-js/store";
import { FormSubmitButton } from "@/components/button/FormSubmitButton";
import { LanguageSelector } from "@/components/languageSelector";
import { updateHandler as baseUpdateHandler } from "@/components/reactivity";
import { ThemeSelector } from "@/components/themeSelector";
import { useFormContext } from "@/context";
import { useTranslator } from "@/i18n";
import { GridPropsLayout } from "@/layouts/grid/GridPropsLayout";
import "../index.css";

export interface GridFormProps {
    submit?: (form: Form) => Promise<void> | void;
    showThemeSelector?: boolean;
    showLanguageSelector?: boolean;
}

export function GridForm(props: GridFormProps) {
    const { store, setState, setFocusedSelector } = useFormContext();
    const t = useTranslator();

    const submit = async (f) => {
        if (props.submit) {
            await props.submit(f);
        }
    };

    const updateHandler = async (selector: string, value: any) => {
        if (!store.form) {
            return;
        }
        const ripples = await baseUpdateHandler(
            store.form,
            store.propsSignals!,
            selector,
            value,
        );
        console.log(ripples, " RIPPLES for", selector);

        setState(unwrap(store.form!.state));
        setFocusedSelector(selector);
    };

    return (
        <div style={{ isolation: "isolate" }}>
            <Suspense fallback={<div>{t("loading.form")}...</div>}>
                <Show when={store.form !== null}>
                    <div class="flex justify-end-safe gap-x-4">
                        <Show when={props.showThemeSelector}>
                            <div>
                                <span class="mr-2 leading-10">
                                    {t("theme")}:
                                </span>
                                <ThemeSelector
                                    targets={[".form-wrapper", "html"]}
                                />
                            </div>
                        </Show>
                        <Show when={props.showLanguageSelector}>
                            <div>
                                <span class="mr-2 leading-10">
                                    {t("language")}:
                                </span>
                                <LanguageSelector />
                            </div>
                        </Show>
                    </div>
                    <div
                        class={`isolate grid grid-cols-12 gap-[var(--grid-gap)] mt-4`}>
                        <GridPropsLayout
                            updateHandler={updateHandler}
                            selectors={store.form!.selectors.getRootSelectors()}
                        />
                        <Show when={props.submit}>
                            <div class="col-span-12">
                                <FormSubmitButton submit={submit} />
                            </div>
                        </Show>
                    </div>
                </Show>
            </Suspense>
        </div>
    );
}
