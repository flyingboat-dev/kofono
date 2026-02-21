import type { SchemaPropertyEnum } from "@flyingboat/kofono";
import { createSignal } from "solid-js";
import { propComponent } from "@/components/helpers";
import type { PropElementProps } from "@/components/PropElement";
import { Segment, type SegmentProps } from "@/components/segment/Segment";
import type { BasicSchemaComponent } from "../types";

export interface SegmentComponent extends BasicSchemaComponent {
    orientation?: SegmentProps["orientation"];
}

export interface FormSegmentProps extends PropElementProps {}

export function FormSegment(props: FormSegmentProps) {
    const component = propComponent(props.property());
    const options = props.property().get<SchemaPropertyEnum<any>[]>("enum");
    const [value, setValue] = createSignal(props.property().value);

    return (
        <Segment
            options={options}
            value={value()}
            label={component.label}
            setValue={async (v) => {
                setValue(v);
                await props.updateHandler(props.property().selector, v);
            }}
        />
    );
}
