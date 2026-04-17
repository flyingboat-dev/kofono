import { createMemo, For } from "solid-js";
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

    const value2label = createMemo((): string => {
        const item = props.options.find(e => e.value === props.value);
        if (!item) {
            return props.placeholder ?? "no value/label";
        }
        if (item.label) {
            item.label = t(item.label);
        }
        return item.label ?? (item.value as string) ?? "no value/label";
    });

    const handleChange = (item: DropdownOption) => {
        props.onChange(item);
        (document.activeElement as HTMLElement | null)?.blur();
    };

    return (
        <div>
            <div class="dropdown">
                <div tabindex="0" class="btn m-1">
                    {value2label()}
                    <ChevronDownIcon />
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

function ChevronDownIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4"
            aria-hidden="true">
            <path d="M5 7.5l5 5 5-5" />
        </svg>
    );
}
