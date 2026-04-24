import { debounce } from "@solid-primitives/scheduled";
import type { FormProperty, MaxValidatorOpts, MinValidatorOpts } from "kofono";
import type { JSX } from "solid-js";
import { propComponent, propertyHtmlId } from "@/components/helpers";
import type { ComponentType, PropElementProps } from "@/components/PropElement";
import type { BasicSchemaComponent } from "@/components/types";
import { useFormContext } from "@/context";

export interface RangeInputComponent extends BasicSchemaComponent {
    type: ComponentType.RangeInput;
    min?: number;
    max?: number;
    step?: number;
}

export interface RangeInputProps extends PropElementProps {}

export function RangeInput(props: RangeInputProps): JSX.Element {
    const { setFocusedSelector } = useFormContext();
    const component = propComponent<RangeInputComponent>(props.property());
    const selector = props.property().selector;

    const trigger = debounce(
        (value: unknown) => props.updateHandler(selector, value),
        250,
    );

    const onInput = async (e: InputEvent) => {
        const value =
            props.property().type === "number"
                ? (e.target as HTMLInputElement).valueAsNumber
                : (e.target as HTMLInputElement).value;
        trigger(value);
    };

    const min = getMinValue(props.property());
    const max = getMaxValue(props.property());

    return (
        <div
            class="w-full max-w-xs"
            onFocus={() => setFocusedSelector(props.property().selector)}>
            <input
                type="range"
                class="range range-primary"
                min={min}
                max={max}
                value={min}
                id={propertyHtmlId(props.property())}
                step={component.getOrDefault("step", 1)}
                onInput={onInput}
            />
            <div class="flex justify-end px-2.5 mt-2 text-xs"></div>
        </div>
    );
}

function getMinValue(prop: FormProperty): number {
    for (const val of prop.validationValidators) {
        if (
            val.name === "min" &&
            val.options !== undefined &&
            val.options !== null
        ) {
            const opts = val.options as MinValidatorOpts;
            const optType = typeof opts;
            if (optType === "number") {
                return Number(val.options);
            } else if (optType === "object") {
                return Number(opts["value"]);
            }
        }
    }
    return 0;
}

function getMaxValue(prop: FormProperty): number {
    for (const val of prop.validationValidators) {
        if (
            val.name === "max" &&
            val.options !== undefined &&
            val.options !== null
        ) {
            const opts = val.options as MaxValidatorOpts;
            const optType = typeof opts;
            if (optType === "number") {
                return Number(val.options);
            } else if (optType === "object") {
                return Number(opts["value"]);
            }
        }
    }
    return 100;
}
