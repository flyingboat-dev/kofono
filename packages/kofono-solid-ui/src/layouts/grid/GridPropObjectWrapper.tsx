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
    return (
        <div class={cn(classes)}>
            <div
                class={cn(
                    "grid grid-cols-12 gap-[var(--grid-gap)]",
                    "rounded-lg border-0",
                    "bg-grid-prop-object-background border-grid-prop-object-border",
                )}>
                {props.children}
            </div>
        </div>
    );
}
