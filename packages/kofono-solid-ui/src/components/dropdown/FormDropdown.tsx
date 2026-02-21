import type { SchemaPropertyEnum } from "@flyingboat/kofono";
import { createSignal } from "solid-js";
import { Dropdown, type DropdownOption } from "@/components/dropdown";
import { propComponent } from "@/components/helpers";
import type { PropElementProps } from "@/components/PropElement";
import { useFormContext } from "@/context";

export interface FormDropdownProps extends PropElementProps {}

export function FormDropdown(props: FormDropdownProps) {
    const { setFocusedSelector } = useFormContext();
    const component = propComponent(props.property());

    const propEnum = props
        .property()
        .get<SchemaPropertyEnum<string | number>[]>("enum", []);

    const [value, setValue] = createSignal(props.property().valueOrDefault(""));

    const onChange = async (v: DropdownOption | null) => {
        console.log("onChange", v?.value);
        setValue((v?.value as string) ?? null);
        await props.updateHandler(props.property().selector, v?.value ?? null);
    };

    return (
        <Dropdown
            onChange={onChange}
            onFocus={() => setFocusedSelector(props.property().selector)}
            value={value()}
            options={propEnum}
            placeholder={component.placeholder}
        />
    );
}
