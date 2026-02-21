import { createSignal, Show } from "solid-js";
import type { SubmitHandler } from "@/components/types";
import { useFormContext } from "@/context";
import { useTranslator } from "@/i18n";
import { Button } from "./Button";

export interface SubmitButtonProps {
    submit: SubmitHandler;
}

export function FormSubmitButton(props: SubmitButtonProps) {
    const { store } = useFormContext();
    const t = useTranslator();
    const [isSubmitting, setIsSubmitting] = createSignal(false);

    const onSubmit = async () => {
        if (!store.form || isSubmitting()) {
            return;
        }
        setIsSubmitting(true);
        try {
            const res = props.submit(store.form);
            // Await if the submit handler returns a Promise
            if (res && typeof (res as any)?.then === "function") {
                await (res as Promise<unknown>);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Show when={store.form}>
            <Button onClick={onSubmit} disabled={isSubmitting()}>
                <Show when={isSubmitting()}>
                    <span class="spinner" aria-hidden="true"></span>
                </Show>
                <span>{t("submit")}</span>
            </Button>
        </Show>
    );
}
