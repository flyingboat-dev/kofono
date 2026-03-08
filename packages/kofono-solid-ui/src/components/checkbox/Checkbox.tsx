import { createSignal } from "solid-js";
import { isChecked, propComponent } from "@/components/helpers";
import type { ComponentType, PropElementProps } from "../PropElement";
import type { BasicSchemaComponent } from "../types";
import "./style.css";
import { useFormContext } from "@/context";
import { useTranslator } from "@/i18n";

export interface CheckboxComponent extends BasicSchemaComponent {
    type: ComponentType.Checkbox;
}

export interface CheckboxProps extends PropElementProps {
    label?: string;
    [key: string]: any;
}

export function Checkbox(props: CheckboxProps) {
    const { setFocusedSelector } = useFormContext();
    const t = useTranslator();

    const component = propComponent(props.property());
    const label = component.label || "";

    const [innerValue, setInnerValue] = createSignal<boolean>(
        props.property().valueOrDefault<boolean>(false),
    );

    if (
        typeof props.property().value === "boolean" &&
        props.property().value === true
    ) {
        setInnerValue(true);
    }

    const onInput = async (e: Event) => {
        const value = (e.target as HTMLInputElement).checked;
        await props.updateHandler(props.property().selector, value);
        setInnerValue(value);
    };

    const id = `fc-${props.property().selector}`;

    return (
        <span>
            <label class="label" for={id}>
                <input
                    id={id}
                    type="checkbox"
                    class="checkbox checkbox-primary"
                    disabled={component.isDisabled}
                    onInput={onInput}
                    checked={isChecked(
                        props.property().valueOrDefault<boolean>(false),
                        innerValue(),
                    )}
                    onFocus={() =>
                        setFocusedSelector(props.property().selector)
                    }
                />
                &nbsp;{t(label)}
            </label>
        </span>
    );
}
