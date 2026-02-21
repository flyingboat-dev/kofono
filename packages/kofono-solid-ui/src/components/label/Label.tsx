import { cva } from "class-variance-authority";
import type { JSX } from "solid-js";

export interface LabelProps {
    children: JSX.Element;
    intent?: "normal" | "error";
    size?: "small" | "medium" | "large";
    weight?: "normal" | "bold";
    for?: string;
    [key: string]: any;
}

const base =
    "h-4 align-middle block inline leading-none align-middle peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

const labelVariants = cva(base.split(" "), {
    variants: {
        intent: {
            normal: ["text-default", "dark:text-dark-default", "text-base"],
            error: ["text-red-800"],
        },
        size: {
            small: ["text-sm", "leading-8", "opacity-70"],
            medium: ["text-base"],
            large: ["text-lg"],
        },
        weight: {
            normal: ["font-normal"],
            bold: ["font-bold"],
        },
    },
    defaultVariants: {
        size: "small",
    },
});

export function Label(props: LabelProps) {
    return (
        <label
            class={labelVariants({
                intent: props.intent || "normal",
                size: props.size || "small",
                weight: props.weight || "normal",
            })}
            for={props.for || undefined}>
            {props.children}
        </label>
    );
}
