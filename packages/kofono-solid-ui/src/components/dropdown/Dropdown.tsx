import { createMemo, For } from "solid-js";
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
    t?: (path: string, ...args: any[]) => string;
}

export function Dropdown(props: DropdownProps) {
    const t = !props.t ? (path, ..._): string => path : props.t;

    const value2label = createMemo(() => {
        const item = props.options.find(e => e.value === props.value);
        if (!item) {
            return null;
        }
        if (item.label) {
            item.label = t(item.label);
        }
        return item.label ?? item.value ?? "no value/label";
    });

    const handleChange = (item: DropdownOption) => {
        props.onChange(item);
        (document.activeElement as HTMLElement | null)?.blur();
    };

    return (
        <div>
            <div class="dropdown">
                <div tabindex="0" class="btn m-1">
                    {value2label() ?? props.placeholder}
                </div>
                <ul
                    tabindex="-1"
                    class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <For each={props.options}>
                        {item => (
                            <li>
                                {/** biome-ignore lint/a11y/useValidAnchor: ok */}
                                <button
                                    class={cn(
                                        props.value === item.value
                                            ? "bg-primary text-primary-content"
                                            : "",
                                    )}
                                    onFocus={props.onFocus}
                                    type="button"
                                    onClick={() => handleChange(item)}>
                                    {item.label}
                                </button>
                            </li>
                        )}
                    </For>
                </ul>
            </div>
        </div>
    );
}
