import { propComponent, propertyHtmlId } from "@/components/helpers";
import type { FormElementProps } from "@/components/PropElement";

export function Code(props: FormElementProps) {
    const component = propComponent(props.property());
    return (
        <code id={propertyHtmlId(props.property())} class={component.class}>
            {(props.property().value as string) || ""}
        </code>
    );
}
