import type { SchemaPropertyEnum } from "@flyingboat/kofono";
import { SegmentedControl } from "@kobalte/core/segmented-control";
import { For } from "solid-js";
import "./style.css";

export interface SegmentProps {
    options: SchemaPropertyEnum<any>[];
    value: any;
    setValue: (v: string) => void;
    label?: string;
    orientation?: "horizontal" | "vertical";
}

export function Segment(props: SegmentProps) {
    return (
        <SegmentedControl
            orientation={props.orientation || "horizontal"}
            class="segmented-control"
            defaultValue={props.value}
            onChange={props.setValue}>
            <SegmentedControl.Label class="segmented-control__label">
                {props.label || "Select an option"}
            </SegmentedControl.Label>
            <div class="segmented-control__wrapper" role="presentation">
                <SegmentedControl.Indicator class="segmented-control__indicator" />
                <div class="segmented-control__items" role="presentation">
                    <For each={props.options}>
                        {(opt) => (
                            <SegmentedControl.Item
                                value={opt.value}
                                class="segmented-control__item">
                                <SegmentedControl.ItemInput class="segmented-control__item-input" />
                                <SegmentedControl.ItemLabel class="segmented-control__item-label">
                                    {opt.label}
                                </SegmentedControl.ItemLabel>
                            </SegmentedControl.Item>
                        )}
                    </For>
                </div>
            </div>
        </SegmentedControl>
    );
}
