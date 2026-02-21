import { type JSX, splitProps } from "solid-js";
import { cn } from "@/libs/cn";

export interface TextareaProps
    extends JSX.TextareaHTMLAttributes<HTMLTextAreaElement> {
    class?: string;
    error?: boolean;
    children?: JSX.Element;
}

export function Textarea(props: TextareaProps) {
    const [local, otherProps] = splitProps(props, [
        "class",
        "error",
        "children",
    ]);

    return (
        <textarea
            class={cn(
                "flex w-full px-3 py-1 text-base text-input-text shadow-sm transition-shadow",
                "bg-input-background",
                "rounded-sm border border-[var(--color-input-border)]",
                "placeholder-input-placeholder",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-focus",
                local.class,
                local.error &&
                    "text-red-800 border-red-800 placeholder-red-800 bg-red-50 focus-visible:ring-none",
            )}
            {...otherProps}>
            {local.children}
        </textarea>
    );
}
