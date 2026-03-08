import type { SchemaPropertyEnum } from "@flyingboat/kofono";
import { createSignal, For } from "solid-js";
import { propComponent, propertyHtmlId } from "@/components/helpers";
import type { FormElementProps } from "@/components/PropElement";
import { useFormContext } from "@/context";
import { cn } from "@/libs/cn";

export function Select(props: FormElementProps) {
    const { setFocusedSelector } = useFormContext();
    const [hasSelectedSomething, setHasSelectedSomething] = createSignal(false);
    const component = propComponent(props.property());

    const onInput = async (e: Event) => {
        setHasSelectedSomething(true);
        await props.updateHandler(
            props.property().selector,
            (e.currentTarget as HTMLInputElement).value,
        );
    };

    const options = props.property().get<SchemaPropertyEnum<any>[]>("enum");

    return (
        <select
            id={propertyHtmlId(props.property())}
            class={cn("select")}
            onInput={onInput}
            onFocus={() => setFocusedSelector(props.property().selector)}>
            {!hasSelectedSomething() && (
                <option value="">{component.placeholder || "Select..."}</option>
            )}
            <For each={options}>
                {opt => {
                    return (
                        <option
                            class="appearance-none bg-transparent px-3 py-2"
                            selected={opt.value === props.property().value}
                            value={opt.value}>
                            {opt.label || opt.value}
                        </option>
                    );
                }}
            </For>
        </select>
    );
}
