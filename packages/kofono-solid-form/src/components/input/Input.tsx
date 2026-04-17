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
                "input",
                local.class,
                props.error &&
                    "text-error border-error placeholder-error bg-error-light focus-visible:ring-none",
            )}
            {...otherProps}
        />
    );
}
