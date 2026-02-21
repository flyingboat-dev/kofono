import type { SchemaPropertyEnum } from "@flyingboat/kofono";
import { Checkbox as KCheckbox } from "@kobalte/core/checkbox";
import { HiOutlineCheck } from "solid-icons/hi";
import { createEffect, createSignal, For, Show } from "solid-js";
import { unwrap } from "solid-js/store";
import { propComponent, propertyHtmlId } from "@/components/helpers";
import type { PropElementProps } from "@/components/PropElement";
import type { BasicSchemaComponent } from "@/components/types";
import { useFormContext } from "@/context";
import { cn } from "@/libs/cn";

export interface CheckboxGroupComponent extends BasicSchemaComponent {
    direction?: "row" | "col";
}

export interface CheckboxGroupProps extends PropElementProps {
    label?: string;
    [key: string]: any;
}

export function CheckboxGroup(props: CheckboxGroupProps) {
    const { setFocusedSelector } = useFormContext();
    const component = propComponent<CheckboxGroupComponent>(props.property());
    const [values, setValues] = createSignal<any[]>([]);

    const flexDirection = component.getOrDefault<string>("direction", "col");

    const options = props
        .property()
        .get<SchemaPropertyEnum<string | number>[]>("enum", []);
    //
    // const onInput = async (e: Event) => {
    //     const isChecked = (e.target as HTMLInputElement).checked;
    //     const value = (e.target as HTMLInputElement).value;
    //     console.log(value, values(), isChecked);
    //     let localValues = values();
    //
    //     if (isChecked && !values().includes(value)) {
    //         localValues.push(value);
    //     } else if (values().includes(value)) {
    //         localValues.splice(localValues.indexOf(value), 1);
    //         // localValues =
    //     }
    //     setValues(localValues);
    //     await updateHandler(property().selector, localValues);
    // };

    // const isChecked = (value: string | number): boolean => {
    //     return values().includes(value);
    // };

    // todo fix bug of clicking on label not updating the right value
    const update = async (value: any) => {
        const localValues = unwrap(values());
        console.log(localValues, values());
        if (!values().includes(value)) {
            localValues.push(value);
        } else if (values().includes(value)) {
            localValues.splice(localValues.indexOf(value), 1);
            // localValues =
        }
        setValues(localValues);
        await props.updateHandler(props.property().selector, localValues);
    };

    createEffect(() => {
        setValues(props.property().valueOrDefault<any[]>([]));
    });

    const id = (index: number): string => {
        return `${propertyHtmlId(props.property())}-${index}`;
    };

    return (
        <div
            id={propertyHtmlId(props.property())}
            style={{ all: "unset" }}
            class={cn("isolate flex flex-wrap gap-2", `flex-${flexDirection}`)}>
            <For each={options}>
                {(opt, index) => (
                    <span>
                        <KCheckbox
                            class="checkbox"
                            defaultChecked={values().includes(opt.value)}>
                            <KCheckbox.Input
                                id={id(index())}
                                class="checkbox__input"
                                disabled={component.isDisabled}
                                value={opt.value}
                                onInput={async () => await update(opt.value)}
                                onFocus={() =>
                                    setFocusedSelector(
                                        props.property().selector,
                                    )
                                }
                            />
                            <KCheckbox.Control class="checkbox__control">
                                <KCheckbox.Indicator>
                                    <HiOutlineCheck class="w-5.5 h-5.5" />
                                </KCheckbox.Indicator>
                            </KCheckbox.Control>
                            <Show when={opt.label !== ""}>
                                <KCheckbox.Label
                                    for={id(index())}
                                    class="checkbox__label text-default dark:text-dark-default"
                                    onClick={async (_) => {
                                        // e.preventDefault()
                                        await update(opt.value);
                                    }}>
                                    {opt.label}
                                </KCheckbox.Label>
                            </Show>
                        </KCheckbox>
                    </span>
                )}
            </For>
        </div>
    );
}
