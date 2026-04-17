import { Show } from "solid-js";
import { propComponent } from "@/components/helpers";
import type { BasicSchemaComponent } from "@/components/types";
import { useFormContext } from "@/context/helpers";
import { gridOption2Classes } from "@/layouts";
import { cn } from "@/libs";

export interface GridPropObjectWrapperProps {
    selector: string;
    children: any;
}

export function GridPropObjectWrapper(props: GridPropObjectWrapperProps) {
    const { store } = useFormContext();
    const component = propComponent<BasicSchemaComponent>(
        store.form!.prop(props.selector),
    );
    const classes = gridOption2Classes(component.getOrDefault("grid", 12));

    const legend = component.getOrDefault<string>("legend", "");

    return (
        <div class={cn(classes)}>
            <fieldset
                class={cn(
                    "grid grid-cols-12 gap-(--grid-gap)",
                    "rounded-lg border-0",
                    "bg-grid-prop-object-background border-grid-prop-object-border",
                    "m-1 p-4 rounded-md border border-(--grid-prop-border)",
                    "bg-(--grid-prop-bg)",
                )}>
                <Show when={legend.length > 0}>
                    <legend>{legend}</legend>
                </Show>
                {props.children}
            </fieldset>
        </div>
    );
}
