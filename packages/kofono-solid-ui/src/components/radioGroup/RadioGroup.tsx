import type { SchemaPropertyEnum } from "@flyingboat/kofono";
import { createSignal, For } from "solid-js";
import type { CheckboxProps } from "@/components/checkbox";
import { propComponent, propertyHtmlId } from "@/components/helpers";
import "./style.css";
import type { BasicSchemaComponent } from "@/components/types";
import { useFormContext } from "@/context";
import { useTranslator } from "@/i18n";
import { cn } from "@/libs";

export interface RadioGroupComponent extends BasicSchemaComponent {
    direction?: "row" | "col";
}

export function RadioGroup(props: CheckboxProps) {
    const t = useTranslator();
    const { setFocusedSelector } = useFormContext();
    const component = propComponent<RadioGroupComponent>(props.property());

    const [current, setCurrent] = createSignal<any>(props.property().value);

    const flexDirection = component.getOrDefault<string>("direction", "col");
    flexDirection;
    const options = props
        .property()
        .get<SchemaPropertyEnum<string | number>[]>("enum", []);

    const update = async (value: any) => {
        await props.updateHandler(props.property().selector, value);
        setCurrent(props.property().value);
    };

    const id = (index: number): string => {
        return `${propertyHtmlId(props.property())}-${index}`;
    };

    // const itemName = (index: number): string => {
    //     return `${props.property().selector}-${index}`;
    // };
    const radioName = `${props.property().selector}-radio`;

    return (
        <div
            id={propertyHtmlId(props.property())}
            class={cn("isolate flex flex-wrap gap-2", `flex-${flexDirection}`)}>
            <For each={options}>
                {(opt, index) => (
                    <label class="label">
                        <input
                            id={id(index())}
                            type="radio"
                            name={radioName}
                            class="radio radio-primary"
                            checked={current === index}
                            onInput={() => update(opt.value)}
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
