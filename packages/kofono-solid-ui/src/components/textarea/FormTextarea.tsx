import { createEffect, createSignal } from "solid-js";
import { propComponent } from "@/components/helpers";
import type { FormElementProps } from "@/components/PropElement";
import { Textarea } from "@/components/textarea";
import { useFormContext } from "@/context";

export function FormTextarea(props: FormElementProps) {
    const { setFocusedSelector } = useFormContext();
    const component = propComponent(props.property());
    const [status, setStatus] = createSignal<"normal" | "error">("normal");

    createEffect(() => {
        setStatus(
            !props.property().isValid() && props.property().hasBeenUpdated()
                ? "error"
                : "normal",
        );
    });

    const onInput = async (e: InputEvent) => {
        await props.updateHandler(
            props.property().selector,
            (e.target as HTMLInputElement).value,
        );
        props.property();
    };

    return (
        <>
            <Textarea
                onInput={onInput}
                onFocus={() => setFocusedSelector(props.property().selector)}
                disabled={component.isDisabled}
                placeholder={component.placeholder}
                rows={component.getOrDefault("rows", 3)}
                error={status() === "error"}>
                {`${props.property().valueOrDefault("")}`}
            </Textarea>
        </>
    );
}
