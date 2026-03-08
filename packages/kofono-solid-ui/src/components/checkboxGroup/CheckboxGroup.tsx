import type { SchemaPropertyEnum } from "@flyingboat/kofono";
import { createEffect, createSignal, For } from "solid-js";
import { unwrap } from "solid-js/store";
import { propComponent, propertyHtmlId } from "@/components/helpers";
import type { PropElementProps } from "@/components/PropElement";
import type { BasicSchemaComponent } from "@/components/types";
import { useFormContext } from "@/context";
import { useTranslator } from "@/i18n";
import { cn } from "@/libs/cn";

export interface CheckboxGroupComponent extends BasicSchemaComponent {
    direction?: "row" | "col";
}

export interface CheckboxGroupProps extends PropElementProps {
    label?: string;
    [key: string]: any;
}

export function CheckboxGroup(props: CheckboxGroupProps) {
    const t = useTranslator();
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
            class={cn("isolate flex flex-wrap gap-2", `flex-${flexDirection}`)}>
            <For each={options}>
                {(opt, index) => (
                    <label class="label" for={id(index())}>
                        <input
                            id={id(index())}
                            type="checkbox"
                            class="checkbox checkbox-primary"
                            disabled={component.isDisabled}
                            onInput={async () => await update(opt.value)}
                            checked={values().includes(opt.value)}
                            onFocus={() =>
                                setFocusedSelector(props.property().selector)
                            }
                        />
                        &nbsp;{t(opt.label ?? "")}
                    </label>
                )}
            </For>
        </div>
    );
}
