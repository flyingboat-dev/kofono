import { propComponent } from "@/components/helpers";
import type { FormElementProps } from "@/components/PropElement";

export function Small(props: FormElementProps) {
    const component = propComponent(props.property());
    return (
        <small class={component.class}>
            {(props.property().value as string) || ""}
        </small>
    );
}
