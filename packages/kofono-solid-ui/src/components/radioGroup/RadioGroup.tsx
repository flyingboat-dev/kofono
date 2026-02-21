import type { SchemaPropertyEnum } from "@flyingboat/kofono";
import { RadioGroup as KRadioGroup } from "@kobalte/core/radio-group";
import { createSignal, For } from "solid-js";
import type { CheckboxProps } from "@/components/checkbox";
import { propComponent, propertyHtmlId } from "@/components/helpers";
import { cn } from "@/libs/cn";
import "./style.css";
import type { BasicSchemaComponent } from "@/components/types";
import { useFormContext } from "@/context";

export interface RadioGroupComponent extends BasicSchemaComponent {
    direction?: "row" | "col";
}

export function RadioGroup(props: CheckboxProps) {
    const { setFocusedSelector } = useFormContext();
    const component = propComponent<RadioGroupComponent>(props.property());

    const [current, setCurrent] = createSignal<any>(props.property().value);

    const flexDirection = component.getOrDefault<string>("direction", "col");
    const options = props
        .property()
        .get<SchemaPropertyEnum<string | number>[]>("enum", []);

    const onChange = async (value: string) => {
        await props.updateHandler(props.property().selector, value);
        setCurrent(props.property().value);
    };

    const id = (index: number): string => {
        return `${propertyHtmlId(props.property())}-${index}`;
    };

    const itemName = (index: number): string => {
        return `${props.property().selector}-${index}`;
    };

    return (
        <KRadioGroup
            id={propertyHtmlId(props.property())}
            orientation={flexDirection === "row" ? "horizontal" : "vertical"}
            class="radio-group justify-between"
            value={current()}
            onFocus={() => setFocusedSelector(props.property().selector)}
            onChange={onChange}>
            {/*<KRadioGroup.Label class="radio-group__label">Favorite fruit</KRadioGroup.Label>*/}
            <div
                class={cn("radio-group__items flex flex-wrap gap-2")}
                role="presentation">
                <For each={options}>
                    {(opt, index) => (
                        <KRadioGroup.Item
                            value={opt.value as string}
                            class="radio">
                            <KRadioGroup.ItemInput
                                name={itemName(index())}
                                onFocus={() =>
                                    setFocusedSelector(
                                        props.property().selector,
                                    )
                                }
                                class="radio__input"
                                id={id(index())}
                            />
                            <KRadioGroup.ItemControl class="radio__control">
                                <KRadioGroup.ItemIndicator class="radio__indicator" />
                            </KRadioGroup.ItemControl>
                            <KRadioGroup.ItemLabel
                                class="radio__label text-default dark:text-dark-default"
                                for={id(index())}
                                onFocus={() =>
                                    setFocusedSelector(
                                        props.property().selector,
                                    )
                                }
                                onClick={async () =>
                                    await onChange(opt.value as string)
                                }>
                                {opt.label}
                            </KRadioGroup.ItemLabel>
                        </KRadioGroup.Item>
                    )}
                </For>
            </div>
        </KRadioGroup>
    );
}
