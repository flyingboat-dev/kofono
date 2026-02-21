import { type JSX, splitProps } from "solid-js";
import { cn } from "@/libs/cn";

export interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
    class?: string;
    error?: boolean;
}

export function Input(props: InputProps) {
    const [local, otherProps] = splitProps(props, ["class"]);
    return (
        <input
            class={cn(
                "w-full inline-flex transition-colors duration-200 ease-in-out",
                "bg-input-background text-input-text placeholder-input-placeholder",
                "border border-[var(--color-input-border)] rounded-sm",
                "px-3 py-2 text-base shadow-sm transition-shadow",
                "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "outline-none focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-focus",
                local.class,
                props.error &&
                    "text-error border-error placeholder-error bg-error-light focus-visible:ring-none",
            )}
            {...otherProps}
        />
    );
}
