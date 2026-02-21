import { Slider as KSlider } from "@kobalte/core/slider";
import "./style.css";
import {
    arrayPropertyTypes,
    type FormProperty,
    type MinValidatorOpts,
    type SchemaComponent,
} from "@flyingboat/kofono";
import { debounce } from "@solid-primitives/scheduled";
import { propComponent, propertyHtmlId } from "@/components/helpers";
import type { PropElementProps } from "@/components/PropElement";
import { useFormContext } from "@/context";
import { isArrayEqual } from "@/libs";

export interface SliderProps extends PropElementProps {}

export type SliderComponent = SchemaComponent & {
    label?: string;
    valueLabel?: string;
    step?: number;
};

export function Slider(props: SliderProps) {
    const { setFocusedSelector } = useFormContext();
    const component = propComponent<SliderComponent>(props.property());
    const isArrayType = arrayPropertyTypes.includes(props.property().type);
    const selector = props.property().selector;

    const trigger = debounce(
        (value: unknown) => props.updateHandler(selector, value),
        250,
    );

    const update = async (v) => {
        if (!isArrayType && props.property().value !== v) {
            v = v[0];
            trigger(v);
        } else if (
            isArrayType &&
            Array.isArray(props.property().value) &&
            !isArrayEqual(v, props.property().value as any)
        ) {
            trigger(v);
        }
    };

    return (
        <KSlider
            id={propertyHtmlId(props.property())}
            class="SliderRoot"
            step={component.getOrDefault("step", 1)}
            minValue={getMinValue(props.property())}
            maxValue={getMaxValue(props.property())}
            onChange={update}>
            <div
                class="SliderLabel"
                onFocus={() => setFocusedSelector(props.property().selector)}>
                <KSlider.Label>
                    {component.getOrDefault("label", "")}
                </KSlider.Label>
                <KSlider.ValueLabel />
            </div>
            <KSlider.Track class="SliderTrack">
                <KSlider.Fill class="SliderRange" />
                <KSlider.Thumb class="SliderThumb">
                    <KSlider.Input />
                </KSlider.Thumb>
            </KSlider.Track>
        </KSlider>
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
            const opts = val.options as MinValidatorOpts;
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
