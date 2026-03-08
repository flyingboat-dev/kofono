import { createEffect, createSignal, type JSX } from "solid-js";
import { propComponent, propertyHtmlId } from "@/components/helpers";
import type { ComponentType, PropElementProps } from "@/components/PropElement";
import type { BasicSchemaComponent } from "@/components/types";
import { useFormContext } from "@/context";
import { useTranslator } from "@/i18n";
import { cn } from "@/libs";

export interface FileInputComponent extends BasicSchemaComponent {
    type: ComponentType.FileInput;
}

export interface FileInputProps extends PropElementProps {}

export function FileInput(props: FileInputProps): JSX.Element {
    const { setFocusedSelector } = useFormContext();
    const t = useTranslator();
    const component = propComponent<FileInputComponent>(props.property());
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
        <input
            type="file"
            class={cn("file-input", status() === "error" && "error")}
            id={propertyHtmlId(props.property())}
            onInput={onInput}
            value={`${props.property().valueOrDefault("")}`}
            disabled={component.isDisabled || false}
            placeholder={t(component.placeholder)}
            onFocus={() => setFocusedSelector(props.property().selector)}
        />
    );
}
