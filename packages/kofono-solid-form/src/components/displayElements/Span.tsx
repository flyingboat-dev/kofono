import { propComponent } from "@/components/helpers";
import type { FormElementProps } from "@/components/PropElement";

export function Span(props: FormElementProps) {
    const component = propComponent(props.property());
    return (
        <span class={component.class}>
            {(props.property().value as string) || ""}
        </span>
    );
}
