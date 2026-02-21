import { TreeType } from "@flyingboat/kofono";
import type { JSX } from "solid-js";
import type { DisplayElementProps } from "@/components/displayElements/type";
import { propComponent } from "@/components/helpers";
import type { FormElementProps } from "@/components/PropElement";
import type { BasicSchemaComponent } from "@/components/types";
import { cn } from "@/libs/cn";

export interface ParagraphComponent extends BasicSchemaComponent {
    content: string | JSX.Element;
}

export function Paragraph(props: FormElementProps) {
    const component = propComponent<ParagraphComponent>(props.property());

    const content = (): string | JSX.Element => {
        if (
            props.property().type === "null" &&
            component.getOrDefault("content", null)
        ) {
            return component.getOrDefault("content", "");
        } else if (props.property().treeType === TreeType.Leaf) {
            return props.property().valueOrDefault("");
        }
        return "";
    };

    return <ParagraphBase class={component.class}>{content()}</ParagraphBase>;
}

export function ParagraphBase(props: DisplayElementProps) {
    return (
        <p class={cn("text-default text-base", props.class)}>
            {props.children}
        </p>
    );
}
