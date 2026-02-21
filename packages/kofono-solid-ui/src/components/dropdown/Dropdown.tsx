import { Select } from "@kobalte/core/select";
import { HiOutlineCheck, HiOutlineChevronDown } from "solid-icons/hi";
import { createMemo } from "solid-js";
import "./style.css";
import { cn } from "@/libs/cn";

export interface DropdownOption {
    value: unknown;
    label?: string;

    [key: string]: unknown;
}

export interface DropdownProps {
    onChange: (value: any) => Promise<void> | void;
    onFocus?: () => void;
    value?: any;
    options: DropdownOption[];
    placeholder?: string;
    class?: string;
}

export function Dropdown(props: DropdownProps) {
    const value2label = createMemo(() => {
        const item = props.options.find((e) => e.value === props.value);
        if (!item) {
            return props.value;
        }
        return item.label ?? item.value ?? "no value/label";
    });

    return (
        <Select
            class={cn(props.class)}
            onChange={props.onChange}
            defaultValue={props.value || undefined}
            options={props.options}
            optionValue="value"
            optionTextValue="label"
            placeholder={props.placeholder}
            itemComponent={(props) => (
                <Select.Item
                    item={props.item}
                    class="select__item te"
                    onClick={() => console.log(props)}>
                    <Select.ItemLabel>{props.item.textValue}</Select.ItemLabel>
                    <Select.ItemIndicator class="select__item-indicator">
                        <HiOutlineCheck />
                    </Select.ItemIndicator>
                </Select.Item>
            )}>
            {/*todo: should expose aria stuff */}
            <Select.Trigger
                class="select__trigger"
                aria-label="Fruit"
                onFocus={props.onFocus}>
                <Select.Value class="select__value">
                    {value2label()}
                </Select.Value>
                <Select.Icon class="select__icon">
                    <HiOutlineChevronDown />
                </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
                <Select.Content class="select__content">
                    <Select.Listbox class="select__listbox" />
                </Select.Content>
            </Select.Portal>
        </Select>
    );
}
