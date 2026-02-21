import { createEffect, createSignal } from "solid-js";
import { propComponent, propertyHtmlId } from "@/components/helpers";
import type { PropElementProps } from "@/components/PropElement";
import type { BasicSchemaComponent } from "@/components/types";
import { useFormContext } from "@/context";

import { useTranslator } from "@/i18n";
import { Input } from "./Input";

export interface InputComponent extends BasicSchemaComponent {
    inputType?:
        | "text"
        | "number"
        | "email"
        | "password"
        | "tel"
        | "url"
        | "date"
        | "time";
}

export interface FormInputProps extends PropElementProps {}

export function FormInput(props: FormInputProps) {
    const { setFocusedSelector } = useFormContext();
    const t = useTranslator();
    const component = propComponent<InputComponent>(props.property());
    const type = component.getOrDefault("inputType", "text");
    const [status, setStatus] = createSignal<"normal" | "error">("normal");

    createEffect(() => {
        setStatus(
            !props.property().isValid() && props.property().hasBeenUpdated()
                ? "error"
                : "normal",
        );
    });

    const onInput = async (e: InputEvent) => {
        const value =
            props.property().type === "number"
                ? (e.target as HTMLInputElement).valueAsNumber
                : (e.target as HTMLInputElement).value;
        await props.updateHandler(props.property().selector, value);
    };

    return (
        <Input
            id={propertyHtmlId(props.property())}
            error={status() === "error"}
            type={type}
            onInput={onInput}
            value={`${props.property().valueOrDefault("")}`}
            disabled={component.isDisabled || false}
            placeholder={t(component.placeholder)}
            onFocus={() => setFocusedSelector(props.property().selector)}
        />
    );
}
