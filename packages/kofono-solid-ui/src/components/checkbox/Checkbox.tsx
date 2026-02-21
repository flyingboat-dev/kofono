import { Checkbox as KCheckbox } from "@kobalte/core/checkbox";
import { HiOutlineCheck } from "solid-icons/hi";
import { createSignal, Show } from "solid-js";
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
        await props.updateHandler(
            props.property().selector,
            (e.target as HTMLInputElement).checked,
        );
    };

    const id = `fc-${props.property().selector}`;

    return (
        <span>
            <KCheckbox
                class="checkbox"
                id={id}
                defaultChecked={isChecked(
                    props.property().valueOrDefault<boolean>(false),
                    innerValue(),
                )}>
                <KCheckbox.Input
                    class="checkbox__input"
                    disabled={component.isDisabled}
                    onInput={onInput}
                    onFocus={() =>
                        setFocusedSelector(props.property().selector)
                    }
                />
                <KCheckbox.Control class="checkbox__control">
                    <KCheckbox.Indicator>
                        <HiOutlineCheck class="w-5.5 h-5.5" />
                    </KCheckbox.Indicator>
                </KCheckbox.Control>
                <Show when={label != ""}>
                    <KCheckbox.Label class="checkbox__label text-default dark:text-dark-default">
                        {t(label)}
                    </KCheckbox.Label>
                </Show>
            </KCheckbox>
        </span>
    );
}
